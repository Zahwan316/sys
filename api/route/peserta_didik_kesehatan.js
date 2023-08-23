const express = require("express");
const router = express.Router();
const {v4:uuidv4} = require("uuid")
const Peserta_didik_kesehatan = require("../models/peserta_didik_kesehatan")

router.route('/peserta_didik_kesehatan')
    .get(async(req,res) => {
        try{
            const allData = await Peserta_didik_kesehatan.findAll()
            res.status(200).json({
                message:"Data berhasil diambil",
                data:allData,
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
            const createData = await Peserta_didik_kesehatan.create({
                peserta_didik_kesehatan_id:uuidv4(),
                peserta_didik_id:req.body.peserta_didik_id,
                buta_warna:req.body.buta_warna,
                berat_badan:req.body.berat_badan,
                tinggi_badan:req.body.tinggi_badan,
                lingkar_kepala:req.body.lingkar_kepala,
                visus_mata:req.body.visus_mata,
                ldl:req.body.ldl,
                hdl:req.body.hdl,
                gula_darah:req.body.gula_darah,
                tekanan_darah:req.body.tekanan_darah,
                tanggal_test:req.body.tanggal_uji
            })
            res.status(200).json({
                message:"Data berhasil ditambahkan",
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

router.route("/peserta_didik_kesehatan/:id")
    .delete(async(req,res) => {
        try{
            let id = req.params.id
            const findData = await Peserta_didik_kesehatan.findByPk(id)
            if(findData){
                findData.destroy()
                res.status(200).json({
                    message:"Data berhasil didapatkan",
                    data:findData,
                    method:req.method
            })
            }
            else[
                res.status(404).json({
                    message:"Data tidak ditemukan",
                    method:req.method
                })
            ]
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
            const findData = await Peserta_didik_kesehatan.findByPk(id)
            if(findData){
                res.status(200).json({
                    message:"Data berhasil didapatkan",
                    data:findData,
                    method:req.method
            })
            }
            else[
                res.status(404).json({
                    message:"Data tidak ditemukan",
                    method:req.method
                })
            ]
        }
        catch(e){
            res.status(400).json({
                message:e.message,
                method:req.method
            })
        }
    })

module.exports = router