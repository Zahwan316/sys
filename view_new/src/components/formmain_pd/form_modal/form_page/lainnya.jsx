import React, { useState, useEffect } from 'react';
import useRefStore from 'src/state/ref';
import useFormPesertaDidikStore from 'src/state/form/pesertadidik';
import { CFormLabel,CFormSelect,CFormInput } from '@coreui/react';
import axios from 'axios';

const LainnyaPesertaDidikForm = (props) => {
    const[alattransportasi,setalattransportasi] = useRefStore((state) => [state.alat_transportasi,state.setalattransportasi])
    const[jenis_tinggal,setjenis_tinggal] = useRefStore((state) => [state.jenis_tinggal,state.setjenis_tinggal])
    const[alasan_layak_pip,setalasan_layak_pip] = useRefStore((state) => [state.alasanlayakpip,state.setalasanlayakpip])
    const[forminput,setforminput] = useFormPesertaDidikStore((state) => [state,state.setform])

    const handleforminput = (e) => {
        setforminput(e.target.name,e.target.value )
    }

    useEffect(() => {
        const fetchData = async() => {
            try{
                if(Object.keys(alattransportasi).length === 0)
                {
                    let res = await axios.get(`${process.env.REACT_APP_LINK}alat_transportasi`)
                    setalattransportasi(res.data.data)
                }
                if(Object.keys(alasan_layak_pip).length === 0)
                {
                    let res = await axios.get(`${process.env.REACT_APP_LINK}alasan_layak_pip`)
                    setalasan_layak_pip(res.data.data)
                }
                if(Object.keys(jenis_tinggal).length === 0)
                {
                    let res = await axios.get(`${process.env.REACT_APP_LINK}jenis_tinggal`)
                    setjenis_tinggal(res.data.data)
                }
            }
            catch(e){

            }
        }
        fetchData()
    },[])

    useEffect(() => {
        console.log(forminput)
    })

    return(
        <>
            <div className='mb-2'>
                <h4>Lainnya</h4>
            </div>

            <div className='d-flex mb-3 flex-wrap'>
                <div className='mb-3'>
                    <CFormLabel>No KK</CFormLabel>
                    <CFormInput
                        type="text"
                        name='no_kk'
                        onChange={handleforminput}
                        value={forminput.no_kk}
                    />
                </div>  
                <div className='mx-3'>
                    <CFormLabel>NIK</CFormLabel>
                    <CFormInput
                        type="text"
                        name='nik'
                        onChange={handleforminput}
                        value={forminput.nik}
                    />
                </div>  
                
                <div className='mx-3'>
                    <CFormLabel>Reg Akta Lahir</CFormLabel>
                    <CFormInput
                        type="text"
                        name='reg_akta_lahir'
                        onChange={handleforminput}
                        value={forminput.reg_akta_lahir}
                        maxLength={30}
                    />
                </div>  
                <div className='mx-3'>
                    <CFormLabel>No KKS</CFormLabel>
                    <CFormInput
                        type="text"
                        name='no_kks'
                        onChange={handleforminput}
                        value={forminput.no_kks}
                        maxLength={6}
                    />
                </div>  
                <div className='mb-3'>
                    <CFormLabel>Anak Ke Berapa</CFormLabel>
                    <CFormInput
                        type="text"
                        name='anak_keberapa'
                        onChange={handleforminput}
                        value={forminput.anak_keberapa}
                    />
                </div>  
                <div className='mx-3'>
                    <CFormLabel>Jumlah Saudara Kandung</CFormLabel>
                    <CFormInput
                        type="text"
                        name='jumlah_saudara_kandung'
                        onChange={handleforminput}
                        value={forminput.jumlah_saudara_kandung}
                    />
                </div>  
                <div className='mx-3'>
                    <CFormLabel>Alat Transportasi</CFormLabel>
                    <CFormSelect
                        name='alat_transportasi_id'
                        onChange={handleforminput}
                        value={forminput.alat_transportasi_id}
                    >
                        <option>Pilih alat transportasi</option>
                        {
                            alattransportasi.map(item => 
                                <option value={item.alat_transportasi_id}>{item.nama}</option>
                            )
                        }
                    </CFormSelect>
                </div>  
                <div className='mb-3'>
                    <CFormLabel>Jenis Tinggal</CFormLabel>
                    <CFormSelect
                        name='jenis_tinggal'
                        onChange={handleforminput}
                        value={forminput.jenis_tinggal}
                    >
                        <option>Pilih jenis tinggal</option>
                        {
                            jenis_tinggal.map(item => 
                                <option value={item.jenis_tinggal_id}>{item.nama}</option>
                            )
                        }
                    </CFormSelect>
                </div>  
            </div>
            <div className='d-flex mb-3'>
                <div className='mb-3'>
                    <CFormLabel>Penerima KPS</CFormLabel>
                    <CFormSelect
                        onChange={handleforminput}
                        name='penerima_kps'
                        value={forminput.penerima_kps}
                    >
                        <option>Pilih </option>
                        <option value='1'>Iya </option>
                        <option value='0'>Tidak </option>
                        
                    </CFormSelect>
                </div>  
                <div className='mx-3'>
                    <CFormLabel>No KPS</CFormLabel>
                    <CFormInput
                        name='no_kps'
                        type="text"
                        onChange={handleforminput}
                        value={forminput.no_kps}
                        maxLength={25}
                    />
                </div>  
            </div>
            <div className='mb-3 d-flex'>
                <div className='mb-3'>
                    <CFormLabel>Penerima PIP</CFormLabel>
                    <CFormSelect
                        onChange={handleforminput}
                        name='penerima_pip'
                        value={forminput.penerima_pip}
                    >
                        <option>Pilih </option>
                        <option value='1'>Iya </option>
                        <option value='0'>Tidak </option>
                        
                    </CFormSelect>
                </div>  
                <div className='mx-3'>
                    <CFormLabel>Layak PIP</CFormLabel>
                    <CFormSelect
                        onChange={handleforminput}
                        name='layak_pip'
                        value={forminput.layak_pip}
                    >
                        <option>Pilih </option>
                        <option value='1'>Iya </option>
                        <option value='0'>Tidak </option>
                        
                    </CFormSelect>
                </div>  
                <div className='mb-3'>
                    <CFormLabel>Alasan Layak PIP</CFormLabel>
                    <CFormSelect 
                        name="alasan_layak_pip"
                        onChange={handleforminput}
                        value={forminput.alasan_layak_pip}
                    >
                        <option>Pilih </option>
                       {
                        alasan_layak_pip.map(item => 
                            <option value={item.id_layak_pip}>{item.alasan_layak_pip}</option>
                        )
                       }
                    </CFormSelect>
                </div>  
            </div>
            <div className='d-flex mb-3'>
                <div className='mx-3'>
                    <CFormLabel>Penerima KIP</CFormLabel>
                    <CFormSelect
                        onChange={handleforminput}
                        name='penerima_kip'
                        value={forminput.penerima_kip}
                    >
                        <option>Pilih </option>
                        <option value='1'>Iya </option>
                        <option value='0'>Tidak </option>
                        
                    </CFormSelect>
                </div>  
                <div className='mb-3'>
                    <CFormLabel>No KIP</CFormLabel>
                    <CFormInput
                        type="text"
                        name='no_kip'
                        onChange={handleforminput}
                        value={forminput.no_kip}
                        maxLength={6}
                    />
                </div>  
                <div className='mx-3'>
                    <CFormLabel>Nama Di KIP</CFormLabel>
                    <CFormSelect
                        onChange={handleforminput}
                        name='nama_di_kip'
                        value={forminput.nama_di_kip}
                    >
                        <option>Pilih </option>
                        <option value='1'>Terdaftar </option>
                        <option value='0'>Tidak </option>
                        
                    </CFormSelect>
                </div>  
            </div>
            <div className='mb-3'>
                <CFormLabel>Menjadi siswa mulai tanggal</CFormLabel>
                <CFormInput
                    type="date"
                    name='tmt'
                    onChange={handleforminput}
                    value={forminput.tmt}
                />
            </div>  
            <div className='mb-3'>
                <CFormLabel>NPSN Jenjang Sebelumnya</CFormLabel>
                <CFormInput
                    type="text"
                    name='npsn_jenjang_sebelumnya'
                    onChange={handleforminput}
                    value={forminput.npsn_jenjang_sebelumnya}
                    maxLength={12}
                />
            </div>  
        </>
    )
}

export default LainnyaPesertaDidikForm