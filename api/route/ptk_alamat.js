const express = require("express");
const {Op} = require("sequelize")
const router = express.Router();
const {v4:uuidv4} = require("uuid")
const Ptk_alamat = require("../models/ptk_alamat")

router.route("/ptk_alamat")
    .get(async(req,res) => {
        try{
            const allData = await Ptk_alamat.findAll()
            res.status(200).json({
                message:"Data berhasil diambil",
                data:allData,
                method:req.method,
            })
        }
        catch(e){
            res.status(500).json({
                messaget:e.message,
                method:req.method
            })
        }
    })
    .post(async(req,res) => {
        try{
            const createdata = await Ptk_alamat.create({
                ptk_alamat_id:uuidv4(),
                ...req.body
            })
            res.status(200).json({
                message:"Data berhasil ditambahkan",
                method:req.method
            })
        }
        catch(e){
            res.status(500).json({
                messaget:e.message,
                method:req.method
            })
        }
    })

router.route("/ptk_alamat/:id")
    .put(async(req, res) => {
        try{
            let id = req.params.id
            let finditem = await Ptk_alamat.findByPk(id)
            if(finditem) {
                finditem.update({
                    ...req.body,
                })
                res.status(200).json({
                    message:"Data berhasil diedit",
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
                messaget:e.message,
                method:req.method
            })
        }
    })
    .delete(async(req,res) => {
        try{
            let id = req.params.id
            const findItem = await Ptk_alamat.findByPk(id)
            if(findItem){
                findItem.destroy()
                res.status(200).json({
                    message:"Data berhasil dihapus",
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
                messaget:e.message,
                method:req.method
            })
        }
    })
    .get(async(req,res) => {
        try{
            let id = req.params.id
            let findItem = await Ptk_alamat.findByPk(id)
            if(findItem){
                res.status(200).json({
                    message:"Data berhasil diambil",
                    data:findItem,
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
                messaget:e.message,
                method:req.method
            })
        }
        
    })

module.exports = router