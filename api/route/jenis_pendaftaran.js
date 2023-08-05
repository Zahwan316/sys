const express = require("express");
const router = express.Router();
const {v4:uuidv4} = require("uuid")
const Jenis_pendaftaran = require("../models/jenis_pendaftaran.js")

router.route("/jenis_pendaftaran")
    .get(async(req,res) => {
        try{
            const allData = await Jenis_pendaftaran.findAll()
            res.status(200).json({
                message:"Data berhasil diambil",
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