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
import TableMain from '../table';
import ModalProgramPage from './modal';
import { get } from 'lodash';
import {v4 as uuidv4} from "uuid"
import axios from 'axios';
import Swal from 'sweetalert2';
import useSekolahStore from 'src/state/sekolah';
import useRefStore from 'src/state/ref';

const RombelPage = (props) => {
    const[dataSemester,setdatasemester] = useState()
    const[dataProgram,setdataprogram] = useState()
    const[dataJurusan,setdatajurusan] = useState()
    const[dataTingkat,setdatatingkat] = useState()
    const[dataJenisRombel,setdatajenisrombel] = useState()
    const[dataRombel,setdatarombel] = useState()
    const[dataSekolah,setdatasekolah] = useSekolahStore((state) => [state.sekolah_identitas,state.setsekolahidentitas])
    const[tingkatpendidikan,settingkatpendidikan] = useRefStore((state) => [state.tingkat_pendidikan,state.settingkat_pendidikan])

    const[typeform,settypeform] = useState()
    const[idedited,setidedited] = useState()
    const[modal,setmodal] = useState(false)
    const[updater,setupdater] = useState()
    
    const[forminput,setforminput] = useState({
        rombongan_belajar_id:uuidv4(),
        kurikulum_program_id:"",
        tingkat_pendidikan_id:"",
        nama:"",
        jenis_rombel:"",
        semester_id:"",
        is_industri:0
    })

    const tablehead = [
        "Semester",
        "Program",
        "Nama Rombel",
        "Tingkat",
        "Jenis Rombel"
    ]

    //get data before initialization
    useEffect(() => {
        const getData = async() => {
            try{
                if(Object.keys(dataSekolah).length === 0){
                    let res = await axios.get(`${process.env.REACT_APP_LINK}sekolah_identitas`)
                    setdatasekolah(res.data.data)

                }
                if(Object.keys(tingkatpendidikan).length === 0){

                    let res_tingkat_pendidikan = await axios.get(`${process.env.REACT_APP_LINK}tingkat_pendidikan`)
                    settingkatpendidikan(res_tingkat_pendidikan.data.data)
                }
                let response_jenis_rombel = await axios.get(`${process.env.REACT_APP_LINK}jenis_rombel`)
                let response_semester = await axios.get(`${process.env.REACT_APP_LINK}semester`)
                let response_tingkat_pendidikan = await axios.get(`${process.env.REACT_APP_LINK}tingkat_pendidikan`)
                let response_program = await axios.get(`${process.env.REACT_APP_LINK}kurikulum_program`)
                
                let response_jurusan = await axios.get(`${process.env.REACT_APP_LINK}jurusan`)

                setdatajenisrombel(response_jenis_rombel.data.data)
                setdatasemester(response_semester.data.data)
                setdatatingkat(response_tingkat_pendidikan.data.data)
                setdataprogram(response_program.data.data)
                setdatajurusan(response_jurusan.data.data)

                if(props.page === "rombelindustri"){
                    setforminput({...forminput,is_industri:1})
                }
                else{
                    setforminput({...forminput,is_industri:0})
                }
            }
            catch(e){
                console.log(e)
            }
        }
        getData()
    },[])

    //get data for edit
    useEffect(()=> {
        const getData = async() => {
            try{
                if(typeform == "edit" || typeform == "detail"){
                    let response = await axios.get(`${process.env.REACT_APP_LINK}kurikulum_rombongan_belajar/${idedited}`)
                    let data = response.data.data
                    setforminput({
                        kurikulum_program_id:data.kurikulum_program_id,
                        tingkat_pendidikan_id:data.tingkat_pendidikan_id,
                        nama:data.nama,
                        jenis_rombel:data.jenis_rombel,
                        semester_id:data.semester_id,
                        is_industri:data.is_industri
                    })
                }
                else{
                    setforminput({
                        kurikulum_program_id:"",
                        tingkat_pendidikan_id:"",
                        nama:"",
                        jenis_rombel:props.page === 'rombelindustri'?14:"",
                        semester_id:"",
                        is_industri:props.page === 'rombelindustri'?1:0
                    })
                }
            }
            catch(e){
                console.log(e)
            }
        }
        getData()
    },[idedited])

    //open close modal
    const handleModal = () => {
        setmodal(!modal)
    }

    const getTypeBtn = (typebtn,id) => {
        settypeform(typebtn)
        setidedited(id)
    }

    const handleforminput = (e) => {
        setforminput({...forminput,[e.target.name]:e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const sendData = async() => {
            try{
                if(typeform === "tambah"){
                    let response = await axios.post(`${process.env.REACT_APP_LINK}kurikulum_rombongan_belajar`,forminput)
                    Swal.fire({
                        title:"Data berhasil ditambahkan",
                        text:"Terima Kasih telah menambahkan data",
                        icon:"success",
                
                    })
                }
                else if(typeform === "edit"){
                    let response = await axios.put(`${process.env.REACT_APP_LINK}kurikulum_rombongan_belajar/${idedited}`,forminput)
                    Swal.fire({
                        title:"Data berhasil diedit",
                        text:"Terima Kasih telah mengedit data",
                        icon:"success",
                
                    })
                }
                setupdater(uuidv4())
            }
            catch(e){
                Swal.fire({
                    title:"Error",
                    text:e.response.data.message,
                    icon:"error",
                
                })
            }
        }
        sendData()
    }

    useEffect(() => {
        console.log(typeform)
        console.log(forminput)
    })


    return(
        <div>
             <TableMain
                page={props.page}
                tablehead={tablehead}
                handleModal={handleModal}
                getTypeBtn = {getTypeBtn}
                updater={updater}
            /> 

            {
                modal &&
                <ModalProgramPage
                    page={props.page}
                    title={typeform === "tambah"?"Tambah Data" : (typeform==="edit"?"Edit Data":"Detail Data")}
                    handleModal={handleModal}
                    handlesubmit={handleSubmit}
                    handleforminput={handleforminput}
                    forminput={forminput}

                    dataJenisRombel={dataJenisRombel}
                    dataJurusan={dataJurusan}
                    dataProgram={dataProgram}
                    dataSemester={dataSemester}
                    dataTingkat={dataTingkat}
                    formtype={typeform}
                />


            }
        </div>
    )
}

export default RombelPage;