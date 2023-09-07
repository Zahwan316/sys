import { CFormInput, CFormLabel, CFormSelect } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import useStore from 'src/state/pesertadidik';
import useRefStore from 'src/state/ref';

const FormAlamat = (props) => {
    const jenistinggal = useRefStore((state) => state.jenis_tinggal)

    return(
        <>
            <div className='mb-3'>
                <CFormLabel>Alamat Jalan</CFormLabel>
                <CFormInput 
                    type="text"
                    name="alamat_jalan"
                    onChange={props.handleforminput}
                    value={props.forminput.alamat_jalan}
                />
            </div>
            <div className='mb-3 d-flex'>
                <div className='mb-3'>
                    <CFormLabel>RT</CFormLabel>
                    <CFormInput 
                        type="number"
                        name="rt"
                        onChange={props.handleforminput}
                        value={props.forminput.rt}
                    />
                </div>
                <div className='mx-3'>
                    <CFormLabel>RW</CFormLabel>
                    <CFormInput 
                        type="number"
                        name="rw"
                        onChange={props.handleforminput}
                        value={props.forminput.rw}
                    />
                </div>
                
            </div>
            <div className='mb-3'>
                <CFormLabel>Nama Dusun</CFormLabel>
                <CFormInput 
                    type="text"
                    name="nama_dusun"
                    onChange={props.handleforminput}
                    value={props.forminput.nama_dusun}
                />
            </div>
            <div className='mb-3 d-flex'>
                <div className='mb-3'>
                    <CFormLabel>Kota</CFormLabel>
                    <CFormSelect
                        onChange={props.handlekodekota}
                    >
                        <option>Pilih Kota</option>
                        {
                            props.datakota.map(item =>
                                <option nama={item.nama} value={item.id_wilayah}>{item.nama}</option> 
                            )
                        }
                    </CFormSelect>
                </div>
                <div className='mx-3'>
                    <CFormLabel>Kecamatan</CFormLabel>
                    <CFormSelect
                        onChange={props.handlekodekecamatan}
                    >
                        <option>Pilih Kecamatan</option>
                        {
                            props.datakecamatan.map(item =>
                                <option nama={item.nama} value={item.id_wilayah}>{item.nama}</option>    
                            )
                        }
                    </CFormSelect>
                   
                </div>
                <div className='mx-3'>
                    <CFormLabel>Desa</CFormLabel>
                    <CFormSelect
                        onChange={props.handlekodedesa}
                        name="kode_wilayah"
                    >
                        <option>Pilih Data Desa</option>
                        {
                            props.datadesa.map(item =>
                                <option name={item.nama} value={item.id_wilayah}>{item.nama}</option>    
                            )
                        }
                    </CFormSelect>
                </div>
                
            </div>
            <div className='mb-3'>
                <CFormLabel>Kode Pos</CFormLabel>
                <CFormInput 
                    type="text"
                    name="kode_pos"
                    onChange={props.handleforminput}
                    value={props.forminput.kode_pos}
                />
            </div>
            <div className='mb-3'>
                <CFormLabel>Lintang</CFormLabel>
                <CFormInput 
                    type="text"
                    name="lintang"
                    value={props.forminput.lintang}
                />
            </div>
            <div className='mb-3'>
                <CFormLabel>Bujur</CFormLabel>
                <CFormInput 
                    type="text"
                    name="bujur"
                    value={props.forminput.bujur}
                />
            </div>
            <div className='d-flex'>
                <div className='mb-3'>
                    <CFormLabel>Jenis Tinggal</CFormLabel>
                    <CFormSelect
                        onChange={props.handleforminput}
                        name="jenis_tinggal_id"
                        value={props.forminput.jenis_tinggal_id}
                    >
                        <option>Pilih Jenis Tinggal</option>
                        {
                            jenistinggal.map(item => 
                                <option value={item.jenis_tinggal_id}>{item.nama}</option>    
                            )
                        }
                    </CFormSelect>
                    
                </div>
                <div className='mx-3'>
                    <CFormLabel>Jarak Ke Sekolah</CFormLabel>
                    <CFormInput 
                        type="number"
                        onChange={props.handleforminput}
                        name="jarak_ke_sekolah"
                        value={props.forminput.jarak_ke_sekolah}
                    />
                </div>
                <div className='mb-3'>
                    <CFormLabel>Terhitung Mulai Tanggal</CFormLabel>
                    <CFormInput 
                        type="date"
                        onChange={props.handleforminput}
                        name="tmt"
                        value={props.forminput.tmt}
                    />
                </div>

            </div>
            <div className='mb-3 d-flex'>
                <input
                    type='checkbox'
                    onClick={props.handlecheck}
                    onChange={props.handlecheck}
                    checked={props.forminput.keaktifan === 1}
                />
                <p className='mb-0 mx-1'>Masih aktif?</p>
            </div>
            
           
        </>
    )
}

export default FormAlamat