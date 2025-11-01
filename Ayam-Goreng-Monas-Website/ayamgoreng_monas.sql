CREATE DATABASE ayamgoreng_monas;

USE ayamgoreng_monas;

CREATE TABLE review (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    komentar TEXT NOT NULL,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    tanggal TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO review (nama, komentar, rating) VALUES
('Richard Dante', 'Ayamnya gurih banget, bumbunya meresap!', 5),
('Britama Putra', 'Pelayanannya cepat dan ramah.', 4),
('Dimas Islamay', 'Tempatnya nyaman, recommended.', 5),
('Richo Anan', 'Harga terjangkau, rasa enak.', 4);

SELECT * FROM review


