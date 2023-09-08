const express = require("express");
const router = express.Router();
const {v4:uuidv4} = require("uuid")
const Pos = require("../models/pos");

router.route("/pos")
    .get(async(req,res) => {
        try{
            const allData = await Pos.findAll()
            res.status(200).json({
                message:"Data berhasil diambil",
                data:allData,
                method:req.method,
            }
            )
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
            const createData = await Pos.create({
                _id:req.body._id,
                kode_pos:req.body.kode_pos,
                nama:req.body.nama,
                is_cicilan_fix:req.body.is_cicilan_fix,
                berapax_cicilan_fix:req.body.berapax_cicilan_fix
            })
            res.status(200).json({
                message:"Data berhasil ditambahkan",
                method:req.method,
            })
        }
        catch(e){
            res.status(500).json({
                message:e.message,
                method:req.method
            })
        }
    })

router.route("/pos/:id")
    .get(async(req,res) => {
        try{
            let id = req.params.id
            const finditem = await Pos.findByPk(id)
            if(finditem){
                res.status(200).json({
                    message:"Data berhasil diambil",
                    data:finditem,
                    method:req.method,
                })
            }
            else{
                res.status(404).json({
                    message:"Data tidak ditemukan",
                    method:req.method,
                })
            }
        }
        catch(e){
            res.status(400).json({
                message:e.message,
                method:req.method
            })
        }
    })
    .delete(async(req,res) => {
        try{
            let id = req.params.id
            const findItem = await Pos.findByPk(id)
            if(findItem)
            {
                res.status(200).json({
                    message:"Data berhasil dihapus",
                    method:req.method,
                })
            }
            else{
                res.status(404).json({
                    message:"Data tidak ditemukan",
                    method:req.method,
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
    .put(async(req,res) => {
        try{
            const id = req.params.id
            const findItem = await Pos.findByPk(id)
            if(findItem){
                findItem.update({
                    ...req.body
                })
                res.status(200).json({
                    message:"Data berhasil diubah",
                    method:req.method,
                })
            }
            else{
                res.status(404).json({
                    message:"Data tidak ditemukan",
                    method:req.method,
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