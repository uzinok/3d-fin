<?php
// api/fetchData.php

// Включаем вывод ошибок для отладки
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Устанавливаем заголовки
header('Content-Type: application/json; charset=UTF-8');
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
            // Добавляем опции для PDO
            $options = [
                PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8mb4',
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_EMULATE_PREPARES => false,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
            ];

            $this->pdo = new PDO(
                "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
                DB_USER,
                DB_PASS,
                $options
            );

            // Дополнительные настройки кодировки
            $this->pdo->exec("SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci");
            $this->pdo->exec("SET CHARACTER SET utf8mb4");

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
            $combinedBlocks = $this->fetchCombinedBlocks();

            $result = array(
                'hero' => $this->fetchHero(),
                'advantages' => $combinedBlocks['advantages'] ?? null,
                'social' => $combinedBlocks['social'] ?? null,
                'gallery' => $this->fetchGalleries()
            );

            echo json_encode(array('data' => $result), JSON_UNESCAPED_UNICODE);

        } catch (Exception $e) {
            $this->sendError("Ошибка при получении данных: " . $e->getMessage());
        }
    }

    private function fetchHero() {
        $stmt = $this->pdo->prepare("
            SELECT title, subtitle
            FROM dark_blocks
            WHERE block_type = 'hero'
            LIMIT 1
        ");
        $stmt->execute();
        $hero = $stmt->fetch(PDO::FETCH_ASSOC);

        return $hero ? array(
            'title' => $hero['title'],
            'subtitle' => $hero['subtitle']
        ) : null;
    }

    private function fetchCombinedBlocks() {
        // Сначала получаем заголовки блоков из таблицы dark_blocks
        $blocksStmt = $this->pdo->prepare("
            SELECT block_type, title, subtitle
            FROM dark_blocks
            WHERE block_type IN ('advantages', 'social')
        ");
        $blocksStmt->execute();
        $blocks = $blocksStmt->fetchAll(PDO::FETCH_ASSOC);

        // Создаем массив с заголовками блоков
        $blockTitles = [];
        foreach ($blocks as $block) {
            $blockTitles[$block['block_type']] = [
                'title' => $block['title'],
                'subtitle' => $block['subtitle']
            ];
        }

        // Теперь получаем элементы блоков
        $stmt = $this->pdo->prepare("
            SELECT
                db.block_type,
                dbi.id,
                dbi.icon,
                dbi.title,
                dbi.description,
                dbi.href,
                dbi.link_text,
                dbi.item_order
            FROM dark_blocks db
            JOIN dark_block_items dbi ON db.id = dbi.dark_block_id
            WHERE db.block_type IN ('advantages', 'social')
            ORDER BY db.block_type, dbi.item_order
        ");
        $stmt->execute();
        $items = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $result = array();

        foreach ($items as $item) {
            $blockType = $item['block_type'];

            if (!isset($result[$blockType])) {
                // Используем заголовки из базы данных или значения по умолчанию, если их нет
                $blockInfo = $blockTitles[$blockType] ?? [
                    'title' => $blockType === 'advantages' ? 'Преимущества' : 'Социальные сети',
                    'subtitle' => $blockType === 'social' ? 'Подпишитесь на нас в соцсетях' : ''
                ];

                $result[$blockType] = array(
                    'title' => $blockInfo['title'],
                    'subtitle' => $blockInfo['subtitle'],
                    'list' => array()
                );
            }

            $result[$blockType]['list'][] = array(
                'id' => (int)$item['id'],
                'icon' => !empty($item['icon']) ? base64_decode($item['icon']) : "",
                'title' => $item['title'],
                'description' => $item['description'],
                'href' => $item['href'],
                'linkText' => $item['link_text']
            );
        }

        return $result;
    }

    private function fetchGalleries() {
        try {
            $stmt = $this->pdo->prepare("
                SELECT g.id, g.gallery_type, g.title, g.subtitle
                FROM galleries g
                ORDER BY g.id
            ");
            $stmt->execute();
            $galleries = $stmt->fetchAll(PDO::FETCH_ASSOC);

            $result = array();

            foreach ($galleries as $gallery) {
                // Получаем элементы для каждой галереи
                $itemsStmt = $this->pdo->prepare("
                    SELECT gi.id, gi.title, gi.type, gi.src, gi.poster
                    FROM gallery_items gi
                    WHERE gi.gallery_id = ?
                    ORDER BY gi.item_order
                ");
                $itemsStmt->execute([$gallery['id']]);
                $items = $itemsStmt->fetchAll(PDO::FETCH_ASSOC);

                // Форматируем элементы
                $galleryItems = array();
                foreach ($items as $item) {
                    $galleryItems[] = array(
                        'id' => $item['id'],
                        'title' => $item['title'],
                        'type' => $item['type'],
                        'src' => $item['src'],
                        'poster' => $item['poster']
                    );
                }

                $galleryKey = $this->getGalleryKey($gallery['gallery_type']);
                $result[$galleryKey] = array(
                    'title' => $gallery['title'],
                    'subtitle' => $gallery['subtitle'],
                    'items' => $galleryItems
                );
            }

            return $result;

        } catch (Exception $e) {
            return array();
        }
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
