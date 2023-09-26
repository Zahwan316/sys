const express = require("express");
const router = express.Router();
const {v4:uuidv4} = require("uuid")
const Ptk = require("../models/ptk")
const Ptk_tugas_mengajar = require("../models/ptk_tugas_mengajar")
const Jadwal_kbm = require("../models/jadwal_kbm")     
const Ptk_pend_formal = require("../models/ptk_pend_formal")
const Ptk_pangkat_gol = require("../models/ptk_pangkat_gol") 
const Ptk_mapel = require("../models/ptk_mapel")
const multer = require("multer")
const xlsx = require("xlsx");
const exceljs = require("exceljs");
const ref_agama = require("../models/agama");
const ref_jenis_ptk = require("../models/jenis_ptk");
const ref_status_kepegawaian = require("../models/status_kepegawaian");
const ref_lembaga_pengangkat = require("../models/lembaga_pengangkat")
const ref_pangkat_golongan = require("../models/pangkat_golongan")
const ref_keahlian_laboratorium = require("../models/keahlian_laboratorium")
const ref_sumber_gaji = require("../models/sumber_gaji");
const Status_kepegawaian = require("../models/status_kepegawaian");
const ref_bank = require("../models/bank");
const ref_status_perkawinan = require("../models/status_perkawinan");
const Ptk_alamat = require("../models/ptk_alamat");
const Ptk_anggota_keluarga = require("../models/ptk_anggota_keluarga")


//multer config
const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null,'uploads')
    },
    filename:(req,file,cb) => {
        const unique = Date.now() + '' + Math.round(Math.random() * 1E9)
        cb(null,file.fieldname + '-' + unique + file.originalname)
    }
})

const upload = multer({storage:storage,limits:{
    fileSize:10 * 1024 * 1024
}})

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

