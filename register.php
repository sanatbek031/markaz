<?php
$conn = new mysqli("localhost", "root", "", "startup_db");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["username"];
    $email = $_POST["email"];
    $password = password_hash($_POST["password"], PASSWORD_DEFAULT);

    $stmt = $conn->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $username, $email, $password);

    if ($stmt->execute()) {
        echo "Ro‘yxatdan o‘tish muvaffaqiyatli.";
    } else {
        echo "Xatolik: foydalanuvchi mavjud bo‘lishi mumkin.";
    }
    $stmt->close();
}
$conn->close();
