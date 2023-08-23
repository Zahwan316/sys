import { CFormInput, CFormLabel, CFormSelect } from '@coreui/react';
import React, { useState, useEffect } from 'react';

const FormKesehatanPesertaDidik = (props) => {
    return(
        <>
            <div className='mb-3'>
                <CFormLabel>Tanggal Uji</CFormLabel>
                <CFormInput 
                    type="date"
                    name="tanggal_uji"
                    onChange={props.handleforminput}
                />
            </div>
            <div className='mb-3'>
                <CFormLabel>Buta Warna</CFormLabel>
                <CFormSelect
                    name="buta_warna"
                    onChange={props.handleforminput}
                >
                    <option>Pilih</option>
                    <option value='0'>Iya</option>
                    <option value='1'>Tidak</option>
                </CFormSelect>
            </div>
            <div className='d-flex mb-3 flex-wrap'>       
                <div className='mb-3'>
                    <CFormLabel>Tinggi Badan</CFormLabel>
                    <CFormInput 
                        type="number"
                        name="tinggi_badan"
                        onChange={props.handleforminput}
                    />
                </div>
                <div className='mx-3'>
                    <CFormLabel>Berat Badan</CFormLabel>
                    <CFormInput 
                        type="number"
                        name="berat_badan"
                        onChange={props.handleforminput}
                    />
                </div>
                <div className='mx-3'>
                    <CFormLabel>Lingkar Kepala</CFormLabel>
                    <CFormInput 
                        type="number"
                        name="lingkar_kepala"
                        onChange={props.handleforminput}
                    />
                </div>
                <div className='mx-3'>
                    <CFormLabel>Visus Mata</CFormLabel>
                    <CFormInput 
                        type="text"
                        name="visus_mata"
                        onChange={props.handleforminput}
                    />
                </div>
            </div>
            <div className='mb-3 d-flex'>
                <div className='mb-3'>
                    <CFormLabel>Hdl</CFormLabel>
                    <CFormInput 
                        type="number"
                        name="hdl"
                        onChange={props.handleforminput}
                    />
                </div>
                <div className='mx-3'>
                    <CFormLabel>Idl</CFormLabel>
                    <CFormInput 
                        type="number"
                        name="ldl"
                        onChange={props.handleforminput}
                    />
                </div>
                <div className='mx-3'>
                    <CFormLabel>Gula Darah</CFormLabel>
                    <CFormInput 
                        type="number"
                        name="gula_darah"
                        onChange={props.handleforminput}
                    />
                </div>
                <div className='mx-3'>
                    <CFormLabel>Tekanan Darah</CFormLabel>
                    <CFormInput 
                        type="text"
                        name="tekanan_darah"
                        onChange={props.handleforminput}
                    />
                </div>
            </div>
        </>
    )
}

export default FormKesehatanPesertaDidik