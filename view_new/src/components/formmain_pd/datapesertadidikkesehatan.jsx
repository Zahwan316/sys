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
                    let response = await axios.get()
                }
            }
            catch(e){
                console.log(e)
            }
        }
    },[editedid])


    
    return(
        <>
             <h5>Nama Siswa : {props.namasiswa}</h5>
             <TablePesertaDidik 
                page="pesertadidikkesehatan"
                tablehead={tablehead}
                getTypeBtn={getTypeBtn}
                handlemodal={handlemodal}
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
                    />
            }
        </>
    )
}

export default DataPersertaDidikKesehatan