import React, { useState, useEffect } from 'react';
import { CFormLabel,CFormInput,CFormSelect, } from '@coreui/react';
import Select from "react-select"


const FormPesertaDidik = (props) => {
    useEffect(() => {
        console.log(props.typeform)
    })

    return(
        <>
             {/* form nama */}
             {
                props.page === "pesertadidikbiodata" &&
                <> 
                                {
                                    props.typeform == "tambah" || props.typeform == "edit" || props.typeform =="detail" ?
                                    <>
                                        <div className='mb-3'>
                                                        <CFormLabel>
                                                            Nama
                                                        </CFormLabel>
                                                        <CFormInput 
                                                            name='nama'
                                                            type="text"
                                                            onChange={props.handleforminput}
                                                            value={props.forminput.nama}
                                                            required
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
                                                    value={props.forminput.nipd}
                                                    required
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
                                                         value={props.forminput.nisn}
                                                         required
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
                                                            value={props.forminput.jenis_kelamin}
                                                            required
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
                                                    value={props.forminput.tempat_lahir}
                                                    required
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
                                                    value={props.forminput.tanggal_lahir}
                                                    required
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
                                                    value={props.forminput.agama_id}
                                                    required
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
                                                    required
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

                                    </>
                                    :
                                    ""
                                }

                                {
                                    props.typeform === "tambah" &&
                                    <>
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
                                    </>
                                }

                                
                </>
             }

             {
                props.page === "pesertadidikkeluarga" && props.typeform === "edit" ||props.typeform ==="detail" ?
                <>
                                <div className='mb-3'>
                                    <CFormLabel>No KK</CFormLabel>
                                    <CFormInput
                                        type="text"
                                        name='no_kk'
                                        onChange={props.handleforminput}
                                        required
                                        value={props.forminput.no_kk}
                                    />
                                </div>  
                                <div className='mb-3'>
                                    <CFormLabel>NIK</CFormLabel>
                                    <CFormInput
                                        type="text"
                                        name='nik'
                                        onChange={props.handleforminput}
                                        required
                                        value={props.forminput.nik}
                                    />
                                </div>  
                                <div className='mb-3'>
                                        <CFormLabel>Anak Ke Berapa</CFormLabel>
                                        <CFormInput
                                            type="text"
                                            name='anak_keberapa'
                                            onChange={props.handleforminput}
                                            required
                                            value={props.forminput.anak_keberapa}
                                        />
                                    </div>  
                                <div className='mb-3'>
                                        <CFormLabel>Jumlah Saudara Kandung</CFormLabel>
                                        <CFormInput
                                            type="text"
                                            name='jumlah_saudara_kandung'
                                            onChange={props.handleforminput}
                                            value={props.forminput.jumlah_saudara_kandung}
                                        />
                                    </div>  
                                <div className='mb-3'>
                                    <CFormLabel>Nama Ayah</CFormLabel>
                                    <CFormInput
                                        name='nama_ayah'
                                        type="text"
                                        onChange={props.handleforminput}
                                        required
                                        value={props.forminput.nama_ayah}
                                    />
                                </div>
                                <div className='mb-3 d-flex'>
                                    <div className='mb-3'>
                                        <CFormLabel>Pendidikan Ayah</CFormLabel>
                                        <CFormSelect
                                            name='pendidikan_ayah_id'
                                            onChange={props.handleforminput}
                                            required
                                            value={props.forminput.pendidikan_ayah_id}
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
                                            required
                                            value={props.forminput.pekerjaan_ayah_id}
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
                                            required
                                            value={props.forminput.tanggal_lahir_ayah}
                                        />
                                    </div>
                                </div>

                                <div className='mb-3'>
                                    <CFormLabel>Nama Ibu</CFormLabel>
                                    <CFormInput
                                        name='nama_ibu'
                                        type="text"
                                        onChange={props.handleforminput}
                                        required
                                        value={props.forminput.nama_ibu}
                                    />
                                </div>
                                <div className='mb-3 d-flex'>
                                    <div className='mb-3'>
                                        <CFormLabel>Pendidikan Ibu</CFormLabel>
                                        <CFormSelect
                                            name='pendidikan_ibu_id'
                                            onChange={props.handleforminput}
                                            required
                                            value={props.forminput.pendidikan_ibu_id}
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
                                            required
                                            value={props.forminput.pekerjaan_ibu_id}
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
                                            required
                                            value={props.forminput.tanggal_lahir_ibu}
                                        />
                                    </div>
                                </div>

                                <div className='mb-3'>
                                    <CFormLabel>Nama Wali</CFormLabel>
                                    <CFormInput
                                        name='nama_wali'
                                        type="text"
                                        onChange={props.handleforminput}
                                        value={props.forminput.nama_wali}
                                    />
                                </div>
                                <div className='mb-3 d-flex'>
                                    <div className='mb-3'>
                                        <CFormLabel>Pendidikan Wali</CFormLabel>
                                        <CFormSelect
                                            name='pendidikan_wali_id'
                                            onChange={props.handleforminput}
                                            value={props.forminput.pendidikan_wali_id}
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
                                            value={props.forminput.pekerjaan_wali_id}
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
                                            value={props.forminput.tanggal_lahir_wali}
                                        />
                                    </div>
                                </div>
                </>
                :
                ""
             }

             {
                props.page === "pesertadidikbantuan" && props.typeform  === "edit" ||props.typeform ==="detail" ?
                <>
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
                </>
                :
                ""
             }
                            
        </>
    )
}

export default FormPesertaDidik