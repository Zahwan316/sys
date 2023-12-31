import React, { useState, useEffect } from 'react';
import TableMain from '../table';
import { CFormSelect } from '@coreui/react';
import Select from "react-select"
import axios from 'axios';
import ModalProgramPage from './modal';
import Swal from 'sweetalert2';
import {v4 as uuidv4} from "uuid"
import useRefStore from 'src/state/ref';
import useKurikulumStore from 'src/state/kurikulum';
import useItemStore from 'src/state/item';

const MapelIndustri = () => {
    const[dataJurusan,setdatajurusan] = useState([])
    const[dataJurusanProgram,setdatajurusanProgram] = useKurikulumStore((state) => [state.kurikulum_program,state.setkurikulumprogram])
    const[dataJurusanRef,setdatajurusanref] = useRefStore((state) => [state.jurusan,state.setjurusan])
    const[kurikulum_sp,setkurikulumsp] = useKurikulumStore((state) => [state.kurikulum_sp,state.setkurikulumsp])
    const[jurusanid,setjurusanid] = useState()
    const[modal,setmodal] = useState(false)
    const[typeform,settypeform] = useState()
    const[editedid,seteditedid] = useState()
    const sekolahid = useItemStore((state) => state.sekolah_id)
    const[forminput,setforminput] = useState({
        sekolah_id:sekolahid,
        kelompok:"B",
        mapel_kode:"",
        nama:"",
        kurikulum_id:"",
        urutan:"",
        is_industri:1
    })
    const[selectedDataMapel,setselecteddatamapel] = useState([])
    const[updater,setupdater] = useState()
    const[loading,setloading] = useState(true)

    const tablehead = [
        "Kelompok",
        "Urutan",
        "Mata Pelajaran"
    ]

    useEffect(() => {
        const getData = async() => {
            try{
                if(Object.keys(kurikulum_sp).length === 0)
                {
                    let response_kurikulum = await axios.get(`${process.env.REACT_APP_LINK}kurikulum_sp`)
                    setkurikulumsp(response_kurikulum.data.data)
                }
                
                let response = await axios.get(`${process.env.REACT_APP_LINK}jurusan`)
                let response_program = await axios.get(`${process.env.REACT_APP_LINK}kurikulum_program`)
                
                let data = response.data.data
                let data_program = response_program.data.data

                let dataJurusanRaw = data.filter(item => item.kurikulum_id === 2)
                let datajurusanid = data_program.map(item => item.jurusan_id)

            
                let filtered_data_jurusan = []
                dataJurusanRaw.map(item => 
                        data_program.map(items => 
                                items.keaktifan === 1 &&
                                items.jurusan_id === item.jurusan_id &&
                                filtered_data_jurusan.push(item)
                            )
                    )
                setdatajurusan(filtered_data_jurusan)
    
               
                //let data_kurikulum = response_kurikulum.data.data
                let kurikulum_id_raw = kurikulum_sp.filter(item => item.keaktifan == 1)
                let kurikulum_code = kurikulum_id_raw[0].kurikulum_kode
                setforminput({...forminput,kurikulum_id:kurikulum_code})
            }
            catch(e){
                console.log(e)
            }
            finally{
                setloading(false)
            }
        }
        getData()
    },[])

    useEffect(() => {
    /*     console.log(editedid) */
        console.log(forminput)
       /*  console.log(selectedDataMapel)  */
    })

    useEffect(() => {
        const getData = async() => {
            try{
                if(typeform === "edit" || typeform === "detail"){
                    let response = await axios.get(`${process.env.REACT_APP_LINK}kbm_mapel_sp/${editedid}`)
                    let data = response.data.data
                    console.log(response.data.data)
                    setforminput({
                        sekolah_id:localStorage.getItem("sekolah_id"),
                        kelompok:"B",
                        mapel_kode:data.mapel_kode,
                        nama:data.nama,
                        kurikulum_id:data.kurikulum_id,
                        urutan:data.mapel_rank,
                        is_industri:1
                    })
                }
                else{
                    let response_kurikulum = await axios.get(`${process.env.REACT_APP_LINK}kurikulum_sp`)
                    let data_kurikulum = response_kurikulum.data.data
                    let kurikulum_id_raw = data_kurikulum.filter(item => item.keaktifan == 1)
                    let kurikulum_code = kurikulum_id_raw[0].kurikulum_kode
                setforminput({...forminput,kurikulum_id:kurikulum_code})
                    setforminput({
                        sekolah_id:localStorage.getItem("sekolah_id"),
                        kelompok:"B",
                        mapel_kode:"",
                        nama:"",
                        kurikulum_id:kurikulum_code,
                        urutan:"",
                        is_industri:1
                    })
                }
            }
            catch(e){
                console.log(e)
            }
        }
        getData()
    },[editedid])

    const handleJurusanId = (e) => {
        setjurusanid(e.value)
    }

    const handlemodal = () => {
        setmodal(!modal)
    }

    const getTypeBtn = (typebtn,id) => {
        settypeform(typebtn)
        seteditedid(id)
    }

    const handleforminput = (e) => {
        setforminput({...forminput,[e.target.name]:e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const sendData = async() => {
            try{
                if(typeform === "tambah"){
                    let response = await axios.post(`${process.env.REACT_APP_LINK}kbm_mapel_sp`,forminput)
                    Swal.fire({
                        title:"Data Ditambahkan",
                        text:"Terima kasih sudah mengisi data",
                        icon:"success",
                        confirmButtonText:"Ok",
                    })
                }
                else if(typeform === "edit"){
                    let response = await axios.put(`${process.env.REACT_APP_LINK}kbm_mapel_sp/${editedid}`,forminput)
                    Swal.fire({
                        title:"Data Diedit",
                        text:"Terima kasih sudah mengedit data",
                        icon:"success",
                        confirmButtonText:"Ok",
                    })
                }
                setupdater(uuidv4())
            }
            catch(e){
                console.log(e)
                Swal.fire({
                    title:"Data Error",
                    text:"Kesalahan dalam sistem",
                    icon:"error",
                    confirmButtonText:"Ok",
                })
            }
        }
        sendData()
    }

    const handleDataMapel = (data) => {
        setselecteddatamapel(data)
    }

    const handlemapelkode = () => {
    
        if(typeform === "tambah"){
            let kodemapelraw = selectedDataMapel.map(item => item.mapel_kode)
            let kodemapel = kodemapelraw.map(Number)
            if(kodemapel != ""){
                let kodemapelnew = Math.max(...kodemapel) +1
                setforminput({...forminput,mapel_kode:kodemapelnew})
                console.log(kodemapelnew)
            }
            else{
                let create_kodemapel = jurusanid
                let digit = "01"
                let kodemapelnew = create_kodemapel + digit
                setforminput({...forminput,mapel_kode:kodemapelnew})
            }
        }
    }

    return(
        <>
    

            <Select 
                options={dataJurusan.map(item =>{
                        let data =
                        {
                            value:item.jurusan_id,
                            label:item.nama_jurusan
                        }
                        return data
                    
                }        
                    )}
                onChange={handleJurusanId}
                
            />
            <TableMain
                page="mapelindustri"
                tablehead={tablehead}
                jurusanid={jurusanid}
                handleModal={handlemodal}
                getTypeBtn={getTypeBtn}
                handleDataMapel={handleDataMapel}
                updater={updater}
            />

            {
                modal && 
                <ModalProgramPage 
                    page="mapelindustri"
                    handleModal={handlemodal}
                    forminput={forminput}
                    handleforminput={handleforminput}
                    title={typeform === "tambah" ? "Tambah data" : (typeform === "edit" ? "Edit data" : "Detail data")}
                    handlesubmit={handleSubmit}
                    handlemapelkode={handlemapelkode}
                />
            }
        </>
    )
}

export default MapelIndustri