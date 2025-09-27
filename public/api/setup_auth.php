<?php
// setup_auth.php

require_once '../config.php';

class SetupAuth {
    private $pdo;

    public function __construct() {
        try {
            $this->pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4", DB_USER, DB_PASS);
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            die("Connection failed: " . $e->getMessage());
        }
    }

    public function createAuthTable() {
        $sql = "
            CREATE TABLE IF NOT EXISTS admin_users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                login VARCHAR(50) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        ";

        try {
            $this->pdo->exec($sql);
            return "✅ Таблица admin_users создана успешно";
        } catch (PDOException $e) {
            return "❌ Ошибка создания таблицы: " . $e->getMessage();
        }
    }

    public function insertAdminUser() {
        $login = 'irknezrauko';
        $password = '!17Evg11Tit86!';

        try {
            // Проверяем, существует ли уже пользователь
            $checkStmt = $this->pdo->prepare("SELECT id FROM admin_users WHERE login = ?");
            $checkStmt->execute([$login]);
            $existingUser = $checkStmt->fetch(PDO::FETCH_ASSOC);

            if ($existingUser) {
                // Обновляем существующего пользователя
                $stmt = $this->pdo->prepare("UPDATE admin_users SET password = ? WHERE login = ?");
                $stmt->execute([$password, $login]);
                return "✅ Учетные данные администратора обновлены";
            } else {
                // Добавляем нового пользователя
                $stmt = $this->pdo->prepare("INSERT INTO admin_users (login, password) VALUES (?, ?)");
                $stmt->execute([$login, $password]);
                return "✅ Учетные данные администратора добавлены";
            }
        } catch (PDOException $e) {
            return "❌ Ошибка при работе с пользователями: " . $e->getMessage();
        }
    }

    public function showAdminUsers() {
        try {
            $stmt = $this->pdo->prepare("SELECT id, login, password, created_at FROM admin_users");
            $stmt->execute();
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

            if (empty($users)) {
                return "<p>В таблице admin_users нет данных</p>";
            }

            $result = "<h3>📋 Текущие пользователи:</h3>";
            $result .= "<table border='1' cellpadding='8' style='border-collapse: collapse;'>";
            $result .= "<tr style='background: #f0f0f0;'><th>ID</th><th>Login</th><th>Password</th><th>Created</th></tr>";

            foreach ($users as $user) {
                $result .= "<tr>";
                $result .= "<td>{$user['id']}</td>";
                $result .= "<td>{$user['login']}</td>";
                $result .= "<td>{$user['password']}</td>";
                $result .= "<td>{$user['created_at']}</td>";
                $result .= "</tr>";
            }
            $result .= "</table>";

            return $result;
        } catch (PDOException $e) {
            return "<p>❌ Таблица admin_users еще не создана</p>";
        }
    }

    public function tableExists() {
        try {
            $stmt = $this->pdo->prepare("SELECT 1 FROM admin_users LIMIT 1");
            $stmt->execute();
            return true;
        } catch (PDOException $e) {
            return false;
        }
    }
}

// Использование
echo "<!DOCTYPE html>
<html>
<head>
    <title>Настройка авторизации</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
        .success { color: green; font-weight: bold; }
        .error { color: red; font-weight: bold; }
        .info { color: blue; }
        a { background: #007cba; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 5px; display: inline-block; }
        a:hover { background: #005a87; }
        .container { max-width: 1000px; margin: 0 auto; }
        table { margin: 20px 0; }
        th { text-align: left; }
    </style>
</head>
<body>
    <div class='container'>
        <h1>🔐 Настройка авторизации</h1>

        <div class='info'>
            <strong>Учетные данные для добавления:</strong><br>
            <strong>Login:</strong> irknezrauko<br>
            <strong>Password:</strong> !17Evg11Tit86!
        </div>";

$setup = new SetupAuth();

// Проверяем, существует ли таблица, прежде чем показывать данные
if ($setup->tableExists()) {
    echo $setup->showAdminUsers();
} else {
    echo "<p>❌ Таблица admin_users еще не создана. Нажмите кнопку ниже для настройки.</p>";
}

echo "<hr>";

// Создаем таблицу и добавляем пользователя
if (isset($_GET['action']) && $_GET['action'] === 'setup') {
    $result1 = $setup->createAuthTable();
    echo "<div class='success'>$result1</div><br>";

    if (strpos($result1, '✅') !== false) {
        // Если таблица создана успешно, добавляем пользователя
        $result2 = $setup->insertAdminUser();
        echo "<div class='success'>$result2</div>";
    }

    echo "<hr>";
    echo "<h3>📊 Состояние после настройки:</h3>";
    echo $setup->showAdminUsers();
} else {
    echo "<a href='?action=setup'>✅ Настроить авторизацию</a>";
}

echo "</div></body></html>";
?>
