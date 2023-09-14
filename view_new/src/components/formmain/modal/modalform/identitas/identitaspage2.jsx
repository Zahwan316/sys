import React, { useState, useEffect } from 'react';
import { CButton, CFormCheck, CFormInput, CFormLabel, CFormSelect } from '@coreui/react';
import useFormStore from 'src/state/form/formmain';

const IdentitasFormPage2 = () => {
 const[forminput,setforminput] = useFormStore((state) => [state.form,state.setform])
 const[check,setcheck] = useState(false)

const handleForm = (e) => {
 const{name,value} = e.target  
 setforminput(name,value)    
}

const handlecheck = () => {
 setcheck(!check)
 let value = check ? 0 : 1
 setforminput("keaktifan",value)
}

useEffect(() => {
 setforminput("keaktifan",0)
},[])

useEffect(() => {
 console.log(forminput)
})


 return(
    <>
       {/* No Telepon */}
       <div className="mb-3">
           <CFormLabel htmlFor="exampleFormControlInput1">Nomor Telepon</CFormLabel>
           <CFormInput
             type="Number"
             id="exampleFormControlInput1"
             placeholder="087.."
             name="nomor_telepon"
             onChange={handleForm} 
             required
           />
         </div>
           {/* End */}
         {/* Email */}
         <div className="mb-3">
           <CFormLabel htmlFor="exampleFormControlInput1">Email</CFormLabel>
           <CFormInput
             type="email"
             id="exampleFormControlInput1"
             placeholder="name@example.com"
             name="email"
             onChange={handleForm} 
             required
           />
         </div>
         {/* End */}
         {/* Instagram */}
         <div className="mb-3">
           <CFormLabel htmlFor="exampleFormControlInput1">Instagram</CFormLabel>
           <CFormInput
             type="text"
             id="exampleFormControlInput1"
             placeholder="user..."
             name="instagram"
             onChange={handleForm} 
           />
         </div>
         {/* End */}
         {/* Facebook */}
         <div className="mb-3">
           <CFormLabel htmlFor="exampleFormControlInput1">Facebook</CFormLabel>
           <CFormInput
             type="text"
             id="exampleFormControlInput1"
             placeholder="user..."
             name="facebook"
             onChange={handleForm} 
           />
         </div>
         {/* End */}
         {/* Website */}
         <div className="mb-3">
           <CFormLabel htmlFor="exampleFormControlInput1">Website</CFormLabel>
           <CFormInput
             type="text"
             id="exampleFormControlInput1"
             placeholder="xyz.com"
             name="website"
             onChange={handleForm} 
           />
         </div>
         {/* End */}
        
         {/* tmt */}
         <div className="mb-3">
           <CFormLabel htmlFor="exampleFormControlInput1">TMT</CFormLabel>
           <CFormInput
             type="date"
             id="exampleFormControlInput1"
             placeholder="name@example.com"
             name="tmt"
             onChange={handleForm} 
           />
         </div>
         {/* end */}

         <div className='mb-3 d-flex'>
          <CFormCheck 
           onClick={handlecheck}
           onChange={handlecheck}
           checked={forminput.keaktifan === 1}
          />
          <p className='mx-2'>Sekolah masih aktif?</p>
         </div>
    </>
 )
}

export default IdentitasFormPage2