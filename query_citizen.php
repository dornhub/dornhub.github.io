<?php
// query_citizen.php - 查询公民信息（含明文密码验证）
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['error' => '仅支持POST请求']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

// 验证身份证件号和密码不为空
if (empty($input['id_number']) || empty($input['password'])) {
    echo json_encode(['error' => '身份证件号和密码均不能为空']);
    exit;
}

try {
    $pdo = getDBConnection();
    
    // 查询SQL：添加明文密码匹配条件
    $sql = "SELECT * FROM citizens WHERE id_number = :id_number AND password = :password";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':id_number' => trim($input['id_number']),
        ':password' => $input['password'] // 明文密码直接匹配
    ]);
    
    $citizen = $stmt->fetch();
    
    if ($citizen) {
        // 隐藏密码字段，避免返回给前端
        unset($citizen['password']);
        echo json_encode([
            'success' => true,
            'data' => $citizen
        ]);
    } else {
        // 密码不匹配或未找到该用户，统一返回模糊提示（避免泄露用户是否存在）
        echo json_encode(['error' => '身份证件号或密码错误，请核对后重试']);
    }
    
} catch(PDOException $e) {
    error_log("数据库查询失败: " . $e->getMessage());
    echo json_encode(['error' => '系统错误，请稍后重试']);
}
?>