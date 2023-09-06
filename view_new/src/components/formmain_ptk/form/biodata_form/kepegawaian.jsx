import { CFormInput, CFormLabel, CFormSelect } from '@coreui/react';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import useRefStore from 'src/state/ref';
import useFormPtkStore from 'src/state/form/ptkform';

const KepegawaianForm = (props) => {
    const[status_kepegawaian,setstatus_kepegawaian] = useRefStore((state) => [state.status_kepegawaian, state.setstatus_kepegawaian])
    const[jenis_ptk,setjenis_ptk] = useRefStore((state) => [state.jenis_ptk,state.setjenis_ptk])
    const[lembaga_pengangkatan,setlembaga_pengangkatan] = useRefStore((state) => [state.lembaga_pengangkatan,state.setlembaga_pengangkatan])
    const[sumber_gaji,setsumber_gaji] = useRefStore((state) => [state.sumber_gaji,state.setsumber_gaji])
    const[pangkat,setpangkat] = useRefStore((state) => [state.pangkat,state.setpangkat])
    const setdata = useFormPtkStore((state) => state.setform)
    const forminput = useFormPtkStore((state) => state)

    const handleforminput = (e) => {
        const{name,value} = e.target;
        setdata(name, value);
    }

    useEffect(() => {
        console.log(forminput)
    })

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

    return(
        <>
            <div className='mb-3'>
                <CFormLabel>
                    Status Kepegawaian
                </CFormLabel>
                <CFormSelect
                    required
                    name="status_kepegawaian_id"
                    onChange={handleforminput}
                    value={forminput.status_kepegawaian_id}
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
                    name="nip"
                    onChange={handleforminput}
                    value={forminput.nip}
                />
            </div>
            <div className='d-flex mb-3 '>              
                <div className='mb-3 w-50'>
                    <CFormLabel>
                        NUPTK
                    </CFormLabel>
                    <CFormInput 
                        type="text"
                        name="nuptk"
                        onChange={handleforminput}
                        value={forminput.nuptk}
                    />
                </div>
                <div className='mx-3 w-50'>
                    <CFormLabel>
                        NUKS
                    </CFormLabel>
                    <CFormInput 
                        type="text"
                        name="nuks"
                        onChange={handleforminput}
                        value={forminput.nuks}
                    />
                </div>
                <div className='mb-3 w-50'>
                    <CFormLabel>
                        Karpeg
                    </CFormLabel>
                    <CFormInput 
                        type="text"
                        name="karpeg"
                        onChange={handleforminput}
                        value={forminput.karpeg}
                    />
                </div>
                <div className='mx-3 w-50'>
                    <CFormLabel>
                        Karpas
                    </CFormLabel>
                    <CFormInput 
                        type="text"
                        name="karpas"
                        onChange={handleforminput}
                        value={forminput.karpas}
                    />
                </div>
            </div>
            
            <div className='mb-3'>
                <CFormLabel>
                    Jenis PTK
                </CFormLabel>
                <CFormSelect
                      name="jenis_ptk_id"
                      onChange={handleforminput}
                      value={forminput.jenis_ptk_id}
                >
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
                        name="sk_pengangkatan"
                        onChange={handleforminput}
                        value={forminput.sk_pengangkatan}
                    />
                </div>
                <div className='mx-3 w-50'>
                    <CFormLabel>
                        TMT Pengangkatan
                    </CFormLabel>
                    <CFormInput 
                        type="date"
                        name="tmt_pengangkatan"
                        onChange={handleforminput}
                        value={forminput.tmt_pengangkatan}
                    />
                </div>
                <div className='mb-3 w-50'>
                    <CFormLabel>
                        Lembaga Pengangkatan
                    </CFormLabel>
                    <CFormSelect
                          name="lembaga_pengangkat_id"
                          onChange={handleforminput}
                          value={forminput.lembaga_pengangkat_id}
                    >
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
                        name="sk_cpns"
                        onChange={handleforminput}
                        value={forminput.sk_cpns}
                    />
                </div>
                <div className='mx-3 w-50'>
                    <CFormLabel>
                        Tanggal CPNS
                    </CFormLabel>
                    <CFormInput 
                        type="date"
                        name="tgl_cpns"
                        onChange={handleforminput}
                        value={forminput.tgl_cpns}
                    />
                </div>
                <div className='mb-3 w-50'>
                    <CFormLabel>
                        TMT PNS
                    </CFormLabel>
                    <CFormInput 
                        type="date"
                        name="tmt_pns"
                        onChange={handleforminput}
                        value={forminput.tmt_pns}
                    />
                </div>
            </div>
            <div className='mb-3'>
                <CFormLabel>
                    Pangkat/Golongan
                </CFormLabel>
                <CFormSelect
                      name="pangkat_golongan_id"
                      onChange={handleforminput}
                      value={forminput.pangkat_golongan_id}
                >
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
                <CFormSelect
                      name="sumber_gaji_id"
                      onChange={handleforminput}
                      value={forminput.sumber_gaji_id}
                >
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