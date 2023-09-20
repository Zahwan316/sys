import { CFormLabel,CFormInput, CFormSelect } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import useRefStore from 'src/state/ref';
import useFormPtkStore from 'src/state/form/ptkform';

const IdentitasForm = () => {
    const agama = useRefStore((state) => state.agama);
    const kewarganegaraan = useRefStore((state) => state.kewarganegaraan)
    const setdata = useFormPtkStore((state) => state.setform)
    const forminput = useFormPtkStore((state) => state)

    const handleforminput = (e) => {
        const{name,value} = e.target;
        setdata(name, value);
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
                    type="text"
                    required
                    name="nama"
                    onChange={handleforminput}
                    value={forminput.nama}
                />
            </div>
            <div className='mb-3 d-flex'>
                <div className='mb-3'>
                    <CFormLabel>
                        NIK
                    </CFormLabel>
                    <CFormInput 
                        type="number"
                        required 
                        name="nik"
                        onChange={handleforminput}
                        value={parseInt(forminput.nik)}
                    />
                </div>
                <div className='mx-3'>
                    <CFormLabel>
                        No KK
                    </CFormLabel>
                    <CFormInput 
                        type="number"
                        required 
                        name="no_kk"
                        onChange={handleforminput}
                        value={parseInt(forminput.no_kk)}
                    />
                </div>

            </div>
            <div className='mb-3'>
                <CFormLabel>
                    Jenis Kelamin
                </CFormLabel>
                <CFormSelect
                     name="jenis_kelamin"
                     onChange={handleforminput}
                     value={forminput.jenis_kelamin}
                >
                    <option>Pilih</option>
                    <option value="L">Laki-Laki</option>
                    <option value="P">Perempuan</option>
                </CFormSelect>
            </div>
            <div className='mb-3 d-flex'>
                <div className='mb-3'>
                    <CFormLabel>Tempat Lahir</CFormLabel>
                    <CFormInput 
                        type="text"
                        required
                        name="tempat_lahir"
                        onChange={handleforminput}
                        value={forminput.tempat_lahir}
                    />
                </div>
                <div className='mx-3'>
                    <CFormLabel>Tanggal Lahir</CFormLabel>
                    <CFormInput 
                        type="date"
                        required
                        name="tanggal_lahir"
                        onChange={handleforminput}
                        value={forminput.tanggal_lahir}
                    />
                </div>
            </div>
            <div className='mb-3'>
                <CFormLabel>Nama Ibu Kandung</CFormLabel>
                <CFormInput 
                    type="text"
                    required
                    name="nama_ibu_kandung"
                    onChange={handleforminput}
                    value={forminput.nama_ibu_kandung}
                />
            </div>
            <div className='mb-3 d-flex'>
                <div className='mb-3 w-50'>
                    <CFormLabel>Nama Wajib Pajak</CFormLabel>
                    <CFormInput 
                        type="text"
                        required
                        name="nm_wp"
                        onChange={handleforminput}
                        value={forminput.nm_wp}
                    />
                </div>
                <div className='mx-3 w-50'>
                    <CFormLabel>Nomor Pokok Wajib Pajak</CFormLabel>
                    <CFormInput 
                        type="text"
                        required
                        name="npwp"
                        onChange={handleforminput}
                        value={forminput.npwp}
                    />
                </div>

            </div>
            <div className='d-flex mb-4'>
                <div className='mb-3'>
                    <CFormLabel>Agama</CFormLabel>
                    <CFormSelect
                        required
                        name="agama_id"
                        onChange={handleforminput}
                        value={forminput.agama_id}
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
                <div className='mx-3'>
                    <CFormLabel>Kewarganegaraan</CFormLabel>
                    <CFormSelect
                        required
                        name="kewarganegaraan"
                        onChange={handleforminput}
                        value={forminput.kewarganegaraan}
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
                <div className='mb-3'>
                    <CFormLabel>
                        Status Perkawinan
                    </CFormLabel>
                    <CFormSelect
                        required
                        name="status_perkawinan"
                        onChange={handleforminput}
                        value={forminput.status_perkawinan}>
                            <option>Pilih</option>
                            <option value={0}>Belum Kawin</option>
                            <option value={1}>Kawin</option>
                            <option value={98}>Janda</option>
                            <option value={99}>Duda</option>
                    </CFormSelect>
                </div>

            </div>
        </>
    )
}

export default IdentitasForm;