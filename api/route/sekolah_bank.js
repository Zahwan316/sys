const express = require("express");
const Sequelize = require('sequelize');
const router = express.Router();
const {v4:uuidv4} = require("uuid");
const Sekolah_bank = require("../models/sekolah_bank")

router.route("/sekolah_bank")
    .get(async(req,res) => {
        try{
            const getData = await Sekolah_bank.findAll();
            res.status(200).json({
                message:"Data berhasil diambil",
                data:getData,
                method:req.method
            })
        }
        catch(e){
            res.status(400).json({
                message:e.message,
                methode:req.method
            })
        }
    })
    .post(async(req,res) => {
        try{
            const createData = await Sekolah_bank.create({
                    sekolah_bank_id:uuidv4(),
                    sekolah_id:req.body.sekolahid,
                    id_bank:req.body.idbank,
                    cabang_kcp_unit:req.body.cabangkcp,
                    no_rekening:req.body.norek,
                    rekening_atas_nama:req.body.rekeningnama

            })
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

router.route("/sekolah_bank/:uuid")
    .put(async(req,res) => {
        try{
            let id = req.params.uuid;
            const editItem = await Sekolah_bank.findByPk(id)
            if(editItem){
                editItem.update(
                    {
                        id_bank:req.body.idbank,
                        cabang_kcp_unit:req.body.cabangkcp,
                        no_rekening:req.body.norek,
                        rekening_atas_nama:req.body.rekeningnama
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
            const deleteItem = await Sekolah_bank.findByPk(id)
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
            const findData = await Sekolah_bank.findByPk(id)
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