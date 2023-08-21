const express = require("express");
const router = express.Router();
const {v4:uuidv4} = require("uuid")
const Peserta_didik_alamat = require("../models/peserta_didik_alamat")

router.route("/peserta_didik_alamat")
    .get(async(req,res) => {
        try{
            const allData = await Peserta_didik_alamat.findAll()
            res.status(200).json({
                message:"Data berhasil diambil",
                data:allData,
                method:req.method
            }) 
        }
        catch(e){

        }
    })


module.exports = router