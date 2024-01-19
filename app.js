const express = require("express");
const router = require("./routes/api.js");
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');
const patientModel = require('./models/Patient');

require("dotenv").config();

const { APP_PORT } = process.env;
const app = express();

app.use(express.json());

const validateInput = [
  body('name').notEmpty().isString(),
  body('phone').notEmpty().isString(),
  body('address').notEmpty().isString(),
  body('status').notEmpty().isString(),
];

app.post('/patients', validateInput, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        message: 'All fields must be filled correctly',
        errors: errors.array(),
        statusCode: 422,
      });
    }

    const { name, phone, address, status } = req.body;
    const result = await patientModel.addPatient(name, phone, address, status);
    const addedPatient = await patientModel.getPatientById(result.insertId);

    res.status(201).json({
      message: 'Resource is added successfully',
      data: addedPatient[0],
      statusCode: 201,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal Server Error',
      statusCode: 500,
    });
  }
});

app.put('/patients/:id', validateInput, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        message: 'All fields must be filled correctly',
        errors: errors.array(),
        statusCode: 422,
      });
    }

    const { name, phone, address, status } = req.body;
    const id = req.params.id;

    const existingPatient = await patientModel.getPatientById(id);
    if (existingPatient.length === 0) {
      return res.status(404).json({
        message: 'Resource not found',
        statusCode: 404,
      });
    }

    await patientModel.updatePatient(id, name, phone, address, status);
    const updatedPatient = await patientModel.getPatientById(id);

    res.status(200).json({
      message: 'Resource is updated successfully',
      data: updatedPatient[0],
      statusCode: 200,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal Server Error',
      statusCode: 500,
    });
  }
});

app.delete('/patients/:id', async (req, res) => {
  try {
    const id = req.params.id;

    const existingPatient = await patientModel.getPatientById(id);
    if (existingPatient.length === 0) {
      return res.status(404).json({
        message: 'Resource not found',
        statusCode: 404,
      });
    }

    await patientModel.deletePatient(id);

    res.status(200).json({
      message: 'Resource is deleted successfully',
      statusCode: 200,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal Server Error',
      statusCode: 500,
    });
  }
});

app.get('/patients/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const patient = await patientModel.getPatientById(id);

    if (patient.length > 0) {
      res.status(200).json({
        message: 'Get Detail Resource',
        data: patient[0],
        statusCode: 200,
      });
    } else {
      res.status(404).json({
        message: 'Resource not found',
        statusCode: 404,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal Server Error',
      statusCode: 500,
    });
  }
});

app.get('/search', async (req, res) => {
  try {
    const { name, phone, address, status } = req.query;
    const searchResult = await patientModel.searchPatients(name, phone, address, status);

    if (searchResult.length > 0) {
      res.status(200).json({
        message: 'Get searched resource',
        data: searchResult,
        statusCode: 200,
      });
    } else {
      res.status(404).json({
        message: 'Resource not found',
        statusCode: 404,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal Server Error',
      statusCode: 500,
    });
  }
});

app.get('/positive-patients', async (req, res) => {
  try {
    const positivePatients = await patientModel.getPositivePatients();
    res.status(200).json({
      message: 'Get positive resource',
      total: positivePatients.length,
      data: positivePatients,
      statusCode: 200,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal Server Error',
      statusCode: 500,
    });
  }
});

app.get('/recovered-patients', async (req, res) => {
  try {
    const recoveredPatients = await patientModel.getRecoveredPatients();
    res.status(200).json({
      message: 'Get recovered resource',
      total: recoveredPatients.length,
      data: recoveredPatients,
      statusCode: 200,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal Server Error',
      statusCode: 500,
    });
  }
});

app.get('/dead-patients', async (req, res) => {
  try {
    const deadPatients = await patientModel.getDeadPatients();
    res.status(200).json({
      message: 'Get dead resource',
      total: deadPatients.length,
      data: deadPatients,
      statusCode: 200,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal Server Error',
      statusCode: 500,
    });
  }
});

app.get('/patients', async (req, res) => {
  try {
    const patients = await patientModel.getAllPatients();

    if (patients.length > 0) {
      res.status(200).json({
        message: 'Get All Resource',
        data: patients,
        statusCode: 200,
      });
    } else {
      res.status(200).json({
        message: 'Data is empty',
        statusCode: 200,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal Server Error',
      statusCode: 500,
    });
  }
});

app.use(router);

app.listen(APP_PORT, () =>
  console.log(`Server running at: http://localhost:${APP_PORT}`)
);
