const express = require("express");
const router = express.Router();
const {v4:uuidv4} = require("uuid")
const Pengguna = require("../models/pengguna");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config()

const SECRET_KEY = process.env.JWT_SECRET_KEY

router.route("/register")
    .post(async(req,res) => {
        try{
            const{username,email,password} = req.body
            const checkuser = await Pengguna.findOne({email:email})
            if(checkuser){
                res.status(400).json({
                    message:"Email sudah terdaftar",
                    method:req.method
                })
            }
            const hashPass = await bcrypt.hash(password,10)

            const result = await Pengguna.create({
                email:email,
                username:username,
                password:hashPass
            })

            const token = jwt.sign({email:email, id:result._id},SECRET_KEY)
            res.status(200).json({
                message:"Email berhasil didaftarkan",
                user:result,
                token:token,
                method:req.method
            })


        }
        catch(e){
            res.status(500).json({
                message:e.message,
                method:req.method
            })
        }
    })

router.route('/login')
    .post(async(req,res) => {
        try{
            const{email,password} = req.body
            const checkuser = await Pengguna.findOne({where: {email:email}})

            if(!checkuser){
                 return res.status(400).json({
                    message:"Email atau password salah",
                    method:req.method
                })
            }

            if(password != checkuser.password){
                return res.status(400).json({
                    message:"Password atau email salah",
                    method:req.method
                })
            }

            const token = jwt.sign({email:email, id:checkuser._id},SECRET_KEY)

            res.status(200).json({
                message:"Login berhasil",
                user:checkuser,
                token:token,
                method:req.method
            })
        }
        catch(e){
            res.status(500).json({
                message:e.message,
                method:req.method
            })
        }

    })

module.exports = router