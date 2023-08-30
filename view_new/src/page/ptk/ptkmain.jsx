import React, { useState, useEffect } from 'react';
import CardMain from 'src/components/card/card';
import { CButton,CFormCheck,CButtonGroup } from '@coreui/react';
import PtkBiodata from 'src/components/formmain_ptk/ptkbiodata';
import PtkKepegawaian from 'src/components/formmain_ptk/kepegawaian';

const PtkMainPage = () => {
    const[pageform,setpageform] = useState("identitas")

    const handlePageForm = (e) => {
        let code = e.target.getAttribute("code")
        setpageform(code)
    }

    useEffect(() => {
        console.log(pageform)
    })

    return(
        <>
           
            <CardMain
                title="Biodata Ptk"
                body={
                    <>
                        <CButtonGroup   CButtonGroup  role="group" aria-label="Basic checkbox toggle button group" className="p-3" style={{borderColor:"black"}}>
                            <CFormCheck
                                type="radio"
                                button={{ color: 'dark', variant: 'outline' }}
                                name="btnradio"
                                id="btnradio1"
                                autoComplete="off"
                                label="Identitas"
                                code="identitas"
                                defaultChecked={pageform == "identitas"}
                                onClick={handlePageForm}
                            />
                            <CFormCheck
                                type="radio"
                                button={{ color: 'dark', variant: 'outline' }}
                                name="btnradio"
                                id="btnradio2"
                                autoComplete="off"
                                label="Kepegawaian"
                                code="kepegawaian"
                                defaultChecked={pageform == "kepegawaian"}
                                onClick={handlePageForm}
                            />
                               
                        </CButtonGroup>

                        {
                            pageform === "identitas" &&
                            <PtkBiodata />
                        }
                        {
                            pageform === "kepegawaian" &&
                            <PtkKepegawaian />
                        }
                    </>
                }            
            />
        
        </>
    )
}

export default PtkMainPage; 