const express = require("express");
const Sequelize = require('sequelize');
const router = express.Router();
const {v4:uuidv4} = require("uuid");
const Status_sekolah = require("../models/status_sekolah");
const { get } = require("./sekolah_alamat");

router.route("/status_sekolah")
    .get(async(req,res) => {
        try{
            const getData = await Status_sekolah.findAll();

            res.status(200).json(
                {
                    message:"Data berhasil diambil",
                    data:getData,
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

module.exports = router;