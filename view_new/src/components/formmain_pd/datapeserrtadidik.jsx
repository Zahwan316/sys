import React, { useState, useEffect } from 'react';
import TablePesertaDidik from './table';
import ModalPesertaDidik from './modal';
import axios from 'axios';
import {v4 as uuidv4} from "uuid"
import Swal from "sweetalert2"
import useStore from 'src/state/pesertadidik';

const DataPesertaDidikMain = (props) => {
    const tablehead = [
        "Nama",
        "NIPD",
        "NISN",
        "Jenis Kelamin",
        "Tempat Lahir",
        "Tanggal Lahir",
        "Agama",
        "Kewarganegaraan",

    ]

    const[modal,setmodal] = useState(false)
    const[editedid,seteditedid] = useState()
    const[typeform,settypeform] = useState()
    const[dataAgama,setdataagama] = useState([])
    const[dataKewarganegaraan,setdatakewarganegaraan] = useState([])
    const[datapekerjaan,setdatapekerjaan] = useState([])
    const[datapendidikan,setdatapendidikan] = useState([])
    const[dataalasanlyakpiip,setdataalasanlayakpip] = useStore((state) => [state.alasanlayakpip,state.setalasanlayakpip])
    const[datajenistinggal,setdatajenistinggal] = useState([])
    const[dataalattransportasi,setdataalattransportasi] = useState([])
    const[updater,setupdater] = useState()
    const datapesertadidik = useStore((state) => state.pesertadidik)
    const[namasiswa,setnamasiswa]= useState()
    const[forminput,setforminput] = useState({
        sekolah_id:localStorage.getItem("sekolah_id"),
        nama:null,
        jenis_kelamin:null,
        tempat_lahir:null,
        tanggal_lahir:null,
        agama_id:null,
        kewarganegaraan:null,
        nisn:null,
        nipd:null,
        golongan_darah:null,
        alat_transportasi_id:null,
        anak_keberapa:null,
        jumlah_saudara_kandung:null,
        nama_ayah:null,
        pendidikan_ayah_id:null,
        pekerjaan_ayah_id:null,
        tanggal_lahir_ayah:null,
        nama_ibu:null,
        pendidikan_ibu_id:null,
        pekerjaan_ibu_id:null,
        tanggal_lahir_ibu:null,
        nama_wali:null,
        pendidikan_wali_id:null,
        pekerjaan_wali_id:null,
        tanggal_lahir_wali:null,
        nik:null,
        no_kk:null,
        reg_akta_lahir:null,
        no_kks:null,
        penerima_kps:null,
        no_kps:null,
        penerima_kip:null,
        layak_pip:null,
        alasan_layak_pip:null,
        no_kip:null,
        nama_di_kip:null,
        npsn_jenjang_sebelumnya:null,
        penerima_pip:null,
        jenis_tinggal:null,
        tmt:null,
    })
    
    useEffect(() => {
        const getData = async() => {
            try{
                let response_agama = await axios.get(`${process.env.REACT_APP_LINK}agama`)
                let response_kewarganegaraan = await axios.get(`${process.env.REACT_APP_LINK}jenis_kewarganegaraan`)
                let response_pekerjaan = await axios.get(`${process.env.REACT_APP_LINK}ref_pekerjaan`)
                let response_pendidikan = await axios.get(`${process.env.REACT_APP_LINK}jenjang_pendidikan`)
                let response_alasan_pip = await axios.get(`${process.env.REACT_APP_LINK}alasan_layak_pip`)
                let response_jenis_tinggal = await axios.get(`${process.env.REACT_APP_LINK}jenis_tinggal`)
                let response_alat_transportasi = await axios.get(`${process.env.REACT_APP_LINK}alat_transportasi`)


                setdataagama(response_agama.data.data)
                setdatakewarganegaraan(response_kewarganegaraan.data.data)
                setdatapekerjaan(response_pekerjaan.data.data)
                setdatapendidikan(response_pendidikan.data.data)
                setdataalasanlayakpip(response_alasan_pip.data.data)
                setdatajenistinggal(response_jenis_tinggal.data.data)
                setdataalattransportasi(response_alat_transportasi.data.data)
            }
            catch(e){
                console.log(e)
            }
        }
        getData()
    },[])

    useEffect(() => {
        console.log(forminput)
        console.log(dataalasanlyakpiip)
    })

    useEffect(() => {
        setnamasiswa(props.namasiswa)
    },[props.namasiswa])

    useEffect(() => {
       const getddata = async() => {
            try{
                if(typeform == "edit"){
                    const getTargetedPesertaDidik_object = datapesertadidik.filter(item => item.peserta_didik_id == editedid)
                    const getTargetedPesertaDidik = getTargetedPesertaDidik_object[0]
                    console.log(getTargetedPesertaDidik)
                    setforminput({
                        sekolah_id:localStorage.getItem("sekolah_id"),
                        nama:getTargetedPesertaDidik.nama,
                        jenis_kelamin:getTargetedPesertaDidik.jenis_kelamin,
                        tempat_lahir:getTargetedPesertaDidik.tempat_lahir,
                        tanggal_lahir:getTargetedPesertaDidik.tanggal_lahir,
                        agama_id:getTargetedPesertaDidik.agama_id,
                        kewarganegaraan:getTargetedPesertaDidik.kewarganegaraan,
                        nisn:getTargetedPesertaDidik.nisn,
                        nipd:getTargetedPesertaDidik.nipd,
                    })
                }
                else if(typeform === 'tambah'){
                    setforminput({...forminput,
                        nama:"",
                        jenis_kelamin:"",
                        tempat_lahir:"",
                        tanggal_lahir:"",
                        agama_id:"",
                        kewarganegaraan:"",
                        nisn:"",
                        nipd:"",
                    })
                }
                
            }
            catch(e){
                console.log(e)
            }
       }
       getddata()
    },[editedid])

    const handleforminput = (e) => {
        setforminput({...forminput,[e.target.name]:e.target.value})
    }

    const handlemodal = () => {
        setmodal(!modal)
    }

    const getTypeBtn = (typebtn,id) => {
        seteditedid(id)
        settypeform(typebtn)
    }

    const handleKewarganegaraan = (option) => {
        setforminput({...forminput,kewarganegaraan:option.value})
    }
    const handleLayakpip = (option) => {
        setforminput({...forminput,alasan_layak_pip:option.value})
    }

    const handlesubmit = (e) => {
        e.preventDefault()

        const handlesenddata = async() => {
            try{
                if(typeform == "tambah"){
                    let response = await axios.post(`${process.env.REACT_APP_LINK}peserta_didik`,forminput)
                    Swal.fire({
                        icon:"success",
                        title:"Data terkirim",
                        text:"Terima kasih sudah mengisi data"
                    })

                    //reset value after submit
                    setforminput({ 
                    sekolah_id:localStorage.getItem("sekolah_id"),
                    nama:null,
                    jenis_kelamin:null,
                    tempat_lahir:null,
                    tanggal_lahir:null,
                    agama_id:null,
                    golongan_darah:null,
                    kewarganegaraan:null,
                    anak_keberapa:null,
                    jumlah_saudara_kandung:null,
                    alat_transportasi_id:null,
                    nama_ayah:null,
                    pendidikan_ayah_id:null,
                    pekerjaan_ayah_id:null,
                    tanggal_lahir_ayah:null,
                    nama_ibu:null,
                    pendidikan_ibu_id:null,
                    pekerjaan_ibu_id:null,
                    tanggal_lahir_ibu:null,
                    nama_wali:null,
                    pendidikan_wali_id:null,
                    pekerjaan_wali_id:null,
                    tanggal_lahir_wali:null,
                    nik:null,
                    nisn:null,
                    nipd:null,
                    no_kk:null,
                    reg_akta_lahir:null,
                    no_kks:null,
                    penerima_kps:null,
                    no_kps:null,
                    penerima_kip:null,
                    layak_pip:null,
                    alasan_layak_pip:null,
                    no_kip:null,
                    nama_di_kip:null,
                    npsn_jenjang_sebelumnya:null,
                    penerima_pip:null,
                    jenis_tinggal:null,
                    tmt:null,
                     })
                }
                else if(typeform == "edit"){
                    let response = await axios.put(`${process.env.REACT_APP_LINK}peserta_didik/edit/biodata/${editedid}`,forminput)
                    Swal.fire({
                        icon:"success",
                        title:"Data terkirim",
                        text:"Terima kasih sudah mengedit data"
                    })
                }
                setupdater(uuidv4())
            }
            catch(e){
                console.log(e)
            }
        }

        handlesenddata()
    }

    const pesertadidikid = useStore((state) => state.pesertadidikid)

    

    return(
        <>
             <h5>Nama Siswa : {props.namasiswa}</h5>
            <TablePesertaDidik
                tablehead={tablehead}
                page="pesertadidikbiodata"
                handlemodal={handlemodal}
                getTypeBtn={getTypeBtn}
                updater={updater}
            />
            {
                modal && 
                <ModalPesertaDidik 
                    page='pesertadidikbiodata'
                    handlemodal={handlemodal}
                    handlesubmit={handlesubmit}
                    dataagama={dataAgama}
                    datakewarganegaraan={dataKewarganegaraan}
                    datapekerjaan={datapekerjaan}
                    datapendidikan={datapendidikan}
                    dataalasanlayakpip={dataalasanlyakpiip}
                    datajenistinggal={datajenistinggal}
                    dataalattransportasi={dataalattransportasi}
                    handleforminput={handleforminput}
                    handleKewarganegaraan={handleKewarganegaraan}
                    handleLayakpip={handleLayakpip}
                    typeform={typeform}
                    forminput={forminput}
                    title={typeform === "tambah" ? "Tambah Data" : (typeform === "edit" ? "Edit Data" : "Detail Data")}
                />
            }
        </>
    )
}

export default DataPesertaDidikMain