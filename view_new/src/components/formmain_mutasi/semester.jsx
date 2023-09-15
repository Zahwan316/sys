import React, { useState, useEffect } from 'react';
import TableMutasi from './table';
import { CButton, CFormSelect } from '@coreui/react';
import axios from 'axios';
import ModalMutasi from './modal';
import Swal from 'sweetalert2';
import useItemStore from 'src/state/item';

const MutasiSemesterForm = () => {
    const tablehead = [
        "Nama",
        "Semester",
        "Periode Aktif"
    ]
    const[dataSemester,setdatasemester] = useState([])
    const[modal,setmodal] = useState(false)
    const[typeform,settypeform] = useState()
    const[editedid,seteditedid] = useState()
    const[idsemester,setidsemester] = useState()
    const[checked,setchecked] = useState(true)
    const setsemesterid = useItemStore((state) => state.setsemesterid)
    const[forminput,setforminput] = useState({
        semester_id:"",
        tahun_ajaran_id:"",
        nama:"",
        semester:"",
        periode_aktif:0,
        tanggal_mulai:"",
        tanggal_selesai:"",
    })
    const[dataEdited,setdataedited] = useState([])

    useEffect(() => {
        const getData = async() => {
            try{
                let response = await axios.get(`${process.env.REACT_APP_LINK}semester`)
                setdatasemester(response.data.data)
            }
            catch(e){
                console.log(e)
            }
        }
        getData()
    },[])

    useEffect(() => {
        //console.log(dataSemester)
        console.log(editedid)
        console.log(forminput)
    })

    useEffect(() => {
        const getData = async() => {
            try{
                if(typeform === "edit" || typeform === "detail"){
                    let response = await axios.get(`${process.env.REACT_APP_LINK}semester/${editedid}`)
                    const data = response.data.data
                    setforminput({
                        semester_id:data.semester_id,
                        tahun_ajaran_id:data.tahun_ajaran_id,
                        nama:data.nama,
                        semester:data.semester,
                        periode_aktif:data.periode_aktif,
                        tanggal_mulai:data.tanggal_mulai,
                        tanggal_selesai:data.tanggal_selesai,
                    })
                }
                else{
                    setforminput({
                        semester_id:"",
                        tahun_ajaran_id:"",
                        nama:"",
                        semester:"",
                        periode_aktif:0,
                        tanggal_mulai:"",
                        tanggal_selesai:"",
                    })
                }
            }
            catch(e){
                console.log(e)
            }
        }
        getData()
    },[editedid])
    
    const editData = async(params) => {
        try{
            let response = await axios.put(`${process.env.REACT_APP_LINK}${params}`)
            console.log(response.data)
        }
        catch(e){
            console.log(e)
        }
    }

    const handlesubmitgenerate = (e) => {
        e.preventDefault()

        Swal.fire({
            title:"Apakah Anda Yakin ?",
            text:"Ingin mutasi semua rombel ?",
            icon:"warning",
            showCancelButton:true,
            confirmButtonText:"Ya,Mutasi",
            cancelButtonText:"Batal"
        })
        .then((result) => {
            if(result.isConfirmed){
                setsemesterid(idsemester)
                editData(`semester/generate/${idsemester}`) 
                    .then(res => {
                        Swal.fire(
                            "Semester berhasil dimutasi"
                        )
                    })
            }
        })

        //editData(`semester/generate/${idsemester}`)
    }

    const CUData = async(url) => {
        try{
            if(typeform === "tambah"){
                let response = await axios.post(`${process.env.REACT_APP_LINK}${url}`,forminput)
                Swal.fire({
                    title:"Success",
                    text:"Data berhasil ditambahkan",
                    icon:"success"
                })
            }
            else if(typeform === "edit"){
                let response = await axios.put(`${process.env.REACT_APP_LINK}${url}`,forminput)
                Swal.fire({
                    title:"Success",
                    text:"Data berhasil ditambahkan",
                    icon:"success"
                })
            }
        }
        catch(e){
            console.log(e)
            Swal.fire({
                title:"Error",
                text:e.message,
                icon:"error"
            })
        }
    }

    const handlesubmit = (e) => {
        e.preventDefault()
        if(typeform === "tambah"){
            CUData('semester')
        }
        else if(typeform === "edit"){
            CUData(`semester/${editedid}`)

        }
        
    }

    const handlemodal = () => {
        setmodal(!modal)
    }

    const getTypeBtn = (typebtn,id) => {
        settypeform(typebtn)
        seteditedid(id)
    }

    const handlesemesterid = (e) => {
        setidsemester(e.target.value)
    }

    const handleInput = (e) => [
        setforminput({...forminput,[e.target.name]:e.target.value})
    ]

    const handlecheckbox = (e) => {
        setchecked(!checked)
        let value = checked ? 1 :0
        setforminput({...forminput,periode_aktif:value})
    }


    return(
        <>
            <div className='mb-3'> 
                <form onSubmit={handlesubmitgenerate}>
                <div className='mb-3'>
                    <CFormSelect
                        onChange={handlesemesterid}
                    >
                        <option>Pilih Semester</option>
                        {
                            dataSemester.map((item,index) =>
                                <option value={item.semester_id}>{item.nama}</option>
                            )
                        }
                    </CFormSelect>
                </div>
                <CButton type='submit'>Generate</CButton>
                </form>
            </div>
            {/* tabel */}
            <TableMutasi 
                page="semester"
                tablehead={tablehead}
                handlemodal={handlemodal}
                getTypeBtn={getTypeBtn}
           /> 

            {/* modal */}
            {
                modal &&
                <ModalMutasi
                    page="semester"
                    handlemodal={handlemodal}
                    title={typeform === "tambah" ? "Tambah Data" : (typeform === "edit" ? "Edit data" : "Detail data")}
                    handleinput={handleInput}
                    handlecheckbox={handlecheckbox}
                    handlesubmit={handlesubmit}
                    forminput={forminput}
                    typeform={typeform}
                />

            }
        </>
    )
}

export default MutasiSemesterForm