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
  import axios from 'axios';
  import Swal from 'sweetalert2';
import DataForm from './dataform/dataform';
import {v4 as uuidv4} from "uuid"
import ModalComponent from './modal/modal';
import useItemStore from 'src/state/item';
import useFormStore from 'src/state/form/formmain';

const RekeningForm = (props) => {
    const sekolahid = useItemStore((state) => state.sekolah_id)
    const[forminput,setforminput] = useFormStore((state) => [state.form,state.setform])
    const resetform = useFormStore((state) => state.resetform)
    const[databank,setdatabank] = useState([])
    const[check,setcheck] = useState(false)
    const[updater,setupdater] = useState()
    const tablehead = [
        "Nama Sekolah",
        "Nama Bank",
        "Cabang Kcp Unit",
        "Nomor Rekening",
        "Rekening Atas Nama",
        "Keaktifan",
        "Action"
    ]
    const[isClicked,setisclicked] = useState(false)
    const[editedid,seteditedid] = useState()
    const[typeform,settypeform] = useState()

    useEffect(() => {
        setforminput("sekolah_id",sekolahid)
        setforminput("keaktifan",0)
        const getDataBank = async() => {
            let response = await axios.get(process.env.REACT_APP_LINK + "bank")
            setdatabank(response.data.data)
        } 
        getDataBank()
    },[])

    useEffect(() => {
        const getData = async() => {
            try{
                if(typeform === "edit"){

                    let response = await axios.get(process.env.REACT_APP_LINK + "sekolah_bank/" + editedid )
                    let data = response.data.data
                    setforminput(
                        {
                            idbank:data.id_bank,
                            cabangkcp:data.cabang_kcp_unit,
                            norek:data.no_rekening,
                            rekeningnama:data.rekening_atas_nama
                        }
                        )
                }
                else{
                    setforminput({
                        sekolahid:sekolahid,
                        idbank:"",
                        cabangkcp:"",
                        norek:"",
                        rekeningnama:""
                    })
                }
            }
            catch(e){
                console.log(e)
            }
        }
        getData()
    },[editedid])

    const handleFormInput = (e) => {
        const{name,value} = e.target
        setforminput(name,value)
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();

        const sendData = async() => {
            try{
                if(typeform === "tambah"){
                    let response = await axios.post(process.env.REACT_APP_LINK + "sekolah_bank",forminput)
                    console.log(response)
                    Swal.fire({
                        icon:"success",
                        title:"Data terkirim",
                        text:"Terima kasih sudah mengisi data"
                    })
                }
                else if(typeform === "edit"){
                    let response = await axios.put(process.env.REACT_APP_LINK + "sekolah_bank/" + editedid,forminput)
                    console.log(response)

                    Swal.fire({
                        icon:"success",
                        title:"Data Diedit",
                        text:"Terima kasih sudah mengedit data"
                    })
                }
                setupdater(uuidv4())
                resetform()
            }
            catch(e){
                console.log(e)
                Swal.fire({
                    icon:"error",
                    title:"Kesalahan dalam input",
                    text:"Periksa kembali kolom input"
                })
            }
        }

        sendData()
    }

    useEffect(() => {
        console.log(forminput)
    })

    const handleisclicked = () => {
        setisclicked(!isClicked)
    }

    const getTypeBtn = (typebtn,id) => {
        settypeform(typebtn)
        seteditedid(id)
    }

    const handleTambahBtn = (e) => {
        let typebtn = e.target.getAttribute("typebtn")
        settypeform(typebtn)
        handleisclicked()
    }
    
    const handlecheck = (e) => {
     setcheck(!check)
     const value = check ? 0 : 1
     setforminput("keaktifa",value)
    }

    useEffect(() => {
        console.log(typeform)
    })

    return(
        <>
           
            <div>
                <DataForm 
                title="Data Rekening" 
                tablehead={tablehead} 
                page="rekening" 
                updater={updater}
                getTypeBtn = {getTypeBtn}
                handleopenmodal={handleisclicked}
                />
                <CButton color="dark" onClick={handleTambahBtn} typebtn="tambah">Tambah Data</CButton>
            </div>
            {
                isClicked &&
                <ModalComponent
                    submit={handleSubmitForm}
                    handleforminput={handleFormInput}
                    title={typeform == "tambah" ? "Tambah Data Rekening" : "Edit Data Rekening"}
                    isclicked={isClicked}
                    handleisclicked={handleisclicked}
                    page="rekening"
                    databank={databank}
                    dataform={forminput}
                    handlecheck={handlecheck}
                />


            }
        </>
    )
}

export default RekeningForm