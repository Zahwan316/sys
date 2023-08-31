import { CFormLabel,CButton } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import IdentitasForm from './biodata_form/identitas';
import KepegawaianForm from './biodata_form/kepegawaian';
import KompetensiForm from './biodata_form/kompetensi';
import KontakForm from './biodata_form/kontak';

const FormBiodata = () => {
    const[page,setpage] = useState(1)
    const[maxpage,setmaxpage] = useState(4)

    const handleprevpage = () => {
        setpage((prev) => prev -1)
    }

    const handlenextpage = () => {
        setpage((prev) => prev + 1)
    }

    useEffect(() => {
        if(page === maxpage){

        }
    },[page])

    useEffect(() => {
        console.log(page)
    })

    return(
        <>
            {
                page === 1 &&
                <>
                    <h5 className='mb-2'>Identitas</h5>
                    <IdentitasForm 
                    />
                </>
            }

            {
                page === 2 &&
                <>
                    <h5 className='mb-2'>Kepegawaian</h5>
                    <KepegawaianForm
                    />
                </>
            }

            {
                page === 3 &&
                <>
                    <h5 className='mb-2'>Kompetensi Khusus</h5>
                    <KompetensiForm 
                    />
                </>
            }

            {
                page === 4 &&
                <>
                    <h5 className='mb-2'>Kontak</h5>
                    <KontakForm /
                    >
                </>
            }

            <div className='mb-3'>
                {
                    page != 1 &&
                    <CButton style={{marginRight:"1em"}} onClick={handleprevpage}>Sebelumnya</CButton>
                }
                {
                    page != maxpage &&
                    <CButton onClick={handlenextpage}>Selanjutnya</CButton>
                }
            </div>
            <div className='d-flex justify-content-center'>
                <h5>{page}/{maxpage}</h5>
            </div>
        </>
    )
}

export default FormBiodata