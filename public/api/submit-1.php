<?php
// Устанавливаем заголовок для JSON ответа
header('Content-Type: application/json; charset=utf-8');

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

    // Получаем данные из POST-запроса
    $typeContact = $_POST['typeContact'] ?? '';
    $name = $_POST['name'] ?? '';
    $contact = $_POST['contact'] ?? '';
    $comments = $_POST['comments'] ?? '';

    // Базовая очистка
    $typeContact = trim(strip_tags($typeContact));
    $name = trim(strip_tags($name));
    $name = str_replace(["\r", "\n"], '', $name);
    $contact = trim($contact); // Сохраняем оригинал для ссылок
    $contact = str_replace(["\r", "\n"], '', $contact);
    $comments = trim(strip_tags($comments));

    // Проверяем, что все обязательные поля заполнены
    if (empty($typeContact) || empty($name) || empty($contact) || empty($comments)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Все поля обязательны для заполнения'
        ]);
        exit;
    }

    if (!in_array($typeContact, ['phone', 'telegram'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Неизвестный тип контакта']);
        exit;
    }

    if (mb_strlen($contact) > 100) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Слишком длинный контакт']);
        exit;
    }

    if (mb_strlen($name) > 100) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Имя слишком длинное']);
        exit;
    }

    if (!preg_match('/^(?!.*<[^>]+>)(?!.*(function\s*\(|const\s+|let\s+|var\s+|if\s*\(|for\s*\(|while\s*\(|console\.)).*$/', $name)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Некорректное имя']);
        exit;
    }

    if (mb_strlen($comments) > 1000) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Комментарий слишком длинный']);
        exit;
    }

    if (!preg_match('/^(?!.*<[^>]+>)(?!.*(function\s*\(|const\s+|let\s+|var\s+|if\s*\(|for\s*\(|while\s*\(|console\.)).*$/', $comments)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Поле комментарии содержит недопустимые символы']);
        exit;
    }

    // Валидация контакта
    $contactError = false;
    $errorMessage = '';

    if ($typeContact === 'phone') {
        // Очистка номера от пробелов и скобок для проверки
        $cleanPhone = preg_replace('/[^\d+]/', '', $contact);
        if (!preg_match('/^(\+7|8)\d{10}$/', $cleanPhone)) {
            $contactError = true;
            $errorMessage = 'Неверный формат телефона. Пример: +79123456789 или 89123456789';
        }
    } elseif ($typeContact === 'telegram') {
        if (!preg_match('/^@?[a-zA-Z0-9_]{5,32}$/', $contact)) {
            $contactError = true;
            $errorMessage = 'Неверный формат Telegram. Пример: @username или username';
        }
    } else {
        // На случай, если появятся другие типы контактов
        $contactError = true;
        $errorMessage = 'Неизвестный тип контакта';
    }

    if ($contactError) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => $errorMessage
        ]);
        exit;
    }

    // Настройки email
    // $to = "titorenkoe@ya.ru"; // Замените на ваш email
    $to = "uzinok@yandex.ru"; // Замените на ваш email
    $subject = "сообщение с сайта colorlesscat.uzinok.ru";

    // Формируем контактную ссылку в зависимости от типа
    $contactLink = '';
    if ($typeContact === 'phone') {
        $clean_phone = preg_replace('/[^\d+]/', '', $contact);
        $contactLink = "<a href=\"tel:$clean_phone\">$clean_phone</a>";
    } elseif ($typeContact === 'telegram') {
        $clean_tg = preg_replace('/[^a-zA-Z0-9_]/', '', ltrim($contact, '@'));
        $contactLink = "<a href=\"https://t.me/$clean_tg\" target=\"_blank\">@$clean_tg</a>";
    } else {
        $contactLink = htmlspecialchars($contact, ENT_QUOTES, 'UTF-8');
    }

    // Формируем тело письма
    $name_safe = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
    $comments_safe = nl2br(htmlspecialchars($comments, ENT_QUOTES, 'UTF-8'));
    $message = "
<html>
<head>
    <title>colorlesscat.uzinok.ru</title>
</head>
<body>
    <h2>Сообщение с сайта colorlesscat.uzinok.ru</h2>
    <p><strong>Дата:</strong> " . date('d.m.Y H:i:s') . "</p>
    <p><strong>Имя:</strong> $name_safe</p>
    <p><strong>$typeContact:</strong> $contactLink</p>
    <p><strong>Комментарии:</strong><br>$comments_safe</p>
</body>
</html>
    ";

    $domain = 'test.uzinok.ru';

    // Функция для очистки заголовков от CRLF injection
    function safeHeader($value) {
        return str_replace(["\r", "\n", "%0a", "%0d"], '', $value);
    }

    // Дополнительные заголовки с правильной кодировкой темы
    // $headers = "From: titorenkoe@ya.ru\r\n"; // Замените на ваш email
    $headers = "From: uzinok@yandex.ru\r\n"; // Замените на ваш email
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
    $headers .= "X-Priority: 3\r\n";
    $headers .= "Subject: =?UTF-8?B?" . base64_encode($subject) . "?=\r\n";

    // Пытаемся отправить email
    if (mail($to, $subject, $message, $headers)) {
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'message' => 'Сообщение успешно отправлено!'
        ]);
    } else {
        http_response_code(500);
        $error = error_get_last();
        echo json_encode([
            'success' => false,
            'message' => 'Ошибка при отправке сообщения',
            'error' => $error ? $error['message'] : 'Неизвестная ошибка'
        ]);
    }
} else {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Метод не разрешен'
    ]);
}
?>
