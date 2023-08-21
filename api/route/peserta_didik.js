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
const Peserta_didik_alamat = require("../models/peserta_didik_alamat")
const Jenis_tinggal = require("../models/jenis_tinggal")
const wilayah_kemendagri = require("../models/wilayah_kemendagri_2022")
const Peserta_didik_kesehatan = require("../models/peserta_didik_kesehatan")
const Peserta_didik_rekening = require("../models/peserta_didik_rekening")
const Peserta_didik_kontak = require("../models/peserta_didik_kontak")
const Bank = require("../models/bank.js")
const Semester = require("../models/semester")
const {Op} = require("sequelize")
const multer = require("multer");
const Kurikulum_anggota_rombel = require("../models/kurikulum_anggota_rombel")
const kurikulum_rombongan_belajar = require('../models/kurikulum_rombongan_belajar');
const Kurikulum_rombongan_belajar = require("../models/kurikulum_rombongan_belajar");
const Wilayah_kemendagri = require("../models/wilayah_kemendagri_2022");


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

Peserta_didik.hasOne(Peserta_didik_alamat,{foreignKey:"peserta_didik_id"})
Peserta_didik_alamat.belongsTo(Peserta_didik,{foreignKey:"peserta_didik_id"})

Agama.hasOne(Peserta_didik,{foreignKey:"agama_id"})
Peserta_didik.belongsTo(Agama,{foreignKey:"agama_id"})

Alat_transportasi.hasOne(Peserta_didik,{foreignKey:"alat_transportasi_id"})
Peserta_didik.belongsTo(Alat_transportasi,{foreignKey:"alat_transportasi_id",sourceKey:"alat_transportasi_id"})

ref_pekerjaan.hasOne(Peserta_didik,{foreignKey:"pekerjaan_ayah_id"})
Peserta_didik.belongsTo(ref_pekerjaan,{foreignKey:"pekerjaan_ayah_id"})

Jenjang_pendidikan.hasOne(Peserta_didik,{foreignKey:'pendidikan_ayah_id'})
Peserta_didik.belongsTo(Jenjang_pendidikan,{foreignKey:'pendidikan_ayah_id'})


