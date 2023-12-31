import React, { useState, useEffect } from 'react';
import { CModal,CModalBody,CModalFooter,CModalTitle,CModalHeader,CButton } from '@coreui/react';
import FormBiodata from './form/biodata';
import KepegawaianForm from './form/biodata_form/kepegawaian';
import KontakForm from './form/biodata_form/kontak';
import KompetensiForm from './form/biodata_form/kompetensi';
import AlamatForm from '../formmain/alamat';
import PtkAlamatForm from './form/biodata_form/alamat';
import PtkProgramStudi from './program_studi';
import ProgramStudiForm from './form/biodata_form/programstudi';
import AnggotaKeluargaForm from './form/biodata_form/anggotakeluarga';

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
                        {
                            props.page === "ptkkepegawaian" &&
                            <KepegawaianForm
                                typeform={props.typeform}
                            />
                        }
                        {
                            props.page === "ptkkontak" &&
                            <KontakForm />
                        }
                        {
                            props.page === "ptkkompetensi" &&
                            <KompetensiForm />
                        }

                        {
                            props.page === "ptkalamat" &&
                            <PtkAlamatForm
                                datakota={props.datakota}
                                handlekodekota={props.handlekodekota}
                                datakecamatan={props.datakecamatan}
                                handlekodekecamatan={props.handlekodekecamatan}
                                handlekodedesa={props.handlekodedesa}
                                datadesa={props.datadesa}
                                kodekecamatan={props.kodekecamatan}
                                kodekota={props.kodekota}
                            />
                        }

                        {
                            props.page === "ptkprogramstudi" &&
                            <ProgramStudiForm />
                        }

                        {
                            props.page === "ptkanggotakeluarga" &&
                            <AnggotaKeluargaForm
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