import { CButton } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import BiodataPesertaDidikForm from './form_page/biodata';
import KeluargaPesertaDidikForm from './form_page/keluarga';
import LainnyaPesertaDidikForm from './form_page/lainnya';

const PesertaDidikFormPage = (props) => {
    const[page,setpage] = useState(1)
    const[maxpage,setmaxpage] = useState(3)

    const handleprevpage = () => {
        setpage(prev => prev - 1)
    }

    const handlenextpage = () => {
        setpage(prev => prev + 1)
    }

    return(
        <>
            <div className='mb-3'>
                {
                    page === 1 &&
                    <BiodataPesertaDidikForm 
                    
                    />
                }
                {
                    page === 2 &&
                    <KeluargaPesertaDidikForm 
                    
                    />
                }
                {
                    page === 3 &&
                    <LainnyaPesertaDidikForm />
                }
            </div>
            <div className='mb-3'>
                {
                    page != 1 &&
                    <CButton onClick={handleprevpage}>Sebelumnya</CButton>
                }
                {
                    page != maxpage &&
                    <CButton className='mx-3' onClick={handlenextpage}>Selanjutnya</CButton>
                }
            </div>
            <div className='d-flex justify-content-center'>
                <h5>{page}/{maxpage}</h5>
            </div>
        </>
    )
}

export default PesertaDidikFormPage;