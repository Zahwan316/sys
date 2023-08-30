import {create} from "zustand"

const usePtkStore = create((set) => ({
    ptk:[],

    setdataptk:(data) => set(() => ({ptk:data})),
}))

export default usePtkStore