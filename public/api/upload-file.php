<?php
// upload-gallery.php

header('Content-Type: application/json; charset=utf-8');

// Проверяем метод запроса
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Метод не поддерживается']);
    exit;
}

// Включаем вывод ошибок для отладки
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

// Проверяем поддержку WebP
$webpSupported = false;
if (extension_loaded('imagick')) {
    $webpSupported = in_array('WEBP', Imagick::queryFormats());
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

// Проверка наличия основного файла
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

// Проверка постера для видео
if ($mediaType === 'video') {
    if (!isset($_FILES['poster']) || $_FILES['poster']['error'] !== UPLOAD_ERR_OK) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Для видео необходимо загрузить постер']);
        exit;
    }
} else {
    if (isset($_FILES['poster']) && $_FILES['poster']['error'] === UPLOAD_ERR_OK) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Постер требуется только для видео']);
        exit;
    }
}

// Проверка размера файлов (10MB)
$maxFileSize = 10 * 1024 * 1024;
if ($_FILES['file']['size'] > $maxFileSize) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Размер файла превышает 10MB']);
    exit;
}

if ($mediaType === 'video' && $_FILES['poster']['size'] > $maxFileSize) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Размер постера превышает 10MB']);
    exit;
}

// Проверка MIME типов
$allowedMimeTypes = [
    'image/jpeg' => $webpSupported ? 'webp' : 'jpg',
    'image/png' => $webpSupported ? 'webp' : 'png',
    'video/mp4' => 'mp4'
];

$fileInfo = finfo_open(FILEINFO_MIME_TYPE);

// Проверка основного файла
$mimeType = finfo_file($fileInfo, $_FILES['file']['tmp_name']);
if (!array_key_exists($mimeType, $allowedMimeTypes)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Недопустимый тип основного файла']);
    exit;
}

// Проверка постера для видео
if ($mediaType === 'video') {
    $posterMimeType = finfo_file($fileInfo, $_FILES['poster']['tmp_name']);
    if (!in_array($posterMimeType, ['image/jpeg', 'image/png'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Постер должен быть изображением (JPEG или PNG)']);
        exit;
    }
}

finfo_close($fileInfo);

// Проверка безопасности файлов
$dangerousExtensions = ['php', 'phtml', 'html', 'htm', 'js', 'exe'];

$originalExtension = strtolower(pathinfo($_FILES['file']['name'], PATHINFO_EXTENSION));
if (in_array($originalExtension, $dangerousExtensions)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Недопустимое расширение основного файла']);
    exit;
}

if ($mediaType === 'video') {
    $posterExtension = strtolower(pathinfo($_FILES['poster']['name'], PATHINFO_EXTENSION));
    if (in_array($posterExtension, $dangerousExtensions)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Недопустимое расширение постера']);
        exit;
    }
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
    $randomString = bin2hex(random_bytes(4));
    $baseFilename = $timestamp . '_' . $randomString;

    // Определяем расширения
    $fileExtension = $allowedMimeTypes[$mimeType];
    $filename = $baseFilename . '.' . $fileExtension;
    $filepath = $uploadDir . '/' . $filename;

    // Обработка файлов
    if ($mediaType === 'image') {
        processImage($_FILES['file']['tmp_name'], $filepath, $webpSupported);
        $posterPath = '';
    } else {
        // Для видео обрабатываем постер и сохраняем видео
        $posterExtension = $webpSupported ? 'webp' : 'jpg';
        $posterFilename = $baseFilename . '.' . $posterExtension;
        $posterPath = $uploadDir . '/' . $posterFilename;

        // Обрабатываем постер
        processImage($_FILES['poster']['tmp_name'], $posterPath, $webpSupported);

        // Сохраняем видео
        if (!move_uploaded_file($_FILES['file']['tmp_name'], $filepath)) {
            throw new Exception('Не удалось сохранить видео файл');
        }
    }

    // Сохраняем информацию о файле в базу данных
    $posterUrl = ($mediaType === 'video') ? '/gallery/' . $block . '/' . $baseFilename . '.' . ($webpSupported ? 'webp' : 'jpg') : '';
    saveToDatabase($block, $title, $mediaType, $filename, $filepath, $posterUrl);

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
            'title' => $title,
            'poster' => $posterUrl,
            'webp_used' => $webpSupported
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
 * Обработка изображения с автоматическим выбором формата
 */
function processImage($sourcePath, $destinationPath, $useWebP) {
    if (!extension_loaded('imagick')) {
        throw new Exception('ImageMagick не установлен');
    }

    $image = new Imagick($sourcePath);

    // Получаем текущие размеры
    $originalWidth = $image->getImageWidth();
    $originalHeight = $image->getImageHeight();

    // Вычисляем новые размеры с сохранением пропорций
    $maxSize = 550;

    if ($originalWidth > $maxSize || $originalHeight > $maxSize) {
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
    }

    // Устанавливаем формат и качество
    if ($useWebP) {
        $image->setImageFormat('webp');
        $image->setImageCompressionQuality(99);
        // Убираем метаданные для уменьшения размера
        $image->stripImage();
    } else {
        // Fallback на JPEG для изображений и постеров
        $image->setImageFormat('jpeg');
        $image->setImageCompressionQuality(85);
    }

    // Оптимизация изображения
    $image->setImageCompression(Imagick::COMPRESSION_JPEG);
    $image->setInterlaceScheme(Imagick::INTERLACE_PLANE);

    // Сохраняем изображение
    if (!$image->writeImage($destinationPath)) {
        throw new Exception('Не удалось сохранить обработанное изображение');
    }

    $image->clear();
}

/**
 * Сохранение информации о файле в базу данных
 */
function saveToDatabase($block, $title, $type, $filename, $filepath, $posterUrl = '') {
    require_once '../config.php';

    try {
        $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4", DB_USER, DB_PASS);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

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

        $orderStmt = $pdo->prepare("SELECT MAX(item_order) as max_order FROM gallery_items WHERE gallery_id = ?");
        $orderStmt->execute([$galleryId]);
        $orderData = $orderStmt->fetch(PDO::FETCH_ASSOC);
        $itemOrder = ($orderData['max_order'] !== null) ? $orderData['max_order'] + 1 : 0;

        $src = '/gallery/' . $block . '/' . $filename;

        $insertStmt = $pdo->prepare("
            INSERT INTO gallery_items (gallery_id, item_order, title, type, src, poster)
            VALUES (?, ?, ?, ?, ?, ?)
        ");

        $insertStmt->execute([
            $galleryId,
            $itemOrder,
            $title,
            $type,
            $src,
            $posterUrl
        ]);

    } catch (PDOException $e) {
        throw new Exception('Ошибка базы данных: ' . $e->getMessage());
    }
}
?>
