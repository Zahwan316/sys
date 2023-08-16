const express = require("express");
const router = express.Router();
const ALasan_layak_pip = require("../models/alasan_layak_pip");
const Alasan_layak_pip = require("../models/alasan_layak_pip");

router.route("/alasan_layak_pip")
    .get(async(req,res) => {
        try{
            const allData = await Alasan_layak_pip.findAll({
                attributes:{
                    exclude:"id"
                }
            })
            res.status(200).json({
                
            })
        }
        catch(e){

        }
    })

module.exports = router