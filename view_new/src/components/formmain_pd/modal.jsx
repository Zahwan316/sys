import React, { useState, useEffect } from 'react';
import { CModal,CModalBody,CModalHeader,CButton,CModalTitle, CFormLabel, CFormInput,CModalFooter, CFormSelect } from '@coreui/react';
import Select from 'react-select'
import FormAlamat from './form_modal/alamat';
import FormKesehatanPesertaDidik from './form_modal/kesehatan';
import FormKontakPesertaDidik from './form_modal/kontak';
import FormRekeningPesertaDidik from './form_modal/rekening';
import FormPesertaDidik from './form_modal/pesertadidik';

const ModalPesertaDidik = (props) => {
    return(
        <>
            <CModal visible={true} onClose={props.handlemodal} size='xl'>
                <form onSubmit={props.handlesubmit}>            
                    <CModalHeader > 
                        <CModalTitle>{props.title}</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        {
                            props.page === "pesertadidikbiodata" || props.page === "pesertadidikkeluarga" ||  props.page === "pesertadidikbantuan" ?
                            <FormPesertaDidik 
                                dataagama={props.dataagama}
                                datakewarganegaraan={props.datakewarganegaraan}
                                datapekerjaan={props.datapekerjaan}
                                datapendidikan={props.datapendidikan}
                                dataalasanlayakpip={props.dataalasanlayakpip}
                                datajenistinggal={props.datajenistinggal}
                                dataalattransportasi={props.dataalattransportasi}
                                handleforminput={props.handleforminput}
                                handleKewarganegaraan={props.handleKewarganegaraan}
                                handleLayakpip={props.handleLayakpip}
                                typeform={props.typeform}
                                page={props.page}
                            />
                            :
                            ""
                        }
                        {
                            props.page === "pesertadidikalamat" &&
                            <FormAlamat 
                                datakota={props.datakota}
                                handlekodekota={props.handlekodekota}
                                datakecamatan={props.datakecamatan}
                                handlekodekecamatan={props.handlekodekecamatan}
                                datadesa={props.datadesa}
                                handlekodedesa={props.handlekodedesa}
                                handleforminput={props.handleforminput}
                                forminput={props.forminput}
                                handlecheck={props.handlecheck}
                            />
                        }
                        {
                            props.page === "pesertadidikkesehatan" &&
                            <FormKesehatanPesertaDidik 
                                handleforminput={props.handleforminput}
                                forminput={props.forminput}
                            />

                        }

                        {
                            props.page === "pesertadidikkontak" &&
                            <FormKontakPesertaDidik 
                                forminput={props.forminput}
                                handleforminput={props.handleforminput}
                            />
                        }

                        {
                            props.page === "pesertadidikrekening" &&
                            <FormRekeningPesertaDidik 
                                forminput={props.forminput}
                                handleforminput={props.handleforminput}
                                handleidbank={props.handleidbank}
                            />

                            
                        }

                    </CModalBody>
                    <CModalFooter>
                        <CButton color="secondary" onClick={props.handlemodal}>Close</CButton>
                        <CButton color="primary" type='submit'>Save changes</CButton>
                    </CModalFooter>
                </form>
            </CModal>
        </>
    )
}

export default ModalPesertaDidik