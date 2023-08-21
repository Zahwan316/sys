const express = require("express");
const router = express.Router();
const Jenis_tinggal = require("../models/jenis_tinggal")

router.route("/jenis_tinggal")
    .get(async(req,res) => {
        try{
            const allData = await Jenis_tinggal.findAll()
            res.status(200).json({
                message:"data berhasil diambil",
                data:allData,
                method:req.method
            })
        }
        catch(e){
            res.status(400).json({
                message:e.messagge,
                method:req.method
            })
        }
    })

module.exports = router