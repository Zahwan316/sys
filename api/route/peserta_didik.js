const express = require("express");
const router = express.Router();
const {v4:uuidv4} = require("uuid")
const Peserta_didik = require("../models/peserta_didik")

router.route("/peserta_didik")
    .get(async(req,res) => {
        try{
            const allData = await Peserta_didik.findAll()
            res.status(200).json({
                message:"Data berhasil diambil",
                data:allData,
                method:req.method
            })
        }
        catch(e){
            res.status(400).json({
                message:e.message,
                methode:req.method
            })
        }
    })

module.exports = router