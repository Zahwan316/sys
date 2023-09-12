import {create} from "zustand"

const useSekolahStore = create((set) => ({
    sekolah_identitas:[],
    setsekolahidentitas:(data) => set(() => ({sekolah_identitas: data})),

    sekolah_alamat:[],
    setsekolahalamat:(data) => set(() => ({sekolah_alamat: data})),

    sekolah_akreditasi:[],
    setsekolahakreditasi:(data) => set(() => ({sekolah_akreditasi: data})),

    sekolah_iso:[],
    setsekolahiso:(data) => set(() => ({sekolah_iso: data})),

    sekolah_rekening:[],
    setsekolahrekening:(data) => set(() => ({sekolah_rekening: data})),

    sekolah_kepemilikan:[],
    setsekolahkepemilikan:(data) => set(() => ({sekolah_kepemilikan: data})),
}))

export default useSekolahStore