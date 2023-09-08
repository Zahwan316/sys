const express = require("express");
const router = express.Router();
const {v4:uuidv4} = require("uuid")
const Kebijakan_pos = require("../models/kebijakan_pos")

router.route("/kebijakan_pos")
    .get(async(req,res) => {
        try{
            const findAll = await Kebijakan_pos.findAll()
            res.status(200).json({
                message:"data berhasil diambil",
                data:findAll,
                method:req.method,
            })
        }
        catch(e){
            res.status(500).json({
                message:e.message,
                method:req.method,
            })
        }
    })
    .post(async(req,res) => {
        try{
            const createData = await Kebijakan_pos.create({
                kebijakan_pos_id:uuidv4(),
                ...req.body
            })
        }
        catch(e){
            res.status(500).json({
                message:e.message,
                method:req.method,
            })
        }
    })
    
router.route("/kebijakan_pos/:id")
    .get(async(req,res) => {
        try{
            let id= req.params.id
            const findItem = await Kebijakan_pos.findByPk(id)
            if(findItem){
                res.status(200).json({
                    message:"data berhasil diambil",
                    data:findItem,
                    method:req.method,
                })
            }
            else{
                res.status(404).json({
                    message:"data tidak ditemukan",
                    method:req.method,
                })
            }
        }
        catch(e){
            res.status(500).json({
                message:e.message,
                method:req.method,
            })
        }
    })
    .delete(async(req,res) => {
        try{
            const id = req.params.id
            const deleteItem = await Kebijakan_pos.findByPk(id)
            if(deleteItem){
                deleteItem.destroy()
                res.status(200).json({
                    message:"data berhasil dihapus",
                    method:req.method,
                })
            }
            else{
                res.status(404).json({
                    message:"data tidak ditemukan",
                    method:req.method,
                })
            }
        }
        catch(e){
            res.status(500).json({
                message:e.message,
                method:req.method,
            })
        }
    })
    .put(async(req,res) => {
        try{
            const id = req.params.id
            const findItem = await Kebijakan_pos.findByPk(id)
            if(findItem){
                findItem.update({
                    ...req.body
                })

                res.status(200).json({
                    message:"data berhasil diubah",
                    method:req.method,
                })
            }
            else{
                res.status(404).json({
                    message:"data tidak ditemukan",
                    method:req.method,
                })
            }
        }
        catch(e){
            res.status(500).json({
                message:e.message,
                method:req.method,
            })
        }
    })

module.exports = router