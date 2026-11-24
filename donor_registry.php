<?php
session_start();
header('Content-Type: application/json');
include("connection.php");

$currentUser = $_SESSION['user'] ?? null;
if ($currentUser && !in_array($currentUser['role'], ['System Admin', 'Lab Technician'])) {
    http_response_code(403);
    echo json_encode(['error' => 'Forbidden: Your role does not have access to the Donors Registry.']);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];
$data = json_decode(file_get_contents("php://input"), true) ?? [];

if ($method === 'GET') {
    $sql = "SELECT * FROM donor_registry ORDER BY donor_id DESC";
    $result = mysqli_query($conn, $sql);
    $rows = [];

    while ($row = mysqli_fetch_assoc($result)) {
        $rows[] = [
            'id'               => $row['donor_id'],
            'donorCode'        => $row['donor_code'],
            'fullName'         => $row['name'],
            'donorType'        => $row['donor_type'],
            'bloodType'        => $row['blood_type'],
            'lastDonationDate' => $row['date'] ? date('M j, Y', strtotime($row['date'])) : '',
            'status'           => $row['status']
        ];
    }

    echo json_encode($rows);
}

if ($method === 'POST') {
    $donor_code = 'DN-' . rand(10000, 99999);
    $name       = mysqli_real_escape_string($conn, $data['fullName'] ?? '');
    $donor_type = mysqli_real_escape_string($conn, $data['donorType'] ?? '');
    $blood_type = mysqli_real_escape_string($conn, $data['bloodType'] ?? '');
    $raw_date   = $data['lastDonationDate'] ?? '';
    $date_sql   = $raw_date ? "'" . mysqli_real_escape_string($conn, $raw_date) . "'" : "NULL";
    $status     = mysqli_real_escape_string($conn, $data['status'] ?? 'Processing');
    $actions    = 'View';

    $sql = "INSERT INTO donor_registry (donor_code, name, donor_type, blood_type, date, status, actions)
            VALUES ('$donor_code', '$name', '$donor_type', '$blood_type', $date_sql, '$status', '$actions')";

    if (mysqli_query($conn, $sql)) {
        echo json_encode(['success' => 'Donor saved successfully.']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => mysqli_error($conn)]);
    }
}

mysqli_close($conn);