<?php
// user_settings.php - 用户设置和固定网址管理
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

// 引入数据库配置
require_once 'config.php';

try {
    $pdo = getDBConnection();
    
    // 立即设置连接字符集为UTF-8
    $pdo->exec("SET NAMES 'utf8mb4'");
    $pdo->exec("SET CHARACTER SET utf8mb4");
    $pdo->exec("SET character_set_connection = 'utf8mb4'");
    $pdo->exec("SET character_set_client = 'utf8mb4'");
    $pdo->exec("SET character_set_results = 'utf8mb4'");
    
    // 处理请求
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!$input) {
            echo json_encode(["success" => false, "error" => "无效的JSON数据"]);
            exit;
        }
        
        // 检查请求类型
        $action = isset($input['action']) ? $input['action'] : 'save_settings';
        
        if ($action === 'save_settings') {
            // 保存用户设置
            $id_number = $input['id_number'];
            $theme = $input['theme'];
            $primary_color = $input['primary_color'];
            $show_pinned = intval($input['show_pinned']);
            $show_navigation = intval($input['show_navigation']);
            $show_date = intval($input['show_date']);
            $show_time = intval($input['show_time']);
            $background_type = $input['background_type'];
            $search_engine = $input['search_engine'];
            
            // 检查记录是否存在
            $check_sql = "SELECT id FROM user_settings WHERE id_number = ?";
            $check_stmt = $pdo->prepare($check_sql);
            $check_stmt->execute([$id_number]);
            
            if ($check_stmt->rowCount() > 0) {
                // 更新现有记录
                $sql = "UPDATE user_settings SET 
                        theme = ?,
                        primary_color = ?,
                        show_pinned = ?,
                        show_navigation = ?,
                        show_date = ?,
                        show_time = ?,
                        background_type = ?,
                        search_engine = ?,
                        updated_at = NOW()
                        WHERE id_number = ?";
            } else {
                // 插入新记录
                $sql = "INSERT INTO user_settings 
                        (id_number, theme, primary_color, show_pinned, show_navigation, show_date, show_time, background_type, search_engine, created_at, updated_at)
                        VALUES 
                        (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())";
            }
            
            $stmt = $pdo->prepare($sql);
            
            if ($check_stmt->rowCount() > 0) {
                $success = $stmt->execute([$theme, $primary_color, $show_pinned, $show_navigation, $show_date, $show_time, $background_type, $search_engine, $id_number]);
            } else {
                $success = $stmt->execute([$id_number, $theme, $primary_color, $show_pinned, $show_navigation, $show_date, $show_time, $background_type, $search_engine]);
            }
            
            if ($success) {
                echo json_encode(["success" => true]);
            } else {
                $errorInfo = $stmt->errorInfo();
                echo json_encode(["success" => false, "error" => "保存设置失败: " . $errorInfo[2]]);
            }
            
        } elseif ($action === 'save_pinned_websites') {
            // 保存固定网址
            $id_number = $input['id_number'];
            $websites = $input['websites'];
            
            // 开始事务
            $pdo->beginTransaction();
            
            try {
                // 先删除用户的所有固定网址
                $delete_sql = "DELETE FROM pinned_websites WHERE id_number = ?";
                $delete_stmt = $pdo->prepare($delete_sql);
                $delete_stmt->execute([$id_number]);
                
                // 插入新的固定网址
                $insert_sql = "INSERT INTO pinned_websites 
                              (id_number, name, url, icon, display_order, created_at)
                              VALUES 
                              (?, ?, ?, ?, ?, NOW())";
                $insert_stmt = $pdo->prepare($insert_sql);
                
                foreach ($websites as $index => $website) {
                    $name = $website['name'];
                    $url = $website['url'];
                    $icon = isset($website['icon']) ? $website['icon'] : 'fa-link';
                    
                    // 调试信息
                    error_log("保存固定网址 - 名称: " . $name . ", URL: " . $url);
                    
                    $success = $insert_stmt->execute([$id_number, $name, $url, $icon, $index]);
                    
                    if (!$success) {
                        $errorInfo = $insert_stmt->errorInfo();
                        throw new Exception("插入数据失败: " . $errorInfo[2]);
                    }
                }
                
                // 提交事务
                $pdo->commit();
                echo json_encode(["success" => true, "message" => "成功保存 " . count($websites) . " 个固定网址"]);
                
            } catch (Exception $e) {
                // 回滚事务
                $pdo->rollBack();
                echo json_encode(["success" => false, "error" => "保存固定网址失败: " . $e->getMessage()]);
            }
        }
        
    } elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
        // 获取数据
        $id_number = $_GET['id_number'];
        $type = isset($_GET['type']) ? $_GET['type'] : 'settings';
        
        if ($type === 'settings') {
            // 获取用户设置
            $sql = "SELECT * FROM user_settings WHERE id_number = ?";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$id_number]);
            
            if ($stmt->rowCount() > 0) {
                $row = $stmt->fetch(PDO::FETCH_ASSOC);
                echo json_encode(["success" => true, "data" => $row]);
            } else {
                echo json_encode(["success" => false, "error" => "未找到用户设置"]);
            }
            
        } elseif ($type === 'pinned_websites') {
            // 获取固定网址
            $sql = "SELECT name, url, icon FROM pinned_websites WHERE id_number = ? ORDER BY display_order, id";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$id_number]);
            
            $websites = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            // 调试信息
            error_log("加载固定网址数量: " . count($websites));
            foreach ($websites as $website) {
                error_log("加载的网站: " . $website['name'] . " - " . $website['url']);
            }
            
            echo json_encode(["success" => true, "data" => $websites]);
        }
    }
    
} catch (PDOException $e) {
    error_log("数据库错误: " . $e->getMessage());
    echo json_encode(["success" => false, "error" => "数据库错误: " . $e->getMessage()]);
} catch (Exception $e) {
    error_log("服务器错误: " . $e->getMessage());
    echo json_encode(["success" => false, "error" => "服务器错误: " . $e->getMessage()]);
}
?>