import React, { useState, useEffect } from 'react';

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

const CardMain = (props) => {
    return(
        <CCol>
            <CCard>
                <CCardHeader>
                    <strong>
                        {
                            props.title
                        }
                    </strong>
                </CCardHeader>
                <CCardBody>
                    {
                        props.body
                    }
                </CCardBody>
            </CCard>
        </CCol>
    )
}

export default CardMain