import React, { useState, useEffect } from 'react';
import { CModal,CModalBody,CModalFooter,CModalTitle,CModalHeader,CButton } from '@coreui/react';
import FormBiodata from './form/biodata';

const ModalPtk = (props) => {
    return(
        <>
            <CModal visible={true} size="xl" onClose={props.handlemodal}>
                <form onSubmit={props.handlesubmit}>           
                    <CModalHeader>
                        <CModalTitle>{props.title}</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        {
                            props.page === "ptkbiodata" &&
                            <FormBiodata 
                            />
                        }
                    </CModalBody>
                    <CModalFooter>
                        <CButton color="secondary" onClick={props.handlemodal}>Close</CButton>
                        {
                            props.typeform != "detail" &&
                            <>
                                <CButton color="primary" type='submit'>Save changes</CButton>
                            </>
                        }
                    </CModalFooter>
                </form>
            </CModal>
        </>
    )
}

export default ModalPtk;