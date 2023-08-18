const express = require("express");
const router = express.Router();
const {v4:uuidv4} = require("uuid")
const Agama = require('../models/agama')

router.route("/agama")
    .get(async(req,res) => {
        try{
            const allData = await Agama.findAll()

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