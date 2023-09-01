import React, { useState, useEffect } from 'react';
import { CTable,CTableHead,CTableBody,CTableRow } from '@coreui/react';
import usePtkStore from 'src/state/ptk';
import axios from 'axios';
import BiodataTableBody from './tabledata/biodata';
import useRefStore from 'src/state/ref';
import KepegawaianTableBody from './tabledata/kepegawaian';
import KontakTableBody from './tabledata/kontak';
import KompetensiTableData from './tabledata/kompetensi';
import Swal from 'sweetalert2';
import {v4 as uuidv4} from "uuid";

const TablePtk = (props) => {
    const[ptk,setptk] = usePtkStore((state) => [state.ptk,state.setdataptk])
    const[agama,setagama] = useRefStore((state) => [state.agama,state.setagama])
    const[jenisptk,setjenisptk] = useRefStore((state) => [state.jenisptk,state.setjenis_ptk])
    const[status_kepegawaian,setstatus_kepegawaian] = useRefStore((state) => [state.status_kepegawaian,state.setstatus_kepegawaian])
    const[kewarganegaraan,setkewarganegaraan] = useRefStore ((state) => [state.kewarganegaraan,state.setkewarganegaraan])
    const[updaterdelete,setupdaterdelete] = useState()


    useEffect(() => {
        const getData = async() => {
            try{
                if(props.page === "ptkbiodata"){
                    let response = await axios.get(`${process.env.REACT_APP_LINK}ptk`)
                    let response_agama = await axios.get(`${process.env.REACT_APP_LINK}agama`)
                    let response_kewarganegaraan = await axios.get(`${process.env.REACT_APP_LINK}jenis_kewarganegaraan`)
                    

                    setptk(response.data.data)
                    setagama(response_agama.data.data)
                    setkewarganegaraan(response_kewarganegaraan.data.data)
                }
                else if(props.page === "ptkkepegawaian"){
                    let response_kepegawaian = await axios.get(`${process.env.REACT_APP_LINK}status_kepegawaian`)
                    let response_jenis_ptk = await axios.get(`${process.env.REACT_APP_LINK}jenis_ptk`)

                    setjenisptk(response_jenis_ptk.data.data)
                    setstatus_kepegawaian(response_kepegawaian.data.data)
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
                let res = await axios.get(`${process.env.REACT_APP_LINK}ptk`)
                setptk(res.data.data)
            }
            catch(e){

            }
        }
        refetch_data()
    },[props.updater])

    useEffect(() => {
        console.log(agama)
    },[])

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
                            setupdaterdelete(uuidv4())
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
                handledelete(`${process.env.REACT_APP_LINK}ptk/${id}`)
            }
        }
    }

    return(
        <>
            <CTable style={{verticalAlign:"middle"}} hover>
                <CTableHead className='table-dark'>
                    <CTableRow style={{verticalAlign:"middle"}}>
                        {
                            props.tablehead.map(item => 
                                <th>{item}</th>
                            )
                        }
                        {
                            props.page === "ptkkepegawaian" || props.page === "ptkalamat" || props.page === "ptkkontak" || props.page === "ptkkompetensi" ?
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
                            dataptk={ptk}
                            handleclickbutton={handleclickbutton}
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
                </CTableBody>
            </CTable>
        </>
    )
}

export default TablePtk;