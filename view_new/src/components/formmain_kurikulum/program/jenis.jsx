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
import ModalProgramPage from './modal';
import axios from 'axios';
import {v4 as uuidv4} from "uuid"
import Swal from 'sweetalert2';
import DataForm from 'src/components/formmain/dataform/dataform';
import useRefStore from 'src/state/ref';
import useItemStore from 'src/state/item';

const JenisPage = () => {
    const[typeform,settypeform] = useState()
    const[id,setid] = useState()
    const[modalClicked,setmodalclicked] = useState(false)
    const[dataKurikulum,setdatakurikulum] = useRefStore((state) => [state.kurikulum,state.setkurikulum])
    const[isCheckedCheckbox,setischeckedbox] = useState(false)
    const[updater,setupdater] = useState()
    const[isload,setisload] = useState(false)
    const[sekolahid,setsekolahid] = useItemStore((state) => [state.sekolah_id,state.setsekolahid])
    const [kurikulum_sp,setkurikulum_sp] = useItemStore((item) => [item.kurikulum_sp_id,item.setkurikulum_sp_id])
    const[formInput,setforminput] = useState({
        sekolah_id:sekolahid,
        kurikulum_sp_id:uuidv4(),
        kurikulum_kode:"",
        keaktifan:0,
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
        console.log(formInput)
        const sendData = async() => {
            try{
                if(typeform === "tambah"){
                    let response = await axios.post(`${process.env.REACT_APP_LINK}kurikulum_sp`,formInput)
                    if(formInput.keaktifan === 1){
                        setkurikulum_sp(formInput.kurikulum_sp_id)
                    }
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
                    if(formInput.keaktifan === 1){
                        setkurikulum_sp(formInput.kurikulum_sp_id)
                    }
                    Swal.fire({
                        title:"Data Teredit",
                        text:"Terima kasih sudah mengedit data",
                        icon:"success",
                        confirmButtonText:"Ok",
                    })
                }
                setupdater(uuidv4())
                
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
        setisload(true)
        setTimeout(() => {
            setisload(false)
        }, 500);
        sendData()
        
    }

    const handleChecked = (e) => {
        setischeckedbox(!isCheckedCheckbox)
        let value = isCheckedCheckbox ? 0 : 1
        setforminput({...formInput,keaktifan:value})
    }

    useEffect(() => {
       /*  console.log(formInput)
        console.log(id) */
       
    })

    //memanggil data kurikulum
    useEffect(() => {
        const getData = async() => {
            try{
                if(Object.keys(dataKurikulum).length === 0)
                {
                    let response = await axios.get(`${process.env.REACT_APP_LINK}ref_kurikulum`)
                    setdatakurikulum(response.data.data)
                }
                
            }
            catch(e){
                console.log(e)
            }
        }
        //getData()
    },[])

    //memanggil data update
    useEffect(() => {
        const getData = async() => {
            try{
                if(typeform === "edit" || typeform === "detail"){
                    let response = await axios.get(process.env.REACT_APP_LINK + "kurikulum_sp/" + id)
                    let data = response.data.data
                    setforminput(
                        {
                            sekolah_id:localStorage.getItem("sekolah_id"),
                            kurikulum_sp_id:data.kurikulum_sp_id,
                            kurikulum_kode:data.kurikulum_kode,
                            tmt:data.tmt,
                            keaktifan:data.keaktifan
                        }
                    )
                }
                else{
                    setforminput({
                        sekolah_id:localStorage.getItem("sekolah_id"),
                        kurikulum_sp_id:uuidv4(),
                        kurikulum_kode:"",
                        keaktifan:0,
                        tmt:""
                    })
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
                isload={isload}
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