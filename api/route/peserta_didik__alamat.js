const express = require("express");
const router = express.Router();
const {v4:uuidv4} = require("uuid")
const Peserta_didik_alamat = require("../models/peserta_didik_alamat")

router.route("/peserta_didik_alamat")
    .get(async(req,res) => {
        try{
            const allData = await Peserta_didik_alamat.findAll()
            res.status(200).json({
                message:"Data berhasil diambil",
                data:allData,
                method:req.method
            }) 
        }
        catch(e){

        }
    })
    .post(async(req,res) => {
        try{
            const createData = await Peserta_didik_alamat.create({
                peserta_didik_alamat_id:uuidv4(),
                peserta_didik_id:req.body.peserta_didik_id,
                alamat_jalan:req.body.alamat_jalan,
                rt:req.body.rt,
                rw:req.body.rw,
                nama_dusun:req.body.nama_dusun,
                kode_wilayah:req.body.kdoe_wilayah,
                kode_pos:req.body.kode_pos,
                lintang:req.body.lintang,
                bujur:req.body.bujur,
                jenis_tinggal_id:req.body.jenis_tinggal_id,
                jarak_ke_sekolah:req.body.jarak_ke_sekolah,
                keaktifan:req.body.keaktifan,
                tmt:req.body.tmt
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

    router.route("/peserta_didik_alamat/:id")
        .delete(async(req,res) => {
            try{
                let id = req.params.id
                let findData = await Peserta_didik_alamat.findByPk(id)
                if(findData){
                    findData.destroy()
                    res.status(200).json({
                        message:"Berhasil Dihapus",
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
        .put(async(req,res) => {
            try{
                let id = req.params.id
                let findData = await Peserta_didik_alamat.findByPk(id)
                if(findData){
                    findData.update({
                        alamat_jalan:req.body.alamat_jalan,
                        rt:req.body.rt,
                        rw:req.body.rw,
                        nama_dusun:req.body.nama_dusun,
                        kode_wilayah:req.body.kdoe_wilayah,
                        kode_pos:req.body.kode_pos,
                        lintang:req.body.lintang,
                        bujur:req.body.bujur,
                        jenis_tinggal_id:req.body.jenis_tinggal_id,
                        jarak_ke_sekolah:req.body.jarak_ke_sekolah,
                        keaktifan:req.body.keaktifan,
                        tmt:req.body.tmt
                    })
                    res.status(200).json({
                        message:"Data berhasil diedit",
                        method:req.method
                    })
                }
                else{
                    res.status(404).json({
                        message:"Data tidak ditemmukan",
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
                const id = req.params.id
                const findData = await Peserta_didik_alamat.findByPk(id)
                res.status(200).json({
                    message:"Data berhasil diambil",
                    data:findData,
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