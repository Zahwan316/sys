import {create} from "zustand"

const useSekolahAlamatFormStore = create((set) => ({
    sekolah_id:null,
    alamat_jalan:null,
    rt:null,
    rw:null,
    nama_dusun:null,
    kode_wilayah:null,
    kode_pos:null,
    lintang:null,
    bujur:null,
    tmt:null,
    keaktifan:0,

    setform:(name,value) => set(() => ({[name]:value})),

    resetform:() => set(() => ({
        sekolah_id:null,
        alamat_jalan:null,
        rt:null,
        rw:null,
        nama_dusun:null,
        kode_wilayah:null,
        kode_pos:null,
        lintang:null,
        bujur:null,
        tmt:null,
        keaktifan:0,
    }))
}))

export default useSekolahAlamatFormStore