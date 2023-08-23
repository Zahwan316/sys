import React, { useState, useEffect } from 'react';
import TablePesertaDidik from './table';

const PesertaDidikRekening = (props) => {
    const tablehead = [
        "Nama Bank",
        "Nomor Rekening",
        "Rekening Atas Nama",
        
    ]

    return(
        <>
            <h5>Nama Siswa : {props.namasiswa}</h5>
            <TablePesertaDidik 
                page="pesertadidikrekening"
                tablehead={tablehead}
            />
        </>
    )
}

export default PesertaDidikRekening