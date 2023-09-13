import { CFormCheck, CFormInput, CFormLabel, CFormSelect } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import useSekolahAlamatFormStore from 'src/state/form/sekolahalamat';

const AlamatFormModal = (props) => {
    const[forminput,setforminput] = useSekolahAlamatFormStore((state) => [state,state.setform])
    const[check,setcheck] = useState(false)
    const handleforminput = (e) => {
     const{name,value} = e.target
     setforminput(name,value)
    }

    const handlecheck = () => {
     setcheck(!check)
     const value = check ? 1: 0
     setforminput("keaktifan",value)
    }

    useEffect(() => {{
     console.log(forminput)
    }})

    return (
        <>
            <div className='mb-3'>
             <CFormLabel>
              Alamat Jalan
             </CFormLabel>
             <CFormInput
              type="text"
              name="alamat_jalan"
              onChange={handleforminput}
              value={forminput.alamat_jalan}
             />
            </div>

            <div className='d-flex mb-3'>
             <div className='mb-3'>
              <CFormLabel>
               RT
              </CFormLabel>
              <CFormInput
               type="number"
               name="rt"
               onChange={handleforminput}
               value={forminput.rt}
              />
             </div>
             <div className='mx-3'>
              <CFormLabel>
               RW
              </CFormLabel>
              <CFormInput
               type="number"
               name="rw"
               onChange={handleforminput}
               value={forminput.rw}
              />
             </div>
            </div>

            <div className='mb-3'>
             <CFormLabel>
              Nama Dusun
             </CFormLabel>
             <CFormInput
              type="text"
              name="nama_dusun"
              onChange={handleforminput}
              value={forminput.nama_dusun}
             />
            </div>

            <div className='mb-3 d-flex'>
             <div className='mb-3'>
              <CFormLabel>
                Kota
              </CFormLabel>
              <CFormSelect
               onChange={props.handlekodekota}
               value={forminput.kodekota}
              >
                <option>Pilih Kota</option>
                {
                    props.datakota.map(item => 
                     <option value={item.id_wilayah}>{item.nama}</option>    
                    )
                }
              </CFormSelect>
             </div>
             <div className='mx-3'>
              <CFormLabel>
                Kecamatan
              </CFormLabel>
              <CFormSelect
               onChange={props.handlekodekecamatan}
               value={forminput.kodekecamatan}
              >
                <option>Pilih Kecamatan</option>
                {
                    props.datakecamatan.map(item =>
                     <option value={item.id_wilayah}>{item.nama}</option>    
                    )
                }
              </CFormSelect>
             </div>
             <div className='mb-3'>
              <CFormLabel>
                Desa
              </CFormLabel>
              <CFormSelect
                name="kode_wilayah"
                onChange={props.handlekodedesa}
              >
                <option>Pilih Desa</option>
                {
                    props.datadesa.map(item => 
                     <option value={item.id_wilayah}>{item.nama}</option>
                    )
                }
              </CFormSelect>
             </div>
            </div>

            <div className='mb-3'>
             <CFormLabel>
                Kode Pos
             </CFormLabel>
             <CFormInput 
              type="number"
              name="kode_pos"
              onChange={handleforminput}
              value={forminput.kode_pos}
             />
            </div>

            <div className='mb-3 d-flex'>
             <div className='mb-3'>
              <CFormLabel>
                 Lintang
              </CFormLabel>
              <CFormInput 
               type="number"
               name="lintang"
               value={forminput.lintang}
              />
             </div>
             <div className='mx-3'>
              <CFormLabel>
                 Bujur
              </CFormLabel>
              <CFormInput 
               type="number"
               name="bujur"
               value={forminput.bujur}
              />
             </div>       
            </div>

            <div className='mb-3'>
             <CFormLabel>
                Terhitung Mulai Tanggal
             </CFormLabel>
             <CFormInput 
              type="Date"
              name="tmt"
              onChange={handleforminput}
              value={forminput.tmt}
             />
            </div>

            <div className='mb-3 d-flex'>
             <CFormCheck 
               onClick={handlecheck}
               defaultChecked={forminput.keaktifan}
             />
             <p className='mx-2'>Masih Aktif?</p>
            </div>
        </>
    )
}

export default AlamatFormModal