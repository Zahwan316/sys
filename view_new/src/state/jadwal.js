import {create} from "zustand"

const useJadwalStore = create((set) => ({
    jadwal_kbm:[],
    setjadwalkbm:(item) => set(() => ({jadwal_kbm: item})),

    waktu_kbm:[],
    setwaktukbm:(item) => set(() => ({waktu_kbm:item}))
}))

export default useJadwalStore