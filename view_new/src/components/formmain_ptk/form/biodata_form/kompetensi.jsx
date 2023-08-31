import { CFormInput,CFormLabel, CFormSelect } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import useRefStore from 'src/state/ref';
import axios from 'axios';

const KompetensiForm = () => {
    const[keahlian_laboratorium,setkeahlian_laboratorium] = useRefStore((state) => [state.keahlian_laboratorium,state.setkeahlian_laboratorium,state.setkeahlian_laboratorium])

    useEffect(() => {
        const getData = async() => {
            try{
                if(keahlian_laboratorium === null || keahlian_laboratorium.length === 0){
                    let response = await axios.get(`${process.env.REACT_APP_LINK}keahlian_laboratorium`)
                    setkeahlian_laboratorium(response.data.data)
                }
            }
            catch(e){

            }
        }
        getData()
    },[])


    return(
        <>
            <div className='mb-3'>
                <CFormLabel>
                    Punya Lisensi Kepala Sekolah?
                </CFormLabel>
                <CFormSelect>
                    <option>Pilih</option>
                    <option value="0">Tidak</option>
                    <option value="1">Ya</option>
                </CFormSelect>
            </div>
            <div className='mb-3'>
                <CFormLabel>
                    Keahlian Laboratorium
                </CFormLabel>
                <CFormSelect>
                    <option>Pilih</option>
                    {
                        keahlian_laboratorium!== null && keahlian_laboratorium.map((item,index) => {
                            return(
                                <option key={index} value={item.keahlian_laboratorium_id}>{item.nama}</option>
                            )
                        })
                    }
                </CFormSelect>
            </div>
            <div className='mb-3 d-flex'>
                <div className='mb-3'>
                    <CFormLabel>
                        Mampu Menangani Kebutuhan Khusus?
                    </CFormLabel>
                    <CFormSelect>
                        <option>Pilih</option>
                        <option value="0">Tidak</option>
                        <option value="1">Ya</option>
                    </CFormSelect>
                </div>
                <div className='mx-3'>
                    <CFormLabel>
                        Keahlian Braille
                    </CFormLabel>
                    <CFormSelect>
                        <option>Pilih</option>
                        <option value="0">Tidak</option>
                        <option value="1">Ya</option>
                    </CFormSelect>
                </div>
                <div className='mx-3'>
                    <CFormLabel>
                        Keahlian Bahasa Isyarat
                    </CFormLabel>
                    <CFormSelect>
                        <option>Pilih</option>
                        <option value="0">Tidak</option>
                        <option value="1">Ya</option>
                    </CFormSelect>
                </div>

            </div>
        </>
    )
}

export default KompetensiForm;