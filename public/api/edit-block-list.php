<?php
// edit-block-list.php

error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: application/json; charset=utf-8');

// Подключаем конфигурацию БД
require_once '../config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Проверка на ботов
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

    // Получаем данные
    $block = $_POST['block'] ?? '';
    $id = $_POST['id'] ?? '';
    $icon = $_POST['icon'] ?? '';
		if (!empty($icon)) {
        $icon = base64_encode($icon);
		}
    $title = $_POST['title'] ?? '';
    $description = $_POST['description'] ?? '';
    $href = $_POST['href'] ?? '';
    $linkText = $_POST['linkText'] ?? '';

    // Для остальных полей обычная очистка
    $title = trim(strip_tags($title));
    $description = trim(strip_tags($description));
    $href = trim(strip_tags($href));
    $linkText = trim(strip_tags($linkText));

    // Удаляем управляющие символы, но сохраняем эмодзи
    $title = preg_replace('/[\x00-\x1F\x7F]/u', '', $title);
    $description = preg_replace('/[\x00-\x1F\x7F]/u', '', $description);
    $href = preg_replace('/[\x00-\x1F\x7F]/u', '', $href);
    $linkText = preg_replace('/[\x00-\x1F\x7F]/u', '', $linkText);

    // Для иконки - только самые опасные символы
    $icon = preg_replace('/[\x00-\x09\x0B\x0C\x0E-\x1F\x7F]/u', '', $icon);

    if (!in_array($block, ['advantages', 'social'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Не верно указано название блока']);
        exit;
    }

    if (empty($id) || !is_numeric($id)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Неверный ID элемента']);
        exit;
    }

    $id = (int)$id;

    // Упрощенная проверка безопасности для иконки (разрешаем эмодзи)
    $dangerous_patterns = [
        '/<script/i', '/javascript:/i', '/onclick=/i', '/onload=/i',
        '/eval\(/i', '/alert\(/i', '/document\./i', '/window\./i'
    ];

    foreach ($dangerous_patterns as $pattern) {
        if (preg_match($pattern, $icon)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Иконка содержит недопустимые символы']);
            exit;
        }
    }

    try {
        // Подключение с явным указанием кодировки
        $options = [
            PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8mb4',
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_EMULATE_PREPARES => false,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ];

        $pdo = new PDO(
            "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
            DB_USER,
            DB_PASS,
            $options
        );

        // Дополнительная установка кодировки
        $pdo->exec("SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci");
        $pdo->exec("SET CHARACTER SET utf8mb4");

        // Проверяем существование элемента
        $check_stmt = $pdo->prepare("SELECT id FROM dark_block_items WHERE id = ?");
        $check_stmt->execute([$id]);
        $existing_item = $check_stmt->fetch();

        if (!$existing_item) {
            http_response_code(404);
            echo json_encode(['success' => false, 'message' => 'Элемент с указанным ID не найден']);
            exit;
        }

        // Обновляем данные элемента
        $stmt = $pdo->prepare("
            UPDATE dark_block_items
            SET icon = ?, title = ?, description = ?, href = ?, link_text = ?
            WHERE id = ?
        ");

        $stmt->execute([$icon, $title, $description, $href, $linkText, $id]);

        // Проверяем, что записалось в базу
        $verify_stmt = $pdo->prepare("SELECT icon FROM dark_block_items WHERE id = ?");
        $verify_stmt->execute([$id]);
        $saved_icon = $verify_stmt->fetchColumn();

        echo json_encode([
            'success' => true,
            'message' => 'Элемент успешно обновлен',
            'id' => $id,
            'block' => $block,
            'icon' => $icon,
            'debug' => [
                'input_length' => strlen($icon),
                'saved_length' => strlen($saved_icon),
                'matches' => $icon === $saved_icon
            ]
        ]);

    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Ошибка базы данных: ' . $e->getMessage()
        ]);
    }

} else {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Метод не поддерживается']);
}
?>
