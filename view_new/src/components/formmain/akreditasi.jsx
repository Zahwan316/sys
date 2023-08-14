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
    CTable,
    CTableHead,
    CTableBody
    
  } from '@coreui/react'
  import axios from 'axios';
  import Swal from 'sweetalert2';
import DataForm from './dataform/dataform';
import {v4 as uuidv4} from "uuid"
import ModalComponent from './modal/modal';

const AkreditasiForm = (props) => {
    const[sekolahidcode,setsekolahid] = useState(localStorage.getItem("sekolah_id"))
    const[optionAkreditasi,setoptionakreditasi] = useState([])
    const[inputform,setinputform] = useState({
        sekolahid:sekolahidcode,
        status:"",
        nilai:"",
        nomor:"",
        tanggalsk:""
    })
    const[updater,setupdater] = useState();
    const[isClicked,setisclicked] = useState(false)
    const[editedId,setEditedId] = useState()
    const[typeform,settypeform] = useState()

    const handleforminput = (e) => {
        setinputform({...inputform,[e.target.name]:e.target.value})
        console.log(inputform)
    }

    useEffect(() => {
        const getData = async() => {
            try{
                let response = await axios.get(process.env.REACT_APP_LINK + "akreditasi")
                setoptionakreditasi(response.data.data)
            }
            catch(e){
                console.log(e)
            }
        }
        getData()
    },[])

    useEffect(() => {
        const getDataEdited = async() => {
            try{
                if(typeform == "edit"){

                    let response = await axios.get(process.env.REACT_APP_LINK + "sekolah_akreditasi/" + editedId)
                    let data = response.data.data
                    console.log(response.data)
                    setinputform({
                        status:data.status_akreditasi,
                        nilai:data.nilai_akreditasi,
                        nomor:data.nomor_sk_akreditasi,
                        tanggalsk:data.tanggal_sk_akreditasi
                    })
                }
                else{
                    setinputform({
                        sekolahid:sekolahidcode,
                        status:"",
                        nilai:"",
                        nomor:"",
                        tanggalsk:""
                    })
                }
            }
            catch(e){
                console.log(e)
            }
        }
        getDataEdited()
    },[editedId])

    const tablehead = [
        "Nama Sekolah",
        "Status Akreditasi",
        "Nilai Akreditasi",
        "Nomor SK Akreditasi",
        "Tanggal SK Akreditasi",
        "Action"
    ]

    const submitfominput = (e) => {
        e.preventDefault();

        const sendata = async() => {
            try{
                if(typeform == "tambah"){

                    let response = await axios.post(process.env.REACT_APP_LINK + "sekolah_akreditasi",inputform)
                    console.log(response.data)
                    setupdater(uuidv4())
                    Swal.fire({
                        icon:"success",
                        title:"Data terkirim",
                        text:"Terima kasih sudah mengisi data"
                    })
                }
                else if(typeform == "edit"){
                    let response = await axios.put(process.env.REACT_APP_LINK + "sekolah_akreditasi/" + editedId,inputform)
                    console.log(response.data)
                    setupdater(uuidv4())
                    Swal.fire({
                        icon:"success",
                        title:"Data terkirim",
                        text:"Terima kasih sudah mengisi data"
                    })
                }

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
        sendata()
    }

    const handleisclicked = (e) => {
        setisclicked(!isClicked)
    }

    const addbtn = (e) => {
        let typebtn = e.target.getAttribute("typebtn")
        settypeform(typebtn)
        handleisclicked()
    }

    const getTypeBtn = (typebtn,id) => {
        settypeform(typebtn)
        setEditedId(id)
    }

    useEffect(() => {
        console.log("id = " + editedId)
    })

    return(
        <>
            <div>
                <DataForm 
                    title="Data Akreditasi" 
                    page="akreditasi" 
                    tablehead={tablehead} 
                    data={optionAkreditasi} 
                    updater={updater} 
                    getTypeBtn = {getTypeBtn}
                    handleopenmodal = {handleisclicked}
                />
                <CButton color="dark" onClick={addbtn} typebtn="tambah">Tambah</CButton>
            </div>

            {
                isClicked &&
                <ModalComponent
                    submit={submitfominput}
                    handleforminput={handleforminput}
                    optionAkreditasi={optionAkreditasi}
                    title={typeform == "tambah" ? "Tambah Data Akreditas" : "Edit Data Akreditas"}
                    isclicked={isClicked}
                    handleisclicked={handleisclicked}
                    page="akreditasi"
                    dataform={inputform}
                />


            }
        </>
    )
}

export default AkreditasiForm;