import { CFormCheck, CFormInput, CFormLabel, CFormSelect } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useFormStore from 'src/state/form/formmain';
import useRefStore from 'src/state/ref';

const ProgramStudiForm = () => {
 const [datapendidikan,setdatapendidikan] = useRefStore((state) => [state.pendidikan,state.setpendidikan])
 const [gelarakademik,setgelarakadeik] = useRefStore((state) => [state.gelar_akademik,state.setgelarakademik])
 const [programstudi,setprogramstudi] = useRefStore((state) => [state.program_studi,state.setprogramstudi])
 const [forminput,setforminput] = useFormStore((state) => [state.form,state.setform])
 const {id} = useParams()

 const handleforminput = (e) => {
    setforminput(e.target.name,e.target.value)
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
       <CFormLabel>NIM (Jika Kuliah)</CFormLabel>
       <CFormInput
        type="text"
        name="nim"
        onChange={handleforminput}
        value={forminput.nim}
       />
     </div>
     <div className='mb-3 d-flex'>
       <div className='mb-3'>
         <CFormLabel>Jenjang Pendidikan</CFormLabel>
         <CFormSelect
           name="jenjang_pendidikan_id"
           onChange={handleforminput}
           value={forminput.jenjang_pendidikan_id}
         >
            <option>Pilih</option>
            {
                datapendidikan.map((item,index) => 
                 <option key={index} value={item.jenjang_pendidikan_id}>{item.nama}</option>    
                )
            }
         </CFormSelect>
       </div>
       <div className='mx-3'>
         <CFormLabel>Program Studi</CFormLabel>
         <CFormSelect
           name="program_studi_id"
           onChange={handleforminput}
           value={forminput.program_studi_id}
         >
            <option>Pilih</option>
            {
                programstudi.map((item,index) => 
                 <option key={index} value={item.program_studi_id}>{item.nama}</option>    
                )
            }
         </CFormSelect>
       </div>
       <div className='mb-3'>
         <CFormLabel>Gelar Akademik</CFormLabel>
         <CFormSelect
            name="gelar_akademik_id"
            onChange={handleforminput}
            value={forminput.gelar_akademik_id}
         >
            <option>Pilih</option>
            {
                gelarakademik.map((item,index) => 
                 <option key={index} value={item.gelar_akademik_id}>{item.nama}</option>    
                )
            }
         </CFormSelect>
       </div>
     </div>
     <div className='mb-3 d-flex'>
      <div className='mb-3'>
       <CFormLabel>Satuan Pendidikan Formal</CFormLabel>
       <CFormInput
           type="text"
           name="satuan_pendidikan_formal"
           onChange={handleforminput}
           value={forminput.satuan_pendidikan_formal}
       />
      </div>
      <div className='mx-3'>
       <CFormLabel>Fakultas</CFormLabel>
       <CFormInput
           type="text"
           name="fakultas"
           onChange={handleforminput}
           value={forminput.fakultas}
       />
      </div>
     </div>
     <div className='mb-3'>
      <CFormLabel>Kependidikan</CFormLabel>
      <CFormInput
          type="number"
          name="kependidikan"
          onChange={handleforminput}
          value={forminput.kependidikan}
      />
     </div>
     <div className='mb-3 d-flex'>
      <div className='mb-3'>
       <CFormLabel>Tahun Masuk</CFormLabel>
       <CFormInput
           type="number"
           name="tahun_masuk"
           onChange={handleforminput}
           value={forminput.tahun_masuk}
       />
      </div>
      <div className='mx-3'>
       <CFormLabel>Tahun Lulus</CFormLabel>
       <CFormInput
           type="number"
           name="tahun_lulus"
           onChange={handleforminput}
           value={forminput.tahun_lulus}
       />
      </div>
     </div>
     <div className='mb-3 d-flex'>
      <div className='mb-3'>
       <CFormLabel>Status Kuliah</CFormLabel>
       <CFormSelect
        name="status_kuliah"
        onChange={handleforminput}
        value={forminput.status_kuliah}
       >
        <option>Pilih</option>
        <option value="0">Masih Kuliah</option>
        <option value="1">Sudah Lulus</option>
       </CFormSelect>
      </div>
      <div className='mx-3'>
       <CFormLabel>Semester</CFormLabel>
       <CFormInput
           type="number"
           name="semester"
           onChange={handleforminput}
           value={forminput.semester}
       />
      </div>
      <div className='mb-3'>
       <CFormLabel>IPK</CFormLabel>
       <CFormInput
           type="number"
           step="0.01"
           name="ipk"
           onChange={handleforminput}
           value={forminput.ipk}
       />
      </div>
     </div>
    </>
 )
}

export default ProgramStudiForm