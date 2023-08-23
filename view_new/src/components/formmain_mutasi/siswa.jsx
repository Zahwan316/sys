import React, { useState, useEffect } from 'react';
import MainDropdownSiswa from './mainDropdownSiswa';
import { CButton } from '@coreui/react';

const MutasiSiswaForm = (props) => {
    return(
        <>

                <div className='d-flex flex-wrap' >
                    <MainDropdownSiswa 
                        page={props.page}
                    />
                </div>
              
        </>
    )
}

export default MutasiSiswaForm