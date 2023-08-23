const express = require("express");
const Sequelize = require('sequelize');
const router = express.Router();
const {v4:uuidv4} = require("uuid")
const Peserta_didik_kontak = require("../models/peserta_didik_kontak")

router.route("/peserta_didik_kontak")
    .get(async(req,res) => {
        try{
            const allData = await Peserta_didik_kontak.findAll()
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

