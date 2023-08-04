// models/sekolah_identitas.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Pbm = require('./pbm');

const SekolahIdentitas = sequelize.define('sekolah_identitas', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nama: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  },
  waktu_pbm_id: {
    type: DataTypes.INTEGER
  }
});

SekolahIdentitas.belongsTo(Pbm, { foreignKey: 'waktu_pbm_id' });

module.exports = SekolahIdentitas;





// routes/sekolah_identitas.js
const express = require('express');
const router = express.Router();
const SekolahIdentitas = require('../models/sekolah_identitas');

// Mendapatkan semua data sekolah_identitas beserta nama pbm
router.get('/', (req, res) => {
  SekolahIdentitas.findAll({
    include: {
      model: Pbm,
      attributes: ['nama']
    }
  })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data.' });
    });
});

module.exports = router;


//front end
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [sekolahIdentitas, setSekolahIdentitas] = useState([]);
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [pbm, setPbm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/sekolah_identitas')
      .then((response) => {
        setSekolahIdentitas(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      nama: nama,
      email: email,
      waktu_pbm_id: pbm
    };

    axios.post('http://localhost:3000/sekolah_identitas', data)
      .then((response) => {
        console.log('Data berhasil disimpan:', response.data);
      })
      .catch((error) => {
        console.log('Terjadi kesalahan:', error);
      });
  };

  return (
    <div>
      <h1>Form Sekolah Identitas</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nama">Nama:</label>
        <input type="text" id="nama" name="nama" value={nama} onChange={(event) => setNama(event.target.value)} />
        <br />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        <br />
        <label htmlFor="pbm">PBM:</label>
        <select id="pbm" name="pbm" value={pbm} onChange={(event) => setPbm(event.target.value)}>
          <option value="">Pilih PBM</option>
          {sekolahIdentitas.map((item) => (
            <option key={item.id} value={item.waktu_pbm_id}>{item.pbm.nama}</option>
          ))}
        </select>
        <br />
        <button type="submit">Simpan</button>
      </form>
    </div>
  );
}

export default App;