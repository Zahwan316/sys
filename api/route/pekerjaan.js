const express = require("express");
const router = express.Router();
const Ref_pekerjaan = require("../models/pekerjaan")

router.route("ref_pekerjaan")
    .get(async(req,res) => {
        try{
            const allData = await Ref_pekerjaan.findAll()
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