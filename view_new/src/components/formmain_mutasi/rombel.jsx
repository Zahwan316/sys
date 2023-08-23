import { CButton, CFormInput, CFormLabel } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const MutasiRombelForm = () => {
    const[dataSemester,setdatasemester] = useState([])
    const[semesterid,setsemesterid] = useState()
    
    useEffect(() => {
        const getData = async() => {
            try{
                let response = await axios.get(`${process.env.REACT_APP_LINK}semester`)
                let data = response.data.data
                const semesterid_raw = data.filter(item => item.periode_aktif != 0 && item.semester_id)
                const semesteridmain = semesterid_raw.map(item => item.semester_id)
                setsemesterid(semesteridmain[0])
            }
            catch(e){
                console.log(e)
            }
        }
        getData()
    },[])

    useEffect(() => {
        console.log(semesterid)
    })

    const handlesubmit = (e) => {
        e.preventDefault()

        const sendData = async() => {
            
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
                        axios.post(`${process.env.REACT_APP_LINK}kurikulum_rombongan_belajar/mutasi/${semesterid}`,semesterid)
                            .then(res => {
                                console.log(res)
                                console.log(semesterid)
                                Swal.fire(
                                    "Rombel berhasil dimutasi"
                                )
                            })
                        }
                    })
                    .catch(e => {
                        Swal.fire(
                            "Kesalahan"
                        )
                        console.log(e)
                        
                    })   
            
            
        }
        sendData()
    }

    return(
        <>
            <form onSubmit={handlesubmit}>

                <p>Apakah Anda Ingin Bermutasi Rombel Ke Semester Sekarang?</p>
            {/*  <div className='mb-3'>
                    <CFormLabel>Rombel</CFormLabel>
                    <CFormInput></CFormInput>
                </div> */}
                <div>
                    <CButton type="submit">Generate</CButton>
                </div>
            </form>
        </>
    )
}

export default MutasiRombelForm;