<?php
session_start();
header('Content-Type: application/json');
include("connection.php");

$action = $_GET['action'] ?? '';
$data = json_decode(file_get_contents("php://input"), true) ?? [];

if ($action === 'login') {
    $username = trim($data['username'] ?? '');
    $password = $data['password'] ?? '';

    $stmt = $conn->prepare("SELECT user_id, full_name, role, username, password_hash FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $user = $stmt->get_result()->fetch_assoc();
    $stmt->close();

    if (!$user || !password_verify($password, $user['password_hash'])) {
        http_response_code(401);
        echo json_encode(['error' => 'Invalid username or password.']);
        exit;
    }

    $_SESSION['user'] = [
        'id'       => $user['user_id'],
        'fullName' => $user['full_name'],
        'role'     => $user['role'],
        'username' => $user['username']
    ];

    echo json_encode(['user' => $_SESSION['user']]);
} elseif ($action === 'register') {
    $fullName = trim($data['fullName'] ?? '');
    $role     = trim($data['role'] ?? 'Blood Bank Officer');
    $username = trim($data['username'] ?? '');
    $password = $data['password'] ?? '';

    if (!$fullName || !$username || strlen($password) < 6) {
        http_response_code(400);
        echo json_encode(['error' => 'Fill in all fields (password must be at least 6 characters).']);
        exit;
    }

    $hash = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $conn->prepare("INSERT INTO users (full_name, role, username, password_hash) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $fullName, $role, $username, $hash);

    if ($stmt->execute()) {
        echo json_encode(['success' => 'Account created. You can now sign in.']);
    } else {
        http_response_code($conn->errno === 1062 ? 409 : 500);
        echo json_encode(['error' => $conn->errno === 1062 ? 'Username is already taken.' : $stmt->error]);
    }
    $stmt->close();
} elseif ($action === 'me') {
    echo json_encode(['user' => $_SESSION['user'] ?? null]);
} elseif ($action === 'logout') {
    session_destroy();
    echo json_encode(['success' => 'Signed out.']);
}

$conn->close();