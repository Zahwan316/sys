import React, { useState, useEffect } from 'react';
import {
    CButton,
    CFormInput,
    CFormLabel,
    CFormSelect,
    CModal,
    CModalBody,
    CModalContent,
    CModalHeader,
    CModalFooter,
    CModalTitle
    
  } from '@coreui/react'
import axios from 'axios';
import {v4 as uuidv4} from "uuid"
import Swal from 'sweetalert2';
import validator from 'validator';
import DataForm from './dataform/dataform';
import useRefStore from 'src/state/ref';
import ModalComponent from './modal/modal';
import useFormStore from 'src/state/form/formmain';

const IdentitasForm = (props) => {
 const tablehead = [
  "NPSN",
  "Nama Sekolah",
  "Bentuk Pendidikan",
  "Status Sekolah",
  "NPWP",
  "No Telepon",
  "Email",
 ]
 const[typeform,settypeform] = useState()
 const[modal,setmodal] = useState(false)
 const[editedid,seteditedid] = useState()
 const[updater,setupdater] = useState()
 const[isload,setisload] = useState()
 const[forminput,setforminput] = useFormStore((state) => [state.form,state.setform])

 const handlemodal = () => {
  setmodal(!modal)
 }

 const getTypeBtn = (typebtn,id) => {
  settypeform(typebtn)
  seteditedid(id)
 }

 useEffect(() => {
  console.log(modal)
 })
  
 const PostPutSubmit = async(url,method) => {
  try{
    let res;
    switch(method){
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
      text:`Terima kasih sudah ${method === "post" ? "menambah" : "mengedit"} data`
   })
  }
  catch(e){

  }
 }

 const handlesubmit = (e) => {
  e.preventdefault()

 }

  return(
        <>   
            <DataForm 
              title="Data Identitas" 
              tablehead={tablehead} 
              page="identitas" 
              updater={updater} 
              getTypeBtn={getTypeBtn} 
              handlemodal={handlemodal}
            />

           {
            modal &&
            <ModalComponent 
              page="identitas"
              title={typeform === "tambah" ? "Tambah Identiitas" : (typeform === "edit" ? "Edit Identitas" : "Detail Identitas")}
              isclicked={modal}
              handleisclicked={handlemodal}
            />
           }
          
        </>
  )
}

export default IdentitasForm