router.route("/peserta_didik")
    .get(async(req,res) => {
        try{
            const allData = await Peserta_didik.findAll({
                order:[["nama","ASC"]],
                include:[Agama,Alat_transportasi]

            })
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
    .post(async(req,res) => {
        try{
            const addData = await Peserta_didik.create({
                peserta_didik_id:uuidv4(),
                sekolah_id:req.body.sekolah_id,
                nama:req.body.nama,
                jenis_kelamin:req.body.jenis_kelamin,
                tempat_lahir:req.body.tempat_lahir,
                tanggal_lahir:req.body.tanggal_lahir,
                agama_id:req.body.agama_id,
                golongan_darah:req.body.golongan_darah,
                kewarganegaraan:req.body.kewarganegaraan,
                anak_keberapa:req.body.anak_keberapa,
                jumlah_saudara_kandung:req.body.jumlah_saudara_kandung,
                alat_transportasi_id:req.body.alat_transportasi_id,
                nama_ayah:req.body.nama_ayah,
                pendidikan_ayah_id:req.body.pendidikan_ayah_id,
                pekerjaan_ayah_id:req.body.pekerjaan_ayah_id,
                tanggal_lahir_ayah:req.body.tanggal_lahir_ayah,
                nama_ibu_kandung:req.body.nama_ibu,
                pendidikan_ibu_id:req.body.pendidikan_ibu_id,
                pekerjaan_ibu_id:req.body.pekerjaan_ibu_id,
                tanggal_lahir_ibu:req.body.tanggal_lahir_ibu,
                nama_wali:req.body.nama_wali,
                pendidikan_wali_id:req.body.pendidikan_wali_id,
                pekerjaan_wali_id:req.body.pekerjaan_wali_id,
                tanggal_lahir_wali:req.body.tanggal_lahir_wali,
                nik:req.body.nik,
                nisn:req.body.nisn,
                nipd:req.body.nipd,
                no_kk:req.body.no_kk,
                reg_akta_lahir:req.body.reg_akta_lahir,
                no_kks:req.body.no_kks,
                penerima_kps:req.body.penerima_kps,
                no_kps:req.body.no_kps,
                penerima_kip:req.body.penerima_kip,
                layak_pip:req.body.layak_pip,
                alasan_layak_pip:req.body.alasan_layak_pip,
                no_kip:req.body.no_kip,
                nama_di_kip:req.body.nama_di_kip,
                npsn_jenjang_sebelumnya:req.body.npsn_jenjang_sebelumnya,
                penerima_pip:req.body.penerima_pip,
                jenis_tinggal_id:req.body.jenis_tinggal
            })

            res.status(200).json({
                message:"Data berhasil ditambahkan",
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

router.route("/peserta_didik/upload")
    .post(upload.single('file'),async(req,res) => {
        try{
            const file = req.file
            const filebody = req.body.file

            const workbook = xlsx.readFile(file.path)
            const sheetname = workbook.SheetNames[0]
            const sheet = workbook.Sheets[sheetname]
            const data = xlsx.utils.sheet_to_json(sheet)

            const dataenum = []
            const emptydatarombel = []

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
            const ref_jenis_tinggal = await Jenis_tinggal.findAll({
                attributes:{
                    exclude:"id"
                }
            })
            const ref_wilayah_kemendagri = await wilayah_kemendagri.findAll({
                where:{
                    id_wilayah:{
                        [Op.like]:"32%"
                    }
                },
                attributes:{
                    exclude:"id"
                },
                
            })
            const ref_bank = await Bank.findAll({
                attributes:{
                    exclude:"id"
                }
            })
            const kurikulum_rombongan_belajar = await Kurikulum_rombongan_belajar.findAll()



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

                //get id jenis tinggal
                const jenistinggal = ref_jenis_tinggal.filter(items => items.nama === row.__EMPTY_15)
                const getjenistinggalid = jenistinggal.length > 0 ?
                    jenistinggal.map(items => items.jenis_tinggal_id)
                    :
                    null
                const resultJenisTinggal = getjenistinggalid || [0]

                //get id bank
                const bank = ref_bank.filter(items => items.nm_bank === row.__EMPTY_49)
                const getbankid = bank.length > 0 ? 
                    bank.map(items => items.id_bank)
                    :
                    null
                const resultBank = getbankid || [0]


                //mendapatakan kode wilayah
               if(row.__EMPTY_13 && row.__EMPTY_13.startsWith("Kec. ")){
                    row.__EMPTY_13 = row.__EMPTY_13.substring(5)
               }

              
    
                //mengubah tulisan di kolom kelurahan menjadi titlecase
               const toTitleCase = (input) => {
                   if(typeof input !== 'string'){
                    return ''
                   }
                   const words = input.trim().split(' ')
                   const titlecaseword =  words.map(word => {
                        if(word.length === 0){
                            return ''
                        }
                        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                   })
                   return titlecaseword.join(' ')
               }

               const kelurahan = toTitleCase(row.__EMPTY_12)

               let datawilayahdesa = ref_wilayah_kemendagri.filter(item => item.nama == kelurahan )
               let datawilayahkec = ref_wilayah_kemendagri.filter(item => item.nama == row.__EMPTY_13)
               let dataall = ref_wilayah_kemendagri.filter(item => item.nama == kelurahan || item.nama == row.__EMPTY_13)
        
               let getid_wilayah = dataall.filter(item => item.id_wilayah.substring(0,6)  ) 
              
               /* let findsameid =  (namaKecamatan) => {
                    let matcheddata = ref_wilayah_kemendagri.find(item => item.nama === namaKecamatan || item.id_wlayah.length === 6)
                    if(matcheddata){
                        const id = matcheddata.id_wilayah.substring(0,6)
                        return id
                    }
                    return null
               } */

               //const idpartial = findsameid(row.__EMPTY_13)


               //mengambil kelas
               const rombelkelas = row.__EMPTY_41 ? row.__EMPTY_41.substring(0,2) : null

               //mengubah data rombel menjadi uppercase
               const rombelUpperCase = row.__EMPTY_41 ? row.__EMPTY_41.toUpperCase() : null

               //mengambil rombongan belajar id
               const datarombel = kurikulum_rombongan_belajar.filter(item => item.nama.trim() == rombelUpperCase)
               const getrombelid =  datarombel.length > 0?
                datarombel.map(items => 
                        items.rombongan_belajar_id
                )
                :
                null

                const resultidrombel = getrombelid || [null]
            


                let data_peserta_didik = {
                    peserta_didik_id:uuidv4(),
                    rombongan_belajar_id:uuidv4(),
                    //kodewilayah:filtered_datawilayahkec,
                    kelas:rombelkelas,
                    jenis_pendaftaran_id: rombelkelas == 10 ? 1 : (rombelkelas >= 11 && rombelkelas <= 12 ? 3:0),
                    rombongan_belajar_id:resultidrombel[0] || null,
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
                    kelurahan:kelurahan || null,
                    kecamatan:row.__EMPTY_13,
                    kode_pos:row.__EMPTY_14 || 0,
                    jenis_tinggal:resultJenisTinggal,
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
                    rombel:row.__EMPTY_41 ? row.__EMPTY_41.toUpperCase() : null,
                    no_peserta_un:row.__EMPTY_42|| null,
                    no_seri_ijazah:row.__EMPTY_43|| null,
                    penerima_kip:row.__EMPTY_44 === "Tidak" ? 0 : 1,
                    nomor_kip:row.__EMPTY_45|| null,
                    nama_kip:row.__EMPTY_46|| 0,
                    no_kks:row.__EMPTY_47 || null,
                    no_akta_lahir:row.__EMPTY_48 || null,
                    bank:resultBank,
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
                    berat_badan:row.__EMPTY_60 || 0,
                    tinggi_badan:row.__EMPTY_61 || 0,
                    lingkar_kepala:row.__EMPTY_62 || 0,
                    jumlah_saudara_kandung:row.__EMPTY_63 || 0,
                    jarak_rumah_ke_sekolah:row.__EMPTY_64 || 0
                }

            
                 
                for(const key in data_peserta_didik){
                    if(data_peserta_didik[key] === '   '){
                        data_peserta_didik[key] = null
                    }                  
                }
                
                if(data_peserta_didik.kode_pos === "     "){
                    data_peserta_didik.kode_pos = null
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

                Peserta_didik.bulkCreate(
                dataenum.map(item => ({
                    peserta_didik_id:item.peserta_didik_id,
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
                    nama_di_kip:item.nama_kip,
                    alasan_layak_pip:item.alasan_layak_pip,

                    sekolah_id:req.body.sekolah_id
                }))
            ) 

            Peserta_didik_alamat.bulkCreate(
                dataenum.map(item => ({
                    peserta_didik_alamat_id:uuidv4(),
                    peserta_didik_id:item.peserta_didik_id,
                    alamat_jalan:item.alamat,
                    rt:item.rt,
                    rw:item.rw,
                    nama_dusun:item.dusun,
                    kode_wilayah:item.kode_wilayah,
                    kode_pos:item.kode_pos,
                    lintang:item.lintang,
                    bujur:item.bujur,
                    jenis_tinggal_id:item.jenis_tinggal,
                    jarak_ke_sekolah:item.jarak_rumah_ke_sekolah

                }))
            )

            Peserta_didik_kesehatan.bulkCreate(
                dataenum.map(item => ({
                    peserta_didik_kesehatan_id:uuidv4(),
                    peserta_didik_id:item.peserta_didik_id,
                    buta_warna:item.buta_warna,
                    berat_badan:item.berat_badan,
                    tinggi_badan:item.tinggi_badan,
                    lingkar_kepala:item.lingkar_kepala,
                    visus_mata:item.visus_mata,
                    ldl:item.ldl,
                    hdl:item.hdl,
                    gula_darah:item.gula_darah,
                    tekanan_darah:item.tekanan_darah,
                    tanggal_test:item.tanggal_test
                }))
            )

            Peserta_didik_kontak.bulkCreate(
                dataenum.map(item => ({
                    peserta_didik_kontak_id:uuidv4(),
                    peserta_didik_id:item.peserta_didik_id,
                    nomor_telepon_rumah:item.telepon,
                    nomor_telepon_seluler:item.hp,
                    email:item.email,
                    twitter:item.twitter,
                    facebook:item.facebook,
                    instagram:item.instagram,
                    youtube:item.youtube,
                }))
            )

            Peserta_didik_rekening.bulkCreate(
                dataenum.map(item => ({
                    peserta_didik_rekening_id:uuidv4(),
                    peserta_didik_id:item.peserta_didik_id,
                    id_bank:item.bank[0],
                    no_rekening:item.no_rekening,
                    rekening_atas_nama:item.rekening_atas_nama,

                }))
            )
 

         Kurikulum_anggota_rombel.bulkCreate(
            dataenum.map(item => ({
                    anggota_rombel_id:uuidv4(),   
                    peserta_didik_id:item.peserta_didik_id,
                    rombongan_belajar_id:item.rombongan_belajar_id,
                    jenis_pendaftaran_id:item.jenis_pendaftaran_id 
                }
            )
            )
        ) 
           

            
            res.status(200).json({
                message:"Data berhasil ditambahkan",
                data:dataenum,
                id_bank:dataenum.bank,
                nulldatarombel:dataenum.filter(item => item.rombongan_belajar_id === null),
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

router.route("/peserta_didik/:id")
    .put(async(req,res) => {
        try{

        }
        catch(e){

        }
    })
    .delete(async(req,res) => {
        try{
            const id = req.params.id
            const findData = await Peserta_didik.findByPk(id)
            const findDataAlamat = await Peserta_didik_alamat.findOne({
                where:{
                    peserta_didik_id:id
                }
            })
            const findDataKontak = await Peserta_didik_kontak.findOne({
                where:{
                    peserta_didik_id:id
                }
            })
            const findDataKesehatan = await Peserta_didik_kesehatan.findOne({
                where:{
                    peserta_didik_id:id
                }
            })
            const findDataRekening = await Peserta_didik_rekening.findOne({
                where:{
                    peserta_didik_id:id
                }
            })
            const findDataAnggotaDataRombel = await Kurikulum_anggota_rombel.findOne({
                where:{
                    peserta_didik_id:id
                }
            })


            if(findData){
                findDataAnggotaDataRombel.destroy()
                findDataRekening.destroy()
                findDataKesehatan.destroy()
                findDataKontak.destroy()
                findDataAlamat.destroy()
                findData.destroy()

                res.status(200).json({
                    message:"Data berhasil dihapus",
                    method:req.method
                })
            }
            else{
                res.status(400).json({
                    message:e.message,
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