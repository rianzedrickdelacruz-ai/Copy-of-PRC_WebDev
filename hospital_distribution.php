<?php
session_start();
header('Content-Type: application/json');
include("connection.php");

$currentUser = $_SESSION['user'] ?? null;
if ($currentUser && !in_array($currentUser['role'], ['System Admin', 'Blood Bank Officer'])) {
    http_response_code(403);
    echo json_encode(['error' => 'Forbidden: Your role does not have access to Hospital Distribution.']);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];
$data = json_decode(file_get_contents("php://input"), true) ?? [];

if ($method === 'GET') {
    $sql = "SELECT * FROM hospital_distribution ORDER BY request_id DESC";
    $result = mysqli_query($conn, $sql);
    $rows = [];

    while ($row = mysqli_fetch_assoc($result)) {
        $rows[] = [
            'id'              => $row['request_id'],
            'requisitionId'   => $row['requisition_id'],
            'hospitalName'    => $row['hospital_name'],
            'receivingDoctor' => $row['receiving_doctor/service'],
            'bloodType'       => $row['blood_type'],
            'unitsOrdered'    => $row['units_ordered'],
            'component'       => $row['components'],
            'requestedAt'     => $row['requested_at'] ? date('M j, Y · H:i', strtotime($row['requested_at'])) : '',
            'urgency'         => $row['urgency/priority'],
            'status'          => $row['status']
        ];
    }

    echo json_encode($rows);
}

if ($method === 'POST') {
    $requisition_id   = 'REQ-' . rand(1000, 9999);
    $hospital_name    = mysqli_real_escape_string($conn, $data['hospitalName'] ?? '');
    $receiving_doctor = mysqli_real_escape_string($conn, $data['receivingDoctor'] ?? '');
    $blood_type       = mysqli_real_escape_string($conn, $data['bloodType'] ?? '');
    $units_ordered    = (int)($data['unitsOrdered'] ?? 0);
    $components       = mysqli_real_escape_string($conn, $data['component'] ?? '');
    $urgency_priority = mysqli_real_escape_string($conn, $data['urgency'] ?? 'Routine');
    $requested_at     = date('Y-m-d H:i:s');
    $status           = 'Not Yet Started';

    $sql = "INSERT INTO hospital_distribution 
            (requisition_id, hospital_name, `receiving_doctor/service`, blood_type, units_ordered, components, `urgency/priority`, requested_at, status)
            VALUES ('$requisition_id', '$hospital_name', '$receiving_doctor', '$blood_type', '$units_ordered', '$components', '$urgency_priority', '$requested_at', '$status')";

    if (mysqli_query($conn, $sql)) {
        echo json_encode(['success' => 'Request submitted successfully.']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => mysqli_error($conn)]);
    }
}

if ($method === 'PATCH') {
    $id     = (int)($_GET['id'] ?? 0);
    $status = mysqli_real_escape_string($conn, $data['status'] ?? 'Distributed');

    $sql = "UPDATE hospital_distribution SET status = '$status' WHERE request_id = $id";

    if (mysqli_query($conn, $sql)) {
        echo json_encode(['success' => 'Request marked as dispatched.']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => mysqli_error($conn)]);
    }
}

mysqli_close($conn);