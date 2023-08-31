import { CFormInput, CFormLabel, CFormSelect } from '@coreui/react';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import useRefStore from 'src/state/ref';

const KepegawaianForm = () => {
    const[status_kepegawaian,setstatus_kepegawaian] = useRefStore((state) => [state.status_kepegawaian, state.setstatus_kepegawaian])
    const[jenis_ptk,setjenis_ptk] = useRefStore((state) => [state.jenis_ptk,state.setjenis_ptk])
    const[lembaga_pengangkatan,setlembaga_pengangkatan] = useRefStore((state) => [state.lembaga_pengangkatan,state.setlembaga_pengangkatan])
    const[sumber_gaji,setsumber_gaji] = useRefStore((state) => [state.sumber_gaji,state.setsumber_gaji])
    const[pangkat,setpangkat] = useRefStore((state) => [state.pangkat,state.setpangkat])

    useEffect(() => {
            let getdata = async() => {
                try{
                    if(status_kepegawaian === null || status_kepegawaian.length === 0){
                        let response = await axios.get(`${process.env.REACT_APP_LINK}status_kepegawaian`)
                        setstatus_kepegawaian(response.data.data)
                    }
                    if(jenis_ptk === null || jenis_ptk.length === 0){
                        let response = await axios.get(`${process.env.REACT_APP_LINK}jenis_ptk`)
                        setjenis_ptk(response.data.data)
                    }
                    if(lembaga_pengangkatan === null || lembaga_pengangkatan.length === 0){
                        let response = await axios.get(`${process.env.REACT_APP_LINK}lembaga_pengangkat`)
                        setlembaga_pengangkatan(response.data.data)
                    }
                    if(sumber_gaji === null || sumber_gaji.length === 0){
                        let response = await axios.get(`${process.env.REACT_APP_LINK}sumber_gaji`)
                        setsumber_gaji(response.data.data)
                    }
                    if(pangkat === null || pangkat.length === 0){
                        let response = await axios.get(`${process.env.REACT_APP_LINK}pangkat_golongan`)
                        setpangkat(response.data.data)
                    }
                    
                }
                catch(e){
                    console.log(e)
                }
            }
            getdata()
        
    },[])

    useEffect(() => {
        console.log(status_kepegawaian)
    },[status_kepegawaian])



    return(
        <>
            <div className='mb-3'>
                <CFormLabel>
                    Status Kepegawaian
                </CFormLabel>
                <CFormSelect
                    required
                >
                    <option>Pilih Status</option>
                    {
                        status_kepegawaian.map((item, index) => {
                            return(
                                    <option key={index} value={item.status_kepegawaian_id}>{item.nama}</option>
                            )
                        })
                    }
                </CFormSelect>
            </div>
            <div className='mb-3'>
                <CFormLabel>
                    NIP
                </CFormLabel>
                <CFormInput 
                    type="number"
                    required
                />
            </div>
            <div className='d-flex mb-3 '>              
                <div className='mb-3 w-50'>
                    <CFormLabel>
                        NUPTK
                    </CFormLabel>
                    <CFormInput 
                        type="number"
                    />
                </div>
                <div className='mx-3 w-50'>
                    <CFormLabel>
                        NUKS
                    </CFormLabel>
                    <CFormInput 
                        type="text"
                    />
                </div>
                <div className='mb-3 w-50'>
                    <CFormLabel>
                        Karpeg
                    </CFormLabel>
                    <CFormInput 
                        type="text"
                    />
                </div>
                <div className='mx-3 w-50'>
                    <CFormLabel>
                        Karpas
                    </CFormLabel>
                    <CFormInput 
                        type="text"
                    />
                </div>
            </div>
            
            <div className='mb-3'>
                <CFormLabel>
                    Jenis PTK
                </CFormLabel>
                <CFormSelect>
                    <option>Pilih Jenis</option>
                        {
                            jenis_ptk.map((item, index) => {
                                return(
                                    <option key={index} value={item.jenis_ptk_id}>{item.jenis_ptk}</option>
                                )
                            })
                        }
                </CFormSelect>
            </div>
            <div className='d-flex mb-3'>
                <div className='mb-3 w-50'>
                    <CFormLabel>
                        SK Pengangkatan
                    </CFormLabel>
                    <CFormInput 
                        type="text"
                    />
                </div>
                <div className='mx-3 w-50'>
                    <CFormLabel>
                        TMT Pengangkatan
                    </CFormLabel>
                    <CFormInput 
                        type="date"
                    />
                </div>
                <div className='mb-3 w-50'>
                    <CFormLabel>
                        Lembaga Pengangkatan
                    </CFormLabel>
                    <CFormSelect>
                        <option>Pilih Lembaga</option>
                        {
                            lembaga_pengangkatan.map((item, index) => {
                                return(
                                    <option key={index} value={item.lembaga_pengangkat_id}>{item.nama}</option>
                                )
                            })
                        }
                    </CFormSelect>
                </div>

            </div>
            <div className='mb-3 d-flex'>
                <div className='mb-3 w-50'>
                    <CFormLabel>
                        SK CPNS
                    </CFormLabel>
                    <CFormInput 
                        type="text"
                    />
                </div>
                <div className='mx-3 w-50'>
                    <CFormLabel>
                        Tanggal CPNS
                    </CFormLabel>
                    <CFormInput 
                        type="date"
                    />
                </div>
                <div className='mb-3 w-50'>
                    <CFormLabel>
                        TMT PNS
                    </CFormLabel>
                    <CFormInput 
                        type="date"
                    />
                </div>
            </div>
            <div className='mb-3'>
                <CFormLabel>
                    Pangkat/Golongan
                </CFormLabel>
                <CFormSelect>
                    <option>Pilih Pangkat/Golongan</option>
                    {
                        pangkat.map((item, index) => {
                            return(
                                <option key={index} value={item.pangkat_golongan_id}>{item.nama}</option>
                            )
                        })
                    }
                </CFormSelect>
            </div>
            <div className='mb-3'>
                <CFormLabel>
                    Sumber Gaji
                </CFormLabel> 
                <CFormSelect>
                    <option>Pilih Sumber Gaji</option>
                    {
                        sumber_gaji.map((item, index) => {
                            return(
                                <option key={index} value={item.sumber_gaji_id}>{item.nama}</option>
                            )
                        })
                    }
                </CFormSelect>
            </div>
        </>
    )
}

export default KepegawaianForm;