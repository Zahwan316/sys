const express = require("express");
const router = express.Router();
const {v4:uuidv4} = require("uuid")
const Sekolah_alamat = require("../models/sekolah_alamat")
const Sekolah_akreditasi = require("../models/sekolah_akreditasi")

router.route("/sekolah_akreditasi")
    .get(async(req,res) => {
        try{
            const allData = await Sekolah_akreditasi.findAll();
            res.status(200).json(
                {
                    message:"Data berhasil diambil",
                    data:allData,
                    method:req.method
                }
            )
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
            const createData = await Sekolah_akreditasi.create(
                {
                    sekolah_akreditasi_id:uuidv4(),
                    sekolah_id:req.body.sekolahid,
                    status_akreditasi:req.body.status,
                    nilai_akreditasi:req.body.nilai,
                    nomor_sk_akreditasi:req.body.nomor,
                    tanggal_sk_akreditasi:req.body.tanggalsk

                }
            )
            res.status(200).json(
                {
                    message:"Data berhasil dikirim",
                    data:createData,
                    method:req.method
                }
            )    
        }
        catch(e){
            res.status(400).json({
                message:e.message,
                method:req.method
            })
        }
    })

router.route("/sekolah_akreditasi/:uuid")
    .put(async(req,res) => {
        try{
            let id = req.params.uuid;
            const editItem = await Sekolah_akreditasi.findByPk(id)
            if(editItem){
                editItem.update(
                    {
                        status_akreditasi:req.body.status,
                        nilai_akreditasi:req.body.nilai,
                        nomor_sk_akreditasi:req.body.nomor,
                        tanggal_sk_akreditasi:req.body.tanggalsk
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
            const deleteItem = await Sekolah_akreditasi.findByPk(id)
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
            const findData = await Sekolah_akreditasi.findByPk(id)
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