router.route("/ptk/upload")
    .post(upload.single('file'),async(req,res) => {
        try{
            const file = req.file
            const filebody = req.body.file

            const workbook = xlsx.readFile(file.path)
            const sheetname = workbook.SheetNames[0]
            const sheet = workbook.Sheets[sheetname]
            const data = xlsx.utils.sheet_to_json(sheet)

            const ptk = []
            let index = 0
            const raw_object = {
                        nama:null,
                        nuptk: null,       
                        jenis_kelamin: null,
                        tempat_lahir: null,
                        tanggal_lahir: null,
                        nip: null,
                        status_kepegawaian_id: null,
                        jenis_ptk: null,
                        agama: null,
                        alamat_jalan: null,
                        rt: null,
                        rw: null,
                        nama_dusun: null,
                        desa: null,
                        kecamatan: null,
                        kode_pos: null,
                        telepon_rumah: null,
                        no_hp: null,
                        email: null,
                        tugas_tambahan: null,
                        sk_cpns: null,
                        tanggal_cpns: null,
                        sk_pengangkatan: null,
                        tmt_pengangkatan: null,
                        lembaga_pengangkatan: null,
                        pangkat_golongan: null,
                        sumber_gaji: null,
                        nama_ibu_kandung: null,
                        status_perkawinan: null,
                        nama_suami_istri: null,
                        nip_suami_istri: null,
                        pekerjaan_suami_istri: null,
                        tmt_pns:null,
                        sudah_lisensi_kepala_sekolah: null,
                        pernah_diklat_kepengawasan: null,
                        keahlian_braille: null,
                        keahlian_bahasa_isyarat: null,
                        npwp: null,
                        nm_wop: null,
                        kewarganegaraan: null,
                        bank: null,
                        nomor_rekening: null,
                        rekening_atas_nama: null,
                        nik: null,
                        no_kk: null,
                        karpeg: null,
                        karsu: null,
                        lintang: null,
                        bujur: null,
                        nuks: null,
            }   

            const agama = await ref_agama.findAll({
                attributes:{
                    exclude:"id"
                }
            })

            const status_kepegawaian = await Status_kepegawaian.findAll({
                attributes:{
                    exclude:"id"
                }
            })

            const jenis_ptk = await ref_jenis_ptk.findAll({
                attributes:{
                    exclude:"id"
                }
            })

            const lembaga_pengangkatan = await ref_lembaga_pengangkat.findAll({
                attributes:{
                    exclude:"id"
                }
            });

            const pangkat_golongan = await ref_pangkat_golongan.findAll({
                attributes:{
                    exclude:"id"
                }
            })

            const keahlian_laboratorium = await ref_keahlian_laboratorium.findAll({
                attributes:{
                    exclude:"id"
                }
            })
           
            const sumber_gaji = await ref_sumber_gaji.findAll({
                attributes:{
                    exclude:"id"
                }
            })

            const bank = await ref_bank.findAll({
                attributes:{
                    exclude:"id"
                }
            })

            const status_perkawinan = await ref_status_perkawinan.findAll({
                attributes:{
                    exclude:"id"
                }
            })

            data.forEach(item => {
                if(index > 3){
                    const Agama = agama.filter(items => items.nama === item.__EMPTY_8 )
                    const getagamaid = Agama.length > 0 ?
                        Agama.map(items => items.agama_id)
                        :
                        null
                    const resultagama = getagamaid || [0]

                    let getid = (models,items,nameid,nama) => {
                        const model = models.filter(item => item[nama] == items)
                        const getmodelid = model.length > 0 ?
                            model.map(data => data[nameid])
                            :
                            null
                        return getmodelid || [0]
                        
                    }

                    const convertIyaTidak = (items) => {
                        return items === "Iya" ? "1" : "0"
                    }

                    const generateuuid = () => {
                        return uuidv4()
                    }


                    const raw_ptk = {
                        ptk_id:generateuuid(),  
                        nama:item.__EMPTY || null,
                        nuptk:item.__EMPTY_1 || null,       
                        jenis_kelamin:item.__EMPTY_2 || null,
                        tempat_lahir:item.__EMPTY_3 || null,
                        tanggal_lahir:item.__EMPTY_4 || null,   
                        nip:item.__EMPTY_5 || null,
                        status_kepegawaian:getid(status_kepegawaian,item.__EMPTY_6,"status_kepegawaian_id","nama") || null,
                        jenis_ptk:getid(jenis_ptk,item.__EMPTY_7,"jenis_ptk_id","jenis_ptk") || null,
                        agama:resultagama|| null,
                        alamat_jalan:item.__EMPTY_9 || null,
                        rt:item.__EMPTY_10 || null,
                        rw:item.__EMPTY_11 || null,
                        nama_dusun:item.__EMPTY_12 || null,
                        desa:item.__EMPTY_13 || null,   
                        kecamatan:item.__EMPTY_14 || null,
                        kode_pos:item.__EMPTY_15 || null,
                        telepon_rumah:item.__EMPTY_16 || null,
                        no_hp:item.__EMPTY_17 || null,
                        email:item.__EMPTY_18 || null,
                        tugas_tambahan:item.__EMPTY_19 || null,
                        sk_cpns:item.__EMPTY_20 || null,
                        tanggal_cpns:item.__EMPTY_21 || null,
                        sk_pengangkatan:item.__EMPTY_22 || null,
                        tmt_pengangkatan:item.__EMPTY_23 || null,
                        lembaga_pengangkatan:getid(lembaga_pengangkatan,item.__EMPTY_24,"lembaga_pengangkat_id","nama")|| null,
                        pangkat_golongan:getid(pangkat_golongan,item.__EMPTY_25,"pangkat_golongan_id","nama") || null,
                        sumber_gaji:getid(sumber_gaji,item.__EMPTY_26,"sumber_gaji_id","nama") || null,    
                        nama_ibu_kandung:item.__EMPTY_27 || null,
                        status_perkawinan:getid(status_perkawinan,item.__EMPTY_28,"status_perkawinan_id","status_perkawinan") || null,
                        nama_suami_istri:item.__EMPTY_29 || null,
                        nip_suami_istri:item.__EMPTY_30 || null,
                        pekerjaan_suami_istri:item.__EMPTY_31 || null,
                        tmt_pns:item.__EMPTY_32 ||null,
                        sudah_lisensi_kepala_sekolah:convertIyaTidak(item.__EMPTY_33) || null,
                        pernah_diklat_kepengawasan:convertIyaTidak(item.__EMPTY_34) || null,
                        keahlian_braille:convertIyaTidak(item.__EMPTY_34) || null,
                        keahlian_bahasa_isyarat:convertIyaTidak(item.__EMPTY_34) || null,
                        npwp:item.__EMPTY_37 || null,
                        nm_wp:item.__EMPTY_38 || null,
                        kewarganegaraan:item.__EMPTY_39 || null,
                        bank:getid(bank,item.__EMPTY_40,"id_bank","nm_bank") || null,
                        nomor_rekening:item.__EMPTY_41 || null,
                        rekening_atas_nama:item.__EMPTY_42 || null,
                        nik:item.__EMPTY_43 || null,
                        no_kk:item.__EMPTY_44 || null,
                        karpeg:item.__EMPTY_45 || null,
                        karsu:item.__EMPTY_46 || null,
                        lintang:item.__EMPTY_47 || null,
                        bujur:item.__EMPTY_48 || null,
                        nuks:item.__EMPTY_49 || null,
                        sekolah_id:req.body.sekolah_id || null,
                    }
                    
                    for(const key in raw_ptk){
                        if(raw_ptk[key] === "   "){
                            raw_ptk[key] = null
                        }
                    }

                    ptk.push(raw_ptk)
                }
                index++
            }) 

            await Ptk.bulkCreate(
                ptk.map(item => ({
                     ...item,         
                    agama_id:item.agama,                  
                }))
            ) 

            await Ptk_alamat.bulkCreate(
                ptk.map(item => ({
                    ...item,
                    ptk_alamat_id:uuidv4(),                                        
                }))
            )

            await Ptk_anggota_keluarga.bulkCreate(
                ptk.map(item => ({
                   ptk_id:item.ptk_id,
                   nama:item.nama_suami_istri
                }))
            )

            res.status(200).json({
                message:"Daat berhasil diupload",
                data:ptk,
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

module.exports = router