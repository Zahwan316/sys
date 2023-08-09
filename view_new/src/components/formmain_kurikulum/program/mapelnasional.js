import React, { useState, useEffect } from 'react';
import TableMain from '../table';
import ModalProgramPage from './modal';
import axios from 'axios';
import Swal from 'sweetalert2';
import {v4 as uuidv4} from "uuid"

const MapelForm = () => {
    const[modal,setmodal] = useState(false)
    const[typeform,settypeform] = useState()
    const[editedid,seteditedid] = useState()
    const[forminput,setforminput] = useState({
        sekolah_id:localStorage.getItem("sekolah_id"),
        kelompok:"",
        mapel_kode:"",
        nama:"",
        kurikulum_id:2,
        urutan:""
    })
    const[refmapel,setrefmapel] = useState([])
    const[updater,setupdater] = useState()


    const tablehead = [
        "Kelompok",
        "Urutan",
        "Mata Pelajaran"
    ]

    useEffect(() => {
        let getdata = async() => {
            try{
                let response_refmapel = await axios.get(`${process.env.REACT_APP_LINK}merdeka_mapel`)
                
                setrefmapel(response_refmapel.data.data)

            }
            catch(e){
                console.log(e)
            }
        }
        getdata()
    },[])

    useEffect(() => {
        console.log(forminput)
    })

    useEffect(() => {
        const handlekelompok = async() => {
            try{
                let response_refmapel = await axios.get(`${process.env.REACT_APP_LINK}merdeka_mapel`)
                let data = response_refmapel.data.data
                let kelompok_raw = data.filter(item => item.mapel_kode === forminput.mapel_kode && item)
                let kelompok_kode = kelompok_raw[0].kelompok
                let kurikulum_id_kode = kelompok_raw[0].kurikulum_id
                
                setforminput({...forminput,kelompok:kelompok_kode,kurikulum_id:kurikulum_id_kode})
            }
            catch(e){
                console.log(e)
            }
    }
        handlekelompok()
    },[forminput.mapel_kode])

    useEffect(() => {
        let getdata = async() => {
            try{
                if(typeform != "tambah"){
                    let response = await axios.get(`${process.env.REACT_APP_LINK}kbm_mapel_sp/${editedid}`)
                    let data = response.data.data
                    setforminput({
                        kelompok:data.kelompok,
                        mapel_kode:data.mapel_kode,
                        nama:data.nama,
                        kurikulum_id:data.kurikulum_id,
                        urutan:data.mapel_rank
                    })
                }
                else{
                    setforminput({
                        sekolah_id:localStorage.getItem("sekolah_id"),
                        kelompok:"",
                        mapel_kode:"",
                        nama:"",
                        kurikulum_id:"",
                        urutan:""
                    })
                }
            }
            catch(e){
                console.log(e)
            }
        }
        getdata()
    },[editedid])

    

    const handlemodal = () => {
        setmodal(!modal)
    }

    const handleforminput = (e) => {
        setforminput({...forminput,[e.target.name]:e.target.value})
    }

    const handleselectoption = (selectedoption,action) => {
        const {name} = action
        //console.log(name)
        console.log(selectedoption.value)
        setforminput({...forminput,mapel_kode:selectedoption.value,nama:selectedoption.label})
    }

    const handlesubmit = (e) => {
        e.preventDefault()

        let sendata = async() => {
            try{
                if(typeform === "tambah"){
                    let response = await axios.post(`${process.env.REACT_APP_LINK}kbm_mapel_sp`,forminput)
                    Swal.fire({
                        title:"Data Tersimpan",
                        text:"Terima kasih sudah mengisi data",
                        icon:"success",
                        confirmButtonText:"Ok",
                    })
                }
                else if(typeform === "edit"){
                    let response = await axios.put(`${process.env.REACT_APP_LINK}kbm_mapel_sp/${editedid}`,forminput)
                    Swal.fire({
                        title:"Data Teredit",
                        text:"Terima kasih sudah mengisi data",
                        icon:"success",
                        confirmButtonText:"Ok",
                    })
                }
                setupdater(uuidv4())
            }
            catch(e){
                console.log(e)
            }
        }
        sendata()
    }

    

    const getTypeBtn = (typebtn,id) => {
        settypeform(typebtn)
        seteditedid(id)
    }

    return(
        <>
            <TableMain 
                page="mapelnasional"
                tablehead={tablehead}
                handleModal={handlemodal}
                getTypeBtn={getTypeBtn}
                updater={updater}
            />
            {
                modal &&
                <ModalProgramPage 
                    page="mapelnasional"
                    handlesubmit={handlesubmit}
                    handleModal={handlemodal}
                    forminput={forminput}
                    handleforminput={handleforminput}
                    refmapel={refmapel}
                    handleselectoption={handleselectoption}
                    title={typeform === "tambah" ? "Tambah data" : (typeform === "edit" ? "Edit data" : "Detail data")}
                />
            }
        </>
    )
}

export default MapelForm