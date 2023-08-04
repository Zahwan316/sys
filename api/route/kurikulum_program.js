const express = require("express");
const router = express.Router();
const {v4:uuidv4} = require("uuid")
const Kurikulum_program = require("../models/kurikulum_program.js")
const Kurikulum_rombongan_belajar = require("../models/kurikulum_rombongan_belajar.js")

router.route("/kurikulum_program")
    .get(async(req,res) => {
        try{
            const allData = await Kurikulum_program.findAll()
            res.status(200).json({
                message:"Data berhasil diambil",
                data:allData,
                method:req.method
            })
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
            const sendData = await Kurikulum_program.create(
                {
                    kurikulum_program_id:uuidv4(),
                    kurikulum_sp_id:req.body.kurikulum_sp,
                    jurusan_id:req.body.jurusan_id,
                    no_sk_izin:req.body.no_sk_izin,
                    tanggal_sk_izin:req.body.tanggal_sk_izin,
                    keaktifan:req.body.keaktifan
                }
            )
            res.status(200).json(
                {
                    message:"Data berhasil dikirm",
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

router.route("/kurikulum_program/:uuid")
    .put(async(req,res) => {
        try{
            let id = req.params.uuid
            const findItem = await Kurikulum_program.findByPk(id)
            if(findItem){
                findItem.update(
                    {
                        kurikulum_sp_id:req.body.kurikumlum_sp_id,
                        jurusan_id:req.body.jurusan_id,
                        no_sk_izin:req.body.no_sk_izin,
                        tanggal_sk_izin:req.body.tanggal_sk_izin,
                        keaktifan:req.body.keaktifan
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

    .delete(async(req,res) => {
        try{
            let id = req.params.uuid
            const findItem = await Kurikulum_program.findByPk(id)
            const findItemRombel = await Kurikulum_rombongan_belajar.findOne({
                where:{
                    kurikulum_program_id:id
                }
            })
            if(findItemRombel){
                findItemRombel.destroy()
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
                res.status(404).json(
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
            const findItem = await Kurikulum_program.findByPk(id)
            if(findItem){
                res.status(200).json(
                    {
                        message:"Data berhasil dihapus",
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
            res.status(404).json(
                {
                    message:e.message,
                    method:req.method
                }
            ) 
        }
    })

module.exports = router