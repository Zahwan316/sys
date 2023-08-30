import React, { useState, useEffect } from 'react';
import { CTable,CTableHead,CTableBody,CTableRow } from '@coreui/react';
import usePtkStore from 'src/state/ptk';
import axios from 'axios';
import BiodataTableBody from './tabledata/biodata';
import useRefStore from 'src/state/ref';
import KepegawaianTableBody from './tabledata/kepegawaian';


const TablePtk = (props) => {
    const[ptk,setptk] = usePtkStore((state) => [state.ptk,state.setdataptk])
    const[agama,setagama] = useRefStore((state) => [state.agama,state.setagama])
    const[jenisptk,setjenisptk] = useRefStore((state) => [state.jenisptk,state.setjenis_ptk])
    const[status_kepegawaian,setstatus_kepegawaian] = useRefStore((state) => [state.status_kepegawaian,state.setstatus_kepegawaian])

    useEffect(() => {
        const getData = async() => {
            try{
                if(props.page === "ptkbiodata"){
                    let response = await axios.get(`${process.env.REACT_APP_LINK}ptk`)
                    let response_agama = await axios.get(`${process.env.REACT_APP_LINK}agama`)

                    setptk(response.data.data)
                    setagama(response_agama.data.data)
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
        console.log(agama)
    },[])

    const handleclickbutton = (e) => {

    }

    return(
        <>
            <CTable style={{verticalAlign:"middle"}} hover>
                <CTableHead className='table-dark'>
                    <CTableRow >
                        {
                            props.tablehead.map(item => 
                                <th>{item}</th>
                            )
                        }
                        {
                            props.page === "ptkkepegawaian" || props.page === "ptkalamat" ?
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
                        
                        />
                    }

                    {
                        props.page === "ptkkepegawaian"  &&
                        <KepegawaianTableBody 
                            dataptk={ptk}
                        />
                    }
                </CTableBody>
            </CTable>
        </>
    )
}

export default TablePtk;