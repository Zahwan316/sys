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
import useItemStore from 'src/state/item';


const IdentitasForm = (props) => {
 const tablehead = [
  "NPSN",
  "Nama Sekolah",
  "Bentuk Pendidikan",
  "Status Sekolah",
  "NPWP",
  "No Telepon",
  "Email",
  "Keaktifan",  
 ]
 const[typeform,settypeform] = useState()
 const[modal,setmodal] = useState(false)
 const[editedid,seteditedid] = useState()
 const[updater,setupdater] = useState()
 const[isload,setisload] = useState()
 const[forminput,setforminput] = useFormStore((state) => [state.form,state.setform])
 const resetforminput = useFormStore((state) => state.resetform)
 const setsekolahid = useItemStore((state) => state.setsekolahid)

 const handlemodal = () => {
  setmodal(!modal)
 }

 const getTypeBtn = (typebtn,id) => {
  settypeform(typebtn)
  seteditedid(id)
 }

 useEffect(() => {
  setforminput('sekolah_id',uuidv4())
 },[])

 useEffect(() => {
  const fetchdata = async() => {
   try
   {
    let res = await axios.get(`${process.env.REACT_APP_LINK}sekolah_identitas/${editedid}`)
    const data = res.data.data
    for(const key in data)
    {
      setforminput(key,data[key])
    }
   }
   catch(e)
   {

   }
  }
  if(editedid != null)
  {
    fetchdata()
  }
 },[editedid])

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
   setsekolahid(forminput.sekolah_id)
   resetforminput()
   setupdater(uuidv4())
   setisload(true)
   setTimeout(() => {
    setisload(false)
   },500)
  }
  catch(e){
   console.log(e)
  }
 }

 const handlesubmit = (e) => {
  e.preventDefault()
  if(typeform === "tambah")
  {
    PostPutSubmit(`sekolah_identitas`,"post")
  }
  else if(typeform === "edit")
  {
    PostPutSubmit(`sekolah_identitas/${editedid}`,"put")
  }
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
              isload={isload}
            />

           {
            modal &&
            <ModalComponent 
              page="identitas"
              title={typeform === "tambah" ? "Tambah Identiitas" : (typeform === "edit" ? "Edit Identitas" : "Detail Identitas")}
              isclicked={modal}
              handleisclicked={handlemodal}
              submit={handlesubmit}
              typeform={typeform}
            />
           }
          
        </>
  )
}

export default IdentitasForm