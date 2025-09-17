<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');

// Настройки базы данных
    $db_host = 'localhost';
    $db_name = 'host1394527';
    $db_user = 'host1394527_countvisit';
    $db_pass = 'vZn8CQL3';

try {
    $pdo = new PDO("mysql:host=$db_host;dbname=$db_name;charset=utf8", $db_user, $db_pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Получаем все данные из таблицы media
    $stmt = $pdo->query("SELECT id, title, type, src, poster, gallery FROM media ORDER BY gallery, created_at DESC");
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Группируем по полю gallery
    $groupedData = [];
    foreach ($data as $item) {
        $galleryName = $item['gallery'];
        if (!isset($groupedData[$galleryName])) {
            $groupedData[$galleryName] = [];
        }

        $groupedData[$galleryName][] = [
            'id' => (int)$item['id'],
            'title' => $item['title'],
            'type' => $item['type'],
            'src' => $item['src'],
            'poster' => $item['poster']
        ];
    }

    echo json_encode([
        'success' => true,
        'data' => $groupedData
    ]);

} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Database error: ' . $e->getMessage()
    ]);
}
?>
