const express = require("express");
const router = express.Router();
const {v4:uuidv4} = require("uuid")
const Lembaga_pengangkat = require("../models/lembaga_pengangkat");

router.route("/lembaga_pengangkat")
    .get(async(req,res) => {
        try{
            const allData = await Lembaga_pengangkat.findAll();
            res.status(200).json({
                message:"Data berhasil diambil",
                data:allData,
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