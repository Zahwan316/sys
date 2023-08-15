import React, { useState, useEffect } from 'react';
import CardMain from 'src/components/card/card';
import DataPesertaDidikMain from 'src/components/formmain_pd/datapeserrtadidik';
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
import DataPesertaDidikKeluarga from 'src/components/formmain_pd/datapesertadidikkeluarga';

const Peserta_didik_data_page = () => {
    const[pageform,setpageform] = useState("biodata")
    
    const handlePageForm = (e) => {
        const code = e.target.getAttribute("code")
        setpageform(code)
    }

    useEffect(() => {
        console.log(pageform)
    })

    return(
        <div>
            <CardMain 
                title="Data Peserta Didik"
                body={
                    <>
                        <CButtonGroup   CButtonGroup  role="group" aria-label="Basic checkbox toggle button group" className="p-3" style={{borderColor:"black"}}>
                            <CFormCheck
                                type="radio"
                                button={{ color: 'dark', variant: 'outline' }}
                                name="btnradio"
                                id="btnradio1"
                                autoComplete="off"
                                label="Biodata"
                                code="biodata"
                                defaultChecked={pageform == "biodata"}
                                onClick={handlePageForm}
                            />
                        
                            <CFormCheck
                                type="radio"
                                button={{ color: 'dark', variant: 'outline' }}
                                name="btnradio"
                                id="btnradio2"
                                autoComplete="off"
                                code="keluarga"
                                label="Keluarga"    
                                defaultChecked={pageform == "keluarga"}  
                                onClick={handlePageForm}      
                            />

                            <CFormCheck
                                type="radio"
                                button={{ color: 'dark', variant: 'outline' }}
                                name="btnradio"
                                id="btnradio3"
                                autoComplete="off"
                                code="bantuan"
                                label="Bantuan"    
                                defaultChecked={pageform == "bantuan"}  
                                onClick={handlePageForm}      
                            />

                           
                        </CButtonGroup>

                        {
                            pageform === "biodata" &&
                            <DataPesertaDidikMain />

                        }
                        {
                            pageform === "keluarga" &&
                            <DataPesertaDidikKeluarga />
                        }
                    </>
                    
                }
            />
        </div>
    )
}

export default Peserta_didik_data_page