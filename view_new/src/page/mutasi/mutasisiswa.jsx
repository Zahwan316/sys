import React, { useState, useEffect } from 'react';
import CardMain from 'src/components/card/card';
import MutasiSiswaForm from 'src/components/formmain_mutasi/siswa';
import { CButton,CButtonGroup,CFormCheck } from '@coreui/react';

const MutasiSiswaMain = (props) => {
    const[pageform,setpageform] = useState("mutasisiswareguler")

    const handlePageForm = (e) => {
        let code = e.target.getAttribute("code")
        setpageform(code)
    }

    return(
        <CardMain 
            title="Mutasi Siswa"
            body={
                <>
                    <CButtonGroup  role="group" aria-label="Basic checkbox toggle button group" className="p-3" style={{borderColor:"black"}}>
                                <CFormCheck
                                    type="radio"
                                    button={{ color: 'dark', variant: 'outline' }}
                                    name="btnradio"
                                    id="btnradio1"
                                    autoComplete="off"
                                    label="Mutasi Siswa Reguler"
                                    code="mutasisiswareguler"
                                    defaultChecked={pageform == "mutasisiswareguler"}
                                    onClick={handlePageForm} 
                                />
                            
                                <CFormCheck
                                    type="radio"
                                    button={{ color: 'dark', variant: 'outline' }}
                                    name="btnradio"
                                    id="btnradio2"
                                    autoComplete="off"
                                    label="Mutasi Siswa Industri"    
                                    code="mutasisiswaindustri"
                                    defaultChecked={pageform == "mutasisiswaindustri"}  
                                    onClick={handlePageForm}       
                                />
                     </CButtonGroup>   
                     {
                        pageform === "mutasisiswareguler" &&
                        <MutasiSiswaForm 
                            page='siswareguler'
                        />
                     }
                     {
                        pageform === "mutasisiswaindustri" &&
                        <MutasiSiswaForm 
                            page='siswaindustri'
                        />
                     }
                </>
            }
        />
    )
}

export default MutasiSiswaMain;