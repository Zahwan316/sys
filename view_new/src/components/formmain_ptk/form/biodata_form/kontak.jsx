import { CFormInput, CFormLabel } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import useFormPtkStore from 'src/state/form/ptkform';

const KontakForm = (props) => {
    const setdata = useFormPtkStore((state) => state.setform)
    const forminput = useFormPtkStore((state) => state)

    const handleforminput = (e) => {
        const{name,value} = e.target;
        setdata(name, value);
    }

    return(
        <>
            <div className='mb-3'>
                <CFormLabel>
                    Email
                </CFormLabel>
                <CFormInput 
                    type="email"
                    name="email"
                    onChange={handleforminput}
                    value={forminput.email}
                />
            </div>
            <div className='mb-3'>
                <CFormLabel>
                    No Hp
                </CFormLabel>
                <CFormInput 
                    type="number"
                    name="no_hp"
                    onChange={handleforminput}
                    value={forminput.no_hp}
                />
            </div>
            <div className='mb-3'>
                <CFormLabel>
                    No Telepon Rumah
                </CFormLabel>
                <CFormInput 
                    type="number"
                    name="no_telepon_rumah"
                    onChange={handleforminput}
                    value={forminput.no_telepon_rumah}
                />
            </div>
        </>
    )
}

export default KontakForm;