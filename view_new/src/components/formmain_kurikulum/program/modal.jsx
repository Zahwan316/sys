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
import Select from "react-select"

const ModalProgramPage = (props) => {
    return(
        <CModal visible={true} size='lg' onClose={props.handleModal}>
            <form onSubmit={props.handlesubmit}>
            <CModalHeader>
                <CModalTitle>{props.title}</CModalTitle>
            </CModalHeader>
            <CModalBody>
                {
                    props.page === "jenis" &&
                    <div>
                        <div className='mb-3'>
                            <CFormLabel>Jenis</CFormLabel>
                            <CFormSelect
                                name="kurikulum_kode"
                                onChange={props.handleforminput}
                                value={props.forminput.kurikulum_kode}
                            >
                                <option value="">Pilih kurikulum</option>
                                {
                                    props.kurikulum.map((item,index) => 
                                        <option value={item.kurikulum_kode}>{item.deskripsi}</option>
                                    )
                                }
                            </CFormSelect>
                        </div>
                        <div className='mb-3'>
                            <CFormLabel>TMT</CFormLabel>
                            <CFormInput
                                type="date"
                                name="tmt"
                                onChange={props.handleforminput}
                                value={props.forminput.tmt}
                                />
                        </div>
                        <div className='mb-3 d-flex'>
                            <input 
                            type='checkbox'
                            onClick={props.handlechecked}
                            value={props.forminput.keaktifan}
                            />
                            <p className='mb-0 mx-2'>Masih Aktif?</p>
         
                        </div>
                    </div>
                }

                {
                    props.page === "program" &&
                    <div>
                        <div className='mb-3'>
                            <CFormLabel>Jenis Kurikulum</CFormLabel>
                            <CFormSelect
                                name="kurikulum_sp"
                                onChange={props.handleforminput}
                                value={props.forminput.kurikulum_sp}
                            >
                                <option>Pilih Kurikulum</option>
                                {
                                    /* props.kurikulum.map((item,index) => 
                                        <option value={item.kurikulum_kode} >
                                            {
                                                item.deskripsi
                                            }
                                        </option>
                                    ) */
                                    props.kurikulumspdata.map((item,index) => 
                                            item.kurikulum_sp_id == props.kurikulum_sp_id_code && item.keaktifan === 1 ?
                                            props.kurikulum.map((data,index) => 
                                                data.kurikulum_kode == item.kurikulum_kode &&
                                                <option value={item.kurikulum_sp_id}>{data.deskripsi}</option>
                                            )
                                            :
                                            ""
                                    )
                                }
                                
                            </CFormSelect>
                        </div>

                        <div className='d-flex flex-wrap'>

                        

                        <div className='mb-3'>
                            <CFormLabel>Program</CFormLabel>
                            <CFormInput
                                name="jurusan_id"
                                onChange={props.handleforminput}
                                list='data'
                                value={props.forminput.jurusan_id}
                                />
                                <datalist id="data">
                                    
                                {
                                    props.jurusan.map((item,index) => 
                                    <option value={item.jurusan_id}>
                                        {
                                            
                                            item.nama_jurusan
                                        }
                                    </option>
                                    )
                                }
                                </datalist>
                            
                        </div>
                        
                        </div>

                        <div className='mb-3'>
                            <CFormLabel>No.SK Izin</CFormLabel>
                            <CFormInput
                                name="no_sk_izin"
                                value={props.forminput.no_sk_izin}
                                onChange={props.handleforminput}
                            />
                        </div>
                        <div className='mb-3'>
                            <CFormLabel>Tanggal SK Izin</CFormLabel>
                            <CFormInput
                                type="date"
                                name="tanggal_sk_izin"
                                onChange={props.handleforminput}
                                value={props.forminput.tanggal_sk_izin}
                            />
                        </div>
                        <div className='mb-3'>
                            <input
                                type="checkbox"
                                onClick={props.handlecheck}
                                value={props.forminput.keaktifan}
                                checked={props.forminput.keaktifan === 1}
                                />
                            <CFormLabel className='mx-2'>Masih Aktif ?</CFormLabel>
                        </div>
                    </div>
                }

                {
                    props.page === "rombel" &&
                    <div>
                        <div className='mb-3'>
                            <CFormLabel>Semester</CFormLabel>
                            <CFormSelect
                                name="semester_id"
                                onChange={props.handleforminput}
                                value={props.forminput.semester_id}
                            >
                                <option>Pilih Semester</option>
                                {
                                    props.dataSemester.map((item,index) => 
                                        item.periode_aktif != 0 &&
                                        <option value={item.semester_id}>{item.nama}</option>
                                    )
                                }
                            </CFormSelect>

                        </div>
                        <div className='mb-3'>
                            <CFormLabel>Program</CFormLabel>
                            <CFormSelect
                                name="kurikulum_program_id"
                                onChange={props.handleforminput}
                                value={props.forminput.kurikulum_program_id}
                            >
                                <option>Pilih Program</option>
                                {
                                    props.dataProgram.map((item,index) => 
                                        props.dataJurusan.map((items,index) => 
                                            items.jurusan_id === item.jurusan_id && item.keaktifan > 0 ?
                                            <option value={item.kurikulum_program_id}>{items.nama_jurusan}</option>
                                            :
                                            ""
                                        )
                                    )
                                }
                            </CFormSelect>
                        </div>
                        <div className='mb-3'>
                            <CFormLabel>Tingkat</CFormLabel>
                            <CFormSelect
                                name="tingkat_pendidikan_id"
                                onChange={props.handleforminput}
                                value={props.forminput.tingkat_pendidikan_id}
                            >
                                <option>Pilih Tingkat</option>
                                {
                                    props.dataTingkat.map((item,index) => 
                                        <option value={item.tingkat_pendidikan_id}>{item.nama}</option>
                                    )
                                }
                            </CFormSelect>
                        </div>
                        <div className='mb-3'>
                            <CFormLabel>Nama Rombel</CFormLabel>
                            <CFormInput
                                name="nama"
                                onChange={props.handleforminput}
                                value={props.forminput.nama}
                            >

                            </CFormInput>
                        </div>
                        <div className='mb-3'>
                            <CFormLabel>Jenis Rombel</CFormLabel>
                            <CFormSelect
                                name="jenis_rombel"
                                onChange={props.handleforminput}
                                value={props.forminput.jenis_rombel}
                            >
                                <option>Pilih Jenis Rombel</option>
                                {
                                    props.dataJenisRombel.map((item,index) => 
                                        <option value={item.jenis_rombel}>{item.nm_jenis_rombel}</option>
                                    )
                                }
                            </CFormSelect>
                        </div>
                    </div>
                }

                {
                    props.page === "tugas" &&
                    <div>
                        <div className='mb-3'>
                            <CFormLabel>Nama Guru</CFormLabel>
                            <CFormSelect
                                type="text"
                                name="ptk_id"
                                onChange={props.handleinput}
                                value={props.forminput.ptk_id}
                            >
                                <option>Pilih Guru</option>
                                {  
                                    props.refguru.map((items,index) => 
                                            <option value={items.ptk_id}>
                                                {items.nama}
                                            </option>
                                        )  
                                }
                            </CFormSelect>
                        </div>
                        <div className='mb-3'>
                            <CFormLabel>Jumlah Jam</CFormLabel>
                            <CFormInput 
                                type="number"
                                name='jumlah_jam'
                                onChange={props.handleinput}
                                value={props.forminput.jumlah_jam}
                            />
                        </div>
                        <div className='mb-3'>
                            <CFormLabel>Semester</CFormLabel>
                            <CFormSelect
                                name="semester_id"
                                onChange={props.handleinput}
                                value={props.forminput.semester_id}
                            >
                                <option>Pilih Semester</option>
                                {
                                    props.semester.map((item,index) => 
                                        <option value={item.semester_id}>{item.nama}</option>
                                    )
                                }
                            </CFormSelect>
                        </div>

                    </div>
                }

                {
                    props.page === "jadwal" &&
                    <div>
                        <div className='mb-3'>
                            <CFormLabel>Mapel</CFormLabel>
                            <CFormSelect
                                name="mapelid"
                                onChange={props.setmapelid}
                                value={props.mapelid}
                            >
                                <option>Pilih Mapel</option>
                                {
                                  props.dataMapel.map((item,index) => 
                                        <option value={item.mapel_sp_id}>{item.nama}</option>
                                  )
                                }
                            </CFormSelect>

                        </div>
                        
                        <div className='mb-3'>
                            <CFormLabel>Guru</CFormLabel>
                            <CFormSelect
                                name="ptk_id"
                                onChange={props.handleforminput}
                                value={props.forminput.ptk_id}
                                onBlur={props.guruonblur}
                            >
                                <option >Pilih Guru</option>
                                {
                                    props.dataTugasMengajar.map((item,index) => 
                                        props.dataGuru.map((items,index) => 
                                            item.mapel_sp_id === props.mapelid &&
                                            items.ptk_id === item.ptk_id &&
                                            <option value={items.ptk_id}>{items.nama}</option>
                                        )
                                    )
                                }

                                {/* {
                                    props.dataGuru.map((item,index) => 
                                        <option value={item.ptk_id}>{item.nama}</option>
                                    )
                                } */}
                            </CFormSelect>
                        </div>
                        <div className='mb-3'>
                            <CFormLabel>Rombel</CFormLabel>
                            <CFormSelect
                                name="rombongan_belajar_id"
                                onChange={props.handleforminput}
                                value={props.forminput.rombongan_belajar_id}
                            >
                                <option >Pilih Rombel</option>
                                {
                                    props.dataRombel.map((item,index) => 
                                        <option value={item.rombongan_belajar_id}>{item.nama}</option>
                                    )
                                }
                            </CFormSelect>
                        </div>
                        <div className='mb-3'>
                            <CFormLabel>Hari</CFormLabel>
                            <CFormSelect
                                name="hari_ke"
                                onChange={props.handleforminput}
                                value={props.forminput.hari_ke}
                            >
                                <option>Pilih Hari</option>
                                {
                                    props.dataHari.map((item,index) => 
                                        <option value={item.hari_ke}>{item.nama}</option>
                                    )
                                }
                            </CFormSelect>
                        </div>
                        <div className='mb-3'>
                            <CFormLabel>Jam Ke</CFormLabel>
                            <CFormInput
                                 name="jam_ke"
                                 onChange={props.handleforminput}
                                 value={props.forminput.jam_ke}
                                 list='data'
                            />
                            <datalist id='data'>
                            {
                                    props.dataWaktuKbm.map((item,index) => 
                                       item.hari_ke == props.forminput.hari_ke &&
                                        <option value={item.jam_ke}>
                                            {item.waktu1} - {item.waktu2}
                                        </option>
                                    )
                                }
                            </datalist>

                            {/* <CFormSelect
                                name="jam_ke"
                                onChange={props.handleforminput}
                                value={props.forminput.jam_ke}
                            >
                                <option>Pilih Jam</option>
                                {
                                    props.dataWaktuKbm.map((item,index) => 
                                       item.hari_ke == props.forminput.hari_ke &&
                                       <option>{item.jam_ke}</option>
                                    )
                                }
                            </CFormSelect> */}
                            
                        </div>
                        <CFormInput
                                name="ptk_penugasan_id"
                                onChange={props.handleforminput}
                                value={props.forminput.ptk_penugasan_id}
                                readOnly
                                style={{opacity:0}}
                            />
                                {/* <option>Data untuk ptk_penugasan_id</option>
                                {
                                    props.dataTugasMengajar.map((item,index) => 
                                        props.forminput.ptk_id === item.ptk_id && props.mapelid === item.mapel_sp_id ?
                                            <option>{item.ptk_penugasan_id}</option>
                                        :
                                        ""
                                    )
                                } */}
                           
                    </div>
                }

                {
                    props.page === "mapelnasional" && 
                    <div>
                        <div className='mb-3'>
                            <CFormLabel>Mata Pelajaran</CFormLabel>
                            <Select 
                                onChange={props.handleselectoption}
                                name="nama"
                                value={props.forminput.value}
                                options={
                                    props.refmapel.map((item,index) => 
                                        {
                                            let data = {
                                                value:item.mapel_kode,
                                                label:item.nama
                                            }
                                            return data
                                        }
                                    )
                                } 
                                components={{DropdownIndicator: props => <div {...props} name="nama" />}}
                            />
                            {/* <CFormSelect >
                                <option>Pilih Mapel</option>
                                {
                                    props.refmapel.map((item,index) => 
                                        <option>{item.nama}</option>
                                    )
                                }
                            </CFormSelect> */}
                        </div>
                        <div className='mb-3'>
                            <CFormLabel>Urutan</CFormLabel>
                            <CFormInput 
                                onChange={props.handleforminput}
                                name="urutan"
                                value={props.forminput.urutan}
                            />
                        </div>
                        <div className='mb-3'>
                            <CFormLabel>Kelompok</CFormLabel>
                            <CFormInput
                                name="kelompok"
                                onChange={props.handleforminput}
                                value={props.forminput.kelompok}
                            />
                        
                           
                        </div>
                    </div>
                }

                {
                    props.page === "mapelindustri" &&
                    <div>
                        <div className='mb-3'>
                            <CFormLabel>Mata Pelajaran</CFormLabel>
                            <CFormInput
                                name="nama"
                                onChange={props.handleforminput}
                                value={props.forminput.nama}
                                onBlur={props.handlemapelkode}
                            />
                        </div>
                        <div className='mb-3'>
                            <CFormLabel>Urutan</CFormLabel>
                            <CFormInput
                                name="urutan"
                                onChange={props.handleforminput}
                                value={props.forminput.urutan}
                            />
                        </div>
                        <div className='mb-3'>
                            <CFormLabel>Kelompok</CFormLabel>
                            <CFormInput
                                name="kelompok"
                                onChange={props.handleforminput}
                                value="B"
                                readOnly
                            />
                        </div>
                    </div>
                }


            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" onClick={props.handleModal}>Close</CButton>
                {
                    props.formtype != "detail"?
                    <CButton color="primary" type="submit">Save changes</CButton>
                    :
                    ""
                }
            </CModalFooter>
            </form>
        </CModal>
    )
}

export default ModalProgramPage
