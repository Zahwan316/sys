const express = require("express");
const Sequelize = require('sequelize');
const router = express.Router();
const {DataTypes} = require("sequelize")
const Sekolah_identitas = require("../models/sekolah_identitas");
const Waktu_penyelenggaraan = require("../models/waktu_penyelenggaraan");
const {v4:uuidv4} = require("uuid");

const Sekolah_alamat = require("../models/sekolah_alamat")
const Sekolah_iso = require("../models/sekolah_sertifikasi_iso")
const Sekolah_akreditasi = require("../models/sekolah_akreditasi")
const Sekolah_bank = require("../models/sekolah_bank")
const Sekolah_kepemilikan = require("../models/sekolah_kepemilikan")
const Kurikulum_sp = require("../models/kurikulum_sp")

router.route("/sekolah_identitas")
    .get(async(req,res) => {
        try{
            const allData = await Sekolah_identitas.findAll({
                //  include:{
                //     model:Waktu_penyelenggaraan,
                //      attributes:['nama']
                //  }
            });
            res.status(200).json({
                message:"Data berhasil diambil",
                data:allData
            })
        }
        catch(e){
            console.log(e.message);
        }
    })
    .post(async(req,res) => {
        try{
            const createData = await Sekolah_identitas.create({
                sekolah_id:req.body.sekolahid,
                nama:req.body.nama,
                npsn:req.body.npsn,
                bentuk_pendidikan_id:req.body.bentuk_pendidikan,
                status_sekolah:req.body.status_sekolah,
                waktu_pbm_id:req.body.waktu_kbm,
                sk_pendirian_sekolah:req.body.sk_pendirian,
                status_sekolah:req.body.status_sekolah,
                tanggal_sk_pendirian:req.body.tanggal_sk,
                mbs_kode:req.body.mbskode,
                npwp:req.body.npwp,
                nm_wp:req.body.nmwp,
                nomor_telepon:req.body.no_telpon,
                email:req.body.email,
                instagram:req.body.instagram,
                facebook:req.body.facebook,
                website:req.body.web,
                
                tmt:req.body.tmt,
                createDate:Date.now()
            })

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

router.route("/sekolah_identitas/:uuid")
    .put(async(req,res) => {
        try{
            let id = req.params.uuid;
            const editItem = await Sekolah_identitas.findByPk(id)
            if(editItem){
                editItem.update(
                    {
                        nama:req.body.nama,
                        npsn:req.body.npsn,
                        bentuk_pendidikan_id:req.body.bentuk_pendidikan,
                        status_sekolah:req.body.status_sekolah,
                        waktu_pbm_id:req.body.waktu_kbm,
                        sk_pendirian_sekolah:req.body.sk_pendirian,
                        status_sekolah:req.body.status_sekolah,
                        tanggal_sk_pendirian:req.body.tanggal_sk,
                        mbs_kode:req.body.mbskode,
                        npwp:req.body.npwp,
                        nm_wp:req.body.nmwp,
                        nomor_telepon:req.body.no_telpon,
                        email:req.body.email,
                        instagram:req.body.instagram,
                        facebook:req.body.facebook,
                        website:req.body.web,
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
            let id = req.params.uuid
            const deleteItem = await Sekolah_identitas.findByPk(id)
            const findAlamat = await Sekolah_alamat.findOne({
                where:{
                    sekolah_id:id
                }
            })
            const findAkreditasi = await Sekolah_akreditasi.findOne({
                where:{
                    sekolah_id:id
                }
            })
            const findIso = await Sekolah_iso.findOne({
                where:{
                    sekolah_id:id
                }
            })
            const findBank = await Sekolah_bank.findOne({
                where:{
                    sekolah_id:id
                }
            })
            const findKepemilikan = await Sekolah_kepemilikan.findOne({
                where:{
                    sekolah_id:id
                }
            })

            const findKurikulumSP = await Kurikulum_sp.findOne(
                {
                    where:{
                        sekolah_id:id
                    }
                }
            )


            if(deleteItem){
                deleteItem.destroy()
                findAlamat.destroy()
                findAkreditasi.destroy()
                findIso.destroy()
                findBank.destroy()
                findKepemilikan.destroy()
                findKurikulumSP.destroy()

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
            let id = req.params.uuid
            const findData = await Sekolah_identitas.findByPk(id)
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