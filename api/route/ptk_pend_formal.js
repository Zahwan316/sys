const express = require("express");
const router = express.Router();
const {v4:uuidv4} = require("uuid")
const Ptk_pend_formal = require("../models/ptk_pend_formal");

router.route("/ptk_pend_formal")
    .get(async(req,res) => {
        try{
            const allData = await Ptk_pend_formal.findAll()
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

    .post(async(req,res) => {
        try{
            const sendData = await Ptk_pend_formal.create({
                ...req.body,
                ptk_pend_formal_id:uuidv4(),
            })
            res.status(200).json({
                message:"Data berhasil dikirim",
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

router.route("/ptk_pend_formal/:id")
    .put(async(req,res) => {
        try{
            let id = req.params.id
            const findItem = await Ptk_pend_formal.findByPk(id)

            if(findItem){
                findItem.update({
                    ...req.body,

                })
                res.status(200).json({
                    message:"Data berhasil diedit",
                    method:req.method,
                })
            }
            else{
                res.status(404).json({
                    message:"Data tidak ditemukan",
                    method:req.method
                })
            }
        }
        catch(e)
        {
            res.status(500).json({
                message:e.message,
                method:req.method
            })
        }
    })

    .delete(async(req,res) => {
        try{
            let id = req.params.id
            const findItem = await Ptk_pend_formal.findByPk(id) 
            if(findItem){
                findItem.destroy()
                res.status(200).json({
                    message:"Data berhasil dihapus",
                    method:req.method,
                })
            }
            else{
                res.status(404).json({
                    message:"Data tidak ditemukan",
                    method:req.method
                })
            }
        }
        catch(e){
            res.status(500).json({
                message:e.message,
                method:req.method
            })
        }
    })

    .get(async(req,res) => {
        try{
            let id = req.params.id
            const findData = await Ptk_pend_formal.findByPk(id)
            if(findData){
                res.status(200).json({
                    message:"Data berhasil diambil",
                    data:findData,
                    method:req.method
                })
            }
            else{
                res.status(404).json({
                    message:"Data tidak ditemukan",
                    method:req.method
                })
            }
        }
        catch(e){
            res.status(500).json({
                message:e.message,
                method:req.method
            })
        }
    })

module.exports = router