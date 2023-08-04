const express = require("express");
const router = express.Router();
const Bank = require("../models/bank")

router.route("/bank")
    .get(async(req,res) => {
        try{
            const allData = await Bank.findAll({order:[["nm_bank","ASC"]]});
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