const express = require("express");
const router = express.Router();
const {v4:uuidv4} = require("uuid")
const Ptk = require("../models/ptk")

router.route("/ptk")
    .get(async(req,res) => {
        try{
            const getData = await Ptk.findAll({
                order:[["nama","ASC"]]
            })
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
    .post(async(req,res) => {

    })

router.route("/ptk/:idpelajaran")
    .put(async(req,res) => {

    })
    .delete(async(req,res) => {

    })
    .get(async(req,res) => {
        
    })


module.exports = router