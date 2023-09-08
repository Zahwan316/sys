import {create} from "zustand"

const useKurikulumStore = create((set) => ({
    kurikulum_sp:[],
    setkurikulumsp:(data) => set(() => ({kurikulum_sp:data})),

    kurikulum_program:[],
    setkurikulumprogram:(data) => set(() => ({kurikulum_program:data})),

    kurikulum_rombongan_belajar:[],
    setkurikulumrombonganbelajar:(data) => set(() => ({kurikulum_rombongan_belajar:data})),

    kurikulum_anggota_rombel:[],
    setkurikulumanggotarombel:(data) => set(() => ({kurikulum_anggota_rombel:data})),
}))

export default useKurikulumStore