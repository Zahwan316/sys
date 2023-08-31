import { CFormInput, CFormLabel } from '@coreui/react';
import React, { useState, useEffect } from 'react';

const KontakForm = (props) => {
    return(
        <>
            <div className='mb-3'>
                <CFormLabel>
                    Email
                </CFormLabel>
                <CFormInput 
                    type="email"
                />
            </div>
            <div className='mb-3'>
                <CFormLabel>
                    No Hp
                </CFormLabel>
                <CFormInput 
                    type="number"
                />
            </div>
            <div className='mb-3'>
                <CFormLabel>
                    No Telepon Rumah
                </CFormLabel>
                <CFormInput 
                    type="number"
                />
            </div>
        </>
    )
}

export default KontakForm;