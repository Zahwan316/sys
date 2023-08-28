const express = require("express");
const Sequelize = require('sequelize');
const router = express.Router();
const {v4:uuidv4} = require("uuid")
const Peserta_didik_kontak = require("../models/peserta_didik_kontak")

router.route("/peserta_didik_kontak")
    .get(async(req,res) => {
        try{
            const allData = await Peserta_didik_kontak.findAll()
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
            const createItem = await Peserta_didik_kontak.create({
                peserta_didik_kontak_id:uuidv4(),
                peserta_didik_id:req.body.peserta_didik_id,
                nomor_telepon_rumah:req.body.nomor_telepon_rumah,
                nomor_telepon_seluler:req.body.nomor_telepon_seluler,
                email:req.body.email,
                twitter:req.body.twitter,
                facebook:req.body.facebook,
                instagram:req.body.instagram,
                youtube:req.body.youtube

            })

            res.status(200).json({
                message:"Data berhasil ditambahkan",
                data:createItem,
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

router.route("/peserta_didik_kontak/:id")
    .put(async(req,res) => {
        try{
            let id = req.params.id
            const findItem = await Peserta_didik_kontak.findByPk(id)
            if(findItem){
                findItem.update({
                    nomor_telepon_rumah:req.body.nomor_telepon_rumah,
                    nomor_telepon_seluler:req.body.nomor_telepon_seluler,
                    email:req.body.email,
                    twitter:req.body.twitter,
                    facebook:req.body.facebook,
                    instagram:req.body.instagram,
                    youtube:req.body.youtube
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
            const findItem = await Peserta_didik_kontak.findByPk(id)
            if(findItem){
                findItem.destroy()
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
    .get(async(req,res) => {
        try{
            let id = req.params.id
            const findItem = await Peserta_didik_kontak.findByPk(id)
            if(findItem){
                res.status(200).json({
                    message:"Data berhasil diambil",
                    data:findItem,
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

