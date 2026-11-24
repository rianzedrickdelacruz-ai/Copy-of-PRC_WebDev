<?php
session_start();
header('Content-Type: application/json');
include("connection.php");

$currentUser = $_SESSION['user'] ?? null;
if ($currentUser && !in_array($currentUser['role'], ['System Admin', 'Blood Bank Officer', 'Lab Technician'])) {
    http_response_code(403);
    echo json_encode(['error' => 'Forbidden: Your role does not have access to Blood Units.']);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];
$data = json_decode(file_get_contents("php://input"), true) ?? [];

if ($method === 'GET') {
    $sql = "SELECT b.*, d.donor_code 
            FROM blood_unit b 
            LEFT JOIN donor_registry d ON b.donor_id = d.donor_id 
            ORDER BY b.collection_date DESC";
    $result = mysqli_query($conn, $sql);
    $rows = [];

    while ($row = mysqli_fetch_assoc($result)) {
        $rows[] = [
            'id'              => $row['unit_id'],
            'unitCode'        => $row['unit_id'],
            'donorName'       => $row['donor_name'],
            'donorCode'       => $row['donor_code'] ?? ('DN-' . $row['donor_id']),
            'bloodType'       => $row['blood_type'],
            'component'       => $row['component'],
            'collectionDate'  => $row['collection_date'] ? date('M j, Y', strtotime($row['collection_date'])) : '',
            'expiryDate'      => $row['expiry_date'] ? date('M j, Y', strtotime($row['expiry_date'])) : '',
            'storageLocation' => $row['storage_location'],
            'status'          => $row['status']
        ];
    }

    echo json_encode($rows);
}

if ($method === 'POST') {
    $donor_id = (int)($data['donorId'] ?? 0);
    $donor_q  = mysqli_query($conn, "SELECT name, blood_type FROM donor_registry WHERE donor_id = $donor_id");
    $donor    = mysqli_fetch_assoc($donor_q);

    if (!$donor) {
        http_response_code(400);
        echo json_encode(['error' => 'Selected donor was not found.']);
        exit;
    }

    $unit_id          = 'BU-' . rand(10000, 99999);
    $donor_name       = mysqli_real_escape_string($conn, $donor['name']);
    $blood_type       = mysqli_real_escape_string($conn, $donor['blood_type']);
    $component        = mysqli_real_escape_string($conn, $data['component'] ?? '');
    $collection_date  = mysqli_real_escape_string($conn, $data['collectionDate'] ?? date('Y-m-d'));
    $expiry_date      = mysqli_real_escape_string($conn, $data['expiryDate'] ?? date('Y-m-d'));
    $storage_location = mysqli_real_escape_string($conn, $data['storageLocation'] ?? '');
    $status           = 'Processing';
    $action           = 'View';

    $sql = "INSERT INTO blood_unit (unit_id, donor_id, donor_name, blood_type, component, collection_date, expiry_date, storage_location, status, action)
            VALUES ('$unit_id', $donor_id, '$donor_name', '$blood_type', '$component', '$collection_date', '$expiry_date', '$storage_location', '$status', '$action')";

    if (mysqli_query($conn, $sql)) {
        echo json_encode(['success' => 'Blood unit saved successfully.']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => mysqli_error($conn)]);
    }
}

mysqli_close($conn);