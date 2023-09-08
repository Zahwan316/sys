import React, { useState, useEffect } from 'react';
import TablePesertaDidik from './table';
import { useParams } from 'react-router-dom';
import ModalPesertaDidik from './modal';
import axios from 'axios';
import Swal from 'sweetalert2';
import {v4 as uuidv4} from "uuid"

const DataPersertaDidikKesehatan = (props) => {
    const tablehead = [
        "Tanggal Uji",
        "Buta Warna",
        "Berat Badan",
        "Tinggi Badan",
        "Lingkar Kepala",
        "Visus Mata",
        "ldl",
        "Hdl",
        "Gula Darah",
        "Tekanan Darah",
    ]

    const {id} = useParams()
    const[typeform,settypeform] = useState()
    const[modal,setmodal] = useState(false)
    const[editedid,seteditedid] = useState()
    const[updater,setupdater] = useState()
    const[isload,setisload] = useState(false)

    const[forminput,setforminput] = useState({
        peserta_didik_id:id,
        buta_warna:null,
        berat_badan:null,
        tinggi_badan:null,
        lingkar_kepala:null,
        visus_mata:null,
        ldl:null,
        hdl:null,
        gula_darah:null,
        tekanan_darah:null,
        tanggal_uji:null
    })

    const handleFormInput = (e) =>  {
        setforminput({...forminput,[e.target.name]:e.target.value})
    }

    const getTypeBtn = (typebtn,id) => {
        settypeform(typebtn)
        seteditedid(id)
    }

    const handlemodal = () => {
        setmodal(!modal)
    }

    const handlesubmit = (e) => {
        e.preventDefault()

        const senddata = async() => {
            try{
                if(typeform === "tambah"){
                    let response = await axios.post(`${process.env.REACT_APP_LINK}peserta_didik_kesehatan`,forminput)
                    Swal.fire({
                        icon:"success",
                        title:"Data terkirim",
                        text:"Terima kasih sudah mengisi data"
                    })
                    setupdater(uuidv4())
                }
                if(typeform === "edit"){
                    let response = await axios.put(`${process.env.REACT_APP_LINK}peserta_didik_kesehatan/${editedid}`,forminput)
                    Swal.fire({
                        icon:"success",
                        title:"Data terkirim",
                        text:"Terima kasih sudah mengisi data"
                    })
                    setupdater(uuidv4())
                }
                setisload(true)
                setTimeout(() => {
                    setisload(false)
                },500)
            }
            catch(e){
                console.log(e)
            }
        }
        senddata()
    }

    useEffect(() => {
        console.log(forminput)
    })

    useEffect(() => {
        const getData = async() => {
            try{
                if(typeform === "edit" || typeform === "detail"){
                    let response = await axios.get(`${process.env.REACT_APP_LINK}peserta_didik_kesehatan/${editedid}`)
                    let data = response.data.data
                    setforminput({...forminput,
                        peserta_didik_id:data.peserta_didik_id,
                        buta_warna:data.buta_warna,
                        berat_badan:data.berat_badan,
                        tinggi_badan:data.tinggi_badan,
                        lingkar_kepala:data.lingkar_kepala,
                        visus_mata:data.visus_mata,
                        ldl:data.ldl,
                        hdl:data.hdl,
                        gula_darah:data.gula_darah,
                        tekanan_darah:data.tekanan_darah,
                        tanggal_uji:data.tanggal_test
                    })
                }
                else{
                    setforminput({
                        peserta_didik_id:id,
                        buta_warna:"",
                        berat_badan:"",
                        tinggi_badan:"",
                        lingkar_kepala:"",
                        visus_mata:"",
                        ldl:"",
                        hdl:"",
                        gula_darah:"",
                        tekanan_darah:"",
                        tanggal_uji:""
                    })
                }
            }
            catch(e){
                console.log(e)
            }
        }
        getData()
    },[editedid])


    
    return(
        <>
             <h5>Nama Siswa : {props.namasiswa}</h5>
             <TablePesertaDidik 
                page="pesertadidikkesehatan"
                tablehead={tablehead}
                getTypeBtn={getTypeBtn}
                handlemodal={handlemodal}
                updater={updater}
                isload={isload}
             />

            {
                modal && 
                <ModalPesertaDidik 
                    page="pesertadidikkesehatan"
                    handlemodal={handlemodal}
                    handleforminput={handleFormInput}
                    forminput={forminput}
                    title={typeform === "tambah" ? "Tambah Data" : (typeform === "edit" ? "Edit data" : "Detail Data")}
                    handlesubmit={handlesubmit}
                    updater={updater}
                    />
            }
        </>
    )
}

export default DataPersertaDidikKesehatan