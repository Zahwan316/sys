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
    CSpinner,
    CTableHead,
    CTableBody,
    CModal,
    CModalBody,
    CModalHeader,
    CModalTitle,
    CModalFooter
    
  } from '@coreui/react'
import "../../assets/css/tabel.css"
import axios from 'axios';
import {debounce, dropRight} from "lodash"
import FormDropdown from './form-dropdown/form-dropdown';
import Swal from 'sweetalert2';
import sweetAlert from 'sweet-alert';
import DataForm from './dataform/dataform';
import {v4 as uuidv4} from "uuid"
import useStore from 'src/state/pesertadidik';
import usePesertaDidikStore from 'src/state/pesertadidik';
import useSekolahStore from '../../state/sekolah';
import ModalComponent from './modal/modal';
import useSekolahAlamatFormStore from 'src/state/form/sekolahalamat';
import useItemStore from 'src/state/item';
import usePtkAlamatFormStore from 'src/state/form/pttkalamat';


const AlamatForm = (props) => {
    const tablehead = [
        "Alamat Jalan",
        "RT",
        "RW",
        "Nama Dusun",
        "Kode Wilayah",
        "Kode Pos",
        "Lintang",
        "Bujur",
        "Keaktifan",

    ] 
    const[datawilayah,setdatawilayah] = usePesertaDidikStore((state) => [state.datawilayah,state.setdatawilayah])
    const[sekolahidentitas,setsekolahidentitas] = useSekolahStore((state) => [state.sekolah_identitas,state.setsekolahidenttas])
    const[modal,setmodal] = useState(false)
    const[typeform,settypeform] = useState()
    const[editedid,seteditedid] = useState()
    const[kodekota,setkodekota] = useState()
    const[kodekecamatan,setkodekecamatan] = useState()
    const[kodedesa,setkodedesa] = useState()
    const[namadesa,settnamadesa] = useState()
    const[forminput,setforminput] = useSekolahAlamatFormStore((state) => [state.form,state.setform])
    const[item_sekolahid,setitemsekolahid] = useItemStore((state) => [state.sekolah_id,state.setitemsekolahid])
    const[updater,setupdater] = useState()
    const[isload,setisload] = useState(false)
    const resetform = useSekolahAlamatFormStore((state) => state.resetform)

    useEffect(() => {
     const fetchdata = async() => {
        try{
         if(Object.keys(datawilayah).length === 0)
         {
          let res = await axios.get(`${process.env.REACT_APP_LINK}wilayah`)
          const data = res.data.data
          const wil_jabar = data.filter(item => item.id_wilayah.startsWith(32))
          setdatawilayah(wil_jabar)
         }
         setforminput("sekolah_id",item_sekolahid)
        }
        catch(e){

        }
    }
    fetchdata()
        
   },[])

   useEffect(() => {
    setforminput("kode_wilayah",kodedesa)
    if(kodedesa){       
     const getdatawilayah = async() => {
      let response_kota = await axios.get(`${process.env.REACT_APP_LINK}wilayah/kota/${kodekota}`)
      let response_kecamatan = await axios.get(`${process.env.REACT_APP_LINK}wilayah/kota/${kodekecamatan}`)
      const calldatalatlong = async(kota,kecamatan) => {
          try{
            let response_location = await axios.get(`${process.env.REACT_APP_LINK}location/${kota.toUpperCase()}/${kecamatan.toUpperCase()}/${namadesa}`)
            let bujur = response_location.data.position.bujur
            let lintang = response_location.data.position.lintang
            setforminput("lintang",lintang.toFixed(5))
            setforminput("bujur",bujur.toFixed(5))
              
          }
          catch(e){
              console.log(e)
          }
      }
      if(response_kota != null && response_kecamatan != null){
          calldatalatlong(response_kota.data.data.nama,response_kecamatan.data.data.nama)
      }
     }
        getdatawilayah()
    }
   },[kodedesa])

   useEffect(() => {
    const fetchdata = async() => {
     try{
       if(editedid != null)
       {
           let res = await axios.get(`${process.env.REACT_APP_LINK}sekolah_alamat/${editedid}`)
           const data = res.data.data
           for(let key in data){
               setforminput(key,data[key])
            }
            const k_wilayah = data.kode_wilayah
            setkodekota(k_wilayah.substring(0,4))
            setkodekecamatan(k_wilayah.substring(0,6))
            console.log(k_wilayah)
       }
     }
     catch(e){

     }
    }
    fetchdata()
   },[editedid])

   useEffect(() => {
    console.log(typeform)
   })
   const datakota = datawilayah.filter(item => item.id_wilayah.length <= 4)
    const handlekodekota = (e) => {
     setkodekota(e.target.value)
    }
    const datakecamatan = datawilayah.filter(item => {
     const kode_start = item.id_wilayah.startsWith(kodekota)
     if(item.id_wilayah.length > 4 && item.id_wilayah.length <=6 && kode_start)
     {
      return item
     }
    })
    const handlekodekecamatan = (e) => {
     setkodekecamatan(e.target.value)
    }

    const datadesa = datawilayah.filter(item => {
     const kode_start = item.id_wilayah.startsWith(kodekecamatan)
     if(item.id_wilayah.length > 6 && kode_start)
     {
         return item
     }
    })
    const handlekodedesa = (e) => {
     setkodedesa(e.target.value)
     const namadesa_object = datawilayah.find(item => item.id_wilayah == e.target.value)
     const namadesamain = namadesa_object.nama
     settnamadesa(namadesamain.toUpperCase())
    }

    const resetallform = () => {
     resetform()
     setkodekota()
     setkodedesa()
     setforminput("sekolah_id",item_sekolahid)
    }
 
    const handlemodal = () => {
     setmodal(!modal)
    }
 
    const getTypeBtn = (typebtn,id) => {
     settypeform(typebtn)
     seteditedid(id)
     if(typebtn == "tambah"){
        resetallform()
        console.log(typebtn)
     }
    }

    const PostPutData = async(url,method) => {
     try{
      let res;
      switch(method){
        case "post":
          res = await axios.post(`${process.env.REACT_APP_LINK}${url}`,forminput)
         break;
        case "put":
          res = await axios.put(`${process.env.REACT_APP_LINK}${url}`,forminput)
        }
        Swal.fire({
            icon:"success",
            title:"Data terkirim",
            text:`Terima kasih sudah ${method === "post" ? "menambah" : "mengedit"} data`
        })
        setupdater(uuidv4())
        setisload(true)
        setTimeout(() => {
         setisload(false)
        }, 500);
     }
     catch(e){
       console.log(e)
       Swal.fire({
        icon:"error",
        title:"Data Eror",
        text:`Maaf Ada Kesalahan`
       })
     }
    }

    const handlesubmit = (e) => {
     e.preventDefault()
     if(typeform === "tambah")
     {
        PostPutData(`sekolah_alamat`,"post")
        resetallform()
     }
     else if(typeform === "edit")
     {
        PostPutData(`sekolah_alamat/${editedid}`,"put")
        resetallform()
     }
    }

    return(
        <>
            <DataForm 
             tablehead={tablehead}
             page="alamat"
             getTypeBtn={getTypeBtn}
             handlemodal={handlemodal}
             updater={updater}
             isload={isload}
            />

            {
                modal && 
                <ModalComponent 
                 page="alamat"
                 isclicked={modal}
                 handleisclicked={handlemodal}
                 title={typeform === "tambah" ? "Tambah Data" : "Edit Data"}
                 datakota={datakota}
                 handlekodekota={handlekodekota}
                 datakecamatan={datakecamatan} 
                 handlekodekecamatan={handlekodekecamatan} 
                 datadesa={datadesa}
                 handlekodedesa={handlekodedesa}
                 kodekota={kodekota}
                 kodekecamatan={kodekecamatan}
                 submit={handlesubmit}
                />
            }
       
        </>
    )
}

export default AlamatForm;