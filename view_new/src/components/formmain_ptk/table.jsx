import React, { useState, useEffect } from 'react';
import { CTable,CTableHead,CTableBody,CTableRow, CFormInput } from '@coreui/react';
import usePtkStore from 'src/state/ptk';
import axios from 'axios';
import BiodataTableBody from './tabledata/biodata';
import useRefStore from 'src/state/ref';
import KepegawaianTableBody from './tabledata/kepegawaian';
import KontakTableBody from './tabledata/kontak';
import KompetensiTableData from './tabledata/kompetensi';
import Swal from 'sweetalert2';
import {v4 as uuidv4} from "uuid";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import PtkAlamatTableData from './tabledata/alamat';
import PtkProgramStudi from './program_studi';
import ProgramStudiTableBody from './tabledata/programstudi';
import AnggotaKeluargaTableBody from './tabledata/anggotakeluarga';

const TablePtk = (props) => {
    const[ptk,setptk] = usePtkStore((state) => [state.ptk,state.setdataptk])
    const[ptkselected,setptkselected] = usePtkStore((state) => [state.ptkselected,state.setptkselected])
    const[agama,setagama] = useRefStore((state) => [state.agama,state.setagama])
    const[jenisptk,setjenisptk] = useRefStore((state) => [state.jenis_ptk,state.setjenis_ptk])
    const[status_kepegawaian,setstatus_kepegawaian] = useRefStore((state) => [state.status_kepegawaian,state.setstatus_kepegawaian])
    const[kewarganegaraan,setkewarganegaraan] = useRefStore ((state) => [state.kewarganegaraan,state.setkewarganegaraan])
    const[updaterdelete,setupdaterdelete] = useState()
    const navigate = useNavigate()
    const{id} = useParams()
    const [isload,setisload] = useState(false)
    const[ptkalamatn,setptkalamat] = usePtkStore((state) => [state.ptk_alamat,state.setptkalamat])
    const [searchtext,setsearchtext] = useState("")
    const setptkprogramstudi = usePtkStore((state) => state.setptkprogramstudi)
    const setptkanggotakeluarga = usePtkStore((state) => state.setptkanggotakeluarga)


    useEffect(() => {
        const getData = async() => {
            try{
                if(props.page === "ptkbiodata"){
                    if(Object.keys(ptk).length === 0){
                        let response = await axios.get(`${process.env.REACT_APP_LINK}ptk`)
                        setptk(response.data.data)
                    }
                    if(Object.keys(agama).length === 0){
                        let response_agama = await axios.get(`${process.env.REACT_APP_LINK}agama`)
                        setagama(response_agama.data.data)
                    }
                    if(Object.keys(kewarganegaraan).length === 0){
                        let response_kewarganegaraan = await axios.get(`${process.env.REACT_APP_LINK}jenis_kewarganegaraan`)
                        setkewarganegaraan(response_kewarganegaraan.data.data)
                    }
                    
                }
                else if(props.page === "ptkkepegawaian"){
                   
                    if(Object.keys(jenisptk).length === 0){
                        let response_jenis_ptk = await axios.get(`${process.env.REACT_APP_LINK}jenis_ptk`)
                        setjenisptk(response_jenis_ptk.data.data)
                    }
                    if(Object.keys(status_kepegawaian).length === 0){
                        let response_kepegawaian = await axios.get(`${process.env.REACT_APP_LINK}status_kepegawaian`)
                        setstatus_kepegawaian(response_kepegawaian.data.data)
                    }
                }

                if(props.page === "ptkalamat"){
                    
                }
            }
            catch(e){
                console.log(e)
            }
            
        }
        getData()
    },[])

    useEffect(() => {
        const refetch_data = async() => {
            try{ 
                if(props.isload){
                    if(props.page === "ptkbiodata" || props.page === "ptkkepegawaian" || props.page === "ptkkontak" || props.page === "ptkkompetensi")
                    {
                     let res = await axios.get(`${process.env.REACT_APP_LINK}ptk`)
                     setptk(res.data.data)  
                    }
                    if(props.page === "ptkalamat")
                    {
                     let res_alamat = await axios.get(`${process.env.REACT_APP_LINK}ptk_alamat`)
                     setptkalamat(res_alamat.data.data)  
                    }
                    if(props.page === "ptkprogramstudi")
                    {
                     let res_program_studi = await axios.get(`${process.env.REACT_APP_LINK}ptk_pend_formal`)
                     setptkprogramstudi(res_program_studi.data.data)  
                    }
                    if(props.page === "ptkanggotakeluarga")
                    {
                     let res_anggota_keluarga = await axios.get(`${process.env.REACT_APP_LINK}ptk_anggota_keluarga`)
                     setptkanggotakeluarga(res_anggota_keluarga.data.data)       
                    }
                }
            }
            catch(e){

            }
        }
        refetch_data()
    },[props.updater])

    useEffect(() => {
        const refetch_data = async() => {
            try{
                if(isload){
                    if(props.page === "ptkbiodata" || props.page === "ptkkepegawaian" || props.page === "ptkkontak" || props.page === "ptkkompetensi")
                    {
                     let res = await axios.get(`${process.env.REACT_APP_LINK}ptk`)
                     setptk(res.data.data)  
                    }
                    if(props.page === "ptkalamat")
                    {
                     let res_alamat = await axios.get(`${process.env.REACT_APP_LINK}ptk_alamat`)
                     setptkalamat(res_alamat.data.data)  
                    }
                    if(props.page === "ptkprogramstudi")
                    {
                     let res_program_studi = await axios.get(`${process.env.REACT_APP_LINK}ptk_pend_formal`)
                     setptkprogramstudi(res_program_studi.data.data)  
                    }
                    if(props.page === "ptkanggotakeluarga")
                    {
                     let res_anggota_keluarga = await axios.get(`${process.env.REACT_APP_LINK}ptk_anggota_keluarga`)
                     setptkanggotakeluarga(res_anggota_keluarga.data.data)       
                    }
                }
            }
            catch(e){
                console.log(e)
            }
        }
        refetch_data()
    },[updaterdelete])

    useEffect(() => {
        const fetchData = async() => {
            try{
                let res = await axios.get(`${process.env.REACT_APP_LINK}ptk/${id}`)
                setptkselected(res.data.data)
            }
            catch(e){
                console.log(e)
            }
        }
        fetchData()
    },[id])

    useEffect(() => {
        console.log(props.updater)
    })

    const handledelete = async(url) => {
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
                        .then(res => {
                            console.log(res.data)
                            setupdaterdelete(uuidv4())
                            setisload(true)
                            setTimeout(() => {
                                setisload(false)
                            }, 500);
                            Swal.fire(
                                "Data berhasil dihapus"
                                )
                            }
                        )
                        .catch(e => 
                            console.log(e)
                        )

                }
            })
        }
        catch(e){
            console.log(e)
        }
    }

    const handleclickbutton = (e) => {
        const id = e.target.getAttribute("id")
        const typebtn = e.target.getAttribute("typebtn")
        
        if(typebtn != "delete"){
            props.handlemodal()
        }

        props.getTypeBtn(typebtn,id)

        if(typebtn == "delete"){
            if(props.page === "ptkbiodata"){
             handledelete(`ptk/${id}`)
            }
            if(props.page === "ptkalamat"){
             handledelete(`ptk_alamat/${id}`)
            }
            if(props.page === "ptkprogramstudi"){
             handledelete(`ptk_pend_formal/${id}`)
            }
            if(props.page === "ptkanggotakeluarga"){
             handledelete(`ptk_anggota_keluarga/${id}`)
            }
        }
    }

    const selectPtk = (e) => {
        let id = e.target.getAttribute("id")
        navigate(`/dataptk/${id}`)
        console.log(id)
    }

    const handlesearchtext = (e) => {
     setsearchtext(e.target.value)
    }

    return(
        <>
            {
                props.page === "ptkbiodata" && 
                <CFormInput
                className='mb-3'
                placeholder='Cari Ptk'
                value={searchtext}
                onChange={handlesearchtext}
                />
            }
            <CTable style={{verticalAlign:"middle",cursor:"pointer"}} hover>
                <CTableHead className='table-dark'>
                    <CTableRow style={{verticalAlign:"middle"}}>
                        {
                            props.tablehead.map(item => 
                                <th>{item}</th>
                            )
                        }
                        {
                            props.page === "ptkkepegawaian"  || props.page === "ptkkontak" || props.page === "ptkkompetensi" ?
                            <th>

                            </th>
                            :
                            <th> 
                                <img onClick={handleclickbutton}  typebtn="tambah" style={{cursor:"pointer"}} src="./img/icon/add bw.png" width="30" height="30" />   
                            </th>

                                                    
                        }
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {
                        props.page === "ptkbiodata" &&
                        <BiodataTableBody 
                            dataptk={ptk.filter((item) => item.nama.toLowerCase().includes(searchtext.toLowerCase()))}
                            handleclickbutton={handleclickbutton}
                            selectPtk={selectPtk}
                        />
                    }

                    {
                        props.page === "ptkkepegawaian"  &&
                        <KepegawaianTableBody 
                            dataptk={ptk}
                            handleclickbutton={handleclickbutton}
                        />
                    }

                    {
                        props.page === "ptkkontak" &&
                        <KontakTableBody
                            dataptk={ptk}
                            handleclickbutton={handleclickbutton}
                        />
                    }

                    {
                        props.page === "ptkkompetensi" &&
                        <KompetensiTableData
                            dataptk={ptk}
                            handleclickbutton={handleclickbutton}
                        />
                    }

                    {
                        props.page === "ptkalamat" &&
                        <PtkAlamatTableData 
                            handleclickbutton={handleclickbutton}
                        />
                    }

                    {
                        props.page === "ptkprogramstudi" && 
                        <ProgramStudiTableBody
                            handleclickbutton={handleclickbutton}
                        />
                    }

                    {
                        props.page === "ptkanggotakeluarga" &&
                        <AnggotaKeluargaTableBody 
                         handleclickbutton={handleclickbutton}
                        />
                    }
                </CTableBody>
            </CTable>
        </>
    )
}

export default TablePtk;