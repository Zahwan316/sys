const express = require("express");
const {Op} = require("sequelize")
const router = express.Router();
const {v4:uuidv4} = require("uuid")
const Merdeka_mapel = require("../models/merdeka_mapel")

router.route("/merdeka_mapel")
    .get(async(req,res) => {
        try{
            const allData = await Merdeka_mapel.findAll({
                attributes:{
                    exclude:"id"
                },
                order:[["kelompok","ASC"],['nama',"ASC"]]
            })
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