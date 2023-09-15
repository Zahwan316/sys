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

const KepemilikanForm = (props) => {
    const sekolahid = useItemStore((state) => state.sekolah_id)
    const[statuskepemilikan,setstatuskepemilikan] = useState([]);
    const[forminput,setforminput] = useState({
        sekolahid:sekolahid,
        kepemilikan:"",
        namayayasan:"",
        namanotaris:"",
        noaktenotaris:"",
        tanggalaktenotaris:""
    })
    const[updater,setupdater] = useState();
    const[isClicked,setisclicked] = useState(false)
    const[editedid,seteditedid] = useState()
    const[typeform,settypeform] = useState()

    useEffect(() => {
        const getData = async() => {
            try{
                let response = await axios.get(process.env.REACT_APP_LINK + "status_kepemilikan")
                setstatuskepemilikan(response.data.data)
            }
            catch(e){
                console.log(e)
            }
        }   

        getData()
    },[])

    useEffect(() => {
        const getData = async() => {
            try{
                if(typeform === "edit"){

                    let response = await axios.get(process.env.REACT_APP_LINK + "sekolah_kepemilikan/" + editedid)
                    let data = response.data.data
                    setforminput(
                        {
                            kepemilikan:data.status_kepemilian,
                            namayayasan:data.nama_yayasan,
                            namanotaris:data.nama_notaris,
                            noaktenotaris:data.nomor_akte_notaris,
                            tanggalaktenotaris:data.tanggal_akte_notaris
                        }
                        )
                }
                else{
                    setforminput({
                        sekolahid:sekolahid,
                        kepemilikan:"",
                        namayayasan:"",
                        namanotaris:"",
                        noaktenotaris:"",
                        tanggalaktenotaris:""
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

    const tablehead = [
        "Nama Sekolah",
        "Kepemilikan",
        "Nama Yayasan",
        "Nama Notaris",
        "Nomor Akte Notaris",
        "Tanggal Akte Notaris",
        "Action"
    ]

    const handleSubmit = (e) => {
        e.preventDefault()

        const sendData = async() => {
            try{
                if(typeform == "tambah"){
                    let response = await axios.post(process.env.REACT_APP_LINK + "sekolah_kepemilikan",forminput)
                    console.log(response.data)
                    setupdater(uuidv4())
                    Swal.fire({
                        icon:"success",
                        title:"Data terkirim",
                        text:"Terima kasih sudah mengisi data"
                    })

                }
                else if(typeform == "edit"){
                    let response = await axios.put(process.env.REACT_APP_LINK + "sekolah_kepemilikan/" + editedid,forminput)
                    console.log(response.data)
                    setupdater(uuidv4())
                    Swal.fire({
                        icon:"success",
                        title:"Data Diedit",
                        text:"Terima kasih sudah mengedit data"
                    })

                }
                
                props.getsekolahid(null)
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
        
    })

    const handleisclicked = () => {
        setisclicked(!isClicked)
    }

    const handleGetTypeBtn = (typebtn,id) => {
        settypeform(typebtn)
        seteditedid(id)
    }

    const handleTambahButton = (e) => {
        let typeBtn = e.target.getAttribute("typebtn")
        settypeform(typeBtn)
        handleisclicked()
    }



    return(
        <>
            {/* <form onSubmit={handleSubmit}>
            <div className='mb-5'>

            
            <CTable bordered responsive  >
                <thead>
                    <tr>
                        <th>
                            Kepemilikan
                        </th>
                        <th>
                            Nama Yayasan
                        </th>
                        <th>
                            Nama Notaris
                        </th>
                        <th>
                            Nomor Akte Notaris
                        </th>
                        <th>
                            Tangggal Akte Notaris
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <CFormSelect
                                name="kepemilikan"
                                onChange={handleFormInput}
                                >
                                {
                                    statuskepemilikan.map((item,index) =>
                                        <option key={index} value={item.status_kepemilikan_id}>{item.nama}</option>    
                                    
                                    )
                                }
                            </CFormSelect>  
                        </td>
                        <td>
                            <CFormInput 
                             name="namayayasan"
                             type="text"
                             onChange={handleFormInput}
                             required
                             />
                            
                        </td>
                        <td>
                            <CFormInput 
                            type="text"
                            onChange={handleFormInput}
                            name="namanotaris"
                            required
                            />
                        </td>
                        <td>
                            <CFormInput 
                            type="number" 
                            name="noaktenotaris"
                            onChange={handleFormInput}
                            required
                            />
                        </td>
                        <td>
                            <CFormInput
                             type="datetime-local"
                             name="tanggalaktenotaris"
                             onChange={handleFormInput}
                             required
                             />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={5}>
                            <CButton type="submit">
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
                    title="Data Kepemilikan" 
                    page="kepemilikan" 
                    tablehead={tablehead}
                    handleopenmodal={handleisclicked}
                    getTypeBtn={handleGetTypeBtn}
                    updater={updater} 
                />
                <CButton 
                    color="dark" 
                    onClick={handleTambahButton}
                    typebtn="tambah"
                >Tambah Data</CButton>
                
            </div>
            {
                isClicked &&
                <ModalComponent
                    submit={handleSubmit}
                    handleforminput={handleFormInput}
                    title={typeform == "tambah" ? "Tambah Data Rekening" : "Edit Data Rekening"}
                    isclicked={isClicked}
                    handleisclicked={handleisclicked}
                    page="kepemilikan"
                    dataform={forminput}
                    statuskepemilikan={statuskepemilikan}
                    
                />


            }
        </>
    )
}   

export default KepemilikanForm