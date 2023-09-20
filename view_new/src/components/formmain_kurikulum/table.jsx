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
import usePtkStore from 'src/state/ptk';
import useRefStore from 'src/state/ref';
import useKurikulumStore from 'src/state/kurikulum';
import useItemStore from 'src/state/item';
import useJadwalStore from 'src/state/jadwal';

const TableMain = (props) => {
    //navigate
    const navigate = useNavigate()
    const {id} = useParams()

    //main state
    const[itemid,setitemid] = useState()

    const semesterid = useItemStore((state) => state.semester_id)

    //jenis page
    const[dataJenis,setdatajenis] = useKurikulumStore((state) => [state.kurikulum_sp,state.setkurikulumsp])
    const[jenisKurikulum,setjeniskurikulum] = useRefStore((state) => [state.kurikulum,state.setkurikulum])

    //program page
    const[dataProgram,setdataprogram] = useKurikulumStore((state) => [state.kurikulum_program,state.setkurikulumprogram])
    const[jurusan,setjurusan] = useRefStore((state) => [state.jurusan,state.setjurusan])

    //rombel page
    const[dataRombel,setdatarombel] = useKurikulumStore((state) => [state.kurikulum_rombongan_belajar,state.setkurikulumrombonganbelajar])
    const[dataJenisRombel,setdatajenisrombel] = useRefStore((state) => [state.jenis_rombel,state.setjenisrombel])
    const[dataSemester,setdatasemester] = useRefStore((state) => [state.semester,state.setsemester])
    const[dataTingkatPendidikan,setdatatingatpendiikan] = useRefStore((state) => [state.tingkat_pendidikan,state.settingkat_pendidikan])

    //tugas page
    const[dataTugas,setdatatugas] = usePtkStore((state) => [state.ptk,state.setdataptk])
    const[dataMapel,setdatamapel] = useRefStore((state) => [state.kbm_mapel_sp,state.setkbmmapelsp])
    const[dataTugasMengajar,setdatatugasmengajar] = usePtkStore((state) => [state.ptk_tugas_mengajar,state.setptktugasmengajar])
    const[gurumapel,setgurumapel] = usePtkStore((state) => [state.ptk,state.setdataptk])

    //jadwal page
    const[dataJadwal,setdatajadwal] = useJadwalStore((state) => [state.jadwal_kbm,state.setjadwalkbm])
    const[waktukbm,setwaktukbm] = useJadwalStore((state) => [state.waktu_kbm,state.setwaktukbm])
    const[hari,sethari] = useRefStore((state) => [state.hari,state.sethari])
    const[dataspesifik,setdataspesifik] = useState([])

    //mapel page
    //|
    //---mapel nasional
    const[refmapel,setrefmapel] = useRefStore((state) => [state.merdeka_mapel,state.setmerdekamapel])
    //|
    //---mapel industri
    const[datamapelindustri,setdatamapelindustri] = useState([])

    const[isload,setisload] = useState(false)

    //loading
    const[loading,setloading] = useState(true)
    const[updaterdelete,setupdaterdelete] = useState()
    const [searchtext,setsearchtext] = useState("")

    //saat page di reload
    useEffect(() => {
        const getAlldata = async() => {
            try{
                let response;
                
                if(props.page === "jenis"){
                    if(Object.keys(jenisKurikulum).length === 0)
                    {
                        let response_ref = await axios.get(`${process.env.REACT_APP_LINK}ref_kurikulum`)
                        setjeniskurikulum(response_ref.data.data)
                    }
                    if(Object.keys(dataJenis).length === 0)
                    {
                        response = await axios.get(`${process.env.REACT_APP_LINK}kurikulum_sp`)
                        setdatajenis(response.data.data)
                    }
                }
                else if(props.page === "program"){
                    if(Object.keys(dataProgram).length === 0)
                    {
                        response = await axios.get(`${process.env.REACT_APP_LINK}kurikulum_program`)
                        setdataprogram(response.data.data)
                    }
                    if(Object.keys(dataJenis).length === 0)
                    {
                        let response_jenis = await axios.get(`${process.env.REACT_APP_LINK}kurikulum_sp`)
                        setdatajenis(response_jenis.data.data)
                    }
                    if(Object.keys(jenisKurikulum).length === 0)
                    {
                        let response_ref = await axios.get(`${process.env.REACT_APP_LINK}ref_kurikulum`)
                        setjeniskurikulum(response_ref.data.data)
                    }
                    if(Object.keys(jurusan).length === 0)
                    {
                        let response_jurusan = await axios.get(`${process.env.REACT_APP_LINK}jurusan`)
                        setjurusan(response_jurusan.data.data)
                    }
                    
                }
                else if(props.page === "rombelreguler" || props.page === "rombelindustri"){
                    if(Object.keys(dataRombel).length === 0)
                    {
                     response = await axios.get(`${process.env.REACT_APP_LINK}kurikulum_rombongan_belajar`)
                     setdatarombel(response.data.data)
                    }
                    if(Object.keys(dataJenisRombel).length === 0)
                    {
                     let response_jenis_rombel = await axios.get(`${process.env.REACT_APP_LINK}jenis_rombel`)
                     setdatajenisrombel(response_jenis_rombel.data.data)
                    }
                    if(Object.keys(dataSemester).length === 0)
                    {
                     let response_semester = await axios.get(`${process.env.REACT_APP_LINK}semester`)
                     setdatasemester(response_semester.data.data)
                    }
                    if(Object.keys(dataTingkatPendidikan).length === 0)
                    {
                     let response_tingkat_pendidikan = await axios.get(`${process.env.REACT_APP_LINK}tingkat_pendidikan`)
                     setdatatingatpendiikan(response_tingkat_pendidikan.data.data) 
                    }
                    if(Object.keys(dataProgram).length === 0)
                    {
                     let response_program = await axios.get(`${process.env.REACT_APP_LINK}kurikulum_program`)
                     setdataprogram(response_program.data.data)
                    }
                    if(Object.keys(jurusan).length === 0)
                    {
                     let response_jurusan = await axios.get(`${process.env.REACT_APP_LINK}jurusan`)
                     setjurusan(response_jurusan.data.data)   
                    }
                }
                else if(props.page === "tugas"){
                    if(dataTugas.length === 0 || dataTugas === [])
                    {
                        response = await axios.get(`${process.env.REACT_APP_LINK}ptk`)
                        setdatatugas(response.data.data)
                        console.log("catch ptk")
                    }

                    if(Object.keys(dataMapel).length === 0)
                    {
                        let responsemapel = await axios.get(`${process.env.REACT_APP_LINK}kbm_mapel_sp`)
                        setdatamapel(responsemapel.data.data)
                    }

                    if(Object.keys(dataTugasMengajar).length === 0)
                    {
                        let responsetugasmengajar = await axios.get(`${process.env.REACT_APP_LINK}ptk_tugas_mengajar`)
                        setdatatugasmengajar(responsetugasmengajar.data.data)
                    }

                

                }
                else if(props.page === "jadwalreguler" || props.page ==="jadwalindustri" ){
                    
                    if(Object.keys(gurumapel).length === 0){
                        let responseguru = await axios.get(`${process.env.REACT_APP_LINK}ptk`)
                        setgurumapel(responseguru.data.data)
                    }
                    if(Object.keys(dataJadwal).length === 0)
                    {
                        response = await axios.get(`${process.env.REACT_APP_LINK}jadwal_kbm`)
                        setdatajadwal(response.data.data)
                    }
                    if(Object.keys(dataTugasMengajar).length === 0){
                        let responsetugasmengajar = await axios.get(`${process.env.REACT_APP_LINK}ptk_tugas_mengajar`)
                        setdatatugasmengajar(responsetugasmengajar.data.data)
                    }
                    if(Object.keys(dataMapel).length === 0){
                        let responsemapel = await axios.get(`${process.env.REACT_APP_LINK}kbm_mapel_sp`)
                        setdatamapel(responsemapel.data.data)
                    }
                    if(Object.keys(dataRombel).length === 0){
                        let response_rombel = await axios.get(`${process.env.REACT_APP_LINK}kurikulum_rombongan_belajar`)
                        setdatarombel(response_rombel.data.data)
                    }
                    if(Object.keys(waktukbm).length === 0){
                        let responsewaktukbm = await axios.get(`${process.env.REACT_APP_LINK}waktu_kbm`)
                        setwaktukbm(responsewaktukbm.data.data)
                    }
                    if(Object.keys(hari).length === 0){
                        let responsehari = await axios.get(`${process.env.REACT_APP_LINK}hari`)
                        sethari(responsehari.data.data)
                
                    }
    
                    if(id){
                        getDataJadwal()
                    }
                }
                else if(props.page === "mapelnasional"){
                    if(Object.keys(refmapel).length === 0)
                    {
                        // let responserefmapel = await axios.get(`${process.env.REACT_APP_LINK}merdeka_mapel`)
                        // setrefmapel(responserefmapel.data.data)

                    }
                    if(Object.keys(dataMapel).length === 0)
                    {
                        let responsemapel = await axios.get(`${process.env.REACT_APP_LINK}kbm_mapel_sp`)
                        setdatamapel(responsemapel.data.data)
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
                if(props.page === "tugas"){
                    let responsetugasmengajar = await axios.get(`${process.env.REACT_APP_LINK}ptk_tugas_mengajar/${props.selectmapelid}`)
                    setdatatugasmengajar(responsetugasmengajar.data.data)
                }
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
                if(props.isload)
                {

                
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
                else if(props.page === "rombelreguler" || props.page === "rombelindustri"){
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
                else if(props.page === "jadwalreguler" || props.page === "jadwalindustri"){
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

                    if(id){
                        getDataJadwal()
                    }
                }
                else if(props.page === "mapelnasional"){
                    let responserefmapel = await axios.get(`${process.env.REACT_APP_LINK}merdeka_mapel`)
                    let responsemapel = await axios.get(`${process.env.REACT_APP_LINK}kbm_mapel_sp`)
                   
                    setrefmapel(responserefmapel.data.data)
                    setdatamapel(responsemapel.data.data)
                }
                else if(props.page === "mapelindustri"){
                    let response = await axios.get(`${process.env.REACT_APP_LINK}kbm_mapel_sp`)
                    let data = response.data.data
                    let jurusanid = props.jurusanid
                    let mapelIndustriRaw = data.filter(item => item.mapel_kode)
                    let mapelIndustri = mapelIndustriRaw.filter(item => item.mapel_kode.toString().slice(0,8) === jurusanid)
                    setdatamapelindustri(mapelIndustri)
                    props.handleDataMapel(mapelIndustri)
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
                if(isload)
                {

                
                if(props.page === "jenis"){
                   
                    response = await axios.get(`${process.env.REACT_APP_LINK}kurikulum_sp`)
                    let response_ref = await axios.get(`${process.env.REACT_APP_LINK}ref_kurikulum`)
                    setjeniskurikulum(response_ref.data.data)
                    setdatajenis(response.data.data)
                }
                else if(props.page === "program"){
                    
                    response = await axios.get(`${process.env.REACT_APP_LINK}kurikulum_program`)
                    setdataprogram(response.data.data)
                    let response_jenis = await axios.get(`${process.env.REACT_APP_LINK}kurikulum_sp`)
                    setdatajenis(response_jenis.data.data)
                    let response_ref = await axios.get(`${process.env.REACT_APP_LINK}ref_kurikulum`)
                    setjeniskurikulum(response_ref.data.data)
                    let response_jurusan = await axios.get(`${process.env.REACT_APP_LINK}jurusan`)
                    setjurusan(response_jurusan.data.data)
                }
                else if(props.page === "rombelreguler" || props.page === "rombelindustri"){
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
                else if(props.page === "jadwalreguler" || props.page === "jadwalindustri"){
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
                else if(props.page === "mapelnasional"){
                    let responserefmapel = await axios.get(`${process.env.REACT_APP_LINK}merdeka_mapel`)
                    let responsemapel = await axios.get(`${process.env.REACT_APP_LINK}kbm_mapel_sp`)
                   
                    setrefmapel(responserefmapel.data.data)
                    setdatamapel(responsemapel.data.data)
                }
                else if(props.page === "mapelindustri"){
                    let response = await axios.get(`${process.env.REACT_APP_LINK}kbm_mapel_sp`)
                    let data = response.data.data
                    let jurusanid = props.jurusanid
                    let mapelIndustriRaw = data.filter(item => item.mapel_kode)
                    let mapelIndustri = mapelIndustriRaw.filter(item => item.mapel_kode.toString().slice(0,8) === jurusanid)
                    setdatamapelindustri(mapelIndustri)
                    props.handleDataMapel(mapelIndustri)
                }
                setisload(false)
            }
            }
            catch(e){
                console.log(e)
            }
        }
        getAlldata()
    },[updaterdelete])
    
    useEffect(() => {
        console.log(dataRombel)
    })

    //jika jurusan id ditemukan di page mapel industri
    useEffect(() => {
        const getData = async() => {
            try{
                if(props.page === "mapelindustri"){
                    let response = await axios.get(`${process.env.REACT_APP_LINK}kbm_mapel_sp`)
                    let data = response.data.data
                    let jurusanid = props.jurusanid
                    let mapelIndustriRaw = data.filter(item => item.mapel_kode)
                    let mapelIndustri = mapelIndustriRaw.filter(item => item.mapel_kode.toString().slice(0,8) === jurusanid)
                    setdatamapelindustri(mapelIndustri)
                    props.handleDataMapel(mapelIndustri)
                }
            }
            catch(e){

            }
        }
        getData()
    },[props.jurusanid])

    //jika di halaman jadwal ada parameter ptk id
    useEffect(() => {
        if(props.page === "jadwalspesifik"){
            let getdata = async() => {

                try{
                    let response = await axios.get(`${process.env.REACT_APP_LINK}jadwal_kbm/${props.ptk_id.id}`)
                    let response_tugas_mengajar = await axios.get(`${process.env.REACT_APP_LINK}ptk_tugas_mengajar`)
                    let responsemapel = await axios.get(`${process.env.REACT_APP_LINK}kbm_mapel_sp`)
                    let responseguru = await axios.get(`${process.env.REACT_APP_LINK}ptk`)
                    let response_rombel = await axios.get(`${process.env.REACT_APP_LINK}kurikulum_rombongan_belajar`)
                    let responsewaktukbm = await axios.get(`${process.env.REACT_APP_LINK}waktu_kbm`)
                    let responsehari = await axios.get(`${process.env.REACT_APP_LINK}hari`)

                    setdataspesifik(response.data.data)
                    setdatatugasmengajar(response_tugas_mengajar.data.data)
                    setdatamapel(responsemapel.data.data)
                    setgurumapel(responseguru.data.data)
                    setdatarombel(response_rombel.data.data)
                    setwaktukbm(responsewaktukbm.data.data)
                    sethari(responsehari.data.data)
            
                }
                catch(e){
                    console.log(e)
                }
            }
            getdata()
        }
    },[props.ptk_id])

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

    const deleteItem = async(url) => {
        try{
            Swal.fire({
                title:"Apakah Anda Yakin ?",
                text:"Item yang sudah terhapus tidak dapat dikembalikan",
                icon:"warning",
                showCancelButton:true,
                confirmButtonText:"Ya,Hapus",
                cancelButtonText:"Batal"
            })
                .then(result => {
                    if(result.isConfirmed){
                        axios.delete(`${process.env.REACT_APP_LINK}${url}`)
                        setupdaterdelete(uuidv4())
                        setisload(true)
                        Swal.fire(
                            "Data Berhasil Dihapus"
                        )
                       
                    }
                })
                .catch(e => console.log(e))

        }
        catch(e){
            console.log(e)
        }
    }
   
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
               deleteItem(`kurikulum_sp/${id}`)
                //hapus storage item
                localStorage.removeItem("kurikulum_sp_id")
                setupdaterdelete(uuidv4())
            }

            //jika page program
            else if(props.page === "program"){
                deleteItem(`kurikulum_program/${id}`)
            }

            //jika page rombel
            else if(props.page === "rombelreguler" || props.page === "rombelindustri"){
                deleteItem(`kurikulum_rombongan_belajar/${id}`)
            }

            //jika page tugas
            else if(props.page === "tugas"){
                deleteItem(`ptk_tugas_mengajar/${id}`)
            }

            //jika page jadwal
            else if(props.page === "jadwalreguler"|| props.page === "jadwalindustri" || props.page === "jadwalspesifik"){
               deleteItem(`jadwal_kbm/${id}`)
            }

            //jika page mael
            else if(props.page === "mapelnasional" || props.page === "mapelindustri"){
                deleteItem(`kbm_mapel_sp/${id}`)
            }

        }

        if(typebtn === "lihat"){
            setTimeout(() => {
                navigate(`/jadwal/jadwalspesifik/${id}`)

            },500)  
        }

        if(typebtn === "refresh"){
            if(props.page === 'jadwal'){
                navigate("/jadwal")
            }
            window.location.reload()
        }
    }

    const handleSearchText = (e) => {
     setsearchtext(e.target.value)
    }

    

    return(
        <div>
            {
                props.page === "rombelreguler" || props.page === "rombelindustri" ?
                <CFormInput 
                 type="text"
                 className='mb-3'
                 value={searchtext}
                 onChange={handleSearchText}
                 placeholder={props.page === "rombelreguler" || props.page === "rombelindustri" ? "Cari Rombel ..." : ""}
                />
                :
                <div className='mb-4'>

                </div>
            }
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
                                                items.jurusan_id == item.jurusan_id.trim() &&
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
                                            disabled
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
                            props.page === "rombelreguler" ?
                            dataRombel.map((item,index) => {
                                if(item.nama.toLowerCase().includes(searchtext.toLowerCase()))
                                {
                                    return(
                                        item.is_industri === 0 &&
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
                                                                data.jurusan_id == items.jurusan_id.trim() &&
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

                                }

                            }
                            )
                            :
                            (
                                props.page === 'rombelindustri' &&
                                dataRombel.map((item,index) => 
                                item.is_industri == 1 &&
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
                             )
                       }

                       {
                            props.page === "tugas" &&
                            props.gurumapel.map((item,index) => 
                                item.semester_id == semesterid &&
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
                            props.page === "jadwalreguler" || props.page === "jadwalindustri" ?
                            (!loading ?                      
                                props.datajadwal.map((item,index) => 
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
                                            {
                                                props.page === "jadwalreguler" ? 
                                                <td>
                                                {
                                                   
                                                        items.ptk_penugasan_id == item.ptk_penugasan_id &&
                                                        
                                                        dataRombel.map((data,index) => 
                                                            data.rombongan_belajar_id === item.rombongan_belajar_id &&
                                                            data.nama
                                                        ) 
                                                    
                                                }
                                                </td>
                                                : 
                                                (
                                                    props.page === "jadwalindustri" &&
                                                        <td>
                                                            {
                                                                dataRombel.map(items =>
                                                                    items.rombongan_belajar_id === item.rombongan_belajar_id &&
                                                                    items.nama
                                                                )
                                                            }
                                                        </td>

                                                )
                                            }
                                            
                                            {
                                                props.page === "jadwalreguler" &&
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


                                            }

                                            {
                                                props.page === "jadwalreguler" ?
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
                                                :
                                                (
                                                    props.page === "jadwalindustri" &&
                                                    <td>
                                                        {
                                                            item.tanggal
                                                        }
                                                    </td>
                                                )
                                            }

                                            {
                                                props.page === "jadwalreguler" &&
                                                <>
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
                                                
                                                </>
                                                
                                            }
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

                       {/* Jadwal Spesifik */}
                       {
                            props.page === "jadwalspesifik" &&
                            (
                                !loading ?
                                dataspesifik === "" ?
                                "Data kosong"
                                :
                                dataspesifik.map(item =>
                                    dataTugasMengajar.map(items =>
                                        item.ptk_penugasan_id === items.ptk_penugasan_id &&
                                        <tr>
                                            <td>
                                                {
                                                    dataMapel.map(data =>
                                                        data.mapel_sp_id === items.mapel_sp_id &&
                                                        data.nama
                                                    )
                                                }
                                            </td>
                                            <td>
                                                {
                                                    gurumapel.map(data =>
                                                        data.ptk_id == items.ptk_id &&
                                                        data.nama   
                                                    )
                                                }
                                            </td>
                                            <td>
                                                {
                                                        dataRombel.map((data,index) => 
                                                            data.rombongan_belajar_id === item.rombongan_belajar_id &&
                                                            data.nama
                                                        ) 
                                                }
                                            </td>
                                            <td>
                                                {
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
                                                        data.waktu1
                                                    :
                                                    ""
                                                    )
                                                }
                                            </td>
                                            <td>
                                                {
                                                    item.tanggal
                                                }
                                            </td>
                                        </tr>       
                                    )
                                )
                                :
                                <p>Loading</p>
                            )
                       }

                       {
                            props.page === "mapelnasional" &&
                            dataMapel.map((item,index) => 
                                item.is_industri == 0 &&
                                <tr key={index} style={{verticalAlign:"middle"}}>
                                    <td>
                                        {item.kelompok}
                                    </td>
                                    <td>
                                        {item.mapel_rank}
                                    </td>
                                    <td>
                                        {item.nama}
                                    </td>
                                    <td>
                                            <CButton color="link" typebtn="detail" id={item.mapel_sp_id} onClick={handleClickBtn} >
                                                <img src="./img/icon/view.png" width="20" height="20" typebtn="detail" onClick={handleClickBtn} id={item.mapel_sp_id} ></img>
                                            </CButton>
                                            <CButton color="link" typebtn="edit" id={item.mapel_sp_id} onClick={handleClickBtn} >
                                                <img src="./img/icon/write bw.png" width="20" height="20" typebtn="edit" onClick={handleClickBtn} id={item.mapel_sp_id} ></img>
                                            </CButton>
                                            <CButton color="link" typebtn="delete" id={item.mapel_sp_id} onClick={handleClickBtn} >
                                                <img src="./img/icon/delete bw.jpg" width="20" height="20" typebtn="delete" onClick={handleClickBtn} id={item.mapel_sp_id} ></img>
                                            </CButton>                                                     
                                    </td>
                                </tr>
                            
                            
                            )
                       }

                       {
                            props.page === "mapelindustri" &&
                            datamapelindustri.map((item,index) => 
                                <tr key={index} style={{verticalAlign:"middle"}}>
                                    <td>
                                        {item.kelompok}
                                    </td>
                                    <td>
                                        {item.mapel_rank}
                                    </td>
                                    <td>
                                        {item.nama}
                                    </td>
                                    <td>
                                            <CButton color="link" typebtn="detail" id={item.mapel_sp_id} onClick={handleClickBtn} >
                                                <img src="./img/icon/view.png" width="20" height="20" typebtn="detail" onClick={handleClickBtn} id={item.mapel_sp_id} ></img>
                                            </CButton>
                                            <CButton color="link" typebtn="edit" id={item.mapel_sp_id} onClick={handleClickBtn} >
                                                <img src="./img/icon/write bw.png" width="20" height="20" typebtn="edit" onClick={handleClickBtn} id={item.mapel_sp_id} ></img>
                                            </CButton>
                                            <CButton color="link" typebtn="delete" id={item.mapel_sp_id} onClick={handleClickBtn} >
                                                <img src="./img/icon/delete bw.jpg" width="20" height="20" typebtn="delete" onClick={handleClickBtn} id={item.mapel_sp_id} ></img>
                                            </CButton>                                                     
                                    </td>
                                </tr>
                            
                            )
                       }

                    </CTableBody>
                </CTable>
            </div>
        </div>
    )
}

export default TableMain