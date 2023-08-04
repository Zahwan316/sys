const express = require("express");
const router = express.Router();
const Sekolah_iso = require("../models/sekolah_sertifikasi_iso")
const {v4:uuidv4} = require("uuid")

router.route("/sekolah_iso")
    .get(async(req,res) => {
        try{
            const getData = await Sekolah_iso.findAll();

            res.status(200).json({
                message:"Data berhasil diambil",
                data:getData
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
            const createData = await Sekolah_iso.create({
                sekolah_sertifikasi_iso_id:uuidv4(),
                sekolah_id:req.body.sekolahid,
                sertifikasi_iso_id:req.body.iso_id,
                nomor_sertifikasi_iso:req.body.nosertifikasi,
                tanggal_sertifikasi_iso:req.body.tanggalsertifikasi
            })
            res.status(200).json({
                message:"Data berhasil ditambahkan",
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

router.route("/sekolah_iso/:uuid")
    .put(async(req,res) => {
        try{
            let id = req.params.uuid;
            const editItem = await Sekolah_iso.findByPk(id)
            if(editItem){
                editItem.update(
                    {
                        sertifikasi_iso_id:req.body.iso_id,
                        nomor_sertifikasi_iso:req.body.nosertifikasi,
                        tanggal_sertifikasi_iso:req.body.tanggalsertifikasi
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
            const deleteItem = await Sekolah_iso.findByPk(id)
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
            const findData = await Sekolah_iso.findByPk(id)
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


module.exports = router;