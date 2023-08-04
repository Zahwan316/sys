const express = require("express");
const Sequelize = require('sequelize');
const router = express.Router();
const Jenis_rombel = require("../models/jenis_rombel")

router.route("/jenis_rombel")
    .get(async(req,res) => {
        try{
            const allData = await Jenis_rombel.findAll(
                {
                    attributes:{
                        exclude:"id"
                    }
                }
            )
            res.status(200).json(
                {
                    message:"data berhasil diambil",
                    data:allData,
                    method:req.method
                }
            )
        }
        catch(e){
            res.status(400).json(
                {
                    message:e.message,
                    method:req.method
                }
            )
        }
    })

module.exports = router