<?php
// auth.php - скрипт для проверки авторизации

// Устанавливаем заголовки для JSON ответа
header('Content-Type: application/json; charset=utf-8');

// Включаем вывод ошибок для отладки (убрать в продакшене)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Подключаем конфигурацию БД
require_once '../config.php';

function authenticate($login, $password) {
    try {
        $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4", DB_USER, DB_PASS);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);

        $stmt = $pdo->prepare("SELECT id, login FROM admin_users WHERE login = ? AND password = ?");
        $stmt->execute([$login, $password]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        return $user ? $user : false;

    } catch (PDOException $e) {
        // Логируем ошибку, но не показываем пользователю
        error_log("Auth error: " . $e->getMessage());
        return false;
    }
}

// Проверяем метод запроса
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Метод не поддерживается']);
    exit;
}

// Получаем данные из POST запроса
$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';

// Проверяем, что данные не пустые
if (empty($username) || empty($password)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Логин и пароль обязательны']);
    exit;
}

// Проверяем учетные данные
$user = authenticate($username, $password);

if ($user) {
    // Стартуем сессию
    session_start();
    $_SESSION['admin'] = $user;
    $_SESSION['admin_logged_in'] = true;
    $_SESSION['login_time'] = time();

    echo json_encode([
        'success' => true,
        'message' => 'Авторизация успешна',
        'user' => ['id' => $user['id'], 'login' => $user['login']]
    ]);
} else {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Неверные учетные данные']);
}
?>
