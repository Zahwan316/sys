import {create} from "zustand"

const useStore =create((set) => ({
    //state peserta didik
    pesertadidik:[],
    pesertadidikid:[],
    pesertaddikalamat:[],
    pesertadidikkesehatan:[],
    pesertadidikkontak:[],
    pesertadidikrekening:[],
    namasiswa:"",


    namabank:[],
    datadesa:[],
    datakecamatan:[],
    datakota:[],
    datawilayah:[],

    jenis_tinggal:[],

    //state peserta didik menu
    pendidikan:[],
    pekerjaan:[],


    setdatapesertadidik:(name) => set(() => ({pesertadidik:name})),
    setpesertadidikid:(id) => set(() => ({pesertadidikid:id})),
    setdatapesertadidikalamat:(name) => set(() => ({pesertadidikalamat:name})),
    setdatapesertadidikkesehatan:(name) => set(() => ({pesertadidikkesehatan:name})),
    setdatapesertadidikkkontak:(name) => set(() => ({pesertadidikkontak:name})),
    setdatapesertadidikrekening:(name) => set(() => ({pesertadidikrekening:name})),
    setnamasiswa:(nama) => set(() => ({namasiswa:nama})),
    setnamabank:(nama) => set(() => ({namabank:nama})),

    setdatadesa:(item) => set(() => ({datadesa:item})),
    setdatakecamatan:(item) => set(() => ({datakecamatan:item})),
    setdatakota:(item) => set(() => ({datakota:item})),
    setdatawilayah:(item) => set(() => ({datawilayah:item})),

    setjenistinggal:(item) => set(() => ({jenistinggal:item})),
    
    setdatapendidikan:(data) => set(() => ({pendidikan:data})),
    setdatapekerjaan:(data) => set(() => ({pekerjaan:data})),
}))

export default useStore