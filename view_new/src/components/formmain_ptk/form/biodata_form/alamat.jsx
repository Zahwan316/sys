import { CFormCheck, CFormInput, CFormLabel, CFormSelect } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import usePtkAlamatFormStore from 'src/state/form/pttkalamat';
import usePesertaDidikStore from 'src/state/pesertadidik';
import useRefStore from 'src/state/ref';

const PtkAlamatForm = (props) => {
    const[forminput,setforminput] = usePtkAlamatFormStore((state) => [state,state.setform])
    const[datakota,setdatakota] = usePesertaDidikStore((state) => [state.datakota,state.setdatakota])
    const[check,setcheck] = useState(false)

    const handleforminput = (e) => {
        setforminput(e.target.name,e.target.value)
    }

    const handlecheck = (e) => {
        setcheck(!check)
        const value = check ? 0 : 1
        setforminput("keaktifan",value)
    }

    useEffect(() => {
        const fetchdata = () => {

        }
    },[])

    useEffect(() => {
        console.log(forminput)
    })

    return(
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
            <div className='mb-3 d-flex'>
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
                    onChange={handleforminput}
                    name="nama_dusun"
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
                        value={props.kodekota}
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
                        value={props.kodekecamatan}
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
                        value={forminput.kode_wilayah}
                   >
                        <option>Pilih Desa</option>
                        {
                            props.datadesa != null &&
                            props.datadesa.map(item => 
                                <option value={item.id_wilayah}>{item.nama}</option>    
                            )
                        }
                   </CFormSelect>
                </div>
            </div>
            <div className='mb-3'>
                <CFormLabel>
                    Kode pos
                </CFormLabel>
                <CFormInput 
                    type="number"
                    onChange={handleforminput}
                    name="kode_pos"
                    maxLength={5}
                    //max={5}
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
                        value={forminput.lintang}
                    />
                </div>
                <div className='mx-3'>
                    <CFormLabel>
                        Bujur
                    </CFormLabel>
                    <CFormInput 
                        type="number"
                        value={forminput.bujur}
                    />
                </div>
            </div>
            <div className='mb-3'>
                <CFormLabel>
                    TMT
                </CFormLabel>
                <CFormInput 
                    type="date"
                    onChange={handleforminput}
                    name="tmt"
                    value={forminput.tmt}
                />
            </div>
            <div className='mb-3 d-flex'>
                <CFormCheck 
                    onClick={handlecheck}
                    onChange={handlecheck}
                    checked={forminput.keaktifan == 1}
                    defaultChecked={forminput.keaktifan == 1}
                />
                <p className='mx-2'>Masih Aktif?</p>
            </div>

        </>
    )
}

export default PtkAlamatForm;