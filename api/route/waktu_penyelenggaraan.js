const express = require("express");
const router = express.Router();
const Waktu_penyelenggaraan = require("../models/waktu_penyelenggaraan");
const { all } = require("./identitas_sekolah");

router.route("/waktu_penyelenggaraan")
    .get(async(req,res) => {
        try{
            const allData = await Waktu_penyelenggaraan.findAll({
                attributes:{
                    exclude:"id"
                }
            });
            res.status(200).json(
                {
                    message:"Data berhasil diambil",
                    data:allData
                }
            )
        }
        catch(e){
            res.status(400).json({
                message:e.message
            })
        }
    })

module.exports = router