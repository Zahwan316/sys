const express = require("express");
const Sequelize = require('sequelize');
const router = express.Router();
const Hari = require("../models/hari")

router.route("/hari")
    .get(async(req,res) => {
        try{
            const allData = await Hari.findAll()
            res.status(200).json({
                message:"Data berhasil diambil",
                data:allData,
                method:req.method,
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