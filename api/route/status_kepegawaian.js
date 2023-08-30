const express = require("express");
const router = express.Router();
const {v4:uuidv4} = require("uuid")
const Status_kepegawaian = require("../models/status_kepegawaian")

router.route("/status_kepegawaian")
    .get(async(req,res) => {
        try{
            const getData = await Status_kepegawaian.findAll();
            res.status(200).json({
                message:"Data berhasil diambil",
                data:getData,
                method:req.method
            }
            );      
        }
        catch(e){
            res.status(500).json({
                message:e.message,
                method:req.method
            })
        }
    })

module.exports = router