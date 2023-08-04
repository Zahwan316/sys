const express = require("express");
const router = express.Router();
const Bentuk_pendidikan = require("../models/bentuk_pendidikan")

router.route("/bentuk_pendidikan")
    .get(async(req,res) => {
        try{
            const allData = await Bentuk_pendidikan.findAll()
            res.status(200).json(
                {
                    message:"Data berhasil diambil",
                    data:allData
                }
                )
        }
        catch(e){
            res.status(400),json(
                {
                    message:e.message
                }
            )
        }
    })

module.exports =  router;