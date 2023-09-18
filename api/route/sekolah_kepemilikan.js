const express = require("express");
const router = express.Router();
const {v4:uuidv4} = require("uuid");
const Sekolah_kepemilikan = require("../models/sekolah_kepemilikan")

router.route("/sekolah_kepemilikan")
    .get(async(req,res) => {
        try{
            const getData = await Sekolah_kepemilikan.findAll(
               
            )
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
        try{
            const createData = await Sekolah_kepemilikan.create({
                ...req.body,
                sekola_kepemilikan_id:uuidv4(),
            })
            res.status(200).json({
                message:"Data berhasil Ditambahkan",
                data:createData,
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

router.route("/sekolah_kepemilikan/:uuid")
    .put(async(req,res) => {
        try{
            let id = req.params.uuid;
            const editItem = await Sekolah_kepemilikan.findByPk(id)
            if(editItem){
                editItem.update(
                    {
                      ...req.body
                    }
                )
                res.status(200).json({
                    message:"Data berhasil diedit",
                    method:req.method
                })
            }
            else{
                res.status(404).json({
                    message:"data tidak ditemukan",
                    method:req.method
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
            const id = req.params.uuid
            const deleteItem = await Sekolah_kepemilikan.findByPk(id)
            if(deleteItem){
                deleteItem.destroy()
                res.status(200).json(
                    {
                        message:"Data berhasil dihapus",
                        method:req.method
                    }
                )
            }
            else{
                res.status(404).json(
                    {
                        message:"Data Tidak Ditemukan",
                        method:req.method
                    }
                )
            }
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
    .get(async(req,res) => {
        try{
            let id = req.params.uuid
            const findData = await Sekolah_kepemilikan.findByPk(id)
            if(findData){
                res.status(200).json({
                    message:"Data berhasil ditemukan",
                    data:findData,
                    method:req.method
                })
            }
            else{
                res.status(404).json(
                    {
                        message:"Data tidak ditemukan",
                        method:req.method
                    }
                )
            }
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