import { CButton, CFormInput, CFormLabel, CFormSelect } from '@coreui/react';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import useRefStore from 'src/state/ref';
import Swal from 'sweetalert2';

const PtkUpload = () => {
    const [semester,setsemester] = useRefStore((state) => [state.semester, state.setsemester])
    const[forminput,setforminput] = useState({
        file:null,
        semester_id:null,
        sekolah_id:localStorage.getItem('sekolah_id'),
    })

    useEffect(() => {
        const fetchData = async() => {
            try{    
                if(semester === null || semester.length === 0){
                    let res = await axios.get(`${process.env.REACT_APP_LINK}semester`)
                    setsemester(res.data.data)
                } 
            }
            catch(e){
                console.log(e)
            }
        }
        fetchData()
    },[])

    useEffect(() => {
        console.log(forminput)
    })

    const handleFormInput = (e) => {
        setforminput({
            ...forminput,
            [e.target.name]:e.target.value
        })
    }

    const handlefile = (e) => {
        setforminput({
            ...forminput,
            file:e.target.files[0]
        })
    }
    
    const handlesubmit = (e) => {
        e.preventDefault()
        let formData = new FormData()

        formData.append('file',forminput.file)
        formData.append('semester_id',forminput.semester_id)
        formData.append('sekolah_id',forminput.sekolah_id)

        let sendData = async() => {
            try{
                let res = await axios.post(`${process.env.REACT_APP_LINK}ptk/upload`,formData,{
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
            
                console.log(res.data)
            }

            catch(e){
                Swal.fire({
                    title:"Kesalahan",
                    text:e.response.data.message,
                    icon:"error",
                    confirmButtonText:"Ok",
                })
            }
        }
        sendData()

    }

    return(
        <>
            <form onSubmit={handlesubmit}>
                <div className='mb-3'>
                    <CFormLabel>File (xlsx)</CFormLabel>
                    <CFormInput
                        type="file"
                        name="file"
                        onChange={handlefile}
                        required    
                        accept='.xlsx'
                    />
                </div>
                <div className='mb-3'>
                    <CFormLabel>Semester</CFormLabel>
                    <CFormSelect
                        name="semester_id"
                        onChange={handleFormInput}
                    >
                        <option>Pilih Semester</option>
                        {
                            semester.map((item, index) => {
                                return(
                                    <option key={index} value={item.semester_id}>{item.nama}</option>
                                )
                            })
                        }
                    </CFormSelect>
                </div>
                <div className='mb-3'>
                    <CButton type='submit'>Upload</CButton>
                </div>
            </form>
        </>
    )
}

export default PtkUpload;