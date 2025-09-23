<?php
// config.php
define('DB_HOST', 'localhost');
define('DB_NAME', 'host1394527_colorlesscat');
define('DB_USER', 'host1394527_host1394527colorless');
define('DB_PASS', '90868b63');

// Проверка существования констант
if (!defined('DB_HOST') || !defined('DB_NAME') || !defined('DB_USER') || !defined('DB_PASS')) {
    die("❌ Ошибка: Файл config.php настроен неправильно. Проверьте наличие всех констант.");
}
?>