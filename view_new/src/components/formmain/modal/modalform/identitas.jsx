import { CButton, CFormInput, CFormLabel, CFormSelect } from '@coreui/react';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import useRefStore from 'src/state/ref';
import IdentitasFormPage1 from './identitas/identitaspage1';
import IdentitasFormPage2 from './identitas/identitaspage2';


const IdentitasModalForm = () => {
 const[page,setpage] = useState(1)
 const[maxpage,setmaxpage] = useState(2)

 const handlenextpage = () => {
  setpage((prev) => prev + 1 )
 }
 const handleprevpage = () => {
  setpage((prev) => prev - 1 )
 }
 return(
  <>
   {
    page === 1 &&
     <>
      <IdentitasFormPage1 />
      <CButton onClick={handlenextpage}>
       Selanjutnya
      </CButton>
     </>
   }
   {
    page === 2 &&
    <>
     <IdentitasFormPage2 />
     <CButton onClick={handleprevpage}>
       Sebelumnya
      </CButton>
    </>
     
   }

   
  </>
 )
}

export default IdentitasModalForm