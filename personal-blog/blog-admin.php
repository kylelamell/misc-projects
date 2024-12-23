<?php

header('Content-Type: application/json');

// Get the JSON data from the request body
$jsonData = file_get_contents('php://input'); 

// Decode the JSON data
$data = json_decode($jsonData, true);

// Check if data was received correctly
if ($data === null) {
  http_response_code(400); // Bad Request
  echo json_encode(['error' => 'Invalid JSON data']);
  exit;
}

// Specify the path to save the JSON file
$filePath = './posts.json'; // Adjust the path as needed

// Save the data to the file
$result = file_put_contents($filePath, json_encode($data, JSON_PRETTY_PRINT));

if ($result === false) {
  http_response_code(500); // Internal Server Error
  echo json_encode(['error' => 'Failed to save data to file']);
} else {
  http_response_code(200); // OK
  echo json_encode(['message' => 'Data saved successfully']);
}

?>