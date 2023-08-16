import { CButton, CFormLabel,CCol,CRow, CFormInput, CFormSelect } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import Select from "react-select"
import axios from 'axios';
import Swal from "sweetalert2"

const UploadPesertaDidik = () => {
    const[datasemester,setdatasemester] = useState([])
    const[forminput,setforminput] = useState({
        file:"",
        semester_id:"",
        sekolah_id:localStorage.getItem("sekolah_id"),
        kurikulum_id:localStorage.getItem('kurikulum_sp_id'),
    })

    useEffect(() => {
        const getData = async() => {
            try{
                let response_semester = await axios.get(`${process.env.REACT_APP_LINK}semester`)
                setdatasemester(response_semester.data.data)
            }
            catch(e){
                console.log(e)
            }
        }   
        getData()
    },[])

    useEffect(() => {
        console.log(forminput)
    })

    const handlefile = (e) => {
        setforminput({...forminput,file:e.target.files[0]})

    }

    const handleselectoption = (option) => {
        setforminput({...forminput,semester_id:option.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formdata = new FormData()
        formdata.append('file',forminput.file)
        formdata.append('semester_id',forminput.semester_id)
        formdata.append("sekolah_id",forminput.sekolah_id)
        formdata.append("kurikulum_id",forminput.kurikulum_id)
        

        const sendData = async() => {
            try{
                let response = await axios.post(`${process.env.REACT_APP_LINK}peserta_didik/upload`,formdata,{
                    headers:{
                        'Content-Type':'multipart/form-data'

                    }
                })
                Swal.fire({
                    title:"Data Terupload",
                    text:"Terima kasih sudah mengupload data",
                    icon:"success",
                    confirmButtonText:"Ok",
                })
                console.log(response.data)
            }
            catch(e){
                console.log(e)
                Swal.fire({
                    title:"Error",
                    text:e.message,
                    icon:"error",
                    confirmButtonText:"Ok",
                })
            }
        }
        sendData()
    }

    return(
        <>
            <div>
                <CCol>
                    <CRow>
                        <form onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <CFormLabel>Upload Peserta Didik</CFormLabel>
                            <CFormInput 
                                type="file"
                                onChange={handlefile}
                            />   
                            
                        </div>
                        <div className='mb-3'>
                            <CFormLabel>Semester</CFormLabel>
                            <Select
                                onChange={handleselectoption}
                                options={datasemester.map(item => {
                                    let data={
                                        value:item.semester_id,
                                        label:item.nama
                                    }
                                    return data
                                }
                                )}
                                components={{DropdownIndicator: props => <div {...props} name="semester_id" />}}
                            />
                        </div>
                        <CButton type='submit' >Upload</CButton>
                        
                        </form>
                    </CRow>
                </CCol>
            </div>
        </>
    )
}

export default UploadPesertaDidik;