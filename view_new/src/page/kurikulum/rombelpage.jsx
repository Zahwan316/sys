import React, { useState, useEffect } from 'react';
import RombelPage from 'src/components/formmain_kurikulum/program/rombel';
import CardMain from 'src/components/card/card';
import { CButtonGroup,CFormCheck, } from '@coreui/react';
import RombelIndustri from 'src/components/formmain_kurikulum/program/rombelindustri';


const RombelMain = () => {
    const[pageform,setpageform] = useState("rombelreguler")

    const handlePageForm = (e) => {
        let code= e.target.getAttribute("code")
        setpageform(code)
    }

    return(
        <>
        
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
                                label="Rombel Reguler"
                                code="rombelreguler"
                                defaultChecked={pageform == "rombelreguler"}
                                onClick={handlePageForm}
                            />
                        
                            <CFormCheck
                                type="radio"
                                button={{ color: 'dark', variant: 'outline' }}
                                name="btnradio"
                                id="btnradio2"
                                autoComplete="off"
                                code="rombelindustri"
                                label="Rombel Industri"    
                                defaultChecked={pageform == "rombelindustri"}  
                                onClick={handlePageForm}      
                            />

                           
                    </CButtonGroup>

                    {
                        pageform === "rombelreguler" &&
                        <RombelPage
                            page='rombelreguler'
                        />
                    }

                    {
                        pageform === "rombelindustri" &&
                        <RombelPage
                            page='rombelindustri'
                        />
                    }

                </>
            }
            title="Rombongan Belajar"
            />
        </>
    )
}

export default RombelMain