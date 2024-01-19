// Import modul express untuk membuat router
const express = require('express');
// Import kelas PatientController untuk menangani permintaan terkait Pasien
const PatientController = require('../controllers/PatientController');

// Membuat objek router dari modul express
const router = express.Router();
// Membuat objek patientController dari kelas PatientController
const patientController = new PatientController();

// Menangani permintaan pada route utama ('/') dengan mengirimkan pesan sambutan
router.get('/', (req, res) => {
  res.send('Hello Covid API Express');
});

// Menangani permintaan pada endpoint '/patients'
router.route('/patients')
  // Menangani permintaan GET untuk mendapatkan semua data Pasien
  .get(patientController.getAllPatients)
  // Menangani permintaan POST untuk menambahkan data Pasien baru
  .post(patientController.addPatient);

// Menangani permintaan pada endpoint '/patients/:id'
router.route('/patients/:id')
  // Menangani permintaan GET untuk mendapatkan data Pasien berdasarkan ID
  .get(patientController.getPatientById)
  // Menangani permintaan PUT untuk mengupdate data Pasien berdasarkan ID
  .put(patientController.updatePatient)
  // Menangani permintaan DELETE untuk menghapus data Pasien berdasarkan ID
  .delete(patientController.deletePatient);

// Ekspor objek router untuk digunakan di tempat lain
module.exports = router;
