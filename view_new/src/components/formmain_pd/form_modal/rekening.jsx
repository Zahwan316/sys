import { CFormInput, CFormLabel, CFormSelect } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import Select from "react-select"
import useStore from 'src/state';

const FormRekeningPesertaDidik = (props) => {
    const bank = useStore((state) => state.namabank)

    return(
        <>
            <div className='mb-3'>
                <CFormLabel>Nama Bank</CFormLabel>
                <CFormSelect
                    name='id_bank'
                    onChange={props.handleforminput}
                    value={props.forminput.id_bank.trim()}
                >
                    <option>Pilih Bank</option>
                    {
                        bank.map(item => 
                            <option value={item.id_bank}>{item.nm_bank}</option>    
                        )
                    }
                </CFormSelect>    
            </div>
            <div className='mb-3'>
                <CFormLabel>Nomor Rekening</CFormLabel>
                <CFormInput
                    type="number"
                    name="no_rekening"
                    onChange={props.handleforminput}
                    value={props.forminput.no_rekening}
                />
            </div>
            <div className='mb-3'>
                <CFormLabel>Rekening Atas Nama</CFormLabel>
                <CFormInput
                    type="text"
                    name="rekening_atas_nama"
                    onChange={props.handleforminput}
                    value={props.forminput.rekening_atas_nama}
                />
            </div>
           
        </>
    )
}

export default FormRekeningPesertaDidik