import React, { useState, useEffect } from 'react';
import TablePesertaDidik from './table';

const DataPesertaDidikBantuan = () => {
    const tablehead = [
        "Nama",
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
            <TablePesertaDidik 
                page="pesertadidikbantuan"
                tablehead={tablehead}
            />
        </>
    )
}

export default DataPesertaDidikBantuan;