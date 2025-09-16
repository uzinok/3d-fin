<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Получаем данные из POST-запроса
    $typeContact = filter_var($_POST['typeContact'], FILTER_SANITIZE_STRING);
    $name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
    $contact = filter_var($_POST['contact'], FILTER_SANITIZE_STRING);
    $comments = filter_var($_POST['comments'], FILTER_SANITIZE_STRING);

    // Проверяем, что все обязательные поля заполнены
    if (empty($typeContact) || empty($name) || empty($contact) || empty($comments)) {
        http_response_code(400);
        echo "Все поля обязательны для заполнения";
        exit;
    }

    // Настройки email
    // $to = "titorenkoe@ya.ru"; // Замените на ваш email
    $to = "uzinok@yandex.ru"; // Замените на ваш email
    $subject = "сообщение с сайта colorlesscat.uzinok.ru";

    // Формируем контактную ссылку в зависимости от типа
    $contactLink = '';
    if ($typeContact === 'phone') {
        // Для телефона создаем ссылку tel: (не изменяем номер)
        $contactLink = "<a href=\"tel:$contact\">$contact</a>";
    } elseif ($typeContact === 'telegram') {
        // Для Telegram создаем ссылку https://t.me/
        $telegramUsername = ltrim($contact, '@'); // Убираем @ если есть
        $contactLink = "<a href=\"https://t.me/$telegramUsername\" target=\"_blank\">@$telegramUsername</a>";
    } else {
        // Для других типов просто текст
        $contactLink = $contact;
    }

    // Формируем тело письма
    $message = "
<html>
<head>
    <title>colorlesscat.uzinok.ru</title>
</head>
<body>
    <h2>Сообщение с сайта colorlesscat.uzinok.ru</h2>
    <p><strong>Дата:</strong> " . date('d.m.Y H:i:s') . "</p>
    <p><strong>Имя:</strong> $name</p>
    <p><strong>Тип контакта:</strong> $typeContact</p>
    <p><strong>Контакты:</strong> $contactLink</p>
    <p><strong>Комментарии:</strong><br>$comments</p>
</body>
</html>
    ";

    // Дополнительные заголовки с правильной кодировкой темы
    // $headers = "From: titorenkoe@ya.ru\r\n"; // Замените на ваш email
    $headers = "From: uzinok@yandex.ru\r\n"; // Замените на ваш email
    $headers .= "Reply-To: $contact\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $headers .= "Subject: =?UTF-8?B?" . base64_encode($subject) . "?=\r\n";

    // Пытаемся отправить email
    if (mail($to, $subject, $message, $headers)) {
        http_response_code(200);
        echo "Сообщение успешно отправлено!";
    } else {
        http_response_code(500);
        echo "Ошибка при отправке сообщения: " . error_get_last()['message'];
    }
} else {
    http_response_code(405);
    echo "Метод не разрешен";
}
?>
