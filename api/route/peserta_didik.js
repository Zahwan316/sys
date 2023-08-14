const express = require("express");
const router = express.Router();
const {v4:uuidv4} = require("uuid")
const Peserta_didik = require("../models/peserta_didik")
const xlsx = require("xlsx");
const ref_pekerjaan = require("../models/pekerjaan")
const Alasan_layak_pip = require("../models/alasan_layak_pip")
const Alat_transportasi = require("../models/alat_transportasi")
const Jenjang_pendidikan = require("../models/jenjang_pendidikan")
const Agama = require("../models/agama")

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

            //model relationn
            const ref_alasan_layak_pip = await Alasan_layak_pip.findAll({
                attributes:{
                    exclude:"id"
                }
            })
            const ref_alat_transportasi = await Alat_transportasi.findAll({
                attributes:{
                    exclude:"id"
                }
            })
            const ref_pekerjaan_main = await ref_pekerjaan.findAll({
                attributes:{
                    exclude:"id"
                }
            })
            const ref_jenjang_pendiikan = await Jenjang_pendidikan.findAll({
                attributes:{
                    exclude:"id"
                }
            })
            const ref_agama = await Agama.findAll({
                attributes:{
                    exclude:"id"
                }
            })



            let index = 0
            for(const row of data){
                //get id pip
                const alasanLayakPip = ref_alasan_layak_pip.filter(items => items.alasan_layak_pip === row.__EMPTY_53)
                const getidpip = alasanLayakPip.length > 0 ?
                    alasanLayakPip.map(items => items.id_layak_pip)
                    :null
                const resultidlayakpip = getidpip || [0]

                //get id transportasi
                const alatTransportasi = ref_alat_transportasi.filter(items => items.nama === row.__EMPTY_16)
                const getIdTransportasi = alatTransportasi.length > 0 ?
                    alatTransportasi.map(items => items.alat_transportasi_id)
                    :
                    null
                const resultTransporasi = getIdTransportasi || [0]

                //get id pekerjaan
                const getidpekerjaan = (object) => {
                    const pekerjaan =  ref_pekerjaan_main.filter(items => items.nama === object )
                    const getpekerjaanid = pekerjaan.length > 0 ?
                        pekerjaan.map(items => items.pekerjaan_id)
                        :
                        null

                    const resultPekerjaan = getpekerjaanid || [0]
                    return resultPekerjaan
                }

                //get id pendidikan
                const getidpendidikan = (object) => {
                    const pendidikan = ref_jenjang_pendiikan.filter(items => items.nama === object)
                    const getpendidikanid = pendidikan.length > 0 ?
                        pendidikan.map(items => items.jenjang_pendidikan_id)
                        :
                        null
                    const resultPendidikan = getpendidikanid || [0]
                    return resultPendidikan
                }

                //get id agama
                const agama = ref_agama.filter(items => items.nama === row.__EMPTY_7 )
                const getagamaid = agama.length > 0 ?
                    agama.map(items => items.agama_id)
                    :
                    null
                const resultagama = getagamaid || [0]



                let data_peserta_didik = {
                    nama:row.__EMPTY || null,
                    nipd:row.__EMPTY_1 || null,
                    jk:row.__EMPTY_2 || null,
                    nisn:row.__EMPTY_3 || null,
                    tempat_lahir:row.__EMPTY_4 || null,
                    tanggal_lahir:row.__EMPTY_5 || null,
                    nik:row.__EMPTY_6 || null,
                    agama:resultagama,
                    alamat:row.__EMPTY_8 || null,
                    rt:row.__EMPTY_9 || null,
                    rw:row.__EMPTY_10 || null,
                    dusun:row.__EMPTY_11 || null,
                    kelurahan:row.__EMPTY_12 || null,
                    kecamatan:row.__EMPTY_13 || null,
                    kode_pos:row.__EMPTY_14 || null,
                    jenis_tinggal:row.__EMPTY_15 || null,
                    alat_transportasi:resultTransporasi,
                    telepon:row.__EMPTY_17 || null,
                    hp:row.__EMPTY_18 || null,
                    email:row.__EMPTY_19 || null,
                    skhun:row.__EMPTY_20 || null,
                    penerima_kps:row.__EMPTY_21 === "Tidak" ? 0 : 1,
                    no_kps:row.__EMPTY_22|| null,
                    nama_ayah:row.__EMPTY_23|| null,
                    tahun_lahir_ayah:row.__EMPTY_24|| null,
                    jenjang_pendidikan_ayah:getidpendidikan(row.__EMPTY_25),
                    pekerjaan_ayah:getidpekerjaan(row.__EMPTY_26),
                    penghasilan_ayah:row.__EMPTY_27|| null,
                    nik_ayah:row.__EMPTY_28|| null,
                    nama_ibu:row.__EMPTY_29|| null,
                    tahun_lahir_ibu:row.__EMPTY_30|| null,
                    jenjang_pendidikan_ibu:getidpendidikan(row.__EMPTY_31),
                    pekerjaan_ibu:getidpekerjaan(row.__EMPTY_32),
                    penghasilan_ibu:row.__EMPTY_33|| null,
                    nik_ibu:row.__EMPTY_34|| null,
                    nama_wali:row.__EMPTY_35|| null,
                    tahun_lahir_wali:row.__EMPTY_36|| null,
                    jenjang_pendidikan_wali:getidpendidikan(row.__EMPTY_37),
                    pekerjaan_wali:getidpekerjaan(row.__EMPTY_38),
                    penghasilan_wali:row.__EMPTY_39 || null,
                    nik_wali:row.__EMPTY_40|| null,
                    rombel:row.__EMPTY_41 || null,
                    no_peserta_un:row.__EMPTY_42|| null,
                    no_seri_ijazah:row.__EMPTY_43|| null,
                    penerima_kip:row.__EMPTY_44 === "Tidak" ? 0 : 1,
                    nomor_kip:row.__EMPTY_45|| null,
                    nama_kip:row.__EMPTY_46|| null,
                    no_kks:row.__EMPTY_47 || null,
                    no_akta_lahir:row.__EMPTY_48 || null,
                    bank:row.__EMPTY_49 || null,
                    no_rekening:row.__EMPTY_50 || null,
                    rekening_atas_nama:row.__EMPTY_51 || null,
                    layak_pip:row.__EMPTY_52 === "Tidak" ? 0 : 1,
                    alasan_layak_pip:resultidlayakpip ,
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
                 
                for(const key in data_peserta_didik){
                    if(data_peserta_didik[key] === ''){
                        data_peserta_didik[key] = null
                    }
                }

                if(index >= 5){
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
            let generateuuid = () => {
                return uuidv4()
            }

                /*  let sendata = await */   Peserta_didik.bulkCreate(
                dataenum.map(item => ({
                    peserta_didik_id:generateuuid(),
                    nama:item.nama,
                    agama_id:item.agama,
                    jenis_kelamin:item.jk,
                    tempat_lahir:item.tempat_lahir,
                    tanggal_lahir:item.tanggal_lahir,
                    anak_keberapa:item.anak_ke,
                    jumlah_saudara_kandung:item.jumlah_saudara_kandung,
                    alat_transportasi_id:item.alat_transportasi,

                    //ayah
                    nama_ayah:item.nama_ayah,
                    tanggal_lahir_ayah:item.tahun_lahir_ayah,
                    pendidikan_ayah_id:item.jenjang_pendidikan_ayah,
                    pekerjaan_ayah_id:item.pekerjaan_ayah,

                    //ibu
                    nama_ibu_kandung:item.nama_ibu,
                    tanggal_lahir_ibu:item.tahun_lahir_ibu,
                    pekerjaan_ibu_id:item.pekerjaan_ibu,
                    pendidikan_ibu_id:item.jenjang_pendidikan_ibu,

                    //wali
                    nama_wali:item.nama_wali,
                    tanggal_lahir_wali:item.tahun_lahir_wali,
                    pekerjaan_wali_id:item.pekerjaan_wali,
                    pendidikan_wali_id:item.jenjang_pendidikan_wali,
                    tanggal_lahir_wali:item.tahun_lahir_wali,

                    kewarganegaraan:"ID",
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
                    alasan_layak_pip:item.alasan_layak_pip,

                    sekolah_id:req.body.sekolah_id
                }))
            ) 

           /*  console.log(sendata) */
           

            
            res.status(200).json({
                message:"Data berhasil ditambahkan",
                data:dataenum,
                uuid:generateuuid(),
                /* sendata, */
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