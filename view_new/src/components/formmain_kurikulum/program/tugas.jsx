import React, { useState, useEffect } from 'react';
import TableMain from '../table';
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
    CTableBody,
    CTableRow
    
  } from '@coreui/react'
import axios from 'axios';
import ModalProgramPage from './modal';
import Swal from 'sweetalert2';
import {v4 as uuidv4} from "uuid"
import usePtkStore from 'src/state/ptk';

const TugasPage = () => {
    const[mapelid,setmapelid] = useState()
    const[forminput,setforminput] = useState({
        ptk_id:"",
        semester_id:"",
        mapel_sp_id:"",
        jumlah_jam:""
    })
    const[dataMapel,setdatamapel] = useState([])
    const[gurumapel,setgurumapel] = useState([])
    const[tugasmengajar,settugasmengajar] = useState([])
    const[refguru,setrefguru] = usePtkStore((state) => [state.ptk,state.setdataptk])
    const[refsemester,setrefsemester] = useState([])

    const[typeform,settypeform] = useState()
    const[itemid,setitemid] = useState()
    const[modal,setmodal] = useState()
    const[updater,setupdater] = useState()

    const tablehead = [
        "Nama Guru",
        "Jumlah Jam"
    ]

    useEffect(() => {
        const getData = async() => {
            try{
                let response = await axios.get(`${process.env.REACT_APP_LINK}kbm_mapel_sp`)
                let responsemengajar = await axios.get(`${process.env.REACT_APP_LINK}ptk_tugas_mengajar`)
                let responsesemester = await axios.get(`${process.env.REACT_APP_LINK}semester`)
                if(refguru.length === 0 || refguru === null){
                    let responseguru = await axios.get(`${process.env.REACT_APP_LINK}ptk`)
                    setrefguru(responseguru.data.data)
                    console.log("ftch data")
                }

                setdatamapel(response.data.data)
                settugasmengajar(responsemengajar.data.data)
                setrefsemester(responsesemester.data.data)
            }
            catch(e){
                console.log(e)
            }
        }
        getData()
    },[])

    useEffect(() => {
       /*  console.log("Mapel sp id = "+mapelid)
        console.log(refsemester)
        console.log("item id = " + itemid)
        console.log(forminput) */
    })

    useEffect(() => {
        const getData = async() => {
            try{
                let response = await axios.get(`${process.env.REACT_APP_LINK}ptk_tugas_mengajar/${mapelid}`)
                setgurumapel(response.data.data)
                setforminput({...forminput,mapel_sp_id:mapelid})
            }
            catch(e){
                console.log(e)
            }
        }
        getData()
    },[mapelid])

    useEffect(() => {
        const getData = async() => {
            try{
                let response = await axios.get(`${process.env.REACT_APP_LINK}ptk_tugas_mengajar/${mapelid}`)
                setgurumapel(response.data.data)
                setforminput({...forminput,mapel_sp_id:mapelid})
            }
            catch(e){
                console.log(e)
            }
        }
        getData()
    },[updater])

    useEffect(() => {
        const getData = async() => {
            try{
                if(typeform === "edit" || typeform==="detail"){
                    let response = await axios.get(`${process.env.REACT_APP_LINK}ptk_tugas_mengajar/ptkid/${itemid}`)
                    let data = response.data.data
                    setforminput(
                        {
                            ptk_id:data.ptk_id,
                            semester_id:data.semester_id,
                            mapel_sp_id:data.mapel_sp_id,
                            jumlah_jam:data.jumlah_jam
                        }
                    )
                }
                else{
                    setforminput(
                        {
                            ptk_id:"",
                            semester_id:"",
                            mapel_sp_id:mapelid,
                            jumlah_jam:""
                        }
                    )
                }
            }
            catch(e){

            }
        }
        getData()
    },[itemid])

    const handleMapelId = (e) => {
        setmapelid(e.target.value)
    }

    const getTypeBtn = (typebtn,id) => {
        settypeform(typebtn)
        setitemid(id)
    }

    const handlemodal = () => {
        setmodal(!modal)
    }

    const handleinput = (e) => {
        setforminput({...forminput,[e.target.name]:e.target.value})
    }

    const handlesubmit = (e) => {
        e.preventDefault();  
        const sendData = async() => {
            try{  
                console.log(forminput)
                if(typeform === "tambah"){
                    let response = await axios.post(`${process.env.REACT_APP_LINK}ptk_tugas_mengajar`,forminput)
                    Swal.fire({
                        title:"Data berhasil ditambahkan",
                        text:"Terima Kasih telah menambahkan data",
                        icon:"success",
                
                    })
                    setupdater(uuidv4())
                }
                if(typeform === "edit"){
                    let response = await axios.put(`${process.env.REACT_APP_LINK}ptk_tugas_mengajar/${itemid}`,forminput)
                    Swal.fire({
                        title:"Data berhasil diedit",
                        text:"Terima Kasih telah mengedit data",
                        icon:"success",
                
                    })
                    setupdater(uuidv4())
                }
            }
            catch(e){
                console.log(e)
                Swal.fire({
                    title:"Error",
                    text:e.response,
                    icon:"error",
                })
            }
        }
        sendData()
    }
 
    return(
        <div>
            <CFormLabel>
                Mata Pelajaran
            </CFormLabel>
            <CFormSelect
                name="mapelid"
                onChange={handleMapelId}
            >
                <option>Pilih Mapel</option>
                {
                    dataMapel.map((item,index) => 
                        <option value={item.mapel_sp_id}>{item.nama}</option>
                    )
                }        
            </CFormSelect>
            <TableMain 
                page="tugas"
                tablehead={tablehead}
                mapelid={mapelid}
                gurumapel={gurumapel}
                getTypeBtn={getTypeBtn}
                handleModal={handlemodal}
                updater={updater}
            />
            {
                modal &&
                <ModalProgramPage
                    handleModal={handlemodal}
                    title={typeform === "tambah"?"Tambah Data":(typeform === "edit" ? "Edit data" : "Detail Data")}
                    page="tugas"
                    mapelid={mapelid}
                    handlesubmit={handlesubmit}
                    forminput={forminput}
                    tugasmengajar={tugasmengajar}
                    refguru={refguru}
                    handleinput={handleinput}
                    semester={refsemester}
                    formtype={typeform}
                />
            }
        </div>
    )
}

export default TugasPage