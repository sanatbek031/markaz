<?php
session_start();
$conn = new mysqli("localhost", "root", "", "startup_db");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST["email"];
    $password = $_POST["password"];

    $stmt = $conn->prepare("SELECT id, password FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows == 1) {
        $stmt->bind_result($id, $hashedPassword);
        $stmt->fetch();
        if (password_verify($password, $hashedPassword)) {
            $_SESSION["user_id"] = $id;
            header("Location: admin.php");
            exit();
        } else {
            echo "Parol noto‘g‘ri.";
        }
    } else {
        echo "Foydalanuvchi topilmadi.";
    }
    $stmt->close();
}
$conn->close();
