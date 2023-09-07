import React, { useState, useEffect } from 'react';
import useRefStore from 'src/state/ref';
import useFormPesertaDidikStore from 'src/state/form/pesertadidik';
import { CFormLabel,CFormSelect,CFormInput } from '@coreui/react';
import axios from 'axios';

const KeluargaPesertaDidikForm = () => {
    const[datapendidikan,setdatapendidikan] = useRefStore((state) => [state.pendidikan,state.setdatapendidikan])
    const[datapekerjaan,setdatapekerjaan] = useRefStore((state) => [state.pekerjaan,state.setdatapekerjaan])
    const[forminput,setforminput] = useFormPesertaDidikStore((state) => [state,state.setform])

    const handleforminput = (e) => {
        setforminput(e.target.name,e.target.value )
    }

    useEffect(() => {
        const fetchdata = async() => {
            try{
                if(Object.keys(datapendidikan).length === 0){
                    let res = await axios.get(`${process.env.REACT_APP_LINK}jenjang_pendidikan`)
                    setdatapendidikan(res.data.data)
                }
            }
            catch(e){

            }
        }
        fetchdata()
    },[])

    useEffect(() => {
        console.log(forminput)
    })

    return(
        <>
            <div className='mb-2'>
                <h4>Keluarga</h4>
             </div>

                <div className='mb-3'>
                    <CFormLabel>Nama Ayah</CFormLabel>
                    <CFormInput
                        name='nama_ayah'
                        type="text"
                        onChange={handleforminput}
                        value={forminput.nama_ayah}
                    />
                </div>
                <div className='mb-3 d-flex'>
                    <div className='mb-3'>
                        <CFormLabel>Pendidikan Ayah</CFormLabel>
                        <CFormSelect
                            name='pendidikan_ayah_id'
                            onChange={handleforminput}
                            value={forminput.pendidikan_ayah_id}
                        >
                            <option>Pilih pendidikan ayah</option>
                            {
                                datapendidikan.map(item => 
                                    <option value={item.jenjang_pendidikan_id}>{item.nama}</option>    
                                )
                            }
                        </CFormSelect>
                    </div>
                    <div className='mx-3'>
                        <CFormLabel>Pekerjaan Ayah</CFormLabel>
                        <CFormSelect
                            name='pekerjaan_ayah_id'
                            onChange={handleforminput}
                            value={forminput.pekerjaan_ayah_id}
                        >
                            <option>Pilih Pekerjaan ayah</option>
                            {
                                datapekerjaan.map(item => 
                                    <option value={item.pekerjaan_id}>{item.nama}</option>    
                                )
                            }
                        </CFormSelect>
                    </div>
                    <div className='mb-3'>
                        <CFormLabel>Tanggal Lahir Ayah</CFormLabel>
                        <CFormInput
                            name='tanggal_lahir_ayah'
                            type="date"
                            onChange={handleforminput}
                            value={forminput.tanggal_lahir_ayah}
                        />
                    </div>
                </div>

                <div className='mb-3'>
                    <CFormLabel>Nama Ibu</CFormLabel>
                    <CFormInput
                        name='nama_ibu_kandung'
                        type="text"
                        onChange={handleforminput}
                        value={forminput.nama_ibu_kandung}
                    />
                </div>
                <div className='mb-3 d-flex'>
                    <div className='mb-3'>
                        <CFormLabel>Pendidikan Ibu</CFormLabel>
                        <CFormSelect
                            name='pendidikan_ibu_id'
                            onChange={handleforminput}
                            value={forminput.pendidikan_ibu_id}
                        >
                            <option>Pilih pendidikan ibu</option>
                            {
                                datapendidikan.map(item => 
                                    <option value={item.jenjang_pendidikan_id}>{item.nama}</option>    
                                )
                            }
                        </CFormSelect>
                    </div>
                    <div className='mx-3'>
                        <CFormLabel>Pekerjaan Ibu</CFormLabel>
                        <CFormSelect
                            name='pekerjaan_ibu_id'
                            onChange={handleforminput}
                            value={forminput.pekerjaan_ibu_id}
                        >
                            <option>Pilih Pekerjaan ibu</option>
                            {
                                datapekerjaan.map(item => 
                                    <option value={item.pekerjaan_id}>{item.nama}</option>    
                                )
                            }
                        </CFormSelect>
                    </div>
                    <div className='mb-3'>
                        <CFormLabel>Tanggal Lahir Ibu</CFormLabel>
                        <CFormInput
                            name='tanggal_lahir_ibu'
                            type="date"
                            onChange={handleforminput}
                            value={forminput.tanggal_lahir_ibu}
                        />
                    </div>
                </div>

                <div className='mb-3'>
                    <CFormLabel>Nama Wali</CFormLabel>
                    <CFormInput
                        name='nama_wali'
                        type="text"
                        onChange={handleforminput}
                        value={forminput.nama_wali}
                    />
                </div>
                <div className='mb-3 d-flex'>
                    <div className='mb-3'>
                        <CFormLabel>Pendidikan Wali</CFormLabel>
                        <CFormSelect
                            name='pendidikan_wali_id'
                            onChange={handleforminput}
                            value={forminput.pendidikan_wali_id}
                        >
                            <option>Pilih pendidikan wali</option>
                            {
                                datapendidikan.map(item => 
                                    <option value={item.jenjang_pendidikan_id}>{item.nama}</option>    
                                )
                            }
                        </CFormSelect>
                    </div>
                    <div className='mx-3'>
                        <CFormLabel>Pekerjaan Wali</CFormLabel>
                        <CFormSelect
                            name='pekerjaan_wali_id'
                            onChange={handleforminput}
                            value={forminput.pekerjaan_wali_id}
                        >
                            <option>Pilih Pekerjaan wali</option>
                            {
                                datapekerjaan.map(item => 
                                    <option value={item.pekerjaan_id}>{item.nama}</option>    
                                )
                            }
                        </CFormSelect>
                    </div>
                    <div className='mb-3'>
                        <CFormLabel>Tanggal Lahir Wali</CFormLabel>
                        <CFormInput
                            type="date"
                            name='tanggal_lahir_wali'
                            onChange={handleforminput}
                            value={forminput.tanggal_lahir_wali}
                        />
                    </div>
                </div>
        </>
    )
}

export default KeluargaPesertaDidikForm;