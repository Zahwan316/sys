import React, { useState, useEffect } from 'react';
import { CModal,CModalBody,CModalHeader,CButton,CModalTitle, CFormLabel, CFormInput,CModalFooter, CFormSelect } from '@coreui/react';
import Select from 'react-select'
import FormAlamat from './form_modal/alamat';
import FormKesehatanPesertaDidik from './form_modal/kesehatan';

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
                            props.page === "pesertadidikbiodata" &&
                            <div>
                                {/* form nama */}
                                <div className='mb-3'>
                                    <CFormLabel>
                                        Nama
                                    </CFormLabel>
                                    <CFormInput 
                                        name='nama'
                                        type="text"
                                        onChange={props.handleforminput}
                                    />
                                </div>
                                {/* Form nipd dan nisn */}
                                <div className='mb-3 d-flex '>
                                    <div>
                                        <CFormLabel>
                                            NIPD
                                        </CFormLabel>
                                        <CFormInput 
                                            name='nipd'
                                            type="text"
                                            onChange={props.handleforminput}
                                            />
                                    </div>
                                    <div className='mx-3'>
                                        <CFormLabel>
                                            NISN
                                        </CFormLabel>
                                        <CFormInput 
                                            name='nisn'
                                            type="text"
                                            onChange={props.handleforminput}
                                            />
                                    </div>
                                </div>
                                {/* Form Jenis Kelamin */}
                                <div className='mb-3'>
                                    <CFormLabel>
                                        Jenis Kelamin
                                    </CFormLabel>
                                    <CFormSelect
                                        name='jenis_kelamin'
                                        onChange={props.handleforminput}
                                    >
                                        <option>Pilih Jenis Kelamin</option>
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
                                            name='tempat_lahir'
                                            type="text"
                                            onChange={props.handleforminput}
                                        />
                                    </div>
                                    <div className='mx-3'>
                                        <CFormLabel>
                                            Tanggal Lahir
                                        </CFormLabel>
                                        <CFormInput 
                                            name='tanggal_lahir'
                                            type="date"
                                            onChange={props.handleforminput}
                                        />
                                    </div>
                                </div>

                                <div className='d-flex mb-3'>
                                    <div className=''>
                                        <CFormLabel>
                                            Agama
                                        </CFormLabel>
                                        <CFormSelect
                                            name='agama_id'
                                            onChange={props.handleforminput}
                                        >
                                            <option>Pilih Agama</option>
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
                                            onChange={props.handleKewarganegaraan}
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

                                <div className='mb-2'>
                                    <h4>Keluarga</h4>
                                </div>

                                <div className='mb-3'>
                                    <CFormLabel>Nama Ayah</CFormLabel>
                                    <CFormInput
                                        name='nama_ayah'
                                        type="text"
                                        onChange={props.handleforminput}
                                    />
                                </div>
                                <div className='mb-3 d-flex'>
                                    <div className='mb-3'>
                                        <CFormLabel>Pendidikan Ayah</CFormLabel>
                                        <CFormSelect
                                            name='pendidikan_ayah_id'
                                            onChange={props.handleforminput}
                                        >
                                            <option>Pilih pendidikan ayah</option>
                                            {
                                                props.datapendidikan.map(item => 
                                                    <option value={item.jenjang_pendidikan_id}>{item.nama}</option>    
                                                )
                                            }
                                        </CFormSelect>
                                    </div>
                                    <div className='mx-3'>
                                        <CFormLabel>Pekerjaan Ayah</CFormLabel>
                                        <CFormSelect
                                            name='pekerjaan_ayah_id'
                                            onChange={props.handleforminput}
                                        >
                                            <option>Pilih Pekerjaan ayah</option>
                                            {
                                                props.datapekerjaan.map(item => 
                                                    <option value={item.pekerjaan_id}>{item.nama}</option>    
                                                )
                                            }
                                        </CFormSelect>
                                    </div>
                                    <div className='mb-3'>
                                        <CFormLabel>Tanggal Lahir Ayah</CFormLabel>
                                        <CFormInput
                                            name='tanggal_lahir_ayah'
                                            type="date"
                                            onChange={props.handleforminput}
                                        />
                                    </div>
                                </div>

                                <div className='mb-3'>
                                    <CFormLabel>Nama Ibu</CFormLabel>
                                    <CFormInput
                                        name='nama_ibu'
                                        type="text"
                                        onChange={props.handleforminput}
                                    />
                                </div>
                                <div className='mb-3 d-flex'>
                                    <div className='mb-3'>
                                        <CFormLabel>Pendidikan Ibu</CFormLabel>
                                        <CFormSelect
                                            name='pendidikan_ibu_id'
                                            onChange={props.handleforminput}
                                        >
                                            <option>Pilih pendidikan ibu</option>
                                            {
                                                props.datapendidikan.map(item => 
                                                    <option value={item.jenjang_pendidikan_id}>{item.nama}</option>    
                                                )
                                            }
                                        </CFormSelect>
                                    </div>
                                    <div className='mx-3'>
                                        <CFormLabel>Pekerjaan Ibu</CFormLabel>
                                        <CFormSelect
                                            name='pekerjaan_ibu_id'
                                            onChange={props.handleforminput}
                                        >
                                            <option>Pilih Pekerjaan ibu</option>
                                            {
                                                props.datapekerjaan.map(item => 
                                                    <option value={item.pekerjaan_id}>{item.nama}</option>    
                                                )
                                            }
                                        </CFormSelect>
                                    </div>
                                    <div className='mb-3'>
                                        <CFormLabel>Tanggal Lahir Ibu</CFormLabel>
                                        <CFormInput
                                            name='tanggal_lahir_ibu'
                                            type="date"
                                            onChange={props.handleforminput}
                                        />
                                    </div>
                                </div>

                                <div className='mb-3'>
                                    <CFormLabel>Nama Wali</CFormLabel>
                                    <CFormInput
                                        name='nama_wali'
                                        type="text"
                                        onChange={props.handleforminput}
                                    />
                                </div>
                                <div className='mb-3 d-flex'>
                                    <div className='mb-3'>
                                        <CFormLabel>Pendidikan Wali</CFormLabel>
                                        <CFormSelect
                                            name='pendidikan_wali_id'
                                            onChange={props.handleforminput}
                                        >
                                            <option>Pilih pendidikan wali</option>
                                            {
                                                props.datapendidikan.map(item => 
                                                    <option value={item.jenjang_pendidikan_id}>{item.nama}</option>    
                                                )
                                            }
                                        </CFormSelect>
                                    </div>
                                    <div className='mx-3'>
                                        <CFormLabel>Pekerjaan Wali</CFormLabel>
                                        <CFormSelect
                                            name='pekerjaan_wali_id'
                                            onChange={props.handleforminput}
                                        >
                                            <option>Pilih Pekerjaan wali</option>
                                            {
                                                props.datapekerjaan.map(item => 
                                                    <option value={item.pekerjaan_id}>{item.nama}</option>    
                                                )
                                            }
                                        </CFormSelect>
                                    </div>
                                    <div className='mb-3'>
                                        <CFormLabel>Tanggal Lahir Wali</CFormLabel>
                                        <CFormInput
                                            type="date"
                                            name='tanggal_lahir_wali'
                                            onChange={props.handleforminput}
                                        />
                                    </div>
                                </div>

                                <div className='mb-2'>
                                    <h4>Lainnya</h4>
                                </div>

                                <div className='d-flex mb-3 flex-wrap'>
                                    <div className='mb-3'>
                                        <CFormLabel>No KK</CFormLabel>
                                        <CFormInput
                                            type="text"
                                            name='no_kk'
                                            onChange={props.handleforminput}
                                        />
                                    </div>  
                                    <div className='mx-3'>
                                        <CFormLabel>NIK</CFormLabel>
                                        <CFormInput
                                            type="text"
                                            name='nik'
                                            onChange={props.handleforminput}
                                        />
                                    </div>  
                                    
                                    <div className='mx-3'>
                                        <CFormLabel>Reg Akta Lahir</CFormLabel>
                                        <CFormInput
                                            type="text"
                                            name='reg_akta_lahir'
                                            onChange={props.handleforminput}
                                        />
                                    </div>  
                                    <div className='mx-3'>
                                        <CFormLabel>No KKS</CFormLabel>
                                        <CFormInput
                                            type="text"
                                            name='no_kks'
                                            onChange={props.handleforminput}
                                        />
                                    </div>  
                                    <div className='mb-3'>
                                        <CFormLabel>Anak Ke Berapa</CFormLabel>
                                        <CFormInput
                                            type="text"
                                            name='anak_keberapa'
                                            onChange={props.handleforminput}
                                        />
                                    </div>  
                                    <div className='mx-3'>
                                        <CFormLabel>Jumlah Saudara Kandung</CFormLabel>
                                        <CFormInput
                                            type="text"
                                            name='jumlah_saudara_kandung'
                                            onChange={props.handleforminput}
                                        />
                                    </div>  
                                    <div className='mx-3'>
                                        <CFormLabel>Alat Transportasi</CFormLabel>
                                        <CFormSelect
                                            name='alat_transportasi_id'
                                            onChange={props.handleforminput}
                                        >
                                            <option>Pilih alat transportasi</option>
                                            {
                                                props.dataalattransportasi.map(item => 
                                                    <option value={item.alat_transportasi_id}>{item.nama}</option>
                                                )
                                            }
                                        </CFormSelect>
                                    </div>  
                                    <div className='mb-3'>
                                        <CFormLabel>Jenis Tinggal</CFormLabel>
                                        <CFormSelect
                                            name='jenis_tinggal'
                                            onChange={props.handleforminput}
                                        >
                                            <option>Pilih jenis tinggal</option>
                                            {
                                                props.datajenistinggal.map(item => 
                                                    <option value={item.jenis_tinggal_id}>{item.nama}</option>
                                                )
                                            }
                                        </CFormSelect>
                                    </div>  
                                </div>

                                <div className='d-flex mb-3'>
                                    <div className='mb-3'>
                                        <CFormLabel>Penerima KPS</CFormLabel>
                                        <CFormSelect
                                             onChange={props.handleforminput}
                                             name='penerima_kps'
                                        >
                                            <option>Pilih </option>
                                            <option value='1'>Iya </option>
                                            <option value='0'>Tidak </option>
                                            
                                        </CFormSelect>
                                    </div>  
                                    <div className='mx-3'>
                                        <CFormLabel>No KPS</CFormLabel>
                                        <CFormInput
                                            name='no_kps'
                                            type="text"
                                            onChange={props.handleforminput}
                                        />
                                    </div>  
                                </div>

                                <div className='mb-3 d-flex'>
                                    <div className='mb-3'>
                                        <CFormLabel>Penerima PIP</CFormLabel>
                                        <CFormSelect
                                             onChange={props.handleforminput}
                                             name='penerima_pip'
                                        >
                                            <option>Pilih </option>
                                            <option value='1'>Iya </option>
                                            <option value='0'>Tidak </option>
                                            
                                        </CFormSelect>
                                    </div>  
                                    <div className='mx-3'>
                                        <CFormLabel>Layak PIP</CFormLabel>
                                        <CFormSelect
                                             onChange={props.handleforminput}
                                             name='layak_pip'
                                        >
                                            <option>Pilih </option>
                                            <option value='1'>Iya </option>
                                            <option value='0'>Tidak </option>
                                            
                                        </CFormSelect>
                                    </div>  
                                    <div className='mb-3'>
                                        <CFormLabel>Alasan Layak PIP</CFormLabel>
                                        <Select 
                                            onChange={props.handleLayakpip}
                                            options={
                                                props.dataalasanlayakpip.map(item => {
                                                    let data = {
                                                        value:item.id_layak_pip,
                                                        label:item.alasan_layak_pip
                                                    }
                                                    return data
                                                })
                                                
                                            }
                                            components={{DropdownIndicator: props => <div {...props} name="alasan_layak_pip" />}}
                                        />
                                    </div>  
                                </div>
                                <div className='d-flex mb-3'>
                                    <div className='mx-3'>
                                        <CFormLabel>Penerima KIP</CFormLabel>
                                        <CFormSelect
                                             onChange={props.handleforminput}
                                             name='penerima_kip'
                                        >
                                            <option>Pilih </option>
                                            <option value='1'>Iya </option>
                                            <option value='0'>Tidak </option>
                                            
                                        </CFormSelect>
                                    </div>  
                                    <div className='mb-3'>
                                        <CFormLabel>No KIP</CFormLabel>
                                        <CFormInput
                                            type="text"
                                            name='no_kip'
                                            onChange={props.handleforminput}
                                        />
                                    </div>  
                                    <div className='mx-3'>
                                        <CFormLabel>Nama Di KIP</CFormLabel>
                                        <CFormSelect
                                             onChange={props.handleforminput}
                                             name='nama_di_kip'
                                        >
                                            <option>Pilih </option>
                                            <option value='1'>Terdaftar </option>
                                            <option value='0'>Tidak </option>
                                            
                                        </CFormSelect>
                                    </div>  
                                </div>
                                <div className='mb-3'>
                                    <CFormLabel>Menjadi siswa mulai tanggal</CFormLabel>
                                    <CFormInput
                                        type="date"
                                        name='tmt'
                                        onChange={props.handleforminput}
                                    />
                                </div>  
                                <div className='mb-3'>
                                    <CFormLabel>NPSN Jenjang Sebelumnya</CFormLabel>
                                    <CFormInput
                                        type="text"
                                        name='npsn_jenjang_sebelumnya'
                                        onChange={props.handleforminput}
                                    />
                                </div>  
                            </div>
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