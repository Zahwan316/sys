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
   
}))

export default useRefStore