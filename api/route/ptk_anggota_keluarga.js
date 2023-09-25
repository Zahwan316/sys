const express = require("express");
const router = express.Router();
const Ptk_anggota_keluarga = require("../models/ptk_anggota_keluarga")
const {v4:uuidv4} = require("uuid")

router.route("/ptk_anggota_keluarga")
    .get(async(req,res) => {
        try{
            const allData = await Ptk_anggota_keluarga.findAll({
                attributes:{
                    exclude: "id"
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
    .post(async(req,res) => {
        try{
            const createItem = await Ptk_anggota_keluarga.create({
                ...req.body,
                ptk_anggota_keluarga_id:uuidv4(),
            })
            res.status(200).json({
                message:"Data berhasil ditambahkan",
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

router.route("/ptk_anggota_keluarga/:id")
    .put(async(req,res) => {
        try{
            const id = req.params.id
            const findItem = await Ptk_anggota_keluarga.findByPk(id)
            if(findItem){
                findItem.update({
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
                message:e.message,
                method:req.method
            })
        }
    })
    .delete(async(req,res) => {
        try{
            const id = req.params.id
            const findItem = await Ptk_anggota_keluarga.findByPk(id)
            if(findItem){
                findItem.destroy()
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
                message:e.message,
                method:req.method
            })
        }
    })
    .get(async(req,res) => {
        try{
            const id = req.params.id
            const findItem = await Ptk_anggota_keluarga.findByPk(id)
            if(findItem){
                res.status(200).json({
                    message:"Data berhasil diambil",
                    method:req.method,
                    data:findItem
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