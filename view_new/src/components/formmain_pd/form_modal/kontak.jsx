import { CFormLabel,CFormInput } from '@coreui/react';
import React, { useState, useEffect } from 'react';

const FormKontakPesertaDidik = (props) => {
    return(
        <>
            <div className='mb-3 d-flex'>

                <div className='mb-3 w-50'>
                    <CFormLabel>Nomor Telepon Rumah</CFormLabel>
                    <CFormInput 
                        type='number'
                        name="nomor_telepon_rumah"
                        onChange={props.handleforminput}
                        value={props.forminput.nomor_telepon_rumah}
                    />
                </div>
                <div className='mx-3 w-50'>
                    <CFormLabel>Nomor Telepon Seluler</CFormLabel>
                    <CFormInput 
                        type='number'
                        name="nomor_telepon_seluler"
                        onChange={props.handleforminput}
                        value={props.forminput.nomor_telepon_seluler}
                    />
                </div>
            </div>

            <div className='mb-3'>
                <CFormLabel>Email</CFormLabel>
                <CFormInput 
                    type='email'
                    name="email"
                    onChange={props.handleforminput}
                    value={props.forminput.email}
                />
            </div>
            <div className='mb-3'>
                <CFormLabel>Twitter</CFormLabel>
                <CFormInput 
                    type='text'
                    name="twitter"
                    onChange={props.handleforminput}
                    value={props.forminput.twitter}
                />
            </div>
            <div className='mb-3'>
                <CFormLabel>Facebook</CFormLabel>
                <CFormInput 
                    type='text'
                    name="facebook"
                    onChange={props.handleforminput}
                    value={props.forminput.facebook}
                />
            </div>
            <div className='mb-3'>
                <CFormLabel>Instagram</CFormLabel>
                <CFormInput 
                    type='text'
                    name="instagram"
                    onChange={props.handleforminput}
                    value={props.forminput.instagram}
                />
            </div>
            <div className='mb-3'>
                <CFormLabel>Youtube</CFormLabel>
                <CFormInput 
                    type='text'
                    name="youtube"
                    onChange={props.handleforminput}
                    value={props.forminput.youtube}
                />
            </div>
            
        </>
    )
}

export default FormKontakPesertaDidik