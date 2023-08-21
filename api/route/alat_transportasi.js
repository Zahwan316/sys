const express = require("express");
const router = express.Router();
const Alat_transportasi = require("../models/alat_transportasi")

router.route("/alat_transportasi")
    .get(async(req,res) => {
        try{
            const allData = await Alat_transportasi.findAll()
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