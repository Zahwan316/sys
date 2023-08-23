import React, { useState, useEffect } from 'react';
import TablePesertaDidik from './table';

const DataPesertaDidikBantuan = (props) => {
    const tablehead = [
        
        "No KKS",
        "No KPS",
        "Penerima KPS",
        'No KIP',
        "Layak KIP",
        "Alasan Layak PIP",
        "Nama Di KIP"
    ]
    
    return(
        <>
            <h5>Nama Siswa : {props.namasiswa}</h5>
            <TablePesertaDidik 
                page="pesertadidikbantuan"
                tablehead={tablehead}
            />
        </>
    )
}

export default DataPesertaDidikBantuan;