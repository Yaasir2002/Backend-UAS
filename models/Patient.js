// Import modul database yang berisi konfigurasi koneksi dan operasi database
const database = require('../config/database');

// Membuat kelas Patient untuk menangani operasi database terkait Pasien
class Patient {
  // Fungsi untuk mendapatkan semua data Pasien dari database
  async getAllPatients() {
    const query = 'SELECT * FROM patients';
    // Menggunakan fungsi execute dari modul database untuk menjalankan query
    return await database.execute(query);
  }

  // Fungsi untuk mendapatkan data Pasien berdasarkan ID dari database
  async getPatientById(id) {
    const query = 'SELECT * FROM patients WHERE id = ?';
    // Menggunakan fungsi execute dari modul database untuk menjalankan query dengan parameter ID
    return await database.execute(query, [id]);
  }

  // Fungsi untuk menambahkan data Pasien ke database
  async addPatient(name, phone, address, status) {
    const query = 'INSERT INTO patients (name, phone, address, status) VALUES (?, ?, ?, ?)';
    // Menggunakan fungsi execute dari modul database untuk menjalankan query dengan parameter data Pasien
    return await database.execute(query, [name, phone, address, status]);
  }

  // Fungsi untuk mengupdate data Pasien di database
  async updatePatient(id, name, phone, address, status) {
    const query = 'UPDATE patients SET name=?, phone=?, address=?, status=? WHERE id=?';
    // Menggunakan fungsi execute dari modul database untuk menjalankan query dengan parameter data Pasien dan ID
    return await database.execute(query, [name, phone, address, status, id]);
  }

  // Fungsi untuk menghapus data Pasien dari database
  async deletePatient(id) {
    const query = 'DELETE FROM patients WHERE id=?';
    // Menggunakan fungsi execute dari modul database untuk menjalankan query dengan parameter ID
    return await database.execute(query, [id]);
  }
}

// Ekspor instance baru dari kelas Patient untuk digunakan di tempat lain
module.exports = new Patient();
