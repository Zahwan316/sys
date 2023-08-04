const express = require("express");
const router = express.Router();
const Sertifikasi_iso = require("../models/sertifikasi_iso")

router.route("/sertifikasi_iso")
    .get(async(req,res) =>{
        try{
            const allData = await Sertifikasi_iso.findAll({attributes:{exclude:"id"}})
            res.status(200).json({
                message:"data berhasil diambil",
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