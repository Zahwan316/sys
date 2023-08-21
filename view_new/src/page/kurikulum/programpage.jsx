import React, { useState, useEffect } from 'react';

import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CForm,
    CFormInput,
    CFormLabel,
    CFormTextarea,
    CRow,
    CButtonGroup,
    CFormCheck,
    CFormSelect,
    
  } from '@coreui/react'
import JenisPage from 'src/components/formmain_kurikulum/program/jenis';
import ProgramForm from 'src/components/formmain_kurikulum/program/program';
import RombelPage from 'src/components/formmain_kurikulum/program/rombel';
import TugasPage from 'src/components/formmain_kurikulum/program/tugas';

const ProgramPage = () => {
    const[pageform,setpageform] = useState("jenis")

    const handlePageForm = (e) => {
        let code = e.target.getAttribute("code")
        setpageform(code)
    }


    return(
        <CCol>
            <CCard>
                <CCardHeader>
                    <strong>Program</strong>
                </CCardHeader>
                <CCardBody>
                    <CButtonGroup  role="group" aria-label="Basic checkbox toggle button group" className="p-3" style={{borderColor:"black"}}>
                            <CFormCheck
                                type="radio"
                                button={{ color: 'dark', variant: 'outline' }}
                                name="btnradio"
                                id="btnradio1"
                                autoComplete="off"
                                label="Jenis"
                                code="jenis"
                                defaultChecked={pageform == "jenis"}
                                onClick={handlePageForm}
                            />
                        
                            <CFormCheck
                                type="radio"
                                button={{ color: 'dark', variant: 'outline' }}
                                name="btnradio"
                                id="btnradio2"
                                autoComplete="off"
                                code="program"
                                label="Program"    
                                defaultChecked={pageform == "program"}  
                                onClick={handlePageForm}      
                            />

                           
                        </CButtonGroup>

                        {/* Form main */}

                        {
                            pageform === "jenis" &&
                            <JenisPage />
                        }

                        {
                            pageform === "program" && 
                            <ProgramForm />
                        }

                        


                        
                </CCardBody>
            </CCard>
        </CCol>
    )
}

export default ProgramPage;