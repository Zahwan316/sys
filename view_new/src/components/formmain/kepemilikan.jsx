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
import useRefStore from 'src/state/ref';

const KepemilikanForm = (props) => {
    const sekolahid = useItemStore((state) => state.sekolah_id)
    const[statuskepemilikan,setstatuskepemilikan] = useRefStore((state) => [state.status_kepemilikan,state.setstatuskepemiilikan]);
    const[forminput,setforminput] = useFormStore((state) => [state.form,state.setform])
    const resetform = useFormStore((state) => state.resetform)
    const[updater,setupdater] = useState();
    const[isClicked,setisclicked] = useState(false)
    const[editedid,seteditedid] = useState()
    const[typeform,settypeform] = useState()
    const[checked,setchecked] = useState(false)
    const[isload,setisload] = useState(false)

    useEffect(() => {
        setforminput("sekolah_id",sekolahid)
        setforminput("keaktifan",0)
        const getData = async() => {
            try{
                if(Object.keys(statuskepemilikan).length === 0)
                {
                 let response = await axios.get(process.env.REACT_APP_LINK + "status_kepemilikan")
                 setstatuskepemilikan(response.data.data)
                }
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
                    for(const key in data)
                    {
                     setforminput(key,data[key])
                    }
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

    const tablehead = [
        "Nama Sekolah",
        "Kepemilikan",
        "Nama Yayasan",
        "Nama Notaris",
        "Nomor Akte Notaris",
        "Tanggal Akte Notaris",
        "keaktifan",
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
        e.preventDefault()

        const sendData = async() => {
            try{
                if(typeform == "tambah"){
                 PostPutSubmit(`sekolah_kepemilikan`,"post")
                }
                else if(typeform == "edit"){
                 PostPutSubmit(`sekolah_kepemilikan/${editedid}`,"put")
                }
                
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

    const handleGetTypeBtn = (typebtn,id) => {
     settypeform(typebtn)
     seteditedid(id)
    }

    const handleTambahButton = (e) => {
     let typeBtn = e.target.getAttribute("typebtn")
     settypeform(typeBtn)
     handleisclicked()
    }

    const handlecheck = () => {
     setchecked(!checked)
     let value = checked ? 0 : 1
     setforminput("keaktifan",value)
     console.log(checked)
    }



    return(
        <>
            <div>
                <DataForm 
                    title="Data Kepemilikan" 
                    page="kepemilikan" 
                    tablehead={tablehead}
                    handlemodal={handleisclicked}
                    getTypeBtn={handleGetTypeBtn}
                    updater={updater} 
                    isload={isload}
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
                    handlecheck={handlecheck}
                />


            }
        </>
    )
}   

export default KepemilikanForm