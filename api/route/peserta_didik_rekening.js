const express = require("express");
const router = express.Router();
const {v4:uuidv4} = require("uuid")
const Peserta_didik_rekening = require("../models/peserta_didik_rekening")

router.route("/peserta_didik_rekening")
    .get(async(req,res) => {
        try{
            const allData = await Peserta_didik_rekening.findAll()

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
            const createData = await Peserta_didik_rekening.create({
                peserta_didik_rekening_id:uuidv4(),
                peserta_didik_id:req.body.peserta_didik_id,
                id_bank:req.body.id_bank,
                no_rekening:req.body.no_rekening,
                rekening_atas_nama:req.body.rekening_atas_nama,
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

router.route("/peserta_didik_rekening/:id")
    .put(async(req,res) => {
        try{
            let id = req.params.id
            const findItem = await Peserta_didik_rekening.findByPk(id)
            if(findItem){
                findItem.update({
                    id_bank:req.body.id_bank,
                    no_rekening:req.body.no_rekening,
                    rekening_atas_nama:req.body.rekening_atas_nama,
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
            const findItem = await Peserta_didik_rekening.findByPk(id)
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
                const findItem = await Peserta_didik_rekening.findByPk(id)
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