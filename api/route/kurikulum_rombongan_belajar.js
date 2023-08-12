const express = require("express");
const Sequelize = require('sequelize');
const router = express.Router();
const Kurikulum_rombongan_belajar = require("../models/kurikulum_rombongan_belajar");
const Tingkat_pendidikan = require("../models/tingkat_pendidikan");
const Jenis_rombel = require("../models/jenis_rombel");
const {v4:uuidv4} = require("uuid")
const Jadwal_kbm = require("../models/jadwal_kbm")

router.route("/kurikulum_rombongan_belajar")
    .get(async(req,res) => {
        try{    
            const allData = await Kurikulum_rombongan_belajar.findAll(
                {
                   /*  include:[
                        {
                            model:Tingkat_pendidikan,
                            attributes:['nama']
                        },
                        {
                            model:Jenis_rombel,
                            as:"jenisrombel",
                            attributes:['nm_jenis_rombel']
                        } 
                    ] */
                }
            )
            res.status(200).json(
                {
                    message:"Data berhasil diambil",
                    data:allData,
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
    .post(async(req,res) => {
        try{
            const sendData = await Kurikulum_rombongan_belajar.create({
                rombongan_belajar_id:req.body.rombongan_belajar_id,
                kurikulum_program_id:req.body.kurikulum_program_id,
                tingkat_pendidikan_id:req.body.tingkat_pendidikan_id,
                nama:req.body.nama,
                jenis_rombel:req.body.jenis_rombel,
                semester_id:req.body.semester_id
            })
            res.status(200).json(
                {
                    message:"Data terkirim",
                    data:sendData,
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

router.route("/kurikulum_rombongan_belajar/:uuid")
    .put(async(req,res) => {
        try{
            let id = req.params.uuid
            const findItem = await Kurikulum_rombongan_belajar.findByPk(id)
            if(findItem){
                findItem.update({
                    kurikulum_program_id:req.body.kurikulum_program_id,
                    tingkat_pendidikan_id:req.body.tingkat_pendidikan_id,
                    nama:req.body.nama,
                    jenis_rombel:req.body.jenis_rombel,
                    semester_id:req.body.semester_id
                })
                res.status(200).json(
                    {
                        message:"Data berhasil diambil",
                        data:findItem,
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

        }
    })
    .delete(async(req,res) => {
        try{
            let id = req.params.uuid
            const findItem = await Kurikulum_rombongan_belajar.findByPk(id)
            const findKbm = await Jadwal_kbm.findOne({
                where:{
                    rombongan_belajar_id:id
                }
            })

            if(findKbm){
                findKbm.destroy()
            }

            if(findItem){
                findItem.destroy()
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
            const findItem = await Kurikulum_rombongan_belajar.findByPk(id)
            if(findItem){
                res.status(200).json(
                    {
                        message:"Data berhasil diambil",
                        data:findItem,
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

router.route("/kurikulum_rombongan_belajar/mutasi/:semesterid")
    .put(async(req,res) => {
        try{
            let semesterid = req.params.semesterid
            let updateData = await Kurikulum_rombongan_belajar.update({
                semester_id:semesterid
            },{where:{}})

            res.status(200).json({
                message:"Data berhasil diedit",
                data:updateData,
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
            let semesterid = req.params.id
            const dataprev = await Kurikulum_rombongan_belajar.findAll({
                where:{
                    semester_id:semesterid - 1
                }
            })
            const datainsert = dataprev.map((item) => ({
                rombongan_belajar_id:uuidv4(),
                kurikulum_program_id:item.kurikulum_program_id,
                tingkat_pendidikan_id:item.tingkat_pendidikan_id,
                nama:item.nama,
                jenis_rombel:item.jenis_rombel,
                semester_id:req.params.semesterid
            }))
            const adData = await Kurikulum_rombongan_belajar.bulkCreate(datainsert)
            res.status(200).json({
                message:"Data berhasil ditambahkan",
                data:adData,
                method:req.method
            })
        }
        catch(e){
            res.status(200).json({
                message:e.message,
                method:req.method
            })
        }
    })

router.route("/kurikulum_rombongan_belajar/mutasi")
    

module.exports = router