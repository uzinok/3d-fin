<?php
// gallery-delete-media.php

header('Content-Type: application/json; charset=utf-8');

// Проверяем метод запроса
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Метод не поддерживается']);
    exit;
}

// Включаем вывод ошибок для отладки
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Проверка на ботов (honeypot поле)
if (!empty($_POST['website'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Spam detected']);
    exit;
}

// Ограничение частоты запросов
session_start();
if (isset($_SESSION['last_delete']) && (time() - $_SESSION['last_delete']) < 10) {
    http_response_code(429);
    echo json_encode(['success' => false, 'message' => 'Слишком частые запросы']);
    exit;
}
$_SESSION['last_delete'] = time();

// Получаем данные из формы
$id = $_POST['id'] ?? '';
$block = $_POST['block'] ?? '';

// Валидация ID
if (empty($id) || !is_numeric($id)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Неверный ID элемента']);
    exit;
}

$id = (int)$id;

// Валидация блока
$allowedBlocks = ['other', 'useful', 'model'];
if (!in_array($block, $allowedBlocks)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Неверный блок']);
    exit;
}

try {
    // Подключаем конфигурацию БД
    require_once '../config.php';

    $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4", DB_USER, DB_PASS);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Получаем информацию о файле из базы данных
    $stmt = $pdo->prepare("
        SELECT id, type, src, poster
        FROM gallery_items
        WHERE id = ?
    ");
    $stmt->execute([$id]);
    $media = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$media) {
        http_response_code(404);
        echo json_encode(['success' => false, 'message' => 'Элемент не найден']);
        exit;
    }

    $deleteErrors = [];
    $filesDeleted = true;

    // Удаляем основной файл (src)
    if (!empty($media['src'])) {
        $srcPath = $_SERVER['DOCUMENT_ROOT'] . $media['src'];
        if (file_exists($srcPath)) {
            if (is_writable($srcPath)) {
                if (!unlink($srcPath)) {
                    $deleteErrors[] = 'Не удалось удалить основной файл: ' . $media['src'];
                    $filesDeleted = false;
                }
            } else {
                $deleteErrors[] = 'Нет прав на удаление основного файла: ' . $media['src'];
                $filesDeleted = false;
            }
        } else {
            // Файл уже удален, это не ошибка
        }
    }

    // Удаляем постер (если есть)
    if (!empty($media['poster'])) {
        $posterPath = $_SERVER['DOCUMENT_ROOT'] . $media['poster'];
        if (file_exists($posterPath)) {
            if (is_writable($posterPath)) {
                if (!unlink($posterPath)) {
                    $deleteErrors[] = 'Не удалось удалить постер: ' . $media['poster'];
                    $filesDeleted = false;
                }
            } else {
                $deleteErrors[] = 'Нет прав на удаление постера: ' . $media['poster'];
                $filesDeleted = false;
            }
        } else {
            // Постер уже удален, это не ошибка
        }
    }

    // Если были ошибки при удалении файлов, возвращаем ошибку
    if (!$filesDeleted) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Ошибка при удалении файлов',
            'errors' => $deleteErrors
        ]);
        exit;
    }

    // Если файлы удалены успешно, удаляем запись из базы данных
    $deleteStmt = $pdo->prepare("DELETE FROM gallery_items WHERE id = ?");
    $deleteStmt->execute([$id]);

    if ($deleteStmt->rowCount() > 0) {
        // Успешный ответ
        echo json_encode([
            'success' => true,
            'message' => 'Элемент успешно удален',
            'deleted_id' => $id
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Не удалось удалить запись из базы данных'
        ]);
    }

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Ошибка базы данных: ' . $e->getMessage()
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Ошибка: ' . $e->getMessage()
    ]);
}
?>
