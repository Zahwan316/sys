const express = require("express");
const router = express.Router();
const {v4:uuidv4} = require("uuid")
const Ptk = require("../models/ptk")
const Ptk_tugas_mengajar = require("../models/ptk_tugas_mengajar")
const Jadwal_kbm = require("../models/jadwal_kbm")     
const Ptk_pend_formal = require("../models/ptk_pend_formal")
const Ptk_pangkat_gol = require("../models/ptk_pangkat_gol") 
const Ptk_mapel = require("../models/ptk_mapel")

router.route("/ptk")
    .get(async(req,res) => {
        try{
            const getData = await Ptk.findAll({
                order:[["nama","ASC"]]
            })
            res.status(200).json({
                message:"Data berhasil diambil",
                data:getData,
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
            const createData = await Ptk.create({
                ptk_id:uuidv4(),
                nama:req.body.nama,
                nik:req.body.nik,
                tempat_lahir:req.body.tempat_lahir,
                tanggal_lahir:req.body.tanggal_lahir,
                jenis_kelamin:req.body.jenis_kelamin,
                alamat:req.body.alamat,
                no_hp:req.body.no_hp,
                nm_wp:req.body.nm_wp,
                npwp:req.body.npwp,
                agama_id:req.body.agama_id,
                kewarganegaraan:req.body.kewarganegaraan,
                no_kk:req.body.no_kk,
                status_perkawinan:req.body.status_perkawinan,
                status_kepegawaian_id:req.body.status_kepegawaian_id,
                nip:req.body.nip,
                nuptk:req.body.nuptk,
                nuks:req.body.nuks,
                karpeg:req.body.karpeg,
                karpas:req.body.karpas,
                jenis_ptk_id:req.body.jenis_ptk_id,
                sk_pengangkatan:req.body.sk_pengangkatan,
                tmt_pengangkatan:req.body.tmt_pengangkatan,
                lembaga_pengangkat_id:req.body.lembaga_pengangkat_id,
                sk_cpns:req.body.sk_cpns,
                tgl_cpns:req.body.tgl_cpns,
                tmt_pns:req.body.tmt_pns,
                pangkat_golongan_id:req.body.pangkat_golongan_id,
                sumber_gaji_id:req.body.sumber_gaji_id,
                sudah_lisensi_kepala_sekolah:req.body.sudah_lisensi_kepala_sekolah,
                keahlian_laboratorium_id:req.body.keahlian_laboratorium_id,
                mampu_handle_kk:req.body.mampu_handle_kk,
                keahlian_braille:req.body.keahlian_braille,
                keahlian_bhs_isyarat:req.body.keahlian_bhs_isyarat,
                id_bank:req.body.id_bank,
                rekening_bank:req.body.rekening_bank,
                rekening_atas_nama:req.body.rekening_atas_nama,
                sekolah_id:req.body.sekolah_id,
                pernah_diklat_kepengawasan:req.body.pernah_diklat_kepengawasan,
                status_keaktifan_id:req.body.status_keaktifan_id,
                email:req.body.email,
                no_telepon_rumah:req.body.no_telepon_rumah,
                nama_ibu_kandung:req.body.nama_ibu_kandung,
            })

            res.status(200).json({
                message:"Data berhasil ditambahkan",
                data:createData,
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

router.route("/ptk/:id")
    .put(async(req,res) => {
        try{
            let id = req.params.id;
            const findItem = await Ptk.findByPk(id)
            if(findItem){
                findItem.update({
                    nama:req.body.nama,
                    nik:req.body.nik,
                    tempat_lahir:req.body.tempat_lahir,
                    tanggal_lahir:req.body.tanggal_lahir,
                    jenis_kelamin:req.body.jenis_kelamin,
                    alamat:req.body.alamat,
                    no_hp:req.body.no_hp,
                    nm_wp:req.body.nm_wp,
                    npwp:req.body.npwp,
                    agama_id:req.body.agama_id,
                    kewarganegaraan:req.body.kewarganegaraan,
                    no_kk:req.body.no_kk,
                    status_perkawinan:req.body.status_perkawinan,
                    status_kepegawaian_id:req.body.status_kepegawaian_id,
                    nip:req.body.nip,
                    nuptk:req.body.nuptk,
                    nuks:req.body.nuks,
                    karpeg:req.body.karpeg,
                    karpas:req.body.karpas,
                    jenis_ptk_id:req.body.jenis_ptk_id,
                    sk_pengangkatan:req.body.sk_pengangkatan,
                    tmt_pengangkatan:req.body.tmt_pengangkatan,
                    lembaga_pengangkat_id:req.body.lembaga_pengangkat_id,
                    sk_cpns:req.body.sk_cpns,
                    tgl_cpns:req.body.tgl_cpns,
                    tmt_pns:req.body.tmt_pns,
                    pangkat_golongan_id:req.body.pangkat_golongan_id,
                    sumber_gaji_id:req.body.sumber_gaji_id,
                    sudah_lisensi_kepala_sekolah:req.body.sudah_lisensi_kepala_sekolah,
                    keahlian_laboratorium_id:req.body.keahlian_laboratorium_id,
                    mampu_handle_kk:req.body.mampu_handle_kk,
                    keahlian_braille:req.body.keahlian_braille,
                    keahlian_bhs_isyarat:req.body.keahlian_bhs_isyarat,
                    pernah_diklat_kepengawasan:req.body.pernah_diklat_kepengawasan,
                    id_bank:req.body.id_bank,
                    rekening_bank:req.body.rekening_bank,
                    rekening_atas_nama:req.body.rekening_atas_nama,
                    sekolah_id:req.body.sekolah_id,
                    status_keaktifan_id:req.body.status_keaktifan_id,
                    email:req.body.email,
                    no_telepon_rumah:req.body.no_telepon_rumah,
                    nama_ibu_kandung:req.body.nama_ibu_kandung,
                })
                res.status(200).json({
                    message:"Data berhasil diubah",
                    method:req.method
                })
            }
            else {
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
            const findItemPtk = await Ptk.findByPk(id)
            const findItemPtkPendFormal = await Ptk_pend_formal.findOne({
                where:{ptk_id:id}
            })
            const findItemPtkPangkatGol = await Ptk_pangkat_gol.findOne({where:{ptk_id:id}})
            const findItemPtkTugasMengajar = await Ptk_tugas_mengajar.findOne({
                where:{ptk_id:id}
            })

            const findItemJadwalKbm = await Jadwal_kbm.findAll({
                where:{
                    ptk_penugasan_id:
                    findItemPtkTugasMengajar ?
                    findItemPtkTugasMengajar.ptk_penugasan_id : null,
                }
            }) 
            
            const findItemPtkMapel = await Ptk_mapel.findOne({
                where:{
                    ptk_penugasan_id:
                    findItemPtkTugasMengajar?
                    findItemPtkTugasMengajar.ptk_penugasan_id : null,
                }
            })

            if(findItemPtkPendFormal){
                findItemPtkPendFormal.destroy()
            }

            if(findItemPtkPangkatGol){
                findItemPtkPangkatGol.destroy()
            }

            if(findItemPtkMapel){
                findItemPtkMapel.destroy()
            }

            if(findItemJadwalKbm && findItemJadwalKbm.length > 0){
                findItemJadwalKbm.forEach(item => {
                    item.destroy()  
                })
            }
            
            if(findItemPtkTugasMengajar){
                findItemPtkTugasMengajar.destroy()
            }

            if(findItemPtk){

                findItemPtk.destroy()

                res.status(200).json({
                    message:"Data berhasil dihapus",
                    method:req.method
                })
                
            }
            else{
                res.status(404).json({
                    message:"Data Tidak Ditemukan",
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
            const id = req.params.id;
            const getData = await Ptk.findByPk(id)
            if(getData){
                res.status(200).json({
                    message:"Data berhasil diambil",
                    data:getData,
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
    
router.route("/ptk/edit/kepegawaian/:id")
    .put(async(req,res) => {
        try{
            let id = req.params.id;
            const findItem = await Ptk.findByPk(id)
            if(findItem){
                findItem.update({
                    status_kepegawaian_id:req.body.status_kepegawaian_id,
                    nip:req.body.nip,
                    nuptk:req.body.nuptk,
                    nuks:req.body.nuks,
                    karpeg:req.body.karpeg,
                    karpas:req.body.karpas,
                    jenis_ptk_id:req.body.jenis_ptk_id,
                    sk_pengangkatan:req.body.sk_pengangkatan,
                    tmt_pengangkatan:req.body.tmt_pengangkatan,
                    lembaga_pengangkat_id:req.body.lembaga_pengangkat_id,
                    sk_cpns:req.body.sk_cpns,
                    tgl_cpns:req.body.tgl_cpns,
                    tmt_pns:req.body.tmt_pns,
                    pangkat_golongan_id:req.body.pangkat_golongan_id,
                    sumber_gaji_id:req.body.sumber_gaji_id,
                })
                res.status(200).json({
                    message:"Data berhasil diubah",
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

router.route("/ptk/edit/kontak/:id")
    .put(async(req,res) => {
        try{
            let id = req.params.id
            const findItem = await Ptk.findByPk(id)
            if(findItem){
                findItem.update({
                    no_hp:req.body.no_hp,
                    email:req.body.email,
                    no_telepon_rumah:req.body.no_telepon_rumah,           
                })
                res.status(200).json({
                    message:"Data berhasil diubah",
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

router.route("/ptk/edit/kompetensi/:id")
    .put(async(req,res) =>{
        try{
            let id = req.params.id; 
            const findItem = await Ptk.findByPk(id)
            if(findItem){
                findItem.update({
                    sudah_lisensi_kepala_sekolah:req.body.sudah_lisensi_kepala_sekolah,
                    keahlian_laboratorium_id:req.body.keahlian_laboratorium_id,
                    mampu_handle_kk:req.body.mampu_handle_kk,
                    keahlian_braille:req.body.keahlian_braille,
                    keahlian_bhs_isyarat:req.body.keahlian_bhs_isyarat,
                    pernah_diklat_kepengawasan:req.body.pernah_diklat_kepengawasan,
                })
                res.status(200).json({
                    message:"Data berhasil diubah",
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