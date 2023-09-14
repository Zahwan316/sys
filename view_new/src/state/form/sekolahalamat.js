import {create} from "zustand"

const useSekolahAlamatFormStore = create((set) => ({
   form:{
    keaktifan:0
   },
   setform:(name,value) => set((state) => ({form:{...state.form,[name]:value}})),
   resetform:() => set(() => ({form:{
    keaktifan:0
   }}))
}))

export default useSekolahAlamatFormStore