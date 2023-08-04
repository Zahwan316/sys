const express = require("express");
const Sequelize = require('sequelize');
const router = express.Router();
const Kbm_mapel_sp = require("../models/mapel_sp")

router.route("/kbm_mapel_sp")
    .get(async(req,res) => {
        try{
            const getData = await Kbm_mapel_sp.findAll({
                order:[["nama","ASC"]]
            })
            res.status(200).json(
                {
                    message:"Data berhasil diambil",
                    data:getData,
                    method:req.method
                }
                )  
        }
        catch(e){
            res.status(400).json({
                message:e.message,
                mtehod:req.method
            })
        }
    })
    .post(async(req,res) => {
        try{
            const createData = await Kbm_mapel_sp.create({
                
            })
        }
        catch(e){

        }
    })

module.exports = router