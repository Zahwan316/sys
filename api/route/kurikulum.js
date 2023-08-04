const express = require("express");
const router = express.Router();
const {v4:uuidv4} = require("uuid")
const Kurikulum = require("../models/kurikulum")

router.route("/kurikulum")
    .get(async(req,res) => {
        try{
            const allData = await Kurikulum.findAll()
            res.status(200).json(
                {
                    message:"Data Berhasil Diambil",
                    data:allData,
                    method:req.method
                }
            )
        }
        catch(e){
            res.status(400).json(
                {
                    message:e.message,
                    method:e.method
                }
            )
        }
    })

module.exports = router