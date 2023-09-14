import {create} from "zustand"

const useFormStore = create((set) => ({
    form:{},
    setform:(name,value) => set((state) => ({form:{...state.form,[name]:value}})),
    resetform:() => set(() => ({form:{}}))
}))

export default useFormStore