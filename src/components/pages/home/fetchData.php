<?php
// function/fetchData.php

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
        header('Content-Type: application/json');
        echo json_encode(['error' => $message]);
        exit;
    }

    public function fetchAllData() {
        $result = [
            'advantages' => $this->fetchAdvantages(),
            'socialList' => $this->fetchSocialList(),
            'gallery' => $this->fetchGalleries()
        ];

        header('Content-Type: application/json');
        echo json_encode(['data' => $result]);
    }

    private function fetchAdvantages() {
        try {
            $stmt = $this->pdo->prepare("
                SELECT db.title, db.subtitle, dbi.title as item_title, dbi.description, dbi.icon, dbi.href, dbi.link_text
                FROM dark_blocks db
                LEFT JOIN dark_block_items dbi ON db.id = dbi.dark_block_id
                WHERE db.block_type = 'advantages'
                ORDER BY dbi.item_order
            ");
            $stmt->execute();
            $items = $stmt->fetchAll(PDO::FETCH_ASSOC);

            if (empty($items)) {
                return null;
            }

            // Форматируем данные в нужный формат
            $advantages = [
                'heading' => $items[0]['title'],
                'list' => []
            ];

            foreach ($items as $item) {
                if ($item['item_title']) {
                    $advantages['list'][] = [
                        'id' => uniqid(), // Генерируем уникальный ID
                        'title' => $item['item_title'],
                        'description' => $item['description'],
                        'icon' => $item['icon'],
                        'href' => $item['href'],
                        'linkText' => $item['link_text']
                    ];
                }
            }

            return $advantages;

        } catch (PDOException $e) {
            return null;
        }
    }

    private function fetchSocialList() {
        try {
            $stmt = $this->pdo->prepare("
                SELECT db.title, db.subtitle, dbi.title as item_title, dbi.description, dbi.icon, dbi.href, dbi.link_text
                FROM dark_blocks db
                LEFT JOIN dark_block_items dbi ON db.id = dbi.dark_block_id
                WHERE db.block_type = 'social'
                ORDER BY dbi.item_order
            ");
            $stmt->execute();
            $items = $stmt->fetchAll(PDO::FETCH_ASSOC);

            if (empty($items)) {
                return null;
            }

            // Форматируем данные в нужный формат
            $socialList = [
                'title' => $items[0]['title'],
                'subtitle' => $items[0]['subtitle'],
                'items' => []
            ];

            foreach ($items as $item) {
                if ($item['item_title']) {
                    $socialList['items'][] = [
                        'id' => uniqid(), // Генерируем уникальный ID
                        'icon' => $item['icon'],
                        'title' => $item['item_title'],
                        'description' => $item['description'],
                        'href' => $item['href'],
                        'linkText' => $item['link_text']
                    ];
                }
            }

            return $socialList;

        } catch (PDOException $e) {
            return null;
        }
    }

    private function fetchGalleries() {
        try {
            // Получаем все галереи
            $stmt = $this->pdo->prepare("
                SELECT g.id, g.gallery_type, g.title, g.subtitle
                FROM galleries g
                ORDER BY g.id
            ");
            $stmt->execute();
            $galleries = $stmt->fetchAll(PDO::FETCH_ASSOC);

            $result = [];

            foreach ($galleries as $gallery) {
                // Получаем элементы для каждой галереи
                $itemsStmt = $this->pdo->prepare("
                    SELECT gi.title, gi.type, gi.src, gi.poster
                    FROM gallery_items gi
                    WHERE gi.gallery_id = ?
                    ORDER BY gi.item_order
                ");
                $itemsStmt->execute([$gallery['id']]);
                $items = $itemsStmt->fetchAll(PDO::FETCH_ASSOC);

                // Форматируем элементы галереи
                $galleryItems = [];
                foreach ($items as $item) {
                    $galleryItems[] = [
                        'id' => uniqid(),
                        'title' => $item['title'],
                        'type' => $item['type'],
                        'src' => $item['src'],
                        'poster' => $item['poster']
                    ];
                }

                // Соответствие типов галерей ключам из React компонента
                $galleryKey = $this->getGalleryKey($gallery['gallery_type']);
                $result[$galleryKey] = [
                    'title' => $gallery['title'],
                    'subtitle' => $gallery['subtitle'],
                    'items' => $galleryItems
                ];
            }

            return $result;

        } catch (PDOException $e) {
            return [];
        }
    }

    private function getGalleryKey($galleryType) {
        // Соответствие типов галерей из БД ключам в React компоненте
        $mapping = [
            'souvenirs' => 'other',
            'home' => 'useful',
            'model' => 'model'
        ];

        return $mapping[$galleryType] ?? $galleryType;
    }
}

// Создаем экземпляр и получаем данные
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $fetchData = new FetchData();
    $fetchData->fetchAllData();
} else {
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Метод не поддерживается']);
}
?>
