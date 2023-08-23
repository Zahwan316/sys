const express = require("express");
const router = express.Router();
const {v4:uuidv4} = require("uuid")
const Peserta_didik_rekening = require("../models/peserta_didik_rekening")

router.route("/peserta_didik_rekening")
    .get(async(req,res) => {
        try{
            const allData = await Peserta_didik_rekening.findAll()

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