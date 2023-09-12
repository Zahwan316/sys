const express = require("express");
const {Op} = require("sequelize")
const router = express.Router();
const {v4:uuidv4} = require("uuid")
const Kurikulum_anggota_rombel = require("../models/kurikulum_anggota_rombel")
const fs = require("fs")
const Peserta_didik = require("../models/peserta_didik")
const Kurikulum_rombongan_belajar = require("../models/kurikulum_rombongan_belajar");


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
            let datajeniskelaminkelas = []
           
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
            let kurikulum_rombongan_belajar = await Kurikulum_rombongan_belajar.findAll()
            peserta_didik_data.map((item) => 
                id.map((items) => 
                    item.peserta_didik_id === items &&
                    log.push(item.jenis_kelamin)
                )
            )
            let peserta_didik_kelas = await Kurikulum_anggota_rombel.findAll({
                where:{
                    rombongan_belajar_id:req.body.rombellama
                }
            })

            peserta_didik_data.map((item) =>
                peserta_didik_kelas.map((items) => 
                    items.peserta_didik_id === item.peserta_didik_id &&
                    datajeniskelaminkelas.push(item.jenis_kelamin)
                )
            )

            let countjeniskelamin = {
                L:0,
                P:0
            }

            datajeniskelaminkelas.forEach((item) => {
                if(item === 'L')[
                    countjeniskelamin.L += 1
                ]
                else if(item === 'P')[
                    countjeniskelamin.P += 1 
                ]
            })

            let kelas = kurikulum_rombongan_belajar.filter(item => item.rombongan_belajar_id == id_rombellama && item.nama)
            let kelasnama = kelas[0].nama

            let datarekap_old = fs.readFileSync("datarekap.json","utf-8")
            let convert_datarekap = JSON.parse(datarekap_old)

            let hitung_jenis_kelamin = log.reduce((item,huruf) => {
                item[huruf] = (item[huruf] || 0) + 1;
                return item
            },{})
            
            let datarekap_raw = {
                namakelas:kelasnama,
                jumlahsiswa:log,
                p:countjeniskelamin.P,
                l:countjeniskelamin.L
            }

            convert_datarekap.push(datarekap_raw)

            let datarekapjson = JSON.stringify(convert_datarekap)
            fs.writeFileSync("datarekap.json",datarekapjson)

            //result to api
            res.status(200).json({
                message:"Data berhasil diedit",
                method:req.method,
                data:hitung_jenis_kelamin,
                datajeniskelamin:countjeniskelamin
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
                },
                //order:[['']]
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

router.route("/datarekap")
    .get(async(req,res) => {
        try{
            let datarekap = fs.readFileSync("datarekap.json","utf-8")
            let convert_datarekap = JSON.parse(datarekap)

            res.status(200).json({
                message:"Data berhasil didapatkan",
                data:convert_datarekap,
                method:req.method
            })
        }
        catch(e){
            res.status(400).json({
                message:e.message,
                method:Request.method
            })
        }
    })



module.exports = router