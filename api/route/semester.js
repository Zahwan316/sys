const express = require("express");
const router = express.Router();
const {v4:uuidv4} = require("uuid")
const Semester = require("../models/semester");


router.route("/semester")
    .get(async(req,res) => {
        try{
            const allData = await Semester.findAll({
                order:[['nama','ASC']]
            })
            res.status(200).json(
                {
                    message:"data berhasil diambil",
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
            const createdata = await Semester.create(
                {
                    semester_id:req.body.semester_id,
                    tahun_ajaran_id:req.body.tahun_ajaran_id,
                    nama:req.body.nama,
                    semester:req.body.semester,
                    periode_aktif:req.body.periode_aktif,
                    tanggal_mulai:req.body.tanggal_mulai,
                    tanggal_selesai:req.body.tanggal_selesai,
                    create_date:Date.now(),
                    last_update:Date.now(),
                    last_sync:Date.now(),
                }
            )
            res.status(200).json({
                message:"Data berhasil ditambahkan",
                data:createdata,
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

router.route("/semester/:id")
    .put(async(req,res) => {
        try{
            let id = req.params.id
            const findItem = await Semester.findOne({
                where:{
                    semester_id:id
                }
            })

            if(findItem){
                findItem.update({
                    semester_id:req.body.semester_id,
                    tahun_ajaran_id:req.body.tahun_ajaran_id,
                    nama:req.body.nama,
                    semester:req.body.semester,
                    periode_aktif:req.body.periode_aktif,
                    tanggal_mulai:req.body.tanggal_mulai,
                    tanggal_selesai:req.body.tanggal_selesai,
                    last_update:Date.now(),
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
            let id = req.params.id
            const findItem = await Semester.findOne(
                {
                    where:{
                        semester_id:id
                    }
                }
            )

            if(findItem){
                findItem.destroy()
                res.status(200).json({
                    message:"Item berhasil dihapus",
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
            const findItem = await Semester.findOne({
                where:{
                    semester_id:id
                }
            })

            if(findItem){
                res.status(200).json({
                    message:"data berhasil diambil",
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

router.route("/semester/generate/:id")
    .put(async(req,res) => {
        try{
            let id = req.params.id
            const findItem = await Semester.findOne(
                {
                    where:{
                        semester_id:id
                    }
                }
            )

            Semester.update({
                periode_aktif:0
            },
            {
                where:{
                    periode_aktif:1
                }
            }
            )

            if(findItem){
                findItem.update(
                    {
                        periode_aktif:1
                    }
                   
                )
                res.status(200).json({
                    message:"data berhasil diedit",
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

module.exports = router