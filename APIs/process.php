<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $prompt = $_POST["prompt"];
    $apiKey = "AIzaSyDXJR9jKGZC5a0YLvJyyM7ifJHDMjVUoBE"; // Replace with your actual API key

    // API endpoint
    $url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" . $apiKey;

    // Request data
    $data = [
        "contents" => [
            ["parts" => [["text" => $prompt]]]
        ]
    ];

    // Initialize cURL session
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "Content-Type: application/json"
    ]);

    // Send the request and get the response
    $response = curl_exec($ch);

    // Close cURL session
    curl_close($ch);

    // Process and echo the response
    $result = json_decode($response, true);
    if (isset($result['candidates'][0]['content']['parts'][0]['text'])) {
        echo $result['candidates'][0]['content']['parts'][0]['text'];
    } else {
        echo "Error: Unable to process the request.";
    }
}
?>