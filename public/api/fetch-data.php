<?php
// api/fetchData.php

// Включаем вывод ошибок для отладки
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Устанавливаем заголовки
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Обработка preflight OPTIONS запроса
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Подключаем конфигурацию БД
require_once '../config.php';

class FetchData {
    private $pdo;

    public function __construct() {
        try {
            $this->pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4", DB_USER, DB_PASS);
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
        } catch (PDOException $e) {
            $this->sendError("Ошибка подключения к базе данных: " . $e->getMessage());
        }
    }

    private function sendError($message) {
        http_response_code(500);
        echo json_encode(array('error' => $message));
        exit;
    }

    public function fetchAllData() {
        try {
            $result = array(
                'advantages' => $this->fetchAdvantages(),
                'socialList' => $this->fetchSocialList(),
                'gallery' => $this->fetchGalleries()
            );

            echo json_encode(array('data' => $result), JSON_UNESCAPED_UNICODE);

        } catch (Exception $e) {
            $this->sendError("Ошибка при получении данных: " . $e->getMessage());
        }
    }

    private function fetchAdvantages() {
        $stmt = $this->pdo->prepare("
            SELECT dbi.title, dbi.description
            FROM dark_blocks db
            JOIN dark_block_items dbi ON db.id = dbi.dark_block_id
            WHERE db.block_type = 'advantages'
            ORDER BY dbi.item_order
        ");
        $stmt->execute();
        $items = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $advantages = array(
            'heading' => 'Преимущества',
            'list' => array()
        );

        foreach ($items as $index => $item) {
            $advantages['list'][] = array(
                'id' => $index + 1,
                'title' => $item['title'],
                'description' => $item['description'],
                'icon' => "",
                'href' => null,
                'linkText' => null
            );
        }

        return $advantages;
    }

    private function fetchSocialList() {
        $stmt = $this->pdo->prepare("
            SELECT db.title, db.subtitle, dbi.title as item_title, dbi.description, dbi.href, dbi.link_text
            FROM dark_blocks db
            JOIN dark_block_items dbi ON db.id = dbi.dark_block_id
            WHERE db.block_type = 'social'
            ORDER BY dbi.item_order
        ");
        $stmt->execute();
        $items = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if (empty($items)) {
            return null;
        }

        $socialList = array(
            'title' => $items[0]['title'],
            'subtitle' => $items[0]['subtitle'],
            'items' => array()
        );

        foreach ($items as $index => $item) {
            $socialList['items'][] = array(
                'id' => $index + 1,
                'icon' => "",
                'title' => $item['item_title'],
                'description' => $item['description'],
                'href' => $item['href'] ?: "#",
                'linkText' => $item['link_text'] ?: "Перейти"
            );
        }

        return $socialList;
    }

    private function fetchGalleries() {
        $stmt = $this->pdo->prepare("
            SELECT g.gallery_type, g.title, g.subtitle
            FROM galleries g
            ORDER BY g.id
        ");
        $stmt->execute();
        $galleries = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $result = array();

        foreach ($galleries as $gallery) {
            $galleryKey = $this->getGalleryKey($gallery['gallery_type']);
            $result[$galleryKey] = array(
                'title' => $gallery['title'],
                'subtitle' => $gallery['subtitle'],
                'items' => array() // Пока пустой массив, можно добавить реальные файлы позже
            );
        }

        return $result;
    }

    private function getGalleryKey($galleryType) {
        $mapping = array(
            'souvenirs' => 'other',
            'home' => 'useful',
            'model' => 'model'
        );

        return $mapping[$galleryType] ?? $galleryType;
    }
}

// Обработка запроса
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $fetchData = new FetchData();
    $fetchData->fetchAllData();
} else {
    http_response_code(405);
    echo json_encode(array('error' => 'Метод не поддерживается'));
}
?>
