<?php
if (isset($_GET['topic'])) {
    $topic = urlencode($_GET['topic']);
    $url = "https://en.wikipedia.org/w/process.php?action=parse&page=$topic&format=json";

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (compatible; ExampleBot/1.0; +http://example.com/bot)');

    // Ignore SSL certificate verification (not recommended for production)
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);

    $response = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

    if (curl_errno($ch)) {
        $error_msg = curl_error($ch);
    }

    curl_close($ch);

    if (isset($error_msg)) {
        echo json_encode(['content' => 'CURL error: ' . $error_msg]);
    } elseif ($http_code !== 200) {
        echo json_encode(['content' => 'HTTP error: ' . $http_code]);
    } elseif ($response !== false) {
        $data = json_decode($response, true);
        if (isset($data['parse']['text']['*'])) {
            $content = $data['parse']['text']['*'];
            echo json_encode(['content' => $content]);
        } else {
            echo json_encode(['content' => 'No content found for this topic.']);
        }
    } else {
        echo json_encode(['content' => 'Unknown error occurred.']);
    }
} else {
    echo json_encode(['content' => 'No topic provided.']);
}
