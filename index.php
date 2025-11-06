<?php
include "koneksi.php";

$reviews = mysqli_query($conn, "SELECT * FROM review ORDER BY id DESC");
?>

<!DOCTYPE html>
<html>
  <head>
    <title>Ayam Goreng Monas</title>
    <link rel="stylesheet" href="./style.css/header.css" />
    <link rel="stylesheet" href="./style.css/menu.css" />
    <link rel="stylesheet" href="./style.css/location.css" />
    <link rel="stylesheet" href="./style.css/review.css" />
    <link rel="stylesheet" href="./style.css/home.css" />
    <link rel="stylesheet" href="./style.css/footer.css" />
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
    <link rel ="icon" type="image/png" sizes="16x16" href="./source/Logo 2.png" />
    <script src="./script.js" defer></script>
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  </head>
  <body>
    <section class="header">
      <div class="header-left">
        <div class="restaurant-name">AYAM GORENG MONAS</div>
      </div>
      <div class="header-right">
        <a href="#home" class="nav home">Home</a>
        <a href="#menu" class="nav menu">Menu</a>
        <a href="#review" class="nav review">Review</a>
        <a href="#location" class="nav location">Location</a>
      </div>
    </section>
    <section class="pages">
      <section class="home-page" id ="home">
        <div class="home-page-container">
           <div class="background-slider-wrapper">
            <img src="./source/Background/Back1.jpg" alt="Background Restoran 1">
            <img src="./source/Background/Back2.jpg" alt="Background Restoran 2">
            <img src="./source/Background/Back3.jpg" alt="Background Restoran 3">
          </div>
          <div class="restaurant-logo">
            <img
              class="restaurant-image"
              src="./source/Logo 2.png"
              alt="restaurant-logo"
            />
          </div>
          <div class="teks1-home">Ayam Goreng Monas</div>
          <div class="teks2-home">Samarinda</div>
          <div class="teks3-home">
            Usaha kuliner yang menyajikan ayam goreng dengan cita rasa khas,
            renyah di luar dan lembut di dalam
          </div>
          <div class="button-home"><a href = "#menu">Lihat menu kami</a></div>
        </div>
      </section>
      <section class="menu-page" id="menu">
        <div class="teks-menu">Menu Kami</div>
        <div class="menu-container">
          <div class="menu-card">
            <img src="./source/Daftar menu/????" alt="siomay-menu" />
            <div class="menu-info">
              <h3>Siomay</h3>
              <p>Ini deskripsi Ini deskripsi Ini deskripsi</p>
              <p>Ini deskripsi Ini deskripsi Ini deskripsi</p>
              <p>Ini deskripsi Ini deskripsi Ini deskripsi</p>
            </div>
          </div>
          <div class="menu-card">
            <img src="./source/Daftar menu/Bakwan.png" alt="bakwan-menu" />
            <div class="menu-info">
              <h3>Bakwan</h3>
              <p>Ini deskripsi Ini deskripsi Ini deskripsi</p>
              <p>Ini deskripsi Ini deskripsi Ini deskripsi</p>
              <p>Ini deskripsi Ini deskripsi Ini deskripsi</p>
            </div>
          </div>
          <div class="menu-card">
            <img
              src="./source/Daftar menu/Paket Monas.png"
              alt="paket-monas-menu"
            />
            <div class="menu-info">
              <h3>Paket Monas</h3>
              <p>Ini deskripsi Ini deskripsi Ini deskripsi</p>
              <p>Ini deskripsi Ini deskripsi Ini deskripsi</p>
              <p>Ini deskripsi Ini deskripsi Ini deskripsi</p>
            </div>
          </div>
          <div class="menu-card">
            <img src="" alt="chicken-strip-menu" />
            <div class="menu-info">
              <h3>Chicken Strip</h3>
              <p>Ini deskripsi Ini deskripsi Ini deskripsi</p>
              <p>Ini deskripsi Ini deskripsi Ini deskripsi</p>
              <p>Ini deskripsi Ini deskripsi Ini deskripsi</p>
            </div>
          </div>
          <div class="menu-card">
            <img
              src="./source/Daftar menu/French Fries.png"
              alt="french-fries-menu"
            />
            <div class="menu-info">
              <h3>French Fries</h3>
              <p>Ini deskripsi Ini deskripsi Ini deskripsi</p>
              <p>Ini deskripsi Ini deskripsi Ini deskripsi</p>
              <p>Ini deskripsi Ini deskripsi Ini deskripsi</p>
            </div>
          </div>
          <div class="menu-card">
            <img
              src="./source/Daftar menu/Es Blewah.png"
              alt="es-blewah-menu"
            />
            <div class="menu-info">
              <h3>Es Blewah</h3>
              <p>Ini deskripsi Ini deskripsi Ini deskripsi</p>
              <p>Ini deskripsi Ini deskripsi Ini deskripsi</p>
              <p>Ini deskripsi Ini deskripsi Ini deskripsi</p>
            </div>
          </div>
        </div>
      </section>
      <section class="review-page">
        <div class="review-page" id="review">
          <h2>Review Pelanggan</h2>

          <div class="review-list">
              <?php while($row = mysqli_fetch_assoc($reviews)) { ?>
                  <div class="review-card">
                      <h4><?php echo $row['nama']; ?> ⭐<?php echo $row['rating']; ?></h4>
                      <p><?php echo $row['komentar']; ?></p>
                      <small><?php echo $row['tanggal']; ?></small>
                  </div>
              <?php } ?>
          </div>

          <div class="review-form">// jangan diisi dulu, ini buat nanti</div>
        </div>
      </section>
      <section class="location-page" id="location">
        <h1 class="location-title">Lokasi Kami</h1>
              
        <div class="location-container">
          <div class="location-info">
            <h2>KUNJUNGI TEMPAT KAMI</h2>
            <p>
              Temukan kelezatan ayam goreng legendaris kami di lokasi Samarinda
              Square, Samarinda, Kalimantan Timur
            </p>

            <div class="address-list">
              <div class="address-item">
                <div class="address-content">
                  <h3>Cabang 1</h3>
                  <p>Robinson Mart Samarida Square</p>
                </div>
              </div>

              <div class="address-item">
                <div class="address-content">
                  <h3>Cabang 2</h3>
                  <p>Lembuswana Mall</p>
                </div>
              </div>

              <div class="address-item">
                <div class="address-content">
                  <h3>Cabang 3</h3>
                  <p>Samarinda Central Plaza (SCP)</p>
                </div>
              </div>
            </div>

            <div class="open-hours">
              <p><img src ="./source/mingcute_time-fill.png">Buka Setiap Hari 23 </img> </p>
            </div>
          </div>

          <div class="location-map">
            <div id="location-map" class="location-map"></div>
          </div>
        </div>
      </section>
    </section>
    <footer class ="footer">
      <p>© 2024 Ayam Goreng Monas. All rights reserved by kelompok 6.</p>
    </footer>
  </body>
</html>
