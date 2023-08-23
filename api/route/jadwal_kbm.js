const express = require("express");
const router = express.Router();
const {v4:uuidv4} = require("uuid")
const Jadwal_kbm = require("../models/jadwal_kbm")
const Waktu_kbm = require("../models/waktu_kbm")


Waktu_kbm.belongsTo(Jadwal_kbm ,{
    foreignKey:"hari_ke"
})
Jadwal_kbm.hasOne(Waktu_kbm,{
    foreignKey:"hari_ke"
})

router.route("/jadwal_kbm")
    .get(async(req,res) => {
        try{
            const allData = await Jadwal_kbm.findAll({
                
            })
            res.status(200).json({
                message:"Data berhasil diambil",
                data:allData,
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
            const createData = await Jadwal_kbm.create(
                {
                    jadwal_kbm_id:uuidv4(),
                    ptk_penugasan_id:req.body.ptk_penugasan_id,
                    ptk_id:req.body.ptk_id,
                    rombongan_belajar_id:req.body.rombongan_belajar_id,
                    hari_ke:req.body.hari_ke,
                    jam_ke:req.body.jam_ke,
                    tanggal:req.body.tanggal
                }
            )
            res.status(200).json({
                message:"Data terkirim",
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

router.route("/jadwal_kbm/:id")
    .get(async(req,res) => {
        try{
            let id = req.params.id
            const findData = await Jadwal_kbm.findAll({
                where:{
                    ptk_penugasan_id:id
                }
            })
            if(findData){
                res.status(200).json(
                    {
                        message:"Data ditemukan",
                        data:findData,
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
    .put(async(req,res) => {
        try{
            let id = req.params.id
            let findItem = await Jadwal_kbm.findByPk(id)
            if(findItem){
                findItem.update({
                    ptk_penugasan_id:req.body.ptk_penugasan_id,
                    ptk_id:req.body.ptk_id,
                    rombongan_belajar_id:req.body.rombongan_belajar_id,
                    hari_ke:req.body.hari_ke,
                    jam_ke:req.body.jam_ke,
                    tanggal:req.body.tanggal,
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
            res.status(400).json({
                message:e.message,
                method:req.method
            })
        }
    })
    .delete(async(req,res) => {
        try{
            let id = req.params.id;
            const findData = await Jadwal_kbm.findByPk(id)
            if(findData){
                findData.destroy()
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

router.route("/jadwal_kbm/id/:id")
    .get(async(req,res) => {
        try{
            let id = req.params.id
            const findItem = await Jadwal_kbm.findByPk(id)
            if(findItem){
                res.status(200).json({
                    message:"data berhasil ditemukan",
                    data:findItem,
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

module.exports = router