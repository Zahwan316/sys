const express = require("express");
const router = express.Router();
const {v4:uuidv4} = require("uuid")
const Kurikulum_sp = require("../models/kurikulum_sp")
const Kurikulum_program = require("../models/kurikulum_program")
const Kurikulum_rombongan_belajar = require("../models/kurikulum_rombongan_belajar")

router.route("/kurikulum_sp")
    .get(async(req,res) => {
        try{
            const getData = await Kurikulum_sp.findAll()
            res.status(200).json(
                {
                    message:"Data berhasil diambil",
                    data:getData,
                    method:req.method
                }
            )
        }
        catch(e){
            res.status(200).json(
                {
                    message:e.message,
                    method:req.method
                }
            )
        }
    })

    .post(async(req,res) => {
        try{
            const createData = await Kurikulum_sp.create(
                {
                    kurikulum_sp_id:req.body.kurikulum_sp_id,
                    sekolah_id:req.body.sekolah_id,
                    kurikulum_kode:req.body.kurikulum_kode,
                    keaktifan:req.body.keaktifan,
                    tmt:req.body.tmt
                }
            )
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

router.route("/kurikulum_sp/:uuid")
    .put(async(req,res) => {
        try{
            let id = req.params.uuid
            const findItem = await Kurikulum_sp.findByPk(id)
            if(findItem){
                findItem.update(
                    {
                        kurikulum_kode:req.body.kurikulum_kode,
                        keaktifan:req.body.keaktifan,
                        tmt:req.body.tmt
                    }
                )
                res.status(200).json(
                    {
                        message:"Data berhasil diedit",
                        
                        method:req.method
                    }
                )
            }
            else{
                res.status(400).json(
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
    .delete(async(req,res) => {
        try{
            let id = req.params.uuid
            const findItem = await Kurikulum_sp.findByPk(id)
            const findItemProgram = await Kurikulum_program.findOne({
                where:{
                    kurikulum_sp_id:id
                }
            })
            if(findItem){
                findItem.destroy()
                findItemProgram.destroy()
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
            const findItem = await Kurikulum_sp.findByPk(id)
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
                
module.exports = router