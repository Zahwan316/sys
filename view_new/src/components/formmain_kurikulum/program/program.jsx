import React, { useState, useEffect, useRef } from 'react';

import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CForm,
    CFormInput,
    CFormLabel,
    CFormTextarea,
    CRow,
    CButtonGroup,
    CFormCheck,
    CFormSelect,
    CTable
    
  } from '@coreui/react'
import TableMain from '../table';
import axios from 'axios';
import ModalProgramPage from './modal';
import Swal from 'sweetalert2';
import {v4 as uuidv4} from "uuid"
import useRefStore from 'src/state/ref';
import useKurikulumStore from 'src/state/kurikulum';

const ProgramForm = () => {
    const[kurikulum_sp_id_code,setkurikulumspid] = useState(localStorage.getItem("kurikulum_sp_id"))
    const[programData,setprogramdata] = useState()
    const[forminput,setforminput] = useState(
        {
            kurikulum_sp:kurikulum_sp_id_code,
            jurusan_id:"",
            no_sk_izin:"",
            tanggal_sk_izin:"",
            keaktifan:0

        }
    )
    const[modalstate,setmodalstate] = useState(false)
    const[updater,setupdater] = useState()
    const[id,setid] = useState()
    const[typeform,settypeform] = useState()
    //data
    const[dataRefKurikulum,setdatarefkurikulum] = useRefStore((state) => [state.kurikulum,state.setkurikulum])
    const[dataKurikulumSp,setdatakurikulumsp] = useKurikulumStore((state) => [state.kurikulum_sp,state.setkurikulumsp])
    const[dataJurusan,setdatajurusan] = useRefStore((state) => [state.jurusan,state.setjurusan])
    const[checkbox,setcheckbox] = useState(false)
    //logic
    const[inputcheckbox,setinputcheckbox] = useState()
    const[bidangjurusan,setbidangjurusan] = useState()
    const[jurusanid,setjurusanid] = useState()
    const[isload,setisload] = useState(false)


    const tablehead = [
        "Jenis Kurikulum",
        "Program",
        "No SK Izin",
        "Tanggal SK",
        "Masih Aktif",
    ]
    const bidang = [
        "smk",
        "sma",
        "pt",
        "slb",
        "smklb",
        
    ]

    const handleSubmit = (e) => {
        e.preventDefault()
        
        const sendData = async() => {
            try{
                if(typeform === "tambah"){
                    let response = await axios.post(`${process.env.REACT_APP_LINK}kurikulum_program`,forminput)
                    Swal.fire({
                        title:"Data Tersimpan",
                        text:"Terima kasih sudah mengisi data",
                        icon:"success",
                        confirmButtonText:"Ok",
                    })
                     setforminput({
                        kurikulum_sp:kurikulum_sp_id_code,
                        jurusan_id:"",
                        no_sk_izin:"",
                        tanggal_sk_izin:"",
                        keaktifan:0
                    }) 
                    

                }
                else if(typeform === "edit"){
                    let response = await axios.put(`${process.env.REACT_APP_LINK}kurikulum_program/${id}`,forminput)
                    Swal.fire({
                        title:"Data Diedit",
                        text:"Terima kasih sudah mengedit data",
                        icon:"success",
                        confirmButtonText:"Ok",
                    })
                    .then((result) => {
                        if(result.isConfirmed){
                            
                        }
                    })
                    setforminput({
                        kurikulum_sp:kurikulum_sp_id_code,
                        jurusan_id:"",
                        no_sk_izin:"",
                        tanggal_sk_izin:"",
                        keaktifan:0
                    }) 
                }
                setupdater(uuidv4())
                setisload(true)
                setTimeout(() => {
                    setisload(false)
                }, 500);
            }
            catch(e){
                console.log(e)
                Swal.fire({
                    title:"Error",
                    text:e.response.data.message,
                    icon:"error",
                    confirmButtonText:"Ok",
                })
            }
        }

        sendData()
    }

    const handleforminput = (e) => {
        setforminput({...forminput,[e.target.name]:e.target.value})
    }

    const getTypeBtn = (typebtn,id) => {
        setid(id)
        settypeform(typebtn)
        
    }

    const handleModal = () => {
        setmodalstate(!modalstate)
    }

    const handleBidangJurusan = (e) => {
        setbidangjurusan(e.target.value)
    }

    const handleCheck = (e) => {
        setcheckbox(!checkbox)
        let value = checkbox ? 0 : 1
        setforminput(
            {
                ...forminput,
                keaktifan:value
            }
        )
    }

    const handleJurusanId = (e) => {
        setjurusanid(e.target.value)
    }


    useEffect(() => {
      
    })

    useEffect(() => {
        const getData = async() => {
            try{

                if(Object.keys(dataRefKurikulum).length === 0)
                {
                    let response_kurikulum = await axios.get(process.env.REACT_APP_LINK + "ref_kurikulum")
                    setdatarefkurikulum(response_kurikulum.data.data)
                }

                if(Object.keys(dataKurikulumSp).length === 0)
                {
                    let response_kurikulum_sp = await axios.get(process.env.REACT_APP_LINK + "kurikulum_sp")
                    setdatakurikulumsp(response_kurikulum_sp.data.data)
                    let kurikulum_item_sp = response_kurikulum_sp.data.data
                    
                }
                
                if(Object.keys(dataJurusan).length === 0)
                {
                    let response = await axios.get(`${process.env.REACT_APP_LINK}jurusan`)
                    setdatajurusan(response.data.data)
                    console.log(response.data.data)
                }
                
                
            }
            catch(e){
                console.log(e)
            }
        }
        getData()
    },[])

    useEffect(() => {
        const getDataProgram = async() => {
            try{
               /*  let kode_main_raw = dataKurikulumSp.map(item => item.kurikulum_sp_id == forminput.kurikulum_sp && item)
                let kode_main = kode_main_raw[0].kurikulum_kode
                let response = await axios.get(`${process.env.REACT_APP_LINK}jurusan/${kode_main}`)
                setdatajurusan(response.data.data) */
            }
            catch(e){
                console.log(e)
            }
        }
        getDataProgram()
    },[forminput.kurikulum_sp])

    useEffect(() => {
        const getData = async() => {
            try{
                if(typeform === "edit" || typeform === "detail"){
                    let response = await axios.get(`${process.env.REACT_APP_LINK}kurikulum_program/${id}`)
                    let data = response.data.data
                    setforminput(data)
                    console.log(response.data.data)
                }
                else{
                    setforminput({
                        kurikulum_sp:kurikulum_sp_id_code,
                        jurusan_id:"",
                        no_sk_izin:"",
                        tanggal_sk_izin:"",
                        keaktifan:0    
                    })
                }
            }
            catch(e){
                console.log(e)
            }
        }
        getData()
    },[id])
  
    let kode_main_raw = dataKurikulumSp.filter(item => item.kurikulum_sp_id === kurikulum_sp_id_code ) 
    let kode_main = kode_main_raw[0].kurikulum_kode || null
       
    return(
        <div>
            <TableMain
                page="program"
                tablehead={tablehead}
                getTypeBtn={getTypeBtn}
                handleModal={handleModal}
                updater={updater}
                isload={isload}
            />

            {
                modalstate &&
                <ModalProgramPage
                    handleModal={handleModal}
                    page="program"
                    handlesubmit={handleSubmit}
                    title={typeform === "tambah" ? "Tambah Data Program" : (typeform === "edit" ? "Edit Data Program" : "Detail Data Program")}
                    handleforminput={handleforminput}
                    formtype={typeform}
                    jurusan={dataJurusan}
                    kurikulum={dataRefKurikulum}
                    handlecheck={handleCheck}
                    modalstate={modalstate}
                    forminput={forminput}
                    handlebidangjurusan={handleBidangJurusan}
                    handlejurusanid={handleJurusanId}
                    kodemain={kode_main}
                    kurikulum_sp_id_code={kurikulum_sp_id_code}
                    kurikulumspdata={dataKurikulumSp}
                   
                />



            }
        </div>
    )
}

export default ProgramForm