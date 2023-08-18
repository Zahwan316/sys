const express = require("express");
const router = express.Router();
const {v4:uuidv4} = require("uuid")
const Jenis_kewarganegaraan = require('../models/jenis_kewarganegaraan')

router.route("/jenis_kewarganegaraan")
    .get(async(req,res) => {
        try{
            const allData = await Jenis_kewarganegaraan.findAll()
            res.status(200).json({
                message:"Data berhasil didapatkan",
                data:allData,
                method:req.method
            })
        }
        catch(e){
            res.status(400).json({
                message:e.message,
                method:req.method
            })
        }
    })

module.exports = router