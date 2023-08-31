const express = require("express");
const router = express.Router();
const {v4:uuidv4} = require("uuid")
const Pangkat_golongan = require("../models/pangkat_golongan")

router.route("/pangkat_golongan")
    .get(async(req,res) => {
        try{
            const alltData = await Pangkat_golongan.findAll()
            res.status(200).json({
                message:"Data berhasil diambil",
                data:alltData,
                method:req.method
            })
        }
        catch(e){
            res.status(500).json({
                message:e.message,
                method:req.method
            })
        }
    })

module.exports = router