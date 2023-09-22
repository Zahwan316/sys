import {create} from "zustand"

const usePtkStore = create((set) => ({
    ptk:[],
    setdataptk:(data) => set(() => ({ptk:data})),

    ptkselected:[],
    setptkselected:(data) => set(() => ({ptkselected:data})),

    ptk_tugas_mengajar:[],
    setptktugasmengajar:(data) => set(() => ({ptk_tugas_mengajar:data})),

    ptk_alamat:[],
    setptkalamat:(data) => set(() => ({ptk_alamat:data})),

    ptk_program_studi:[],
    setptkprogramstudi:(data) => set(() => ({ptk_program_studi:data})),
}))

export default usePtkStore