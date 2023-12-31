import {create} from "zustand"

const useRefStore = create((set) => ({
   agama:[],   
   setagama:(data) => set(()=> ({agama:data})),

   jenis_ptk: [], 
   setjenis_ptk:(data) => set(()=> ({jenis_ptk:data})),

   status_kepegawaian: [], 
   setstatus_kepegawaian:(data) => set(()=> ({status_kepegawaian:data})),

   kewarganegaraan:[],
   setkewarganegaraan:(data) => set(()=> ({kewarganegaraan:data})),

   lembaga_pengangkatan: [], 
   setlembaga_pengangkatan:(data) => set(()=> ({lembaga_pengangkatan:data})),

   sumber_gaji:[],
   setsumber_gaji:(data) => set(()=> ({sumber_gaji:data})),

   pangkat:[],
   setpangkat:(data) => set(()=> ({pangkat:data})),

   keahlian_laboratorium:[],
   setkeahlian_laboratorium:(data) => set(()=> ({keahlian_laboratorium:data})),

   bank:[],
   setbank:(data) => set(()=> ({bank:data})),

   semester:[],
   setsemester:(data) => set(()=> ({semester:data})),

   messagelogin:"",
   setmessagelogin:(data) => set(()=> ({messagelogin:data})),

   jenis_tinggal:[],
   setjenistinggal:(item) => set(() => ({jenis_tinggal:item})),

   pendidikan:[],
   setdatapendidikan:(data) => set(() => ({pendidikan:data})),

   pekerjaan:[],
   setdatapekerjaan:(data) => set(() => ({pekerjaan:data})),

   alasanlayakpip:[],
   setalasanlayakpip:(data) => set(() => ({alasanlayakpip:data})),

   alat_transportasi:[],
   setalattransportasi:(data) => set(() => ({alat_transportasi:data})),

   kurikulum:[],
   setkurikulum:(data) => set(() => ({kurikulum:data})),

   jurusan:[],
   setjurusan:(data) => set(() => ({jurusan:data})),

   merdeka_mapel:[],
   setmerdekamapel:(data) => set(() => ({merdeka_mapel:data})),

   kbm_mapel_sp:[],
   setkbmmapelsp:(data) => set(() => ({kbm_mapel_sp:data})),

   bentuk_pendidikan:[],
   setbentukpendidikan:(data) => set(() => ({bentuk_pendidikan:data})),

   tingkat_pendidikan:[],
   settingkat_pendidikan:(data) => set(() => ({tingkat_pendidikan:data})),

   status_sekolah:[],
   setstatussekolah:(data) => set(() => ({status_sekolah:data})),

   waktu_penyelenggaraan:[],
   setwaktupenyelenggaraan:(data) => set(() => ({waktu_penyelenggaraan:data})),

   akreditasi:[],
   setakreditasi:(data) => set(() => ({akreditasi:data})),

   status_kepemilikan:[],
   setstatuskepemilikan:(data) => set(() => ({status_kepemilikan:data})),

   sertifikasi_iso:[],
   setsertifikasiiso:(data) => set(() => ({sertifikasi_iso:data})),

   jenis_rombel:[],
   setjenisrombel:(data) => set(() => ({jenis_rombel:data})),

   hari:[],
   sethari:(data) => set(() => ({hari:data})),

   gelar_akademik:[],
   setgelarakademik:(data) => set(() => ({gelar_akademik:data})),

   program_studi:[],
   setprogramstudi:(data) => set(() => ({program_studi:data})),

   hubungan_keluarga:[],
   sethubungankeluarga:(data) => set(() => ({hubungan_keluarga:data})),

}))

export default useRefStore