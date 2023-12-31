const express = require("express");
const router = express.Router();
const Program_studi = require("../models/program_studi")

router.route("/program_studi")
    .get(async(req,res) => {
        try{
            const allData = await Program_studi.findAll({
                attributes:{
                    exclude:"id"
                },
                order:[["nama","asc"]]
            })
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

module.exports = router