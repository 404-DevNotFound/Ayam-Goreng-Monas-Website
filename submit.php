<?php
include 'koneksi.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nama = $_POST['nama'];
    $komentar = $_POST['komentar'];
    $rating = $_POST['rating'];

    $query = "INSERT INTO review (nama, komentar, rating) VALUES ('$nama', '$komentar', '$rating')";

    if (mysqli_query($conn, $query)) {
        echo "Review berhasil dikirim!";
        header("Location: index.php#review"); 
        exit();
    } else {
        echo "Error: " . $query . "<br>" . mysqli_error($conn);
    }
}
?>
