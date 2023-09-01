import { CFormLabel,CFormSelect,CFormInput } from '@coreui/react';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import useFormPtkStore from 'src/state/form/ptkform';
import useRefStore from 'src/state/ref';

const RekeningForm = () => {
    const[databank,setdatabank] = useRefStore((state) =>[state.bank,state.setbank])
    const[forminput,setdata] = useFormPtkStore((state) => [state,state.setform])

    useEffect(() => {
        const getData = async() => {
            try{
                if(databank === null ||databank.length === 0){
                    let response = await axios.get(`${process.env.REACT_APP_LINK}bank`)
                    setdatabank(response.data.data)
                    console.log(response.data.data)
                }
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

    const handleforminput = (e) => {
        const{value,name} = e.target
        setdata(name,value)
       
    }

    return (
        <>
            <div className='mb-3'>
                 <CFormLabel>
                    Nama Bank
                 </CFormLabel>
                 <CFormSelect 
                    name="id_bank"
                    onChange={handleforminput}
                    value={forminput.id_bank}
                 >
                    <option>Pilih Nama Bank</option>
                    {
                        databank.map((item,index) => (
                            <option key={index} value={item.id_bank}>{item.nm_bank}</option>
                        ))
                    }
                 </CFormSelect>
            </div>
            <div className='mb-3'>
                <CFormLabel>
                    No Rekening
                </CFormLabel>
                <CFormInput 
                    type="number"
                    name="rekening_bank"
                    onChange={handleforminput}
                    value={forminput.rekening_bank}
                />
            </div>
            <div className='mb-3'>
                <CFormLabel>
                    Rekening Atas Nama
                </CFormLabel>
                <CFormInput 
                    type="text"
                    name="rekening_atas_nama"
                    onChange={handleforminput}
                    value={forminput.rekening_atas_nama}
                />
            </div>
        </>
    )
}

export default RekeningForm;