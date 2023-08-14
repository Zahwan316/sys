import React, { useState, useEffect } from 'react';

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
import ModalProgramPage from './modal';
import axios from 'axios';
import {v4 as uuidv4} from "uuid"
import Swal from 'sweetalert2';
import DataForm from 'src/components/formmain/dataform/dataform';

const JenisPage = () => {
    const[sekolahidcode,setsekolahid] = useState(localStorage.getItem("sekolah_id"))
    const[typeform,settypeform] = useState()
    const[id,setid] = useState()
    const[modalClicked,setmodalclicked] = useState(false)
    const[dataKurikulum,setdatakurikulum] = useState([])
    const[isCheckedCheckbox,setischeckedbox] = useState(false)
    const[updater,setupdater] = useState()
    const[formInput,setforminput] = useState({
        sekolah_id:sekolahidcode,
        kurikulum_sp_id:uuidv4(),
        kurikulum_kode:"",
        keaktifan:"",
        tmt:""
    })

    const tablehead = [
        "Jenis Kurikulum",
        "TMT",
        "Masih Aktif",
        
    ]
    const handleModal = () => {
        setmodalclicked(!modalClicked)
    }

    const getTypeBtn = (typebtn,id) => {
        settypeform(typebtn)
        setid(id)
    }

    const handleTambahButton = (e) => {
        let typebtn = e.target.getAttribute("typebtn")
        handleModal()
    }

    const handleFormInput = (e) => {
        setforminput({...formInput,[e.target.name]:e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setforminput(
            {
                ...formInput,
                kurikulum_sp_id:uuidv4()
            }
        )
        localStorage.setItem("kurikulum_sp_id",formInput.kurikulum_sp_id)
        
        console.log(formInput)
        const sendData = async() => {
            try{
                setupdater(uuidv4())
                if(typeform === "tambah"){
                    let response = await axios.post(`${process.env.REACT_APP_LINK}kurikulum_sp`,formInput)
                    Swal.fire({
                        title:"Data Tersimpan",
                        text:"Terima kasih sudah mengisi data",
                        icon:"success",
                        confirmButtonText:"Ok",
                    })

                }
                //
                else if(typeform === "edit"){
                    setupdater(uuidv4())
                    let response = await axios.put(`${process.env.REACT_APP_LINK}kurikulum_sp/`+ id,formInput)
                    Swal.fire({
                        title:"Data Teredit",
                        text:"Terima kasih sudah mengedit data",
                        icon:"success",
                        confirmButtonText:"Ok",
                    })
                }

                //
            }
            catch(e){
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

    const handleChecked = (e) => {
        setischeckedbox(!isCheckedCheckbox)
        let value = isCheckedCheckbox ? 0 : 1
        setforminput({...formInput,keaktifan:value})
    }

    useEffect(() => {
        console.log(typeform)
       
    })

    //memanggil data kurikulum
    useEffect(() => {
        const getData = async() => {
            try{
                let response = await axios.get(`${process.env.REACT_APP_LINK}ref_kurikulum`)
                setdatakurikulum(response.data.data)
                
            }
            catch(e){
                console.log(e)
            }
        }
        getData()
    },[])

    //memanggil data update
    useEffect(() => {
        const getData = async() => {
            try{
                let response = await axios.get(process.env.REACT_APP_LINK + "kurikulum_sp/" + id)
                let data = response.data.data
                if(typeform === "edit" || typeform === "detail"){
                    setforminput(
                        {
                            kurikulum_kode:data.kurikulum_kode,
                            tmt:data.tmt,
                            keaktifan:data.keaktifan
                        }
                    )
                }
            }
            catch(e){
                console.log(e)
            }
        }

        getData()
    },[id])


    return(
        <div>
            <TableMain
                page="jenis"
                tablehead={tablehead}
                handleModal={handleModal}
                getTypeBtn = {getTypeBtn}
                addbtn={handleTambahButton}
                kurikulum={dataKurikulum}
                updater={updater}
                />
            {
                modalClicked &&
                <ModalProgramPage
                    page="jenis"
                    title={typeform === "edit" ? "Edit Data" :(typeform === "detail" ? "Detail Data" : "Tambah Data")}
                    handleModal={handleModal}
                    forminput={formInput}
                    kurikulum={dataKurikulum}
                    handleforminput={handleFormInput}
                    handlesubmit={handleSubmit}
                    handlechecked={handleChecked}
                    formtype={typeform}
                />

            }
        </div>
    )
}

export default JenisPage