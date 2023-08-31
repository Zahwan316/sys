const express = require("express");
const router = express.Router();
const {v4:uuidv4} = require("uuid")
const Sumber_gaji = require("../models/sumber_gaji");

router.route("/sumber_gaji")
    .get(async(req,res) => {
        try{
            const allData = await Sumber_gaji.findAll({
                attributes:{
                    exclude:["id"]
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

module.exports = router;