const express = require("express");
const router = express.Router();
const {v4:uuidv4} = require("uuid")
const Jurusan = require("../models/jurusan")

router.route("/jurusan")
    .get(async(req,res) => {
        try{
            const allData = await Jurusan.findAll(
                {
                    order:[["jurusan_id","ASC"]]
                }
            )
            res.status(200).json(
                {
                    message:"data berhasil diambil",
                    data:allData,
                    method:req.method
                }
            )
        }
        catch(e){
            res.status(400).json(
                {
                    message:e.message,
                    method:req.method
                }
            )
        }
    })

router.route("/jurusan/:kurikulum")
    .get(async(req,res) => {
        try{
            let kurikulum = req.params.kurikulum
            const getdata = await Jurusan.findAll(
                {
                    where:{
                        kurikulum_id:kurikulum
                    },
                    order:[["jurusan_id","ASC"]]
                }
            )
            
            res.status(200).json(
                {
                    message:"data berhasil diambil",
                    data:getdata,
                    method:req.method
                }
            )    
            }


            catch(e){
                res.status(400).json(
                    {
                        message:e.message,
                        method:req.method
                    }
                )
            }
            })
            
            module.exports = router