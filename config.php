<?php
// config.php - InfinityFree数据库配置
define('DB_HOST', 'sql207.infinityfree.com');
define('DB_USER', 'epiz_33946305');
define('DB_PASS', 'g9k1uCbdibX');
define('DB_NAME', 'epiz_33946305_login');

function getDBConnection() {
    try {
        $pdo = new PDO(
            "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
            DB_USER,
            DB_PASS,
            [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci",
                PDO::ATTR_EMULATE_PREPARES => false // 禁用模拟预处理，确保真正的UTF-8支持
            ]
        );
        return $pdo;
    } catch(PDOException $e) {
        die("数据库连接失败: " . $e->getMessage());
    }
}
?>