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

const RekeningForm = (props) => {
    const[sekolahidcode,setsekolahid] = useState(localStorage.getItem("sekolah_id"))
    const[forminput,setforminput] = useState({
        sekolahid:sekolahidcode,
        idbank:"",
        cabangkcp:"",
        norek:"",
        rekeningnama:""
    })
    const[databank,setdatabank] = useState([])
    const[updater,setupdater] = useState()
    const tablehead = [
        "Nama Sekolah",
        "Nama Bank",
        "Cabang Kcp Unit",
        "Nomor Rekening",
        "Rekening Atas Nama",
        "Action"
    ]
    const[isClicked,setisclicked] = useState(false)
    const[editedid,seteditedid] = useState()
    const[typeform,settypeform] = useState()

    useEffect(() => {
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
                        sekolahid:sekolahidcode,
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
        setforminput({...forminput,[e.target.name]:e.target.value})
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

    useEffect(() => {
        console.log(typeform)
    })

    return(
        <>
            {/* <form onSubmit={handleSubmitForm}>
            <div>

       
            <CTable bordered responsive  >
                <thead>
                    <tr>
                        <th>
                            ID Bank
                        </th>
                        <th>
                            Cabang Kcp Unit
                        </th>
                        <th>
                            No Rekening
                        </th>
                        <th>
                            Rekening Atas Nama
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <CFormSelect
                                name="idbank"
                                onChange={handleFormInput}
                                required
                            >
                                {
                                    databank.map((item,index) => 
                                        <option key={index} value={item.id_bank}>{item.nm_bank}</option>
                                    
                                    )
                                }
                            </CFormSelect>
                            
                        </td>
                        <td>
                            <CFormInput 
                            type="text"
                            name="cabangkcp"
                            onChange={handleFormInput}
                            required
                            />
                        </td>
                        <td>
                            <CFormInput 
                            type="number" 
                            name="norek"
                            onChange={handleFormInput}
                            required
                            />
                        </td>
                        <td>
                            <CFormInput 
                            type="text"
                            name="rekeningnama"
                            onChange={handleFormInput}
                            required
                            />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={4}>
                            <CButton 
                                type="submit"
                            >
                                Kirim
                            </CButton>
                        </td>
                    </tr>
                </tbody>
            </CTable>
            </div>
            </form> */}
            
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
                />


            }
        </>
    )
}

export default RekeningForm