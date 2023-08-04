const express = require("express");
const Sequelize = require('sequelize');
const router = express.Router();
const Tingkat_pedidikan = require('../models/tingkat_pendidikan')

router.route("/tingkat_pendidikan")
    .get(async(req,res) => {
        try{
            const allData = await Tingkat_pedidikan.findAll()
            res.status(200).json(
                {
                    message:"Data berhasil diambil",
                    data:allData,
                    method:req.method
                }
            )
        }
        catch(e){
            res.status(200).json(
                {
                    message:e.message,
                    method:req.method
                }
            )       
        }
    })

module.exports = router