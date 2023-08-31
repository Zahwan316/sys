import { CFormLabel,CFormInput, CFormSelect } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import useRefStore from 'src/state/ref';

const IdentitasForm = () => {
    const agama = useRefStore((state) => state.agama);
    const kewarganegaraan = useRefStore((state) => state.kewarganegaraan)

    return(
        <>
            <div className='mb-3'>
                <CFormLabel>
                    Nama
                </CFormLabel>
                <CFormInput 
                    type="text"
                    required
                />
            </div>
            <div className='mb-3'>
                <CFormLabel>
                    NIK
                </CFormLabel>
                <CFormInput 
                    type="number"
                    required
                />
            </div>
            <div className='mb-3'>
                <CFormLabel>
                    Jenis Kelamin
                </CFormLabel>
                <CFormSelect>
                    <option>Pilih</option>
                    <option>Laki-Laki</option>
                    <option>Perempuan</option>
                </CFormSelect>
            </div>
            <div className='mb-3 d-flex'>
                <div className='mb-3'>
                    <CFormLabel>Tempat Lahir</CFormLabel>
                    <CFormInput 
                        type="text"
                        required
                    />
                </div>
                <div className='mx-3'>
                    <CFormLabel>Tanggal Lahir</CFormLabel>
                    <CFormInput 
                        type="date"
                        required
                    />
                </div>
            </div>
            <div className='mb-3'>
                <CFormLabel>Nama Ibu Kandung</CFormLabel>
                <CFormInput 
                    type="text"
                    required
                />
            </div>
            <div className='mb-3'>
                <CFormLabel>Nama Wajib Pajak</CFormLabel>
                <CFormInput 
                    type="text"
                    required
                />
            </div>
            <div className='mb-3'>
                <CFormLabel>Agama</CFormLabel>
                <CFormSelect
                    required
                >
                    <option>Pilih</option>
                    {
                        agama.map(item =>
                            <option value={item.agama_id}>
                                {
                                    item.nama
                                }
                            </option>    
                        )
                    }     
                </CFormSelect>
            </div>
            <div className='mb-3'>
                <CFormLabel>Kewarganegaraan</CFormLabel>
                <CFormSelect
                    required
                >
                    <option>Pilih</option>
                    {
                        kewarganegaraan.map(item =>
                            <option value={item.alpha_2}>
                                {
                                    item.nama
                                }
                            </option>    
                        )
                    }     
                </CFormSelect>
            </div>
        </>
    )
}

export default IdentitasForm;