import {create} from "zustand"

const usePtkStore = create((set) => ({
    ptk:[],
    setdataptk:(data) => set(() => ({ptk:data})),

    ptkselected:[],
    setptkselected:(data) => set(() => ({ptkselected:data})),

    ptk_tugas_mengajar:[],
    setptktugasmengajar:(data) => set(() => ({ptk_tugas_mengajar:data}))

    
}))

export default usePtkStore