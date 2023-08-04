const express = require("express");
const router = express.Router();
const Sekolah_alamat = require("../models/sekolah_alamat")
const {v4:uuidv4} = require("uuid")

router.route("/sekolah_alamat")
    .get(async(req,res) => {
        try{
            const allData = await Sekolah_alamat.findAll();
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

    //uuid sekolah diambil dari variabel uuid yang digenerate di react dan disimpan di menu identitas di react
    .post(async(req,res) => {
        try{
            const createData = await Sekolah_alamat.create({
                sekolah_alamat_id:uuidv4(),
                sekolah_id:req.body.sekolah_id,
                alamat_jalan:req.body.alamatjalan,
                rt:req.body.rt,
                rw:req.body.rw,
                nama_dusun:req.body.namadusun,
                kode_wilayah:req.body.kodewilayah,
                kode_pos:req.body.kodepos,
                lintang:req.body.lintang,
                bujur:req.body.bujur,
                tmt:req.body.tmt,
                
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

router.route("/sekolah_alamat/:uuid")
    .put(async(req,res)=> {
        try{

            let id = req.params.uuid;
            const editItem = await Sekolah_alamat.findByPk(id)
            if(editItem){
                editItem.update(
                    {
                    
                        alamat_jalan:req.body.alamatjalan,
                        rt:req.body.rt,
                        rw:req.body.rw,
                        nama_dusun:req.body.namadusun,
                        kode_wilayah:req.body.kodewilayah,
                        kode_pos:req.body.kodepos,
                        lintang:req.body.lintang,
                        bujur:req.body.bujur,
                        tmt:req.body.tmt,
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
            const id = req.params.uuid;
            const deleteItem = await Sekolah_alamat.findByPk(id)
            if(deleteItem){
                deleteItem.destroy();
                res.status(200).json(
                    {
                        message:"Data berhasil dihapus",
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
    .get(async(req,res) => {
        try{
            let id = req.params.uuid
            const findData = await Sekolah_alamat.findByPk(id)
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