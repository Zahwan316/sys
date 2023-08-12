const express = require("express");
const router = express.Router();
const {v4:uuidv4} = require("uuid")
const Peserta_didik = require("../models/peserta_didik")
const xlsx = require("xlsx");
const { utils } = require("pg-promise");
const app = require("../app")

const multer = require("multer");

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

router.route("/peserta_didik")
    .get(async(req,res) => {
        try{
            const allData = await Peserta_didik.findAll()
            res.status(200).json({
                message:"Data berhasil diambil",
                data:allData,
                method:req.method
            })
        }
        catch(e){
            res.status(400).json({
                message:e.message,
                methode:req.method
            })
        }
    })

router.route("/peserta_didik/upload")
    .post(upload.single('file'),async(req,res) => {
        try{
            const file = req.file
            const filebody = req.body.file

            const workbook = xlsx.readFile(file.path)
            const sheetname = workbook.SheetNames[0]
            const sheet = workbook.Sheets[sheetname]
            const data = xlsx.utils.sheet_to_json(sheet)

            const dataenum = [{}]

            let index = 0
            for(const row of data){
                let data_peserta_didik = {
                    nama:row.__EMPTY || null,
                    nipd:row.__EMPTY_1 || null,
                    jk:row.__EMPTY_2 || null,
                    nisn:row.__EMPTY_3 || null,
                    tempat_lahir:row.__EMPTY_4 || null,
                    tanggal_lahir:row.__EMPTY_5 || null,
                    nik:row.__EMPTY_6 || null,
                    agama:row.__EMPTY_7 || null,
                    alamat:row.__EMPTY_8 || null,
                    rt:row.__EMPTY_9 || null,
                    rw:row.__EMPTY_10 || null,
                    dusun:row.__EMPTY_11 || null,
                    kelurahan:row.__EMPTY_12 || null,
                    kecamatan:row.__EMPTY_13 || null,
                    kode_pos:row.__EMPTY_14 || null,
                    jenis_tinggal:row.__EMPTY_15 || null,
                    alat_transportasi:row.__EMPTY_16 || null,
                    telepon:row.__EMPTY_17 || null,
                    hp:row.__EMPTY_18 || null,
                    email:row.__EMPTY_19 || null,
                    skhun:row.__EMPTY_20 || null,
                    penerima_kps:row.__EMPTY_21|| null,
                    no_kps:row.__EMPTY_22|| null,
                    nama_ayah:row.__EMPTY_23|| null,
                    tahun_lahir_ayah:row.__EMPTY_24|| null,
                    jenjang_pendidikan_ayah:row.__EMPTY_25|| null,
                    pekerjaan_ayah:row.__EMPTY_26|| null,
                    penghasilan_ayah:row.__EMPTY_27|| null,
                    nik_ayah:row.__EMPTY_28|| null,
                    nama_ibu:row.__EMPTY_29|| null,
                    tahun_lahir_ibu:row.__EMPTY_30|| null,
                    jenjang_pendidikan_ibu:row.__EMPTY_31|| null,
                    pekerjaan_ibu:row.__EMPTY_32|| null,
                    penghasilan_ibu:row.__EMPTY_33|| null,
                    nik_ibu:row.__EMPTY_34|| null,
                    nama_wali:row.__EMPTY_35|| null,
                    tahun_lahir_wali:row.__EMPTY_36|| null,
                    jenjang_pendidikan_wali:row.__EMPTY_37|| null,
                    pekerjaan_wali:row.__EMPTY_38|| null,
                    penghasilan_wali:row.__EMPTY_39 || null,
                    nik_wali:row.__EMPTY_40|| null,
                    rombel:row.__EMPTY_41|| null,
                    no_peserta_un:row.__EMPTY_42|| null,
                    no_seri_ijazah:row.__EMPTY_43|| null,
                    penerima_kip:row.__EMPTY_44|| null,
                    nomor_kip:row.__EMPTY_45|| null,
                    nama_kip:row.__EMPTY_46|| null,
                    no_kks:row.__EMPTY_47 || null,
                    no_akta_lahir:row.__EMPTY_48 || null,
                    bank:row.__EMPTY_49 || null,
                    no_rekening:row.__EMPTY_50 || null,
                    rekening_atas_nama:row.__EMPTY_51 || null,
                    layak_pip:row.__EMPTY_52 || null,
                    alasan_layak_pip:row.__EMPTY_53 || null,
                    kebutuhan_khusus:row.__EMPTY_54 || null,
                    asal_sekolah:row.__EMPTY_55 || null,
                    anak_ke:row.__EMPTY_56 || null,
                    lintang:row.__EMPTY_57 || null,
                    bujur:row.__EMPTY_58 || null,
                    no_kk:row.__EMPTY_59 || null,
                    berat_badan:row.__EMPTY_60 || null,
                    tinggi_badan:row.__EMPTY_61 || null,
                    lingkar_kepala:row.__EMPTY_62 || null,
                    jumlah_saudara_kandung:row.__EMPTY_63 || null,
                    jarak_rumah_ke_sekolah:row.__EMPTY_64 || null
                }
                
                 /* for(let data_alamat of data){
                        const display = 3;
                        let count = 0
                        for(let key in data_alamat){
                            if(count < display){
                                const value = data_alamat[key]
                                console.log(value)
                                count++
                            }
                        }
                    
                    
                }  */  
                if(index > 5){
                    dataenum.push(data_peserta_didik)

                }            
                index++
            }

            let data_alamat_main = []
            
           /*  for(let data_alamat of data){
                let key_data_alamat = {}
                for(let val_alamat in data_alamat){
                    if(val_alamat.startsWith("__EMPTY_")){
                        const index = parseInt(val_alamat.replace("__EMPTY_",""))

                        if(index >= 8 && index <= 14){
                            key_data_alamat[val_alamat] = data_alamat[val_alamat]
                            
                        }
                    }
                }
                data_alamat_main.push(key_data_alamat)
            } */

             /* let sendata = await  */Peserta_didik.bulkCreate(
                dataenum.map(item => ({
                    peserta_didik_id:uuidv4(),
                    nama:item.nama,
                    jenis_kelamin:item.jk,
                    tempat_lahir:item.nama,
                    anak_keberapa:item.anak_ke,
                    jumlah_saudara_kandung:item.jumlah_saudara_kandung,
                    nama_ayah:item.nama_ayah,
                    tahun_lahir_ayah:item.tahun_lahir_ayah,
                    nama_ibu_kandung:item.nama_ibu,
                    tanggal_lahir_ibu:item.tahun_lahir_ibu,
                    nama_wali:item.nama_wali,
                    tanggal_lahir_wali:item.tahun_lahir_wali,
                    nik:item.nik,
                    nisn:item.nisn,
                    nipd:item.nipd,
                    reg_akta_lahir:item.no_akta_lahir,
                    no_kks:item.no_kks,
                    penerima_kps:item.penerima_kps,
                    no_kps:item.no_kps,
                    penerima_kip:item.penerima_kip,
                    layak_pip:item.layak_pip,
                    no_kip:item.nomor_kip,
                    nama_kip:item.nama_kip,
                    sekolah_id:req.body.sekolah_id
                }))
            ) 
           

            
            res.status(200).json({
                message:"Data berhasil ditambahkan",
                data:dataenum,
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