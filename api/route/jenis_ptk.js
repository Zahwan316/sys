const express = require("express");
const router = express.Router();
const {v4:uuidv4} = require("uuid")
const Jenis_ptk = require("../models/jenis_ptk")

router.route("/jenis_ptk")
    .get(async(req,res) => {
        try{
            const getData = await Jenis_ptk.findAll({
              attributes:{
                exclude:["id"]
              }
            })
            res.status(200).json({
                message:"Data berhasil diambil",
                data:getData,
                method:req.method
            })
        }
        catch(e){
            res.status(500).json({message:e.message,method:req.method})
        }
    })

module.exports = router;