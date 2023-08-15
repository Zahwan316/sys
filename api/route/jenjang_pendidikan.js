const express = require("express");
const router = express.Router();
const {v4:uuidv4} = require("uuid")
const Jenjang_pendidikan = require("../models/jenjang_pendidikan")

router.route("/jenjang_pendidikan")
    .get(async(req,res) => {
        try{
            const allData = await Jenjang_pendidikan.findAll()
            res.status(200).json({
                message:'Data berhasil diambil',
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