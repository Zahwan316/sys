import React, { useState, useEffect } from 'react';
import CardMain from 'src/components/card/card';
import MapelForm from 'src/components/formmain_kurikulum/program/mapelnasional';
import { CButton,CButtonGroup,CCard,CCardBody,CCardHeader,CCol,CFormCheck } from '@coreui/react';
import MapelIndustri from 'src/components/formmain_kurikulum/program/mapelindustri';

const MapelPage = () => {
    const[pageform,setpageform] = useState("mapelnasional")

    const handlePageForm = (e) => {
        let code = e.target.getAttribute("code")
        setpageform(code)
    }

    return(
        <>
           <CCol>
                <CCard>
                    <CCardHeader>
                        <strong>Mata Pelajaran</strong>
                    </CCardHeader>
                    <CCardBody>
                            <CButtonGroup  role="group" aria-label="Basic checkbox toggle button group" className="p-3" style={{borderColor:"black"}}>
                                <CFormCheck
                                    type="radio"
                                    button={{ color: 'dark', variant: 'outline' }}
                                    name="btnradio"
                                    id="btnradio1"
                                    autoComplete="off"
                                    label="Mapel Nasional"
                                    code="mapelnasional"
                                    defaultChecked={pageform == "mapelnasional"}
                                    onClick={handlePageForm} 
                                />
                            
                                <CFormCheck
                                    type="radio"
                                    button={{ color: 'dark', variant: 'outline' }}
                                    name="btnradio"
                                    id="btnradio2"
                                    autoComplete="off"
                                    code="mapelindustri"
                                    label="Mapel Industri"    
                                    defaultChecked={pageform == "mapelindustri"}  
                                    onClick={handlePageForm}       
                                />
                            </CButtonGroup>
                                {
                                    pageform === "mapelnasional" &&
                                    <MapelForm />

                                }

                                {
                                    pageform === "mapelindustri" &&
                                    <MapelIndustri />
                                }


                            
                    </CCardBody>
                </CCard>
           </CCol>

         </>
    )
}

export default MapelPage