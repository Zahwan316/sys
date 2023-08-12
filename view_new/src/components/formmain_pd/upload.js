import { CButton, CFormLabel,CCol,CRow, CFormInput, CFormSelect } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import Select from "react-select"
import axios from 'axios';

const UploadPesertaDidik = () => {
    const[datasemester,setdatasemester] = useState([])
    const[forminput,setforminput] = useState({
        file:"",
        semester_id:"",
        sekolah_id:localStorage.getItem("sekolah_id")
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

        const sendData = async() => {
            try{
                let response = await axios.post(`${process.env.REACT_APP_LINK}peserta_didik/upload`,formdata,{
                    headers:{
                        'Content-Type':'multipart/form-data'

                    }
                })
                console.log(response.data)
            }
            catch(e){
                console.log(e)
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