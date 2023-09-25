const express = require("express");
const router = express.Router();
const Hubungan_keluarga = require("../models/hubungan_keluarga")

router.route("/hubungan_keluarga")
    .get(async(req,res) => {
        try{
            const allData = await Hubungan_keluarga.findAll({
                attributes:{
                    exclude: "id"
                }
            });
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