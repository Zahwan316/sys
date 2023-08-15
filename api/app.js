const express = require("express");
const app = express();
const port = 3100;
const cors = require("cors");
const sequelize = require("./config");
const {DataTypes} = require("sequelize")

//route

//sekolah page
const identitas_sekolah_route = require("./route/identitas_sekolah");
const waktu_penyelenggaraan_route = require("./route/waktu_penyelenggaraan");
const bentuk_pendidikan_route = require("./route/bentuk_pendidikan");
const sekolah_alamat_route  =require("./route/sekolah_alamat");
const wilayah_route = require("./route/wilayah_kemendagri");
const Sekolah_akreditasi_route = require("./route/sekolah_akreditasi.js")
const position_route = require("./route/longitude.js")
const sekolah_iso = require("./route/sekolah_iso");
const Bank_route = require("./route/bank");
const Sekolah_bank_route = require("./route/sekolah_bank");
const Status_kepemilikan_route = require("./route/status_kepemilikan")
const Sekolah_kepemilikan_route = require("./route/sekolah_kepemilikan")
const status_sekolah_route = require("./route/status_sekolah");
const akreditasi_route = require("./route/akreditasi")
const sertifkasi_iso_route = require("./route/sertifikasi_iso")

//kurikulum page
const kurikulum_route = require("./route/kurikulum")
const Ref_kurikulum_route = require("./route/ref_kurikulum")
const Kurikulum_sp_route = require("./route/kurikulum_sp")
const Kurikulum_program_route = require("./route/kurikulum_program")
const Jurusan_route = require("./route/jurusan")
const Semester_route = require("./route/semester")
const Jenis_rombel_route = require("./route/jenis_rombel")
const Tingkat_pendidikan_route = require("./route/tingkat_pendidikan")
const Kurikulum_rombongan_belajar_route = require("./route/kurikulum_rombongan_belajar")
const Ptk_route = require("./route/ptk")
const Ptk_tugas_mengajar_route = require("./route/ptk_tugas_mengajar")
const Kbm_mapel_sp = require(("./route/kbm_mapel_sp"))
const Jadwal_kbm_route = require("./route/jadwal_kbm")
const Waktu_kbm_route = require("./route/waktu_kbm")
const Hari_route = require("./route/hari")
const Merdeka_mapel_route = require("./route/merdeka_mapel")

//mutasi page
const Peserta_didik_route = require("./route/peserta_didik")
const Kurikulum_anggota_rombel_route = require("./route/kurikulum_anggota_rombel")
const Jenis_pendaftaran_route = require("./route/jenis_pendaftaran");

//peserta didik  route
const Ref_pekerjaan = require("./route/pekerjaan")
const Jenjang_pendidikan_route = require("./route/jenjang_pendidikan.js")


//library
const multer = require("multer")

//app.use("/uploads",express.static('uploads'))
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}))
//app.use(multer().single('file'))


app.route("/",(req,res) => {
    res.send("index");
})

//route
//sekolah page
app.use(identitas_sekolah_route)
app.use(waktu_penyelenggaraan_route)
app.use(bentuk_pendidikan_route);
app.use(wilayah_route);
app.use(sekolah_alamat_route);
app.use(Sekolah_akreditasi_route)
app.use(position_route)
app.use(sekolah_iso)
app.use(Bank_route)
app.use(Sekolah_bank_route)
app.use(Status_kepemilikan_route)
app.use(Sekolah_kepemilikan_route)
app.use(status_sekolah_route);
app.use(akreditasi_route);
app.use(sertifkasi_iso_route)

//kurikulum page
app.use(kurikulum_route)
app.use(Ref_kurikulum_route)
app.use(Kurikulum_sp_route)
app.use(Kurikulum_program_route)
app.use(Jurusan_route)
app.use(Semester_route)
app.use(Jenis_rombel_route)
app.use(Tingkat_pendidikan_route)
app.use(Kurikulum_rombongan_belajar_route)
app.use(Ptk_route)
app.use(Ptk_tugas_mengajar_route)
app.use(Kbm_mapel_sp)
app.use(Jadwal_kbm_route)
app.use(Waktu_kbm_route)
app.use(Hari_route)
app.use(Merdeka_mapel_route)

//mutasi page
app.use(Peserta_didik_route)
app.use(Kurikulum_anggota_rombel_route)
app.use(Jenis_pendaftaran_route)

//peserta didik
app.use(Ref_pekerjaan)
app.use(Jenjang_pendidikan_route)


//end route

app.listen(port,() => {
    console.log(`Start at localhost:${port}`)
})

module.exports = app