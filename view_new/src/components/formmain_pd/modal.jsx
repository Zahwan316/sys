import React, { useState, useEffect } from 'react';
import { CModal,CModalBody,CModalHeader,CButton,CModalTitle, CFormLabel, CFormInput,CModalFooter, CFormSelect } from '@coreui/react';
import Select from 'react-select'

const ModalPesertaDidik = (props) => {
    return(
        <>
            <CModal visible={true} onClose={props.handlemodal} size='lg'>
                <form onSubmit={props.handlesubmmit}>            
                    <CModalHeader > 
                        <CModalTitle>{props.title}</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        {
                            props.page === "pesertadidikbiodata" &&
                            <div>
                                {/* form nama */}
                                <div className='mb-3'>
                                    <CFormLabel>
                                        Nama
                                    </CFormLabel>
                                    <CFormInput 
                                        type="text"
                                    />
                                </div>
                                {/* Form nipd dan nisn */}
                                <div className='mb-3 d-flex '>
                                    <div>
                                        <CFormLabel>
                                            NIPD
                                        </CFormLabel>
                                        <CFormInput 
                                            type="text"
                                            />
                                    </div>
                                    <div className='mx-3'>
                                        <CFormLabel>
                                            NISN
                                        </CFormLabel>
                                        <CFormInput 
                                            type="text"
                                            />
                                    </div>
                                </div>
                                {/* Form Jenis Kelamin */}
                                <div className='mb-3'>
                                    <CFormLabel>
                                        Jenis Kelamin
                                    </CFormLabel>
                                    <CFormSelect>
                                        <option value='L'>Laki Laki</option>
                                        <option value="P">Perempuan</option>
                                    </CFormSelect>
                                </div>
                                {/* form TTL */}
                                <div className='mb-3 d-flex'>
                                    <div>
                                        <CFormLabel>
                                            Tempat Lahir
                                        </CFormLabel>
                                        <CFormInput 
                                            type="date"
                                        />
                                    </div>
                                    <div className='mx-3'>
                                        <CFormLabel>
                                            Tanggal Lahir
                                        </CFormLabel>
                                        <CFormInput 
                                            type="date"
                                        />
                                    </div>
                                </div>

                                <div className='d-flex mb-3'>
                                    <div className=''>
                                        <CFormLabel>
                                            Agama
                                        </CFormLabel>
                                        <CFormSelect>
                                            {
                                                props.dataagama.map(item => 
                                                    <option value={item.agama_id}>{item.nama}</option>    
                                                )
                                            }
                                        </CFormSelect>
                                    </div>
                                    <div className='mx-3'>
                                        <CFormLabel>
                                            Kewarganegaraan
                                        </CFormLabel>
                                        <Select 
                                            options={
                                                props.datakewarganegaraan.map(item => {
                                                    let data = {
                                                        value:item.alpha_2,
                                                        label:item.nama
                                                    }
                                                    return data
                                                })
                                            }
                                            components={{DropdownIndicator: props => <div {...props} name="kewarganegaraan" />}}
                                        />  
                                        
                                    </div>
                                </div>

                                <div className='mb-4'>
                                    <h4>Keluarga</h4>
                                </div>

                                <div className='mb-3'>
                                    
                                </div>

                            </div>
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