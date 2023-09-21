import {create} from "zustand"

const useItemStore = create((set) => ({
    sekolah_id:null,
    setsekolahid:(data) => set(() => ({sekolah_id:data})),

    user:null,
    setuser:(data) => set(() => ({user:data})),

    kurikulum_sp_id:null,
    setkurikulum_sp_id:(data) => set(() => ({kurikulum_sp_id:data})),

    semester_id:null,
    setsemesterid:(data) => set(() => ({semester_id:data})),

    bentuk_pendidikan_id:null,
    setbentukpendidikanid:(data) => set(() => ({bentuk_pendidikan_id:data})),

   /*  userlevel:0,
    setuserlevel:(data) => set(() => ({userlevel:data})), */

}))

export default useItemStore