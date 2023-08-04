const express = require("express");
const Sequelize = require('sequelize');
const router = express.Router();
const Ptk_tugas_mengajar = require("../models/ptk_tugas_mengajar")
const {v4:uuidv4} = require("uuid");
const Ptk = require("../models/ptk");
const Jadwal_kbm = require("../models/jadwal_kbm")

router.route("/ptk_tugas_mengajar")
    .get(async(req,res) => {
        try{
            const getData = await Ptk_tugas_mengajar.findAll({
                /* include:{
                    model:Ptk,
                    as:"nama"
                } */
            })
            res.status(200).json({
                message:"Data berhasil didapatkan",
                data:getData,
                method:req.method
            })
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
    .post(async(req,res) => {
        try{
            const createData = await Ptk_tugas_mengajar.create(
                {
                    ptk_penugasan_id:uuidv4(),
                    ptk_id:req.body.ptk_id,
                    semester_id:req.body.semester_id,
                    mapel_sp_id:req.body.mapel_sp_id,
                    jumlah_jam:req.body.jumlah_jam
                }
            )
            res.status(200).json(
                {
                    message:"Data berhasil ditambahkan",
                    data:createData,
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


router.route("/ptk_tugas_mengajar/:idpelajaran")
    .put(async(req,res) => {
        try{
            let id = req.params.idpelajaran
            const findItem = await Ptk_tugas_mengajar.findByPk(id)
            if(findItem){
                findItem.update({
                    ptk_id:req.body.ptk_id,
                    semester_id:req.body.semester_id,
                    mapel_sp_id:req.body.mapel_sp_id,
                    jumlah_jam:req.body.jumlah_jam
                })
                res.status(200).json(
                    {
                        message:"Data berhasil diedit",
                        method:req.method
                    }
                )
            }
            else{
                res.status(404).json({
                    message:"Data tidak ditemukan",
                    method:req.method
                })
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
    .delete(async(req,res) => {
        try{
            let id = req.params.idpelajaran
            const finditem = await Ptk_tugas_mengajar.findByPk(id)
            let finditemkbm = await Jadwal_kbm.findOne({
                where:{
                    ptk_penugasan_id:id
                }
            })

            if(finditemkbm){
                finditemkbm.destroy()
            }

            if(finditem){
                finditem.destroy()

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
    .get(async(req,res) => {
        try{
            let id = req.params.idpelajaran
            const findData = await Ptk_tugas_mengajar.findAll({
                where:{
                    mapel_sp_id:id
                },
                
            })
            if(findData){
                res.status(200).json({
                    message:"Data berhasil didapatkan",
                    data:findData,
                    method:req.method
                })
            }
            else{
                res.status(404).json({
                    message:"Data tidak ditemukan",
                    data:findData,
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

router.route("/ptk_tugas_mengajar/ptkid/:ptkid")
    .get(async(req,res) => {
        try{
            let id = req.params.ptkid
            const findData = await Ptk_tugas_mengajar.findByPk(id)

            if(findData){
                res.status(200).json({
                    message:"Data berhasil didapatkan",
                    data:findData,
                    method:req.method
                })
            }
            else{
                res.status(404).json({
                    message:"Data tidak ditemukan",
                    data:findData,
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

module.exports = router