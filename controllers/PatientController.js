// Import modul Patient yang berisi operasi database untuk entitas Pasien
const Patient = require('../models/Patient');

// Membuat kelas PatientController untuk menangani logika bisnis terkait Pasien
class PatientController {
  // Fungsi untuk mendapatkan semua data Pasien
  async getAllPatients(req, res) {
    try {
      // Menggunakan model Patient untuk mendapatkan semua data Pasien dari database
      const patients = await Patient.getAllPatients();
      // Menggunakan fungsi sendResponse untuk mengirimkan respon ke client dengan status 200
      this.sendResponse(res, 200, 'Get All Resource', patients);
    } catch (error) {
      // Menggunakan fungsi handleServerError untuk menangani kesalahan server
      this.handleServerError(res, error);
    }
  }

  // Fungsi untuk mendapatkan detail Pasien berdasarkan ID
  async getPatientById(req, res) {
    try {
      const { id } = req.params;
      // Menggunakan model Patient untuk mendapatkan data Pasien berdasarkan ID dari database
      const patient = await Patient.getPatientById(id);

      if (patient.length > 0) {
        // Menggunakan fungsi sendResponse untuk mengirimkan respon ke client dengan status 200
        this.sendResponse(res, 200, 'Get Detail Resource', patient[0]);
      } else {
        // Menggunakan fungsi sendResponse untuk mengirimkan respon ke client dengan status 404
        this.sendResponse(res, 404, 'Resource not found');
      }
    } catch (error) {
      // Menggunakan fungsi handleServerError untuk menangani kesalahan server
      this.handleServerError(res, error);
    }
  }

  // Fungsi untuk menambahkan data Pasien
  async addPatient(req, res) {
    try {
      const { name, phone, address, status } = req.body;
      // Menggunakan model Patient untuk menambahkan data Pasien ke database
      const result = await Patient.addPatient(name, phone, address, status);
      // Menggunakan model Patient untuk mendapatkan data Pasien yang baru ditambahkan dari database
      const addedPatient = await Patient.getPatientById(result.insertId);

      // Menggunakan fungsi sendResponse untuk mengirimkan respon ke client dengan status 201
      this.sendResponse(res, 201, 'Resource is added successfully', addedPatient[0]);
    } catch (error) {
      // Menggunakan fungsi handleServerError untuk menangani kesalahan server
      this.handleServerError(res, error);
    }
  }

  // Fungsi untuk mengupdate data Pasien
  async updatePatient(req, res) {
    try {
      const { id } = req.params;
      const { name, phone, address, status } = req.body;

      // Menggunakan model Patient untuk mendapatkan data Pasien berdasarkan ID dari database
      const existingPatient = await Patient.getPatientById(id);
      if (existingPatient.length === 0) {
        // Menggunakan fungsi sendResponse untuk mengirimkan respon ke client dengan status 404
        this.sendResponse(res, 404, 'Resource not found');
        return;
      }

      // Menggunakan model Patient untuk mengupdate data Pasien ke database
      await Patient.updatePatient(id, name, phone, address, status);
      // Menggunakan model Patient untuk mendapatkan data Pasien yang baru diupdate dari database
      const updatedPatient = await Patient.getPatientById(id);

      // Menggunakan fungsi sendResponse untuk mengirimkan respon ke client dengan status 200
      this.sendResponse(res, 200, 'Resource is updated successfully', updatedPatient[0]);
    } catch (error) {
      // Menggunakan fungsi handleServerError untuk menangani kesalahan server
      this.handleServerError(res, error);
    }
  }

  // Fungsi untuk menghapus data Pasien
  async deletePatient(req, res) {
    try {
      const { id } = req.params;

      // Menggunakan model Patient untuk mendapatkan data Pasien berdasarkan ID dari database
      const existingPatient = await Patient.getPatientById(id);
      if (existingPatient.length === 0) {
        // Menggunakan fungsi sendResponse untuk mengirimkan respon ke client dengan status 404
        this.sendResponse(res, 404, 'Resource not found');
        return;
      }

      // Menggunakan model Patient untuk menghapus data Pasien dari database
      await Patient.deletePatient(id);
      // Menggunakan fungsi sendResponse untuk mengirimkan respon ke client dengan status 200
      this.sendResponse(res, 200, 'Resource is deleted successfully');
    } catch (error) {
      // Menggunakan fungsi handleServerError untuk menangani kesalahan server
      this.handleServerError(res, error);
    }
  }

  // Fungsi untuk mengirimkan respon ke client dengan format yang telah ditentukan
  sendResponse(res, statusCode, message, data = null) {
    res.status(statusCode).json({
      message,
      data,
      statusCode,
    });
  }

  // Fungsi untuk menangani kesalahan server dengan mengirimkan respon 500
  handleServerError(res, error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal Server Error',
      statusCode: 500,
    });
  }
}

// Ekspor kelas PatientController untuk digunakan di tempat lain
module.exports = PatientController;
