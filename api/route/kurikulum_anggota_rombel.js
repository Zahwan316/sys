const express = require("express");
const {Op} = require("sequelize")
const router = express.Router();
const {v4:uuidv4} = require("uuid")
const Kurikulum_anggota_rombel = require("../models/kurikulum_anggota_rombel")
const fs = require("fs")
const Peserta_didik = require("../models/peserta_didik")

router.route('/kurikulum_anggota_rombel')
    .get(async(req,res) => {
        try{
            const allData = await Kurikulum_anggota_rombel.findAll()
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
    .put(async(req,res) => {
        try{
            let id = req.body.idsiswa;
            let id_rombellama = req.body.rombellama
            let id_rombelbaru = req.body.rombelbaru
            let log = []

            Kurikulum_anggota_rombel.update({
                rombongan_belajar_id:id_rombelbaru
            },{
                where:{
                    peserta_didik_id:{
                        [Op.in]:id
                    }
                }
            })

            //buat log
            let peserta_didik_data = await Peserta_didik.findAll()
            peserta_didik_data.map((item) => 
                id.map((items) => 
                    item.peserta_didik_id === items &&
                    log.push(item.jenis_kelamin)
                )
            )

            res.status(200).json({
                message:"Data berhasil diedit",
                method:req.method,
                data:log
                
            })
        }
        catch(e){
            res.status(400).json({
                message:e.message,
                method:req.method
            })
        }
    })

router.route("/kurikulum_anggota_rombel/:id")
    .get(async(req,res) => {
        try{
            let id = req.params.id
            let findData = await Kurikulum_anggota_rombel.findAll({
                where:{
                    rombongan_belajar_id:id
                }
            })
            if(findData){
                res.status(200).json({
                    message:"Data berhasil diambil",
                    data:findData,
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