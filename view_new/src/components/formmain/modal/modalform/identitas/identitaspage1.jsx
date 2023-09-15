import React, { useState, useEffect } from 'react';
import { CButton, CFormInput, CFormLabel, CFormSelect } from '@coreui/react';
import axios from 'axios';
import useRefStore from 'src/state/ref';
import useFormStore from 'src/state/form/formmain';

const IdentitasFormPage1 = () => {
 const[waktupenyelenggaraan,setwaktupenyelengaraan] = useRefStore((state) => [state.waktu_penyelenggaraan,state.setwaktupenyelenggaraan])
 const[status_sekolah,setstatussekolah] = useRefStore((state) => [state.status_sekolah,state.setstatussekolah])
 const[bentuk_pendidikan,setbentukpendidikan] = useRefStore((state) => [state.bentuk_pendidikan,state.setbentukpendidikan])
 const[forminput,setforminput] = useFormStore((state) => [state.form,state.setform])

 useEffect(() => {
     const fetchdata = async() => {
      try{
        if(Object.keys(waktupenyelenggaraan).length === 0)
        {
           let res = await axios.get(`${process.env.REACT_APP_LINK}waktu_penyelenggaraan`)
           setwaktupenyelengaraan(res.data.data)
        }
        if(Object.keys(status_sekolah).length === 0)
        {
           let res = await axios.get(`${process.env.REACT_APP_LINK}status_sekolah`)
           setstatussekolah(res.data.data)
        }
        if(Object.keys(bentuk_pendidikan).length === 0)
        {
           let res = await axios.get(`${process.env.REACT_APP_LINK}bentuk_pendidikan`)
           setbentukpendidikan(res.data.data)
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
 
 const handleForm = (e) => {
  const{name,value} = e.target  
  setforminput(name,value)    
 }


    return(
       <>
        {/* Npsn */}
        <div className="mb-3">
           <CFormLabel htmlFor="exampleFormControlInput1">Npsn</CFormLabel>
           <CFormInput
             type="text"
             id="exampleFormControlInput1"
             placeholder="20...."
             name="npsn"
             onChange={handleForm}
             required
             value={forminput.npsn}
           />
         </div>
         {/* End Npsn */}
         {/* Nama */}
         <div className="mb-3">
           <CFormLabel htmlFor="exampleFormControlInput1">Nama</CFormLabel>
           <CFormInput
             type="text"
             id="exampleFormControlInput1"
             placeholder="SMKN 1 Sumedang"
             name="nama"
             onChange={handleForm}
             required
             value={forminput.nama}
           />
         </div>
         {/* End nama */}
         {/* Bentuk Pendidikan */}
         <div className="mb-3">
           <CFormLabel htmlFor="exampleFormControlInput1">Bentuk Pendidikan</CFormLabel>
           <CFormSelect 
             name="bentuk_pendidikan_id"
             required
             onChange={handleForm} 
             value={forminput.bentuk_pendidikan_id}
           >
             <option>Pilih Bentuk Pendidikan</option> 
               {
                 bentuk_pendidikan.map((data,index) => 
                   <option key={index} id={data.bentuk_pendidikan_id} value={data.bentuk_pendidikan_id}>{data.nama}</option> 
                 )
               }
           </CFormSelect>  
         </div>
         {/* end */}
         {/* status */}
         <div className="mb-3">
           <CFormLabel htmlFor="exampleFormControlInput1">Status Sekolah</CFormLabel>
           <CFormSelect
             name="status_sekolah"
             onChange={handleForm} 
             required
             value={forminput.status_sekolah}
           >
           <option>Pilih Status Sekolah</option> 
             {
               status_sekolah.map((data,index) => 
                 <option key={index} id={data.waktu_penyelenggaraan_id} value={data.status_sekolah}>{data.deskripsi}</option>  
               )
             }
           </CFormSelect>  
         </div>
         {/* end status */}
         {/* bentuk pendidikan */}
         <div className="mb-3">
           <CFormLabel htmlFor="exampleFormControlInput1">Waktu Kbm</CFormLabel>
           <CFormSelect
             name="waktu_pbm_id"
             onChange={handleForm} 
             required
             value={forminput.waktu_pbm_id}
           >
           <option>Pilih Waktu Kbm</option> 
             {
               waktupenyelenggaraan.map((data,index) => 
                 <option key={index} id={data.waktu_penyelenggaraan_id} value={data.waktu_penyelenggaraan_id}>{data.nama}</option>  
               )
             }
           </CFormSelect>  
         </div>
         {/* end */}
         {/* SK Pendirian Sekolah */}
         <div className="mb-3">
           <CFormLabel htmlFor="exampleFormControlInput1">SK Pendirian Sekolah </CFormLabel>
           <CFormInput
             type="text"
             id="exampleFormControlInput1"
             placeholder="392/102.8h/MN/2000"
             name="sk_pendirian_sekolah"
             onChange={handleForm} 
             required
             value={forminput.sk_pendirian_sekolah}
           />
         </div>
         {/* End */}
         {/* Tanggal Pendirian */}
         <div className="mb-3">
           <CFormLabel htmlFor="exampleFormControlInput1">Tanggal SK Pendirian</CFormLabel>
           <CFormInput
             type="date"
             id="exampleFormControlInput1"
             placeholder="20-3-1995"
             name="tanggal_sk_pendirian"
             onChange={handleForm} 
             required
             value={forminput.tanggal_sk_pendirian}
           />
         </div>
         {/* end */}
         {/* mbskode */}
           <div className="mb-3">
             <CFormLabel htmlFor="exampleFormControlInput1">MBS Kode</CFormLabel>
             <CFormInput
               type="number"
               id="exampleFormControlInput1"
               placeholder="987"
               name="mbs_kode"
               onChange={handleForm} 
               value={forminput.mbs_kode}
             />
           </div>
         {/* end */}
         {/* NPWP */}
         <div className='mb-3 d-flex'>
          <div className="mb-3">
            <CFormLabel htmlFor="exampleFormControlInput1">NPWP</CFormLabel>
            <CFormInput
              type="text"
              id="exampleFormControlInput1"
              placeholder="00543543858"
              name="npwp"
              onChange={handleForm} 
              required
              value={forminput.npwp}
            />
          </div>
          {/* End NPWP */}
          {/* NMWP */}
          <div className="mx-3">
            <CFormLabel htmlFor="exampleFormControlInput1">NM WP</CFormLabel>
            <CFormInput
              type="text"
              id="exampleFormControlInput1"
              placeholder="NM WP"
              name="nm_wp"
              onChange={handleForm} 
              required
              value={forminput.nm_wp}
            />
          </div>
          {/* End */}
         </div>
        
         
       </>
    )
}
export default IdentitasFormPage1