const express = require("express");
const router = express.Router();
const searchCenter = require("../data/center")

const desajabar = require("../data/desajabar.json");
const data_desa = desajabar


router.route("/location/:kota/:kecamatan/:desa")
    .get((req,res) => {
        const kota = req.params.kota
        const kecamatan = req.params.kecamatan
        const desa = req.params.desa
        let pos = searchCenter(desa,kecamatan,kota)
        res.status(200).json({
            message:"Data berhasil diambil",
            position:pos
        })
    })

module.exports = router