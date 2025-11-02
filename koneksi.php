<?php
$host = "localhost";
$user = "root"; 
$pass = ""; 
$db   = "ayamgoreng_monas";

$conn = mysqli_connect($host, $user, $pass, $db);

if (!$conn) {
    die("Koneksi gagal: " . mysqli_connect_error());
}
?>
