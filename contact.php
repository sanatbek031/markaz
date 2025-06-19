<?php
$conn = new mysqli("localhost", "root", "", "startup_db");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $message = $_POST["message"];

    $stmt = $conn->prepare("INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $name, $email, $message);

    if ($stmt->execute()) {
        echo "Xabaringiz yuborildi!";
    } else {
        echo "Xatolik yuz berdi.";
    }
    $stmt->close();
}
$conn->close();
?>
