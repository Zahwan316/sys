import React, { useState, useEffect } from 'react';
import { CFormInput, CFormLabel, CFormSelect, CModal,CModalBody,CModalFooter,CModalHeader,CModalTitle,CButton } from '@coreui/react';


const ModalMutasi = (props) => {
    return(
        <>
            <CModal visible={true} onClose={props.handlemodal} size="lg">
                <form onSubmit={props.handlesubmit}>      
                <CModalHeader>
                    <CModalTitle>{props.title}</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    {
                        props.page === "semester" &&
                        <div>
                            <div className='mb-3'>
                                <CFormLabel>Semester Id</CFormLabel>
                                <CFormInput 
                                    name="semester_id"
                                    type="number"
                                    onChange={props.handleinput}
                                    value={props.forminput.semester_id}
                                />
                            </div>
                            <div className='mb-3'>
                                <CFormLabel>Tahun Ajaran Id</CFormLabel>
                                <CFormInput 
                                    name="tahun_ajaran_id"
                                    type="number"
                                    onChange={props.handleinput}
                                    value={props.forminput.tahun_ajaran_id}
                                />
                            </div>
                            <div className='mb-3'>
                                <CFormLabel>Nama</CFormLabel>
                                <CFormInput
                                    name="nama"
                                    type="text"
                                    onChange={props.handleinput}
                                    value={props.forminput.nama}
                                />
                            </div>
                            <div className='mb-3'>
                                <CFormLabel>Semester</CFormLabel>
                                <CFormSelect
                                    name="semester"
                                    onChange={props.handleinput}
                                    value={props.forminput.semester}
                                >
                                    <option>Pilih Semester</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                </CFormSelect>
                            </div>
                            <div className='mb-3'>
                                <CFormLabel>Tanggal Mulai</CFormLabel>
                                <CFormInput 
                                    type="date"
                                    name="tanggal_mulai"
                                    onChange={props.handleinput}
                                    value={props.forminput.tanggal_mulai}
                                />
                            </div>
                            <div className='mb-3'>
                                <CFormLabel>Tanggal Selesai</CFormLabel>
                                <CFormInput 
                                    type="date"
                                    name="tanggal_selesai"
                                    onChange={props.handleinput}
                                    value={props.forminput.tanggal_selesai}
                                />
                            </div>
                            <div className='mb-3'>
                                <input type="checkbox"
                                    name="periode_aktif"
                                    onClick={props.handlecheckbox}
                                    checked={props.forminput.periode_aktif}
                                />
                                Masih Aktif?
                            </div>
                        </div>
                    }
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={props.handlemodal}>Close</CButton>
                    {
                        props.typeform != "detail" &&
                        <CButton color="primary" type='submit'>Save changes</CButton>

                    }
                </CModalFooter>
                </form>
            </CModal>
        </>
    )
}

export default ModalMutasi