const express = require("express");
const router = express.Router();
const {v4:uuidv4} = require("uuid");
const Status_kepemilikan = require("../models/status_kepemilikan")

router.route("/status_kepemilikan")
    .get(async(req,res) => {
        try{
            const getData = await Status_kepemilikan.findAll()
            res.status(200).json({
                message:"Data berhasil diambil",
                data:getData,
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