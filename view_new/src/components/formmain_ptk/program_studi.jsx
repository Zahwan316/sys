import React, { useState, useEffect } from 'react';
import TablePtk from './table';
import useFormStore from 'src/state/form/formmain';
import axios from 'axios';
import Swal from 'sweetalert2';
import {v4 as uuidv4} from "uuid"
import ModalPtk from './modal';
import usePtkStore from 'src/state/ptk';
import { useParams } from 'react-router-dom';

const PtkProgramStudi = (props) => {
 const tablehead = [
    "Jenjang Pendidikan",
    "Program Studi",
    "Gelar Akademik",
    "Fakultas",
    "Tahun lulus",
    "NIM",
    "Status Kuliah",
    "IPK"
 ]

 const [modal,setmodal] = useState(false)
 const [typeform,settypeform] = useState()
 const [editedid,seteditedid] = useState()
 const [isload,setisload] = useState(false)
 const [updater,setupdater] = useState()
 const [forminput,setforminput] = useFormStore((state) => [state.form,state.setform])
 const resetform = useFormStore((state) => state.resetform)
 const [dataptkprogramstudi,setptkdataprogramstudi] = usePtkStore((state) => [state.ptk_program_studi,state.setptkprogramstudi])
 const {id} = useParams()

 const handlemodal = () => {
  setmodal(!modal)
  !modal && resetallform()
 }

 const resetallform = () => {
   resetform()
   setforminput("ptk_id",id)
 }

 const getTypeBtn = (typebtn,id) => {
  settypeform(typebtn)
  seteditedid(id)
 }

 const PostPutSubmit = async(url,method) => {
  try{
    let res;
   switch(method){
     case "post" :
        res = await axios.post(`${process.env.REACT_APP_LINK}${url}`,forminput)
        break;
     case "put" :
        res = await axios.put(`${process.env.REACT_APP_LINK}${url}`,forminput)
        break;
   }
   Swal.fire({
    icon:'success',
    title: 'Berhasil',
    text: `Data berhasil ${typeform === "tambah" ? "ditambah" : "diedit"}`
    })
   resetallform()
   setupdater(uuidv4())
   setisload(true)
   setTimeout(() =>{
    setisload(false)
   },500)
  }
  catch(e)
  {
    console.log(e)
  }
 }

 const handlesubmit = (e) => {
  e.preventDefault()

  if(typeform == "tambah"){
    PostPutSubmit("ptk_pend_formal","post")
  }
  else if(typeform == "edit"){
    PostPutSubmit(`ptk_pend_formal/${editedid}`,"put")
  }
 } 

 useEffect(() => {
  console.log(forminput)
 })

 useEffect(() => {
   const refetchdata = async() => {
      try{
         let res = await axios.get(`${process.env.REACT_APP_LINK}ptk_pend_formal/${editedid}`)
         const data = res.data.data
         for(const key in data){
            setforminput(key,data[key])
         }
      }
      catch(e){

      }
   }
   if(editedid)
   {
    refetchdata()
   }
 },[editedid])

 return(
    <>
     <h5>Nama Ptk : {props.namaptk}</h5>
     <TablePtk 
      tablehead={tablehead}
      handlemodal={handlemodal}
      getTypeBtn={getTypeBtn}
      page="ptkprogramstudi"
      isload={isload}
      updater={updater}
     />

     {
        modal &&
        <ModalPtk 
         page="ptkprogramstudi"
         title={typeform === "tambah" ? "Tambah Data" : (typeform === "edit" ? "Edit Data" : "Detail Data")}
         handlemodal={handlemodal}
         handlesubmit={handlesubmit}
         typeform={typeform}
        />
     }
    </>
 )
}

export default PtkProgramStudi