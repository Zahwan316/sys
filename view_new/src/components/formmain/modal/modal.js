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
    CTable,
    CSpinner,
    CTableHead,
    CTableBody,
    CModal,
    CModalBody,
    CModalHeader,
    CModalTitle,
    CModalFooter
    
  } from '@coreui/react'

const ModalComponent = (props) => {
    return(
        <>
            <CModal size='lg' visible={props.isclicked} onClose={props.handleisclicked}>
                <form onSubmit={props.submit}>

                <CModalHeader>
                    <CModalTitle>{props.title}</CModalTitle>
                </CModalHeader>
                <CModalBody>

                   {
                        props.page === "akreditasi" && 
                        <div>
                             
                            <div className='mb-3'>
                                <CFormLabel>Status Akreditasi</CFormLabel>
                                <CFormSelect 
                                    name="status" 
                                    onChange={props.handleforminput} 
                                    required
                            
                                    value={props.dataform.status}
                                >
                                    <option>Pilih Akreditasi</option>
                                    {
                                        props.optionAkreditasi.map((item,index) => 
                                            <option value={item.akreditasi_id}>{item.nama}</option>
                                        )
                                    }                                              
                                </CFormSelect> 
                            </div>
                        
                                
                            <div className='mb-3'>
                            <CFormLabel>Nilai Akreditasi</CFormLabel>
                            <CFormInput 
                                type='number'
                                name="nilai"
                                onChange={props.handleforminput}
                                required
                                value={props.dataform.nilai}
                                />

                            </div>
                        
                            <div className='mb-3'>
                            <CFormLabel>Nomor Akreditasi</CFormLabel>
                            <CFormInput
                                type="number"    
                                name="nomor"
                                onChange={props.handleforminput}
                                required
                                value={props.dataform.nomor}
                                />

                            </div>
                        
                            <div className='mb-3'>
                            <CFormLabel>Tanggal SK Akreditasi</CFormLabel>
                            <CFormInput
                                type="date"    
                                name="tanggalsk"
                                onChange={props.handleforminput}
                                required
                                value={props.dataform.tanggalsk}
                                />
                        
                            </div>
                        </div>
                    }

                   {
                       props.page === "iso" &&
                            <div>  

                                <div className='mb-3'>
                                    <CFormLabel>Sertifikasi Iso</CFormLabel>
                                    <CFormSelect 
                                        name="iso_id" 
                                        onChange={props.handleforminput}
                                        required
                                        value={props.formdata.iso_id}
                                        >
                                        <option value="">Pilih Sertifikasi</option>    
                                        <option value="1">9001:2000</option>    
                                        <option value="2">9001:2008</option>    
                                        <option value="3">Belum Bersertifikat</option>    
                                        <option value="4">Proses Sertifikasi</option>    
                                    </CFormSelect>  
                                </div>               
                                
                                <div className='mb-3'>
                                    <CFormLabel>Nomor Sertifikasi</CFormLabel>
                                    <CFormInput
                                        type="number"
                                        name="nosertifikasi"
                                        onChange={props.handleforminput}
                                        required
                                        value={props.formdata.nosertifikasi}
                                        />
                                </div>
                                
                                <div className='mb-3'>
                                    <CFormLabel>Tanggal Sertifikasi</CFormLabel>
                                    <CFormInput
                                        type="date"
                                        name="tanggalsertifikasi"
                                        onChange={props.handleforminput}
                                        required
                                        value={props.formdata.tanggalsertifikasi}
                                        />
                                </div>
                           
                            
                            </div>
                    }

                   {
                       props.page === "rekening" &&
                       <div>
                            <div className='mb-3'>
                                <CFormLabel>Nama Bank</CFormLabel>
                                <CFormSelect
                                    name="idbank"
                                    onChange={props.handleforminput}
                                    required
                                    value={props.dataform.idbank}
                                >
                                    <option>Pilih Bank</option>
                                    {
                                        props.databank.map((item,index) => 
                                            <option key={index} value={item.id_bank}>{item.nm_bank}</option>
                                        
                                        )
                                    }
                                </CFormSelect>
                            </div>

                            <div className='mb-3'>
                                <CFormLabel>Cabang KCP</CFormLabel>
                                <CFormInput 
                                type="text"
                                name="cabangkcp"
                                onChange={props.handleforminput}
                                required
                                value={props.dataform.cabangkcp}
                                />
                            </div>

                            <div className='mb-3'>
                                <CFormLabel>Nomor Rekening</CFormLabel>
                                <CFormInput 
                                type="number" 
                                name="norek"
                                onChange={props.handleforminput}
                                required
                                value={props.dataform.norek}
                            />
                            </div>

                            <div className='mb-3'>
                                <CFormLabel>Rekening Atas Nama</CFormLabel>
                                <CFormInput 
                                type="text"
                                name="rekeningnama"
                                onChange={props.handleforminput}
                                required
                                value={props.dataform.rekeningnama}
                                />
                            </div>
                            
                        
                        
                        
                        </div>
                    }

                   {
                       props.page === "kepemilikan" &&
                       <div>
                            <div className='mb-3'>
                                <CFormLabel>Kepemilikan</CFormLabel>
                                <CFormSelect
                                    name="kepemilikan"
                                    onChange={props.handleforminput}
                                    value={props.dataform.kepemilikan}
                                    >
                                        <option>Pilih Kepemilikan</option>
                                    {
                                        props.statuskepemilikan.map((item,index) =>
                                        <option key={index} value={item.status_kepemilikan_id}>{item.nama}</option>    
                                        
                                        )
                                    }
                                </CFormSelect>  

                            </div> 
                            <div className='mb-3'>
                                <CFormLabel>Nama Yayasan</CFormLabel>
                                <CFormInput 
                                name="namayayasan"
                                type="text"
                                onChange={props.handleforminput}
                                required
                                value={props.dataform.namayayasan}
                                />

                            </div> 
                            <div className='mb-3'>
                                <CFormLabel>Nama Notaris</CFormLabel>
                                <CFormInput 
                                type="text"
                                onChange={props.handleforminput}
                                name="namanotaris"
                                required
                                value={props.dataform.namanotaris}
                                />
                            </div> 
                            <div className='mb-3'>
                                <CFormLabel>Nomor Akte Notaris</CFormLabel>
                                <CFormInput 
                                type="number" 
                                name="noaktenotaris"
                                onChange={props.handleforminput}
                                required
                                value={props.dataform.noaktenotaris}
                                />
                            </div> 
                            <div className='mb-3'>
                                <CFormLabel>Tanggal Akte Notaris</CFormLabel>
                                <CFormInput
                                type="date"
                                name="tanggalaktenotaris"
                                onChange={props.handleforminput}
                                required
                                value={props.dataform.tanggalaktenotaris}
                                />
                            </div> 
                           
                       
                       
                       
                            
                       
                        
                       </div>
                    }
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={props.handleisclicked}>Close</CButton>
                    <CButton color="primary" type="submit" >Tambah Data</CButton>
                </CModalFooter>
                </form>
            </CModal>
        </>
    )
}

export default ModalComponent