import {create} from "zustand"

const usePtkStore = create((set) => ({
    ptk:[],
    ptkselected:[],

    setdataptk:(data) => set(() => ({ptk:data})),
    setptkselected:(data) => set(() => ({ptkselected:data})),
}))

export default usePtkStore