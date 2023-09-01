import { CFormInput,CFormLabel, CFormSelect } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import useRefStore from 'src/state/ref';
import axios from 'axios';
import useFormPtkStore from 'src/state/form/ptkform';

const KompetensiForm = () => {
    const[keahlian_laboratorium,setkeahlian_laboratorium] = useRefStore((state) => [state.keahlian_laboratorium,state.setkeahlian_laboratorium,state.setkeahlian_laboratorium])
    const setdata = useFormPtkStore((state) => state.setform)
    const forminput = useFormPtkStore((state) => state)

    const handleforminput = (e) => {
        const{name,value} = e.target;
        setdata(name, value);
    }

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
                <CFormSelect
                    name="sudah_lisensi_kepala_sekolah"
                    onChange={handleforminput}
                    value={forminput.sudah_lisensi_kepala_sekolah}
                >
                    <option>Pilih</option>
                    <option value="0">Tidak</option>
                    <option value="1">Ya</option>
                </CFormSelect>
            </div>
            <div className='mb-3'>
                <CFormLabel>
                    Pernah Diklat Pengawasan?
                </CFormLabel>
                <CFormSelect
                    name="pernah_diklat_kepengawasan"
                    onChange={handleforminput}
                    value={forminput.pernah_diklat_kepengawasan}
                >
                    <option>Pilih</option>
                    <option value="0">Tidak</option>
                    <option value="1">Ya</option>
                </CFormSelect>
            </div>
            <div className='mb-3'>
                <CFormLabel>
                    Keahlian Laboratorium
                </CFormLabel>
                <CFormSelect
                    name="keahlian_laboratorium_id"
                    onChange={handleforminput}
                    value={forminput.keahlian_laboratorium_id}
                >
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
                    <CFormSelect
                        name="mampu_handle_kk"
                        onChange={handleforminput}
                        value={forminput.mampu_handle_kk}
                    >
                        <option>Pilih</option>
                        <option value="0">Tidak</option>
                        <option value="1">Ya</option>
                    </CFormSelect>
                </div>
                <div className='mx-3'>
                    <CFormLabel>
                        Keahlian Braille
                    </CFormLabel>
                    <CFormSelect
                        name="keahlian_braille"
                        onChange={handleforminput}
                        value={forminput.keahlian_braille}
                    >
                        <option>Pilih</option>
                        <option value="0">Tidak</option>
                        <option value="1">Ya</option>
                    </CFormSelect>
                </div>
                <div className='mx-3'>
                    <CFormLabel>
                        Keahlian Bahasa Isyarat
                    </CFormLabel>
                    <CFormSelect
                        name="keahlian_bhs_isyarat"
                        onChange={handleforminput}
                        value={forminput.keahlian_bhs_isyarat}
                    >
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