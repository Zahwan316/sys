import React, { useState, useEffect } from 'react';
import useRefStore from 'src/state/ref';
import useFormPesertaDidikStore from 'src/state/form/pesertadidik';
import { CFormLabel,CFormSelect,CFormInput } from '@coreui/react';
import Select from "react-select"

const BiodataPesertaDidikForm = (props) => {
    const[agama,setagama] = useRefStore((state) => [state.agama,state.setagama])
    const[kewarganegaraan,setkewarganegaraan] = useRefStore((state) => [state.kewarganegaraan,state.setkewarganegaraan] ) 
    const[forminput,setforminput] = useFormPesertaDidikStore((state) => [state,state.setform])

    const handleforminput = (e) => {
        setforminput(e.target.name,e.target.value )
    }

    useEffect(() => {
        console.log(forminput)
    })

    return(
        <>
            <div className='mb-3'>
                <CFormLabel>
                    Nama
                </CFormLabel>
                <CFormInput 
                    name='nama'
                    type="text"
                    onChange={handleforminput}
                    value={forminput.nama}
                    required
                />
            </div>
                        {/* Form nipd dan nisn */}
            <div className='mb-3 d-flex '>
                <div>
                    <CFormLabel>
                        NIPD
                    </CFormLabel>
                    <CFormInput 
                        name='nipd'
                        type="text"
                        onChange={handleforminput}
                        value={forminput.nipd}
                        required
                    />
                </div>
                <div className='mx-3'>
                    <CFormLabel>
                        NISN
                    </CFormLabel>
                    <CFormInput 
                         name='nisn'
                         type="text"
                         onChange={handleforminput}
                         value={forminput.nisn}
                         required
                         />
                </div>
            </div>
                        {/* Form Jenis Kelamin */}
            <div className='mb-3'>
                <CFormLabel>
                    Jenis Kelamin
                </CFormLabel>
                <CFormSelect
                    name='jenis_kelamin'
                    onChange={handleforminput}
                    value={forminput.jenis_kelamin}
                    required
                >
                    <option>Pilih Jenis Kelamin</option>
                    <option value='L'>Laki Laki</option>
                    <option value="P">Perempuan</option>
                </CFormSelect>
            </div>
            {/* form TTL */}
            <div className='mb-3 d-flex'>
                <div>
                    <CFormLabel>
                        Tempat Lahir
                    </CFormLabel>
                    <CFormInput 
                        name='tempat_lahir'
                        type="text"
                        onChange={handleforminput}
                        value={forminput.tempat_lahir}
                        required
                    />
                </div>
                <div className='mx-3'>
                    <CFormLabel>
                        Tanggal Lahir
                    </CFormLabel>
                    <CFormInput 
                        name='tanggal_lahir'
                        type="date"
                        onChange={handleforminput}
                        value={forminput.tanggal_lahir}
                        required
                    />
                </div>
            </div>

            <div className='d-flex mb-3'>
                <div className=''>
                    <CFormLabel>
                        Agama
                    </CFormLabel>
                    <CFormSelect
                        name='agama_id'
                        onChange={handleforminput}
                        value={forminput.agama_id}
                        required
                    >
                        <option>Pilih Agama</option>
                        {
                            agama.map(item => 
                                <option value={item.agama_id}>{item.nama}</option>    
                            )
                        }
                    </CFormSelect>
                </div>
                <div className='mx-3'>
                    <CFormLabel>
                        Kewarganegaraan
                    </CFormLabel>
                    <CFormSelect
                        name="kewarganegaraan"
                        onChange={handleforminput}
                        value={forminput.kewarganegaraan}
                    >
                        <option>Pilih Kewarganegaraan</option>
                        {
                            kewarganegaraan.map(item => 
                                <option value={item.alpha_2}>{item.nama}</option>    
                            )
                        }
                    </CFormSelect>
                    
                </div>
            </div>

        </>
    )
}

export default BiodataPesertaDidikForm;