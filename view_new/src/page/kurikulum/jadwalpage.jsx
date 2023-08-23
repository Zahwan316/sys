import React, { useState, useEffect } from 'react';
import CardMain from 'src/components/card/card';
import JadwalPage from 'src/components/formmain_kurikulum/program/jadwal';
import { useNavigate, useParams } from 'react-router-dom';
import { CButton,CButtonGroup,CFormCheck, } from '@coreui/react';
import JadwalSpesifik from 'src/components/formmain_kurikulum/program/jadwalspesifik';

const JadwalMain = () => {
    const id = useParams()
    const {type} = useParams()
    const[pageform,setpageform] = useState(type == null ? "jadwalreguler" : 'jadwalspesifik')

    const handlePageForm = (e) => {
        let id = e.target.getAttribute("code")
        setpageform(id)
    }

    useEffect(() => {
        console.log(type)
    })

    return(
        <div>
            <CardMain
                body={
                    <>
                            <CButtonGroup  role="group" aria-label="Basic checkbox toggle button group" className="p-3" style={{borderColor:"black"}}>
                                <CFormCheck
                                    type="radio"
                                    button={{ color: 'dark', variant: 'outline' }}
                                    name="btnradio"
                                    id="btnradio1"
                                    autoComplete="off"
                                    label="Jadwal Reguler"
                                    code="jadwalreguler"
                                    defaultChecked={pageform == "jadwalreguler"}
                                    onClick={handlePageForm} 
                                />
                            
                                <CFormCheck
                                    type="radio"
                                    button={{ color: 'dark', variant: 'outline' }}
                                    name="btnradio"
                                    id="btnradio2"
                                    autoComplete="off"
                                    code="jadwalindustri"
                                    label="Jadwal Industri"    
                                    defaultChecked={pageform == "jadwalindustri"}  
                                    onClick={handlePageForm}       
                                />
                            </CButtonGroup>
                            
        
                        {
                            pageform === "jadwalreguler" &&
                            <JadwalPage
                                page="jadwalreguler"
                            />
                        }
                        {
                            pageform === "jadwalindustri" &&
                            <JadwalPage
                                page='jadwalindustri'
                            />
                        }

                        {
                            pageform === "jadwalspesifik" &&
                            <JadwalSpesifik
                                ptk_id={id}
                            /> 
                        }
                    
                    </>


                }
                title="Jadwal"
            />
        </div>
    )
}

export default JadwalMain