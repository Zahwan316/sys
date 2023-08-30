import {create} from "zustand"

const useRefStore = create((set) => ({
   agama:[],   
   jenis_ptk: [], 
   status_kepegawaian: [], 

   setagama:(data) => set(()=> ({agama:data})),
   setjenis_ptk:(data) => set(()=> ({jenis_ptk:data})),
   setstatus_kepegawaian:(data) => set(()=> ({status_kepegawaian:data})),
}))

export default useRefStore