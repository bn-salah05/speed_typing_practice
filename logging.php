<?php 

session_start();

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


$alert = '';
$host = "localhost";
$dbname = "u951214429_test";
$user = "u951214429_test";
$pass = "**SalahDD102";
try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass);
} catch(PDOException $err) {
    // Log error instead of echoing
    error_log("Database connection error: " . $err->getMessage());
}

if (isset($_POST["submit"])) {
    $username = $_POST["user"];
    $password = $_POST["password"];
    
    $stmt = $conn->prepare("SELECT id, user, password FROM users WHERE user = :username");
    $stmt->execute(['username' => $username]);
    $user = $stmt->fetch();
    print_r($user);
    if ($user && $password === $user['password']) {
        // Login successful
         
        $_SESSION['user_id'] = $user['id'];
        $alert = 'success';
    } else {
        // Login failed
        $alert = 'error';
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Minimalist Login</title>
    <style>
        /* ... (keep your existing styles) ... */
         body, html {
            height: 100%;
            margin: 0;
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #f5f5f5;
        }
        .login-container {
            background: white;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            width: 300px;
        }
        h2 {
            margin: 0 0 20px;
            color: #333;
            text-align: center;
        }
        input {
            width: 100%;
            padding: 10px;
            margin: 10px 0;
            border: 1px solid #ddd;
            border-radius: 4px;
            box-sizing: border-box;
        }
        button {
            width: 100%;
            padding: 10px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.3s;
        }
        button:hover {
            background-color: #0056b3;
        }
        .alert {
            margin-top: 20px;
            padding: 10px;
            border-radius: 4px;
            text-align: center;
            display: none;
        }
        .success {
            background-color: #d4edda;
            color: #155724;
        }
        .error {
            background-color: #f8d7da;
            color: #721c24;
        }
    </style>
</head>
<body>
    <div class="login-container">
        <h2>Login</h2>
        <form id="loginForm" action="" method="post">
            <input type="text" placeholder="Username" name="user" required>
            <input type="password" placeholder="Password" name="password" required>
            <button type="submit" name="submit">Sign In</button>
        </form>
        <div id="successAlert" class="alert success" <?php if($alert === 'success') echo 'style="display:block;"'; ?>>Login successful!</div>
        <div id="errorAlert" class="alert error" <?php if($alert === 'error') echo 'style="display:block;"'; ?>>Invalid credentials. Please try again.</div>
    </div>
</body>
</html>