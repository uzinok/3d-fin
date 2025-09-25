<?php
// Включаем вывод ошибок для отладки (уберите в продакшене)
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: application/json; charset=utf-8');

// Подключаем конфигурацию БД
require_once '../config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Проверка на ботов (honeypot поле)
    if (!empty($_POST['website'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Spam detected']);
        exit;
    }

    // Ограничение частоты запросов
    session_start();
    if (isset($_SESSION['last_submit']) && (time() - $_SESSION['last_submit']) < 30) {
        http_response_code(429);
        echo json_encode(['success' => false, 'message' => 'Слишком частые запросы']);
        exit;
    }
    $_SESSION['last_submit'] = time();

    $block = $_POST['block'] ?? '';
    $title = $_POST['title'] ?? '';
    $subtitle = $_POST['subtitle'] ?? '';

    // Очистка и валидация данных
    $title = trim(strip_tags($title));
    $title = str_replace(["\r", "\n"], '', $title);
    $subtitle = trim(strip_tags($subtitle));
    $subtitle = str_replace(["\r", "\n"], '', $subtitle);

    // Определяем таблицу базы данных
    $db_name = '';

    if (in_array($block, ['hero', 'advantages', 'social'])) {
        $db_name = 'dark_blocks';
    } else if (in_array($block, ['other', 'useful', 'model'])) {
        $db_name = 'galleries';
    }

    if ($db_name === '') {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Не найдена таблица базы данных для блока: ' . $block]);
        exit;
    }

    // Проверка на опасный код (упрощенная версия)
    $dangerous_patterns = [
        '/<script/i', '/javascript:/i', '/onclick=/i', '/onload=/i',
        '/eval\(/i', '/alert\(/i', '/document\./i', '/window\./i',
        '/function\s*\(/i', '/const\s+/i', '/let\s+/i', '/var\s+/i',
        '/if\s*\(/i', '/for\s*\(/i', '/while\s*\(/i', '/console\./i'
    ];

    foreach ($dangerous_patterns as $pattern) {
        if (preg_match($pattern, $title) || preg_match($pattern, $subtitle)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Обнаружены недопустимые символы или код']);
            exit;
        }
    }

    try {
        // Подключаемся к базе данных
        $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4", DB_USER, DB_PASS);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Определяем тип для WHERE условия
        $type_field = ($db_name === 'dark_blocks') ? 'block_type' : 'gallery_type';

        // Для galleries нужно преобразовать тип
        if ($db_name === 'galleries') {
            $type_mapping = [
                'other' => 'souvenirs',
                'useful' => 'home',
                'model' => 'model'
            ];
            $block_type = $type_mapping[$block] ?? $block;
        } else {
            $block_type = $block;
        }

        // Проверяем существование записи
        $check_stmt = $pdo->prepare("SELECT id FROM $db_name WHERE $type_field = ?");
        $check_stmt->execute([$block_type]);
        $existing = $check_stmt->fetch(PDO::FETCH_ASSOC);

        if ($existing) {
            // Обновляем существующую запись
            $stmt = $pdo->prepare("UPDATE $db_name SET title = ?, subtitle = ?, updated_at = NOW() WHERE $type_field = ?");
            $stmt->execute([$title, $subtitle, $block_type]);
            $action = 'updated';
        } else {
            // Вставляем новую запись
            $stmt = $pdo->prepare("INSERT INTO $db_name ($type_field, title, subtitle) VALUES (?, ?, ?)");
            $stmt->execute([$block_type, $title, $subtitle]);
            $action = 'created';
        }

        // Успешный ответ
        echo json_encode([
            'success' => true,
            'message' => 'Данные успешно сохранены',
            'action' => $action,
            'block' => $block,
            'table' => $db_name
        ]);

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

} else {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Метод не поддерживается']);
}
?>
