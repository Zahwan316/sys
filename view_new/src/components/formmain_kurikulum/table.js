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
    CTableHead,
    CTableBody,
    CTableRow,
    CSpinner
    
  } from '@coreui/react'

import axios from 'axios';
import Swal from 'sweetalert2';
import {v4 as uuidv4} from "uuid"
import CIcon from '@coreui/icons-react';
import { cilEyedropper, cilListNumbered } from '@coreui/icons';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const TableMain = (props) => {
    //navigate
    const navigate = useNavigate()
    const {id} = useParams()

    //main state
    const[itemid,setitemid] = useState()


    //jenis page
    const[dataJenis,setdatajenis] = useState([])
    const[jenisKurikulum,setjeniskurikulum] = useState()

    //program page
    const[dataProgram,setdataprogram] = useState([])
    const[jurusan,setjurusan] = useState()

    //rombel page
    const[dataRombel,setdatarombel] = useState([])
    const[dataJenisRombel,setdatajenisrombel] = useState()
    const[dataSemester,setdatasemester] = useState()
    const[dataTingkatPendidikan,setdatatingatpendiikan] = useState()

    //tugas page
    const[dataTugas,setdatatugas] = useState([])
    const[dataMapel,setdatamapel] = useState([])
    const[dataTugasMengajar,setdatatugasmengajar] = useState([])
    const[gurumapel,setgurumapel] = useState()

    //jadwal page
    const[dataJadwal,setdatajadwal] = useState([])
    const[waktukbm,setwaktukbm] = useState([])
    const[hari,sethari] = useState([])

    //loading
    const[loading,setloading] = useState(true)


    const[updaterdelete,setupdaterdelete] = useState()

    //saat page di reload
    useEffect(() => {
        const getAlldata = async() => {
            try{
                let response;
                
                if(props.page === "jenis"){
                    response = await axios.get(`${process.env.REACT_APP_LINK}kurikulum_sp`)
                    let response_ref = await axios.get(`${process.env.REACT_APP_LINK}ref_kurikulum`)
                    setjeniskurikulum(response_ref.data.data)
                    setdatajenis(response.data.data)
                }
                else if(props.page === "program"){
                    response = await axios.get(`${process.env.REACT_APP_LINK}kurikulum_program`)
                    let response_jenis = await axios.get(`${process.env.REACT_APP_LINK}kurikulum_sp`)
                    let response_ref = await axios.get(`${process.env.REACT_APP_LINK}ref_kurikulum`)
                    let response_jurusan = await axios.get(`${process.env.REACT_APP_LINK}jurusan`)
                    
                    setjeniskurikulum(response_ref.data.data)
                    setdataprogram(response.data.data)
                    setjurusan(response_jurusan.data.data)
                    setdatajenis(response_jenis.data.data)
                }
                else if(props.page === "rombel"){
                    response = await axios.get(`${process.env.REACT_APP_LINK}kurikulum_rombongan_belajar`)
                    let response_jenis_rombel = await axios.get(`${process.env.REACT_APP_LINK}jenis_rombel`)
                    let response_semester = await axios.get(`${process.env.REACT_APP_LINK}semester`)
                    let response_tingkat_pendidikan = await axios.get(`${process.env.REACT_APP_LINK}tingkat_pendidikan`)
                    let response_program = await axios.get(`${process.env.REACT_APP_LINK}kurikulum_program`)
                    let response_jurusan = await axios.get(`${process.env.REACT_APP_LINK}jurusan`)

                    setdatarombel(response.data.data)
                    setdatajenisrombel(response_jenis_rombel.data.data)
                    setdatasemester(response_semester.data.data)
                    setdatatingatpendiikan(response_tingkat_pendidikan.data.data)
                    setdataprogram(response_program.data.data)
                    setjurusan(response_jurusan.data.data)
                }
                else if(props.page === "tugas"){
                    response = await axios.get(`${process.env.REACT_APP_LINK}ptk`)
                    let responsemapel = await axios.get(`${process.env.REACT_APP_LINK}kbm_mapel_sp`)
                    let responsetugasmengajar = await axios.get(`${process.env.REACT_APP_LINK}ptk_tugas_mengajar`)
                
                    setdatatugas(response.data.data)
                    setdatamapel(responsemapel.data.data)
                    setdatatugasmengajar(responsetugasmengajar.data.data)

                }
                else if(props.page === "jadwal"){
                    response = await axios.get(`${process.env.REACT_APP_LINK}jadwal_kbm`)
                    let responsetugasmengajar = await axios.get(`${process.env.REACT_APP_LINK}ptk_tugas_mengajar`)
                    let responsemapel = await axios.get(`${process.env.REACT_APP_LINK}kbm_mapel_sp`)
                    let responseguru = await axios.get(`${process.env.REACT_APP_LINK}ptk`)
                    let response_rombel = await axios.get(`${process.env.REACT_APP_LINK}kurikulum_rombongan_belajar`)
                    let responsewaktukbm = await axios.get(`${process.env.REACT_APP_LINK}waktu_kbm`)
                    let responsehari = await axios.get(`${process.env.REACT_APP_LINK}hari`)
        
                    setdatatugasmengajar(responsetugasmengajar.data.data)
                    setdatamapel(responsemapel.data.data)
                    //setdatajadwal(response.data.data)
                    setgurumapel(responseguru.data.data)
                    setdatarombel(response_rombel.data.data)
                    setwaktukbm(responsewaktukbm.data.data)
                    sethari(responsehari.data.data)

                    props.getdatamain(
                        response.data.data,
                        responsemapel.data.data,
                        response_rombel.data.data,
                        responsehari.data.data,
                        responsewaktukbm.data.data,
                        responsetugasmengajar.data.data,
                        responseguru.data.data
                        )

                    if(id){
                        getDataJadwal()
                    }
                }

            }
            catch(e){
                console.log(e)
            }
            finally{
                setloading(false)
            }
        }
        getAlldata()
    },[])

    //for tugas page
    useEffect(() => {
        const getData = async() => {
            try{
                let responsetugasmengajar = await axios.get(`${process.env.REACT_APP_LINK}ptk_tugas_mengajar/${props.selectmapelid}`)
                setdatatugasmengajar(responsetugasmengajar.data.data)
            }
            catch(e){
                console.log(e)
            }
        }
        getData()
    },[props.selectmapelid])

    //update ketika data ditambahkan dan diedit
    useEffect(() => {
        const getAlldata = async() => {
            try{
                let response;
                if(props.page === "jenis"){
                    response = await axios.get(`${process.env.REACT_APP_LINK}kurikulum_sp`)
                    let response_ref = await axios.get(`${process.env.REACT_APP_LINK}ref_kurikulum`)
                    setjeniskurikulum(response_ref.data.data)
                    setdatajenis(response.data.data)
                }
                else if(props.page === "program"){
                    response = await axios.get(`${process.env.REACT_APP_LINK}kurikulum_program`)
                    let response_jenis = await axios.get(`${process.env.REACT_APP_LINK}kurikulum_sp`)
                    let response_ref = await axios.get(`${process.env.REACT_APP_LINK}ref_kurikulum`)
                    let response_jurusan = await axios.get(`${process.env.REACT_APP_LINK}jurusan`)
                    
                    setjeniskurikulum(response_ref.data.data)
                    setdataprogram(response.data.data)
                    setjurusan(response_jurusan.data.data)
                    setdatajenis(response_jenis.data.data)
                }
                else if(props.page === "rombel"){
                    response = await axios.get(`${process.env.REACT_APP_LINK}kurikulum_rombongan_belajar`)
                    let response_jenis_rombel = await axios.get(`${process.env.REACT_APP_LINK}jenis_rombel`)
                    let response_semester = await axios.get(`${process.env.REACT_APP_LINK}semester`)
                    let response_tingkat_pendidikan = await axios.get(`${process.env.REACT_APP_LINK}tingkat_pendidikan`)
                    let response_program = await axios.get(`${process.env.REACT_APP_LINK}kurikulum_program`)
                    let response_jurusan = await axios.get(`${process.env.REACT_APP_LINK}jurusan`)

                    setdatarombel(response.data.data)
                    setdatajenisrombel(response_jenis_rombel.data.data)
                    setdatasemester(response_semester.data.data)
                    setdatatingatpendiikan(response_tingkat_pendidikan.data.data)
                    setdataprogram(response_program.data.data)
                    setjurusan(response_jurusan.data.data)
                }
                else if(props.page === "tugas"){
                    response = await axios.get(`${process.env.REACT_APP_LINK}ptk`)
                    let responsemapel = await axios.get(`${process.env.REACT_APP_LINK}kbm_mapel_sp`)
                    let responsetugasmengajar = await axios.get(`${process.env.REACT_APP_LINK}ptk_tugas_mengajar`)
                
                    setdatatugas(response.data.data)
                    setdatamapel(responsemapel.data.data)
                    setdatatugasmengajar(responsetugasmengajar.data.data)

                }
                else if(props.page === "jadwal"){
                    response = await axios.get(`${process.env.REACT_APP_LINK}jadwal_kbm`)
                    let responsetugasmengajar = await axios.get(`${process.env.REACT_APP_LINK}ptk_tugas_mengajar`)
                    let responsemapel = await axios.get(`${process.env.REACT_APP_LINK}kbm_mapel_sp`)
                    let responseguru = await axios.get(`${process.env.REACT_APP_LINK}ptk`)
                    let response_rombel = await axios.get(`${process.env.REACT_APP_LINK}kurikulum_rombongan_belajar`)
                    let responsewaktukbm = await axios.get(`${process.env.REACT_APP_LINK}waktu_kbm`)
                    let responsehari = await axios.get(`${process.env.REACT_APP_LINK}hari`)

                    setdatatugasmengajar(responsetugasmengajar.data.data)
                    setdatamapel(responsemapel.data.data)
                    setdatajadwal(response.data.data)
                    setgurumapel(responseguru.data.data)
                    setdatarombel(response_rombel.data.data)
                    setwaktukbm(responsewaktukbm.data.data)
                    sethari(responsehari.data.data)

                    props.getdatamain(
                        response.data.data,
                        responsemapel.data.data,
                        response_rombel.data.data,
                        responsehari.data.data,
                        responsewaktukbm.data.data,
                        responsetugasmengajar.data.data,
                        responseguru.data.data
                        )

                    if(id){
                        getDataJadwal()
                    }
                }

            }
            catch(e){
                console.log(e)
            }
        }
        getAlldata()
    },[props.updater])

    //update ketika data dihapus
    useEffect(() => {
        const getAlldata = async() => {
            try{
                let response;
                if(props.page === "jenis"){
                   
                    response = await axios.get(`${process.env.REACT_APP_LINK}kurikulum_sp`)
                    let response_ref = await axios.get(`${process.env.REACT_APP_LINK}ref_kurikulum`)
                    setjeniskurikulum(response_ref.data.data)
                    setdatajenis(response.data.data)
                }
                else if(props.page === "program"){
                    response = await axios.get(`${process.env.REACT_APP_LINK}kurikulum_program`)
                    let response_jenis = await axios.get(`${process.env.REACT_APP_LINK}kurikulum_sp`)
                    let response_ref = await axios.get(`${process.env.REACT_APP_LINK}ref_kurikulum`)
                    let response_jurusan = await axios.get(`${process.env.REACT_APP_LINK}jurusan`)
                    
                    setjeniskurikulum(response_ref.data.data)
                    setdataprogram(response.data.data)
                    setjurusan(response_jurusan.data.data)
                    setdatajenis(response_jenis.data.data)
                }
                else if(props.page === "rombel"){
                    response = await axios.get(`${process.env.REACT_APP_LINK}kurikulum_rombongan_belajar`)
                    let response_jenis_rombel = await axios.get(`${process.env.REACT_APP_LINK}jenis_rombel`)
                    let response_semester = await axios.get(`${process.env.REACT_APP_LINK}semester`)
                    let response_tingkat_pendidikan = await axios.get(`${process.env.REACT_APP_LINK}tingkat_pendidikan`)
                    let response_program = await axios.get(`${process.env.REACT_APP_LINK}kurikulum_program`)
                    let response_jurusan = await axios.get(`${process.env.REACT_APP_LINK}jurusan`)

                    setdatarombel(response.data.data)
                    setdatajenisrombel(response_jenis_rombel.data.data)
                    setdatasemester(response_semester.data.data)
                    setdatatingatpendiikan(response_tingkat_pendidikan.data.data)
                    setdataprogram(response_program.data.data)
                    setjurusan(response_jurusan.data.data)
                }
                else if(props.page === "tugas"){
                    response = await axios.get(`${process.env.REACT_APP_LINK}ptk`)
                    let responsemapel = await axios.get(`${process.env.REACT_APP_LINK}kbm_mapel_sp`)
                    let responsetugasmengajar = await axios.get(`${process.env.REACT_APP_LINK}ptk_tugas_mengajar`)
                
                    setdatatugas(response.data.data)
                    setdatamapel(responsemapel.data.data)
                    setdatatugasmengajar(responsetugasmengajar.data.data)

                }
                else if(props.page === "jadwal"){
                    response = await axios.get(`${process.env.REACT_APP_LINK}jadwal_kbm`)
                    let responsetugasmengajar = await axios.get(`${process.env.REACT_APP_LINK}ptk_tugas_mengajar`)
                    let responsemapel = await axios.get(`${process.env.REACT_APP_LINK}kbm_mapel_sp`)
                    let responseguru = await axios.get(`${process.env.REACT_APP_LINK}ptk`)
                    let response_rombel = await axios.get(`${process.env.REACT_APP_LINK}kurikulum_rombongan_belajar`)
                    let responsewaktukbm = await axios.get(`${process.env.REACT_APP_LINK}waktu_kbm`)
                    let responsehari = await axios.get(`${process.env.REACT_APP_LINK}hari`)

                    setdatatugasmengajar(responsetugasmengajar.data.data)
                    setdatamapel(responsemapel.data.data)
                    setdatajadwal(response.data.data)
                    setgurumapel(responseguru.data.data)
                    setdatarombel(response_rombel.data.data)
                    setwaktukbm(responsewaktukbm.data.data)
                    sethari(responsehari.data.data)

                    props.getdatamain(
                        response.data.data,
                        responsemapel.data.data,
                        response_rombel.data.data,
                        responsehari.data.data,
                        responsewaktukbm.data.data,
                        responsetugasmengajar.data.data,
                        responseguru.data.data
                        )

                    if(id){
                        getDataJadwal()
                    }
                }

            }
            catch(e){
                console.log(e)
            }
        }
        getAlldata()
    },[updaterdelete])

    //jika tombol view guru ditekan
    const getDataJadwal = async() => {
        try{
            let response = await axios.get(`${process.env.REACT_APP_LINK}jadwal_kbm/${id}`)
            setdatajadwal(response.data.data)
        }
        catch(e){
            console.log(e)
        }
    }

    //untuk pencarian jadwal
    

    //method untuk update delete
    const handleUpdateDelete = () => {
        setupdaterdelete(uuidv4())
    }

    useEffect(() => {
       
    })

    const handleClickBtn = (e) => {
        let typebtn = e.target.getAttribute("typebtn")
        let id = e.target.getAttribute("id")
        setitemid(id)
        props.getTypeBtn(typebtn,id)
        if(typebtn === "edit" || typebtn === "detail" || typebtn === "tambah"){
            props.handleModal()
        }

        if(typebtn === "delete"){
            //jika page jenis
            if(props.page === "jenis"){
                Swal.fire({
                    title:"Apakah Anda Yakin ?",
                    text:"Item yang sudah terhapus tidak dapat dikembalikan",
                    icon:"warning",
                    showCancelButton:true,
                    confirmButtonText:"Ya,Hapus",
                    cancelButtonText:"Batal"
                })
                .then((result) => {
                    if(result.isConfirmed){
                        axios.delete(process.env.REACT_APP_LINK + "kurikulum_sp/" + id)
                            .then(res => {
                                //hapus storage item
                                localStorage.removeItem("kurikulum_sp_id")
                                handleUpdateDelete()
                            })
                            .catch(e => {
                
                            })

                            Swal.fire(
                                "Data Berhasil Dihapus"
                            )
                        
                    }
                })
            }

            //jika page program
            else if(props.page === "program"){
                Swal.fire({
                    title:"Apakah Anda Yakin ?",
                    text:"Item yang sudah terhapus tidak dapat dikembalikan",
                    icon:"warning",
                    showCancelButton:true,
                    confirmButtonText:"Ya,Hapus",
                    cancelButtonText:"Batal"
                })
                .then((result) => {
                    if(result.isConfirmed){
                        axios.delete(`${process.env.REACT_APP_LINK}kurikulum_program/${id}`)
                            .then(res => {
                                Swal.fire(
                                    "Data Berhasil Dihapus"
                                )
                                setupdaterdelete(uuidv4())
                            })
                            .catch(e => console.log(e))
                    }
                })
            }

            //jika page rombel
            else if(props.page === "rombel"){
                Swal.fire({
                    title:"Apakah Anda Yakin ?",
                    text:"Item yang sudah terhapus tidak dapat dikembalikan",
                    icon:"warning",
                    showCancelButton:true,
                    confirmButtonText:"Ya,Hapus",
                    cancelButtonText:"Batal"
                })
                .then((result) => {
                    if(result.isConfirmed){
                        axios.delete(`${process.env.REACT_APP_LINK}kurikulum_rombongan_belajar/${id}`)
                            .then(res => {
                                Swal.fire(
                                    "Data Berhasil Dihapus"
                                )
                                setupdaterdelete(uuidv4())
                            })
                            .catch(e => console.log(e))
                    }
                })
            }

            //jika page tugas
            else if(props.page === "tugas"){
                Swal.fire({
                    title:"Apakah Anda Yakin ?",
                    text:"Item yang sudah terhapus tidak dapat dikembalikan",
                    icon:"warning",
                    showCancelButton:true,
                    confirmButtonText:"Ya,Hapus",
                    cancelButtonText:"Batal"
                })
                .then((result) => {
                    if(result.isConfirmed){
                        axios.delete(`${process.env.REACT_APP_LINK}ptk_tugas_mengajar/${id}`)
                            .then(res => {
                                Swal.fire(
                                    "Data Berhasil Dihapus"
                                )
                                setupdaterdelete(uuidv4())
                            })
                            .catch(e => console.log(e))
                    }
                })
            }

            //jika page jadwal
            else if(props.page === "jadwal"){
                Swal.fire({
                    title:"Apakah Anda Yakin ?",
                    text:"Item yang sudah terhapus tidak dapat dikembalikan",
                    icon:"warning",
                    showCancelButton:true,
                    confirmButtonText:"Ya,Hapus",
                    cancelButtonText:"Batal"
                })
                .then((result) => {
                    if(result.isConfirmed){
                        axios.delete(`${process.env.REACT_APP_LINK}jadwal_kbm/${id}`)
                            .then(res => {
                                Swal.fire(
                                    "Data Berhasil Dihapus"
                                )
                                setupdaterdelete(uuidv4())
                            })
                            .catch(e => console.log(e))
                    }
                })
            }

        }

        if(typebtn === "lihat"){
            setTimeout(() => {
                navigate(`/jadwal/${id}`)

            },500)  
        }

        if(typebtn === "refresh"){
            if(props.page === 'jadwal'){
                navigate("/jadwal")
            }
            window.location.reload()
        }
    }

    

    return(
        <div>
            <h2 className='mb-3'></h2>
            <div>
                <CTable >
                    <CTableHead className='table-dark'>
                        <CTableRow style={{verticalAlign:"middle"}}>
                            {
                                props.tablehead.map((item,index) => 
                                <>
                                    <th key={index}>
                                        {item}
                                    </th>
                                </>
                                )
                            }         
                            {
                                props.page === "jadwal" ? 
                                <>
                                <th>
                                    <img onClick={handleClickBtn} typebtn="tambah" style={{cursor:"pointer"}} src="./img/icon/add bw.png" width="30" height="30" />
                                </th>                              
                                <th>
                                    <img onClick={handleClickBtn} typebtn="refresh" style={{cursor:"pointer"}} src="./img/icon/arrow.png" width="30" height="30" />
                                </th>                              
                                
                                
                                </>
                                :
                                <th>
                                    <img onClick={handleClickBtn} typebtn="tambah" style={{cursor:"pointer"}} src="./img/icon/add bw.png" width="30" height="30" />
                                </th>      
                            }                       
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {
                            props.page === "jenis" &&
                                dataJenis.map((item,index) => 
                                                                 
                                    <CTableRow style={{verticalAlign:"middle"}}>
                                                <td key={index}>
                                                    {
                                                        jenisKurikulum.map((items,index) => 
                                                            items.kurikulum_kode === item.kurikulum_kode &&
                                                            items.deskripsi
                                                        )
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        item.tmt
                                                    }
                                                </td>
                                                <td>
                                                    <CFormCheck 
                                                        size="lg" 
                                                        checked={item.keaktifan === 1}
                                                        disabled
                                                    />                                   
                                                </td>
                                                <td>
                                                    <CButton color="link" typebtn="detail" id={item.kurikulum_sp_id} onClick={handleClickBtn} >
                                                        <img src="./img/icon/view.png" width="20" height="20" typebtn="detail" onClick={handleClickBtn} id={item.kurikulum_sp_id} ></img>
                                                    </CButton>
                                                    <CButton color="link" typebtn="edit" className='mx-1' onClick={handleClickBtn} id={item.kurikulum_sp_id}>
                                                        <img src="./img/icon/write bw.png" width="20" height="20" typebtn="edit" onClick={handleClickBtn} id={item.kurikulum_sp_id} />
                                                    </CButton>
                                                    <CButton color="link" typebtn="delete" onClick={handleClickBtn} id={item.kurikulum_sp_id}>
                                                        <img src="./img/icon/delete bw.jpg" width="20" height="20" typebtn="delete" onClick={handleClickBtn} id={item.kurikulum_sp_id} />
                                                    </CButton>
                                                </td>
                                    </CTableRow>
                                   
                                )    
                        }

                        {
                            props.page === "program" &&
                            dataProgram.map((item,index) => 
                                <tr key={index} style={{verticalAlign:"middle"}}>
                                    <td>
                                        {
                                            dataJenis.map((items,index) => 
                                                //mencari id yang sama
                                                items.kurikulum_sp_id === item.kurikulum_sp_id && 
                                                jenisKurikulum.map((data,index) => 
                                                    data.kurikulum_kode === items.kurikulum_kode && 
                                                    data.deskripsi
                                                )
                                               
                                            )
                                        }
                                    </td>
                                    <td>
                                        {
                                            jurusan.map((items,index) => 
                                                items.jurusan_id == item.jurusan_id &&
                                                items.nama_jurusan
                                            )
                                        }
                                    </td>
                                    <td>
                                        {
                                        item.no_sk_izin
                                       }
                                    </td>
                                    <td>
                                        {
                                        item.tanggal_sk_izin
                                       }
                                    </td>
                                    <td>
                                        <CFormCheck 
                                            size="lg"
                                            checked={item.keaktifan === 1}
                                            readOnly
                                        />                                   
                                    </td>
                                    <td>
                                        <CButton color="link" typebtn="detail" id={item.kurikulum_program_id} onClick={handleClickBtn} >
                                            <img src="./img/icon/view.png" width="20" height="20" typebtn="detail" onClick={handleClickBtn} id={item.kurikulum_program_id} ></img>
                                        </CButton>
                                        <CButton color="link" typebtn="edit" id={item.kurikulum_program_id} onClick={handleClickBtn} >
                                            <img src="./img/icon/write bw.png" width="20" height="20" typebtn="edit" onClick={handleClickBtn} id={item.kurikulum_program_id} ></img>
                                        </CButton>
                                        <CButton color="link" typebtn="delete" id={item.kurikulum_program_id} onClick={handleClickBtn} >
                                            <img src="./img/icon/delete bw.jpg" width="20" height="20" typebtn="delete" onClick={handleClickBtn} id={item.kurikulum_program_id} ></img>
                                        </CButton>
                                    </td>
                                </tr>
                            
                            )
                        }

                       {
                            props.page === "rombel" &&
                            dataRombel.map((item,index) => 
                                <tr key={index} style={{verticalAlign:"middle"}}>
                                    <td>
                                        {
                                            dataSemester.map((items,index) => 
                                                items.semester_id == item.semester_id &&
                                                items.nama
                                            )
                                        }
                                    </td>

                                    <td>
                                        {
                                            dataProgram.map((items,index) => 
                                                items.kurikulum_program_id == item.kurikulum_program_id &&
                                                    jurusan.map((data,index) => 
                                                        data.jurusan_id == items.jurusan_id &&
                                                        data.nama_jurusan
                                                    )
                                            )
                                        }
                                    </td>

                                    <td>
                                        {
                                             item.nama
                                        }
                                    </td>

                                    <td>
                                        {
                                            item.tingkat_pendidikan_id
                                        }
                                    </td>

                                    <td>
                                        {
                                            dataJenisRombel.map((items,index) => 
                                                items.jenis_rombel == item.jenis_rombel &&
                                                items.nm_jenis_rombel
                                            )
                                        }
                                    </td>

                                    <td>
                                         <CButton color="link" typebtn="detail" id={item.rombongan_belajar_id} onClick={handleClickBtn} >
                                            <img src="./img/icon/view.png" width="20" height="20" typebtn="detail" onClick={handleClickBtn} id={item.rombongan_belajar_id} ></img>
                                        </CButton>
                                        <CButton color="link" typebtn="edit" id={item.rombongan_belajar_id} onClick={handleClickBtn} >
                                            <img src="./img/icon/write bw.png" width="20" height="20" typebtn="edit" onClick={handleClickBtn} id={item.rombongan_belajar_id} ></img>
                                        </CButton>
                                        <CButton color="link" typebtn="delete" id={item.rombongan_belajar_id} onClick={handleClickBtn} >
                                            <img src="./img/icon/delete bw.jpg" width="20" height="20" typebtn="delete" onClick={handleClickBtn} id={item.rombongan_belajar_id} ></img>
                                        </CButton>
                                    </td>
                                </tr>
                            )
                            
                            //console.log(dataRombel)
                       }


                       {
                            props.page === "tugas" &&
                            props.gurumapel.map((item,index) => 
                                <>
                                    <tr key={index} style={{verticalAlign:"middle"}}>
                                        <td>
                                        {
                                                dataTugas.map((items,index) => 
                                                    items.ptk_id == item.ptk_id &&
                                                    items.nama
                                                )
                                        }
                                        </td>
                                        <td>
                                            {/* {
                                                dataTugasMengajar.map((items,index) => 
                                                    items.ptk_id === item.ptk_id &&
                                                    items.jumlah_jam
                                                )
                                            } */}
                                            {
                                                item.jumlah_jam 
                                            }
                                        </td>
                                        <td>
                                            <CButton color="link" typebtn="detail" id={item.ptk_penugasan_id} onClick={handleClickBtn} >
                                                <img src="./img/icon/view.png" width="20" height="20" typebtn="detail" onClick={handleClickBtn} id={item.ptk_penugasan_id} ></img>
                                            </CButton>
                                            <CButton color="link" typebtn="edit" id={item.ptk_penugasan_id} onClick={handleClickBtn} >
                                                <img src="./img/icon/write bw.png" width="20" height="20" typebtn="edit" onClick={handleClickBtn} id={item.ptk_penugasan_id} ></img>
                                            </CButton>
                                            <CButton color="link" typebtn="delete" id={item.ptk_penugasan_id} onClick={handleClickBtn} >
                                                <img src="./img/icon/delete bw.jpg" width="20" height="20" typebtn="delete" onClick={handleClickBtn} id={item.ptk_penugasan_id} ></img>
                                            </CButton>
                                            <CButton  color="link" typebtn="lihat" id={item.ptk_penugasan_id} onClick={handleClickBtn} >
                                                <img src="./img/icon/eye.png" width="24" height="24" typebtn="lihat" id={item.ptk_penugasan_id} onClick={handleClickBtn} ></img>
                                            </CButton>
                                            
                                        </td>
                                    </tr>
                                </>
                            )
                       }

                       {
                            props.page === "jadwal" ?
                            (!loading ?                      
                                dataJadwal.map((item,index) => 
                                    dataTugasMengajar.map((items,index1) =>
                                        item.ptk_penugasan_id === items.ptk_penugasan_id &&
                                        <>             
                                        <tr key={index} style={{verticalAlign:"middle"}}>
                                            <td>
                                            {    
                                                items.ptk_penugasan_id == item.ptk_penugasan_id &&
                                                    dataMapel.map((data,index) => 
                                                        data.mapel_sp_id == items.mapel_sp_id &&
                                                            data.nama
                                                )                                                   
                                            }
                                            </td>
                                            <td>
                                                {
                                                        
                                                    items.ptk_penugasan_id === item.ptk_penugasan_id &&
                                                        gurumapel.map((data,index) => 
                                                            data.ptk_id === items.ptk_id &&
                                                                data.nama
                                                    )
                                                        
                                                }
                                            </td>
                                            <td>
                                                {
                                                   
                                                        items.ptk_penugasan_id == item.ptk_penugasan_id &&
                                                        
                                                        dataRombel.map((data,index) => 
                                                            data.rombongan_belajar_id === item.rombongan_belajar_id &&
                                                            data.nama
                                                        ) 
                                                    
                                                }
                                            </td>
                                            <td>
                                                {
                                                    
                                                        items.ptk_penugasan_id === item.ptk_penugasan_id &&
                                                        //console.log(item.hari_ke)
                                                        hari.map((data,index) => 
                                                            //console.log(data)
                                                            data.hari_ke == item.hari_ke &&
                                                            data.nama 
        
                                                        ) 
                                                    
                                                }
                                            </td>
                                            <td>
                                                {
                                                   
                                                        items.ptk_penugasan_id === item.ptk_penugasan_id &&
                                                        waktukbm.map((data,index) => 
                                                            data.jam_ke === item.jam_ke && item.hari_ke === data.hari_ke ?
                                                            data.jam_ke
                                                            :
                                                            "   "
                                                        )
                                                    
                                        
                                                }
                                            </td>
                                            <td>
                                                {
                                                    
                                                        items.ptk_penugasan_id === item.ptk_penugasan_id &&
                                                        waktukbm.map((data,index) => 
                                                        data.jam_ke === item.jam_ke && item.hari_ke === data.hari_ke ?
                                                            data.waktu1
                                                        :
                                                        ""
                                                        )
                                                    
    
                                                }
                                            </td>
                                            <td>
                                                {
                                                    
                                                        items.ptk_penugasan_id === item.ptk_penugasan_id &&
                                                        waktukbm.map((data,index) => 
                                                        data.jam_ke === item.jam_ke && item.hari_ke === data.hari_ke ?
                                                                data.waktu2
                                                            :
                                                            ""
                                                        )
                                                
                                                }
                                            </td>
                                            <td>
                                            
                                                    <CButton color="link" typebtn="detail" id={item.jadwal_kbm_id} onClick={handleClickBtn} >
                                                        <img src="./img/icon/view.png" width="20" height="20" typebtn="detail" onClick={handleClickBtn} id={item.jadwal_kbm_id} ></img>
                                                    </CButton>
                                                    <CButton color="link" typebtn="edit" id={item.jadwal_kbm_id} onClick={handleClickBtn} >
                                                        <img src="./img/icon/write bw.png" width="20" height="20" typebtn="edit" onClick={handleClickBtn} id={item.jadwal_kbm_id} ></img>
                                                    </CButton>
                                                    <CButton color="link" typebtn="delete" id={item.jadwal_kbm_id} onClick={handleClickBtn} >
                                                        <img src="./img/icon/delete bw.jpg" width="20" height="20" typebtn="delete" onClick={handleClickBtn} id={item.jadwal_kbm_id} ></img>
                                                    </CButton>
                                                    
                                                
                                            </td>
                                        
                                        </tr>
                                        </>
                                    )
                                
                                )
                            :
                            <div className='d-flex align-items-center ' style={{height:"6vh"}}>
                                <CSpinner color="primary" style={{marginRight:"1rem"}} />
                                <p className='mb-0'>Mengolah Data Jadwal</p>
                            </div>)
                            :
                            ""
                            
                           
                       }

                    </CTableBody>
                </CTable>
            </div>
        </div>
    )
}

export default TableMain