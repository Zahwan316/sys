const express = require("express");
const Sequelize = require('sequelize');
const router = express.Router();
const Kbm_mapel_sp = require("../models/mapel_sp")
const {v4:uuidv4} = require("uuid")

router.route("/kbm_mapel_sp")
    .get(async(req,res) => {
        try{
            const getData = await Kbm_mapel_sp.findAll({
                order:[["mapel_rank","ASC"]]
            })
            res.status(200).json(
                {
                    message:"Data berhasil diambil",
                    data:getData,
                    method:req.method
                }
                )  
        }
        catch(e){
            res.status(400).json({
                message:e.message,
                mtehod:req.method
            })
        }
    })
    .post(async(req,res) => {
        try{
            const createData = await Kbm_mapel_sp.create({
                mapel_sp_id:uuidv4(),
                sekolah_id:req.body.sekolah_id,
                kurikulum_id:req.body.kurikulum_id,
                kelompok:req.body.kelompok,
                mapel_kode:req.body.mapel_kode,
                mapel_rank:req.body.urutan,
                nama:req.body.nama,
                is_industri:req.body.is_industri
            })
            res.status(200).json({
                message:"data berhasil dikirim",
                method:req.method,
                data:createData
            })
        }
        catch(e){
            res.status(400).json({
                message:e.message,
                method:req.method
            })
        }
    })

router.route("/kbm_mapel_sp/:id")
    .put(async(req,res) => {
        try{
            let id = req.params.id
            const findItem = await Kbm_mapel_sp.findByPk(id)
            if(findItem){
                findItem.update({
                    sekolah_id:req.body.sekolah_id,
                    kurikulum_id:req.body.kurikulum_id,
                    kelompok:req.body.kelompok,
                    mapel_kode:req.body.mapel_kode,
                    mapel_rank:req.body.urutan,
                    nama:req.body.nama
                })
                res.status(200).json({
                    message:"Data berhasil ditambahkan",
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
            let id = req.params.id
            const findItem = await Kbm_mapel_sp.findByPk(id)
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
            res.status(400).json({
                message:e.message,
                method:req.method
            })
        }
    })
    .get(async(req,res) => {
        try{
            let id = req.params.id
            const findItem = await Kbm_mapel_sp.findByPk(id)
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
            res.status(400).json({
                message:e.message,
                method:req.method
            })
        }
    })

router.route("/kbm_mapel_sp/nasional")
    .get(async(req,res) => {
        try{
            const allitem = await Kbm_mapel_sp.findAll({
                where:{
                    kelompok:'A'
                }
            })
            res.status(200).json({
                message:"Data berhasil diambil",
                data:allitem,
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

module.exports = router