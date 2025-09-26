<?php
// upload-gallery.php

header('Content-Type: application/json; charset=utf-8');

// Проверяем метод запроса
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Метод не поддерживается']);
    exit;
}

// Включаем вывод ошибок для отладки (убрать в продакшене)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Проверка на ботов (honeypot поле)
if (!empty($_POST['website'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Spam detected']);
    exit;
}

// Ограничение частоты запросов
session_start();
if (isset($_SESSION['last_upload']) && (time() - $_SESSION['last_upload']) < 30) {
    http_response_code(429);
    echo json_encode(['success' => false, 'message' => 'Слишком частые запросы']);
    exit;
}
$_SESSION['last_upload'] = time();

// Проверяем наличие файла
if (!isset($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
    $errorMessages = [
        UPLOAD_ERR_INI_SIZE => 'Размер файла превышает разрешенный',
        UPLOAD_ERR_FORM_SIZE => 'Размер файла превышает указанный в форме',
        UPLOAD_ERR_PARTIAL => 'Файл был загружен только частично',
        UPLOAD_ERR_NO_FILE => 'Файл не был загружен',
        UPLOAD_ERR_NO_TMP_DIR => 'Отсутствует временная папка',
        UPLOAD_ERR_CANT_WRITE => 'Не удалось записать файл на диск',
        UPLOAD_ERR_EXTENSION => 'Расширение PHP остановило загрузку файла'
    ];

    $errorMessage = $errorMessages[$_FILES['file']['error']] ?? 'Неизвестная ошибка загрузки';
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => $errorMessage]);
    exit;
}

// Получаем данные из формы
$block = $_POST['block'] ?? '';
$mediaType = $_POST['type'] ?? '';
$title = $_POST['title'] ?? '';

// Валидация блока
$allowedBlocks = ['other', 'useful', 'model'];
if (!in_array($block, $allowedBlocks)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Неверный блок для загрузки']);
    exit;
}

// Валидация типа медиа
if (!in_array($mediaType, ['image', 'video'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Неверный тип медиа']);
    exit;
}

// Проверка размера файла (10MB)
$maxFileSize = 10 * 1024 * 1024;
if ($_FILES['file']['size'] > $maxFileSize) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Размер файла превышает 10MB']);
    exit;
}

// Проверка MIME типа
$allowedMimeTypes = [
    'image/jpeg' => 'jpg',
    'image/png' => 'png',
    'video/mp4' => 'mp4'
];

$fileInfo = finfo_open(FILEINFO_MIME_TYPE);
$mimeType = finfo_file($fileInfo, $_FILES['file']['tmp_name']);
finfo_close($fileInfo);

if (!array_key_exists($mimeType, $allowedMimeTypes)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Недопустимый тип файла']);
    exit;
}

// Проверка безопасности файла
$dangerousExtensions = ['php', 'phtml', 'html', 'htm', 'js', 'exe'];
$originalExtension = strtolower(pathinfo($_FILES['file']['name'], PATHINFO_EXTENSION));
if (in_array($originalExtension, $dangerousExtensions)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Недопустимое расширение файла']);
    exit;
}

try {
    // Создаем папку для блока, если не существует
    $uploadDir = $_SERVER['DOCUMENT_ROOT'] . '/gallery/' . $block;
    if (!is_dir($uploadDir)) {
        if (!mkdir($uploadDir, 0755, true)) {
            throw new Exception('Не удалось создать папку для загрузки');
        }
    }

    // Генерируем уникальное имя файла
    $timestamp = time();
    $randomString = bin2hex(random_bytes(4)); // 8 символов
    $extension = $allowedMimeTypes[$mimeType];
    $filename = $timestamp . '_' . $randomString . '.' . $extension;
    $filepath = $uploadDir . '/' . $filename;

    // Обработка файла в зависимости от типа
    if ($mediaType === 'image') {
        processImage($_FILES['file']['tmp_name'], $filepath, $mimeType);
    } else {
        // Для видео просто перемещаем файл
        if (!move_uploaded_file($_FILES['file']['tmp_name'], $filepath)) {
            throw new Exception('Не удалось сохранить видео файл');
        }
    }

    // Сохраняем информацию о файле в базу данных
    saveToDatabase($block, $title, $mediaType, $filename, $filepath);

    // Формируем URL для доступа к файлу
    $fileUrl = '/gallery/' . $block . '/' . $filename;

    // Успешный ответ
    echo json_encode([
        'success' => true,
        'message' => 'Файл успешно загружен',
        'data' => [
            'filename' => $filename,
            'url' => $fileUrl,
            'type' => $mediaType,
            'block' => $block,
            'title' => $title
        ]
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Ошибка при обработке файла: ' . $e->getMessage()
    ]);
}

/**
 * Обработка изображения с помощью ImageMagick
 */
function processImage($sourcePath, $destinationPath, $mimeType) {
    if (!extension_loaded('imagick')) {
        throw new Exception('ImageMagick не установлен');
    }

    $image = new Imagick($sourcePath);

    // Получаем текущие размеры
    $originalWidth = $image->getImageWidth();
    $originalHeight = $image->getImageHeight();

    // Вычисляем новые размеры с сохранением пропорций
    $maxSize = 500;
    $ratio = $originalWidth / $originalHeight;

    if ($originalWidth > $originalHeight) {
        $newWidth = $maxSize;
        $newHeight = round($maxSize / $ratio);
    } else {
        $newHeight = $maxSize;
        $newWidth = round($maxSize * $ratio);
    }

    // Изменяем размер
    $image->resizeImage($newWidth, $newHeight, Imagick::FILTER_LANCZOS, 1);

    // Устанавливаем качество
    if ($mimeType === 'image/jpeg') {
        $image->setImageCompressionQuality(85);
        $image->setImageFormat('jpeg');
    } elseif ($mimeType === 'image/png') {
        $image->setImageFormat('png');
        // Для PNG можно установить сжатие
        $image->setImageCompressionQuality(95);
    }

    // Сохраняем изображение
    if (!$image->writeImage($destinationPath)) {
        throw new Exception('Не удалось сохранить обработанное изображение');
    }

    $image->clear();
}

/**
 * Сохранение информации о файле в базу данных
 */
function saveToDatabase($block, $title, $type, $filename, $filepath) {
    // Подключаем конфигурацию БД
    require_once '../config.php';

    try {
        $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4", DB_USER, DB_PASS);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Получаем ID галереи по типу
        $galleryTypeMap = [
            'other' => 'souvenirs',
            'useful' => 'home',
            'model' => 'model'
        ];

        $galleryType = $galleryTypeMap[$block] ?? $block;

        $stmt = $pdo->prepare("SELECT id FROM galleries WHERE gallery_type = ?");
        $stmt->execute([$galleryType]);
        $gallery = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$gallery) {
            throw new Exception('Галерея не найдена в базе данных');
        }

        $galleryId = $gallery['id'];

        // Определяем порядок (item_order)
        $orderStmt = $pdo->prepare("SELECT MAX(item_order) as max_order FROM gallery_items WHERE gallery_id = ?");
        $orderStmt->execute([$galleryId]);
        $orderData = $orderStmt->fetch(PDO::FETCH_ASSOC);
        $itemOrder = ($orderData['max_order'] !== null) ? $orderData['max_order'] + 1 : 0;

        // Формируем полный URL для src
        $src = '/gallery/' . $block . '/' . $filename;

        // Вставляем запись в базу
        $insertStmt = $pdo->prepare("
            INSERT INTO gallery_items (gallery_id, item_order, title, type, src, poster)
            VALUES (?, ?, ?, ?, ?, '')
        ");

        $insertStmt->execute([
            $galleryId,
            $itemOrder,
            $title,
            $type,
            $src
        ]);

    } catch (PDOException $e) {
        throw new Exception('Ошибка базы данных: ' . $e->getMessage());
    }
}
?>
