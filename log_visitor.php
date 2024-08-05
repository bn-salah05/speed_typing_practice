<?php
$visitor_ip = $_SERVER['REMOTE_ADDR'];
$file = 'visitors.log';

// Append the IP address and current timestamp to the log file
file_put_contents($file, $visitor_ip . ' - ' . date("Y-m-d H:i:s") . PHP_EOL, FILE_APPEND);

echo "Visitor logged.";
?>
