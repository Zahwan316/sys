import React, { useState, useEffect } from 'react';
import TablePesertaDidik from './table';
import useStore from 'src/state/pesertadidik';
import ModalPesertaDidik from './modal';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import {v4 as uuidv4} from "uuid"

const DataPesertaDidikAlamat = (props) => {
    const tablehead = [   
        "RT",
        "RW",
        "Dusun",
        "Kode Wilayah",
        "Kode Pos",
        "Lintang",
        "Bujur",
        "Jenis Tinggal",
        "Jarak Ke Sekolah",
        "Keaktifan"
    ]
    const pesertadidikid = useStore((state) => state.pesertadidikid)
    const[modal,setmodal] = useState(false)
    const[typeform,settypeform] = useState()
    const[editedid,seteditedid] = useState()
    const datawilayah = useStore((state) => state.datawilayah)
    const [kodekota,setkodekota] = useState()
    const [kodekecamatan,setkodekecamatan] = useState()
    const [kodedesa,setkodedesa] = useState()
    const[namadesa,setnamadesa] = useState()
    const[datalintang,setdatalintang] = useState()
    const[databujur,setdatabujur] = useState()    
    const[check,setcheck] = useState(false)
    const {id} = useParams()
    const[updater,setupdater] = useState()

    const[forminput,setforminput] = useState({
        peserta_didik_id:id,
        alamat_jalan:null,
        rt:null,
        rw:null,
        nama_dusun:null,
        kode_wilayah:null,
        kode_pos:null,
        lintang:null,
        bujur:null,
        jenis_tinggal_id:null,
        jarak_ke_sekolah:null,
        keaktifan:null,
        tmt:null
    })

    const handleFormInput = (e) => {
        setforminput({...forminput,[e.target.name]:e.target.value})
    }

    const handleModal = () => {
        setmodal(!modal)
    }

    const datakota = datawilayah.filter(item => {
        if(item.id_wilayah.length <= 4){
            return item
        }
    })

    const handlekodekota = (e) => {
        setkodekota(e.target.value)
        const nama = e.target.getAttribute("name")
        console.log(e.target.name)
    }

    const datakecamatan = datawilayah.filter(item => {
        const start_kodekota = item.id_wilayah.startsWith(kodekota)
        if(item.id_wilayah.length > 4 && item.id_wilayah.length <= 6 && start_kodekota){
            return item
        }
    })

    const handlekodekecamatan = (e) => {
        setkodekecamatan(e.target.value)
    }

    const datadesa = datawilayah.filter(item => {
        const start_kodekecamatan = item.id_wilayah.startsWith(kodekecamatan)
        if(item.id_wilayah.length > 6 && start_kodekecamatan){
            return item
        }
    })

    const handlekodedesa = (e) => {
        setkodedesa(e.target.value)
        setforminput({...forminput,kode_wilayah:e.target.value})
        const getnamadesa_raw = datadesa.filter(item => item.id_wilayah === e.target.value)
        const namadesa = getnamadesa_raw[0].nama
        setnamadesa(namadesa.toUpperCase())
       
    }
    
    const getTypeBtn = (typebtn,id) => {
        settypeform(typebtn)
        seteditedid(id)
    }

    const handleCheck = (e) => {
        setcheck(!check)
        let value = check? 0 : 1
        
        setforminput({...forminput,keaktifan:value})
    }

    useEffect(() => {
        const getDataWilayah = async () => {
            try{
                let response_kota = await axios.get(`${process.env.REACT_APP_LINK}wilayah/kota/${kodekota}`)
                let response_kecamatan = await axios.get(`${process.env.REACT_APP_LINK}wilayah/kota/${kodekecamatan}`)

                const calldatalatlong = async(kota,kecamatan) => {
                    try{

                        let response_location = await axios.get(`${process.env.REACT_APP_LINK}location/${kota.toUpperCase()}/${kecamatan.toUpperCase()}/${namadesa}`)
                        let bujur = response_location.data.position.bujur
                        let lintang = response_location.data.position.lintang
                        setdatalintang(lintang)
                        setdatabujur(bujur)
                        setforminput({...forminput,
                            lintang:lintang.toFixed(5),
                            bujur:bujur.toFixed(5)
                        })
                    }
                    catch(e){
                        console.log(e)
                    }
                }
                calldatalatlong(response_kota.data.data.nama,response_kecamatan.data.data.nama)
            }
            catch(e){
                console.log(e)
            }
        }
        getDataWilayah()
    },[kodedesa])

    useEffect(() => {
        const getdata = async() => {
            try{
                if(typeform === "edit"){
                let response = await axios.get(`${process.env.REACT_APP_LINK}peserta_didik_alamat/${editedid}`)
                let data = response.data.data
                    setforminput({
                        peserta_didik_id:data.peserta_didik_id,
                        alamat_jalan:data.alamat_jalan,
                        rt:data.rt,
                        rw:data.rw,
                        nama_dusun:data.nama_dusun,
                        kode_wilayah:data.kode_wilayah,
                        kode_pos:data.kode_pos,
                        lintang:data.lintang,
                        bujur:data.bujur,
                        jenis_tinggal_id:data.jenis_tinggal_id,
                        jarak_ke_sekolah:data.jarak_ke_sekolah,
                        keaktifan:data.keaktifan,
                        tmt:data.tmt
                })
                }
                else if(typeform === "tambah"){
                    setforminput({
                        peserta_didik_id:id,
                        alamat_jalan:"",
                        rt:"",
                        rw:"",
                        nama_dusun:"",
                        kode_wilayah:"",
                        kode_pos:"",
                        lintang:"",
                        bujur:"",
                        jenis_tinggal_id:"",
                        jarak_ke_sekolah:"",
                        keaktifan:"",
                        tmt:""
                    })
                }
            }
            catch(e){
                console.log(e)
            }
        }
        getdata()
    },[editedid])
    

    const handlesubmit = (e) => {
        e.preventDefault()

        const senddata = async() => {
            try{
                if(typeform === "tambah"){
                    let response = await axios.post(`${process.env.REACT_APP_LINK}peserta_didik_alamat`,forminput)
                    Swal.fire({
                        icon:"success",
                        title:"Data terkirim",
                        text:"Terima kasih sudah mengisi data"
                    })
                    setupdater(uuidv4())
                }
                else if(typeform === "edit"){
                    let response = await axios.put(`${process.env.REACT_APP_LINK}peserta_didik_alamat/${editedid}`,forminput)
                    Swal.fire({
                        icon:"success",
                        title:"Data diedit",
                        text:"Terima kasih sudah mengedit data"
                    })
                    setupdater(uuidv4())
                }
               
            }
            catch(e){
                console.log(e)
            }
        }

        senddata()
    }

    return(
        <>
            <h5>Nama Siswa : {props.namasiswa}</h5>
            <TablePesertaDidik 
                page='pesertadidikalamat'
                tablehead={tablehead}
                handlemodal = {handleModal}
                getTypeBtn={getTypeBtn}
                updater={updater}
            />

            {
                modal &&
                <ModalPesertaDidik 
                    title={typeform === "tambah" ? "Tambah data alamat" : (typeform === "edit" ? "Edit data alamat" : "Detail data alamat")}
                    page="pesertadidikalamat"
                    handleforminput={handleFormInput}
                    handlemodal={handleModal}
                    datakota={datakota}
                    handlekodekota={handlekodekota}
                    datakecamatan={datakecamatan}
                    handlekodekecamatan={handlekodekecamatan}
                    datadesa={datadesa}
                    handlekodedesa={handlekodedesa}
                    forminput={forminput}
                    handlecheck={handleCheck}
                    handlesubmit={handlesubmit}
                />
            }
        </>
    )
}

export default DataPesertaDidikAlamat