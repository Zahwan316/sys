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

const IsoForm = (props) => {
    const sekolahid = useItemStore((state) => state.sekolah_id)
    const[forminput,setforminput] = useState({
        sekolahid:sekolahid,
        iso_id:"",
        nosertifikasi:"",
        tanggalsertifikasi:""
    });

    const handleInput = (e) => {
        setforminput({...forminput,[e.target.name]:e.target.value})
        console.log(forminput)
    }
    const[isClicked,setisclicked] = useState(false)
    const[editedId,seteditedid] = useState()
    const[formtype,setformtype] = useState()
    const[dataedited,setdataedited] = useState();
    const[isload,setisload ] = useState(false)

    //untuk memperbarui data setiap tambah data
    const[updater,setupdater] = useState()

    const tablehead = [
        "Nama Sekolah",
        "Sertifikasi Iso",
        "Nomor Sertifikasi Iso",
        "Tanggal Sertifikasi Iso",
        "Action"
    ]

    const PostPutSubmit = async(url,method) => {
        try
        {
         let res;
         switch(method)
         {
           case "post":
            res = await axios.post(`${process.env.REACT_APP_LINK}${url}`,forminput)
            break;
           case "put":
            res = await axios.put(`${process.env.REACT_APP_LINK}${url}`,forminput)
            break;
         }
         Swal.fire({
           icon:"success",
           title:"Data terkirim",
           text:"Terima kasih sudah mengisi data"
         })
         setupdater(uuidv4())
         setisload(true)
         setTimeout(() => {
          setisload(false)
         },500)
        }
        catch(e)
        {
   
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const sendData = async() => {
            try{
                if(formtype === "tambah"){
                 PostPutSubmit(`sekolah_iso`,"post")
                }
                else if(formtype === "edit"){
                 PostPutSubmit(`sekolah_iso/${editedId}`,'put')
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
        sendData();
    }

    const handleisclicked = () => {
        setisclicked(!isClicked)
    }

    const getAddButton = (e) => {
        let typebtn = e.target.getAttribute("typebtn")
        setformtype(typebtn)
        handleisclicked()
    }

    const handleGetTypeBtn = (typebtn,id) => {
        setformtype(typebtn)
        seteditedid(id)
    }

    useEffect(() => {
        console.log(editedId)
    })
   
    useEffect(() => {
        const getDataEdited = async() => {
            try{
                if(formtype == "edit"){

                    let response = await axios.get(process.env.REACT_APP_LINK + "sekolah_iso/" + editedId)
                    let data = response.data.data
                    setforminput({
                        iso_id:data.sertifikasi_iso_id,
                        nosertifikasi:data.nomor_sertifikasi_iso,
                        tanggalsertifikasi:data.tanggal_sertifikasi_iso
                    })
                }
                else{
                    setforminput({
                        sekolahid:sekolahid,
                        iso_id:"",
                        nosertifikasi:"",
                        tanggalsertifikasi:""
                    })
                }
            }
            catch(e){
                console.log(e)
            }   
        }
        getDataEdited();
    },[editedId])

    return(
        <>  
            <div>
                <DataForm 
                    title="Data Iso" 
                    tablehead={tablehead} 
                    page="iso" 
                    updater={updater} 
                    handlemodal={handleisclicked}
                    getTypeBtn ={handleGetTypeBtn}
                    isload={isload}
                />
                <CButton color="dark" onClick={getAddButton} typebtn="tambah">Tambah</CButton>
            </div>

            {
                isClicked &&
                <ModalComponent
                    submit={handleSubmit}
                    handleforminput={handleInput}
                    title={formtype === "tambah" ? "Tambah Data Iso" : "Edit Data Iso"}
                    isclicked={isClicked}
                    handleisclicked={handleisclicked}
                    page="iso"
                    formdata={forminput}
                
                />


            }
        </>
    )
}

export default IsoForm