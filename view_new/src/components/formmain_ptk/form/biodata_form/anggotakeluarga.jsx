import { CFormInput, CFormLabel, CFormSelect } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useFormStore from 'src/state/form/formmain';
import useRefStore from 'src/state/ref';

const AnggotaKeluargaForm = (props) => {
 const datapekerjaan = useRefStore((state) => state.pekerjaan)
 const hubungan_keluarga = useRefStore((state) => state.hubungan_keluarga)
 const [forminput,setforminput] = useFormStore((state) => [state.form,state.setform])
 const {id} = useParams()

 const handleforminput = (e) => {
    const{name,value} = e.target
    setforminput(name,value)
 }

 useEffect(() => {
    setforminput("ptk_id",id)
 },[])

 useEffect(() => {
    console.log(forminput)
 })

 return(
    <>
     <div className='mb-3'>
        <CFormLabel>Nama</CFormLabel>
        <CFormInput
         type="text"
         name="nama"
         onChange={handleforminput}
         value={forminput.nama}
         required
        />
     </div>
     <div className='mb-3'>
        <CFormLabel>Jenis Kelamin</CFormLabel>
        <CFormSelect
            name="jenis_kelamin"
            onChange={handleforminput}
            value={forminput.jenis_kelamin}
        >
            <option>Pilih Jenis Kelamin</option>
            <option value="L">Laki Laki</option>
            <option value="P">Perempuan</option>
        </CFormSelect>
     </div>
     <div className='d-flex mb-3'>
      <div className='mb-3'>
         <CFormLabel>Tempat Lahir</CFormLabel>
         <CFormInput
          type="text"
          name="tempat_lahir"
          onChange={handleforminput}
          value={forminput.tempat_lahir}
         />
      </div>
      <div className='mx-3'>
         <CFormLabel>Tanggal Lahir</CFormLabel>
         <CFormInput
          type="date"
          value={forminput.tanggal_lahir}
          name="tanggal_lahir"
          onChange={handleforminput}
         />
      </div>
     </div>
     <div className='d-flex mb-3'>
      <div className='mb-3'>
         <CFormLabel>Hubungan Keluarga</CFormLabel>
         <CFormSelect
          name="hubungan_keluarga_kode"
          onChange={handleforminput}
          value={forminput.hubungan_keluarga_kode}
         >
             <option>Pilih Hubungan</option>
             {
                hubungan_keluarga.map(item => 
                    <option value={item.hubungan_keluarga_id}>{item.nama}</option>    
                )
             }
         </CFormSelect>
      </div>
      <div className='mx-3'>
        <CFormLabel>Pekerjaan</CFormLabel>
        <CFormSelect
           name="pekerjaan_id"
           onChange={handleforminput}
           value={forminput.pekerjaan_id}
        >
            <option>Pilih Pekerjaan</option>
           {
            datapekerjaan.map(item => 
                <option value={item.pekerjaan_id}>{item.nama}</option>    
            )
           }
        </CFormSelect>
     </div>
     </div>
    </>
 )
}

export default AnggotaKeluargaForm