import React, { useState, useEffect } from 'react';
import { CFormLabel,CFormInput,CFormSelect, } from '@coreui/react';
import Select from "react-select"
import PesertaDidikFormPage from './pesertadidikformpage';
import KeluargaPesertaDidikForm from './form_page/keluarga';
import LainnyaPesertaDidikForm from './form_page/lainnya';
import BiodataPesertaDidikForm from './form_page/biodata';


const FormPesertaDidik = (props) => {
    

    return(
        <>
    
             {
                props.page === "pesertadidikbiodata" && props.typeform === "tambah" ?
                <PesertaDidikFormPage />       
                :
                ""                            
             }
             {
                props.page === "pesertadidikbiodata" && (props.typeform === "edit" || props.typeform === "detail") ?
                <BiodataPesertaDidikForm />
                :
                ""
             }

             {
                props.page === "pesertadidikkeluarga" &&              
                <KeluargaPesertaDidikForm />
                
             }

             {
                props.page === "pesertadidikbantuan" &&             
                <LainnyaPesertaDidikForm />    
             }
                            
        </>
    )
}

export default FormPesertaDidik