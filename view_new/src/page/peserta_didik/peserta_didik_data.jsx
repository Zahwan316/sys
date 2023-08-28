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
import DataPesertaDidikBantuan from 'src/components/formmain_pd/datapesertadidikbantuan';
import DataPesertaDidikAlamat from 'src/components/formmain_pd/datapesertadidikalamat';
import DataPersertaDidikKesehatan from 'src/components/formmain_pd/datapesertadidikkesehatan';
import PesertaDidikKontak from 'src/components/formmain_pd/datapesertadidikkontak';
import PesertaDidikRekening from 'src/components/formmain_pd/datapesertarekening';
import useStore from 'src/state';
import { useParams } from 'react-router-dom';

const Peserta_didik_data_page = () => {
    const[pageform,setpageform] = useState("biodata")
    
    const handlePageForm = (e) => {
        const code = e.target.getAttribute("code")
        setpageform(code)
    }

    const {id} = useParams()
    //const setnamasiswa = useStore((state) => state.setnamasiswa)
    //const namasiswa = useStore((state) => state.namasiswa)
    const datasiswa  = useStore((state) => state.pesertadidik)
    const namasiswaraw = datasiswa.filter(item => item.peserta_didik_id == id)
    let namasiswa = namasiswaraw.length > 0 ? namasiswaraw[0].nama : ""
    

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

                            <CFormCheck
                                type="radio"
                                button={{ color: 'dark', variant: 'outline' }}
                                name="btnradio"
                                id="btnradio4"
                                autoComplete="off"
                                code="alamat"
                                label="Alamat"    
                                defaultChecked={pageform == "alamat"}  
                                onClick={handlePageForm}      
                            />
                            <CFormCheck
                                type="radio"
                                button={{ color: 'dark', variant: 'outline' }}
                                name="btnradio"
                                id="btnradio5"
                                autoComplete="off"
                                code="kesehatan"
                                label="Kesehatan"    
                                defaultChecked={pageform == "kesehatan"}  
                                onClick={handlePageForm}      
                            />
                            <CFormCheck
                                type="radio"
                                button={{ color: 'dark', variant: 'outline' }}
                                name="btnradio"
                                id="btnradio6"
                                autoComplete="off"
                                code="kontak"
                                label="Kontak"    
                                defaultChecked={pageform == "kontak"}  
                                onClick={handlePageForm}      
                            />
                            <CFormCheck
                                type="radio"
                                button={{ color: 'dark', variant: 'outline' }}
                                name="btnradio"
                                id="btnradio7"
                                autoComplete="off"
                                code="rekening"
                                label="Rekening"    
                                defaultChecked={pageform == "rekening"}  
                                onClick={handlePageForm}      
                            />

                           
                        </CButtonGroup>

                        {
                            pageform === "biodata" &&
                            <DataPesertaDidikMain />

                        }
                        {
                            pageform === "keluarga" &&
                            <DataPesertaDidikKeluarga 
                                namasiswa={namasiswa}
                            />
                        }
                        {
                            pageform === "bantuan" &&
                            <DataPesertaDidikBantuan 
                             namasiswa={namasiswa}
                            />
                        }
                        {
                            pageform === "alamat" &&
                            <DataPesertaDidikAlamat 
                            namasiswa={namasiswa}
                            />
                        }
                        {
                            pageform === "kesehatan" &&
                            <DataPersertaDidikKesehatan 
                            namasiswa={namasiswa}
                            />
                        }
                        {
                            pageform === "kontak" && 
                            <PesertaDidikKontak
                            namasiswa={namasiswa}
                            />
                        }
                        {
                            pageform === "rekening" &&
                            <PesertaDidikRekening
                            namasiswa={namasiswa}
                            />
                        }
                    </>
                    
                }
            />
        </div>
    )
}

export default Peserta_didik_data_page