import {create} from "zustand"

const useRefStore = create((set) => ({
   agama:[],   
   jenis_ptk: [], 
   status_kepegawaian: [], 
   kewarganegaraan:[],
   lembaga_pengangkatan: [], 
   sumber_gaji:[],
   pangkat:[],
   keahlian_laboratorium:[],
   bank:[],

   setagama:(data) => set(()=> ({agama:data})),
   setjenis_ptk:(data) => set(()=> ({jenis_ptk:data})),
   setstatus_kepegawaian:(data) => set(()=> ({status_kepegawaian:data})),
   setkewarganegaraan:(data) => set(()=> ({kewarganegaraan:data})),
   setlembaga_pengangkatan:(data) => set(()=> ({lembaga_pengangkatan:data})),
   setsumber_gaji:(data) => set(()=> ({sumber_gaji:data})),
   setpangkat:(data) => set(()=> ({pangkat:data})),
   setkeahlian_laboratorium:(data) => set(()=> ({keahlian_laboratorium:data})),
   setbank:(data) => set(()=> ({bank:data}))
}))

export default useRefStore