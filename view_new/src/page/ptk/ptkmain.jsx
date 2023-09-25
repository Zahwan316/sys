import React, { useState, useEffect } from 'react';
import CardMain from 'src/components/card/card';
import { CButton,CFormCheck,CButtonGroup } from '@coreui/react';
import PtkBiodata from 'src/components/formmain_ptk/ptkbiodata';
import PtkKepegawaian from 'src/components/formmain_ptk/kepegawaian';
import PtkKontak from 'src/components/formmain_ptk/kontak';
import PtkKompetensi from 'src/components/formmain_ptk/kopentensi';
import { useParams } from 'react-router-dom';
import usePtkStore from 'src/state/ptk';
import PtkAlamatPage from 'src/components/formmain_ptk/alamat';
import PtkProgramStudi from 'src/components/formmain_ptk/program_studi';
import PtkAnggotaKeluarga from 'src/components/formmain_ptk/anggota_keluarga';

const PtkMainPage = () => {
    const[pageform,setpageform] = useState("identitas")
    const ptk = usePtkStore((state) => state.ptk)
    const{id} = useParams()

    const handlePageForm = (e) => {
        let code = e.target.getAttribute("code")
        setpageform(code)
    }

    const findPtkName = ptk.filter(item => item.ptk_id === id)
    const ptkName = findPtkName.length > 0 ? findPtkName[0].nama: "Pilih Ptk Terlebih Dahulu"

    useEffect(() => {
        console.log(ptkName)
    })

    return(
        <>
           
            <CardMain
                title="Data Ptk"
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
                            <CFormCheck
                                type="radio"
                                button={{ color: 'dark', variant: 'outline' }}
                                name="btnradio"
                                id="btnradio3"
                                autoComplete="off"
                                label="Kontak"
                                code="kontak"
                                defaultChecked={pageform == "kontak"}
                                onClick={handlePageForm}
                            />
                            <CFormCheck
                                type="radio"
                                button={{ color: 'dark', variant: 'outline' }}
                                name="btnradio"
                                id="btnradio4   "
                                autoComplete="off"
                                label="Kompetensi Khusus"
                                code="kompetensi"
                                defaultChecked={pageform == "kompetensi"}
                                onClick={handlePageForm}
                            />
                            <CFormCheck
                                type="radio"
                                button={{ color: 'dark', variant: 'outline' }}
                                name="btnradio"
                                id="btnradio5   "
                                autoComplete="off"
                                label="Alamat"
                                code="alamat"
                                defaultChecked={pageform == "alamat"}
                                onClick={handlePageForm}
                            />
                            <CFormCheck
                                type="radio"
                                button={{ color: 'dark', variant: 'outline' }}
                                name="btnradio"
                                id="btnradio6   "
                                autoComplete="off"
                                label="Pendidikan"
                                code="programstudi"
                                defaultChecked={pageform == "programstudi"}
                                onClick={handlePageForm}
                            />
                            <CFormCheck
                                type="radio"
                                button={{ color: 'dark', variant: 'outline' }}
                                name="btnradio"
                                id="btnradio7   "
                                autoComplete="off"
                                label="Anggota Keluarga"
                                code="anggotakeluarga"
                                defaultChecked={pageform == "anggotakeluarga"}
                                onClick={handlePageForm}
                            />
                               
                        </CButtonGroup>

                        {
                            pageform === "identitas" &&
                            <PtkBiodata
                                namaptk={ptkName}
                            />
                        }
                        {
                            pageform === "kepegawaian" &&
                            <PtkKepegawaian 
                                namaptk={ptkName}
                            />
                        }
                        {
                            pageform == "kontak" &&
                            <PtkKontak
                                namaptk={ptkName}
                            />
                        }
                        {
                            pageform == "kompetensi" &&
                            <PtkKompetensi 
                                namaptk={ptkName}
                            />
                        }
                        {
                            pageform === "alamat" &&
                            <PtkAlamatPage 
                                namaptk={ptkName}
                            />
                        }
                        {
                            pageform === "programstudi" &&
                            <PtkProgramStudi 
                             namaptk={ptkName}
                            />
                        }
                        {
                            pageform === "anggotakeluarga" &&
                            <PtkAnggotaKeluarga 
                             namaptk={ptkName}
                            />
                        }
                    </>
                }            
            />
        
        </>
    )
}

export default PtkMainPage; 