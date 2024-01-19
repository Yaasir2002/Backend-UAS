// Import modul mysql2/promise untuk berinteraksi dengan MySQL menggunakan Promise
const mysql = require('mysql2/promise');

// Import modul dotenv untuk mengelola variabel lingkungan
const dotenv = require('dotenv');

// Mengkonfigurasi variabel lingkungan menggunakan file .env
dotenv.config();

// Mendapatkan nilai dari variabel lingkungan yang dibutuhkan untuk koneksi ke database
const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env;

// Membuat pool koneksi MySQL menggunakan createPool untuk mendukung koneksi yang lebih efisien
const db = mysql.createPool({
  host: DB_HOST,         // Alamat host database
  user: DB_USERNAME,     // Nama pengguna database
  password: DB_PASSWORD, // Kata sandi database
  database: DB_DATABASE, // Nama database yang digunakan
});

// Menggunakan metode getConnection untuk mendapatkan koneksi dari pool
db.getConnection()
  .then(connection => {
    console.log("Connected to database"); 
    connection.release(); // Melepaskan koneksi saat selesai digunakan untuk mengembalikan ke pool
  })
  .catch((err) => {
    console.error("Error connecting to database: " + err.message);
    process.exit(1); // Keluar dari aplikasi jika terjadi kesalahan koneksi
  });

// Ekspor objek pool koneksi MySQL untuk digunakan di tempat lain
module.exports = db;
