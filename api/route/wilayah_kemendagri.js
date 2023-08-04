const { Sequelize, DataTypes,Op } = require('sequelize');
const express = require("express");
const router = express.Router();
const Wilayah_kemendagri = require("../models/wilayah_kemendagri_2022");
const sequelize = require("../config");

router.route("/wilayah")
    .get(async(req,res) => {
        try{
            const alldata = await Wilayah_kemendagri.findAll({
                attributes:[
                    "id_wilayah",
                    "nama",
                ],
                order:[
                    ['nama','ASC']
                ]
            })
            res.status(200).json({
                message:"Data berhasil diambil",
                data:alldata,
                method:req.method
            })
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

router.route("/wilayah/desa/:nama")
    .get(async(req,res) => {
        try{
            const nama = req.params.nama
            const alldata = await Wilayah_kemendagri.findAll({
                attributes:[
                    "id_wilayah",
                    "nama",
                    [sequelize.literal(`(
                        SELECT nama
                        FROM ref.wilayah_kemendagri_2022 a1
                        WHERE LEFT(a1.id_wilayah,6) = LEFT(wilayah_kemendagri_2022.id_wilayah,6)
                        LIMIT 1
                    )`),'kecamatan'],
                    [sequelize.literal(`(
                        SELECT nama
                        FROM ref.wilayah_kemendagri_2022 a1
                        WHERE LEFT(a1.id_wilayah,4) = LEFT(wilayah_kemendagri_2022.id_wilayah,4)
                        LIMIT 1
                    )`),'kota'],
                    [sequelize.literal(`(
                        SELECT nama
                        FROM ref.wilayah_kemendagri_2022 a1
                        WHERE LEFT(a1.id_wilayah,2) = LEFT(wilayah_kemendagri_2022.id_wilayah,2)
                        LIMIT 1
                    )`),'provinsi']
                ],
                where:{
                    nama:{
                        [Op.like]: `%${nama}%`
                    }
                }
            })

            
            res.status(200).json({
                message:"Data berhasil diambil",
                data:alldata.filter(data => data.id_wilayah.startsWith(32) && data.id_wilayah.length > 6),
                method:req.method
            })
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



router.route("/wilayah/kecamatan/:id")
    .get(async(req,res) => {
        try{    
            const kecamatan_id = req.params.id
            const kecamatan = await Wilayah_kemendagri.findOne({
                where:{
                    id_wilayah:kecamatan_id
                },
                attributes:{
                    exclude:"id"
                }
            })
            if(kecamatan){
                res.status(200).json(
                    {
                        message:"Data Berhasil Diambil",
                        data:kecamatan
                    }
                )
            }
            else{
                res.status(200).json(
                    {
                        message:"Data Tidak Ditemukan",
                    }
                )
            }
        }
        catch(e){
            res.status(400).json(
                {
                    message:e.message
                }
            )
        }
    })

router.route("/wilayah/kota/:id")
    .get(async(req,res) => {
        try{    
            const kota_id = req.params.id
            const kecamatan = await Wilayah_kemendagri.findOne({
                where:{
                    id_wilayah:kota_id
                },
                attributes:{
                    exclude:"id"
                }
            })
            if(kecamatan){
                res.status(200).json(
                    {
                        message:"Data Berhasil Diambil",
                        data:kecamatan
                    }
                )
            }
            else{
                res.status(200).json(
                    {
                        message:"Data Tidak Ditemukan",
                    }
                )
            }
        }
        catch(e){
            res.status(400).json(
                {
                    message:e.message
                }
            )
        }
    })

router.route("/wilayah/provinsi/:id")
    .get(async(req,res) => {
        try{    
            const provinsi_id = req.params.id
            const kecamatan = await Wilayah_kemendagri.findOne({
                where:{
                    id_wilayah:provinsi_id
                },
                attributes:{
                    exclude:"id"
                }
            })
            if(kecamatan){
                res.status(200).json(
                    {
                        message:"Data Berhasil Diambil",
                        data:kecamatan
                    }
                )
            }
            else{
                res.status(200).json(
                    {
                        message:"Data Tidak Ditemukan",
                    }
                )
            }
        }
        catch(e){
            res.status(400).json(
                {
                    message:e.message
                }
            )
        }
    })

module.exports = router
