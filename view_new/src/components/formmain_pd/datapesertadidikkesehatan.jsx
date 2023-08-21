import React, { useState, useEffect } from 'react';
import TablePesertaDidik from './table';

const DataPersertaDidikKesehatan = () => {
    const tablehead = [
        "Nama",
        "Buta Warna",
        "Berat Badan",
        "Tinggi Badan",
        "Lingkar Kepala",
        "Visus Mata",
        "ldl",
        "Hdl",
        "Gula Darah",
        "Tekanan Darah",
        "Tanggal Test"
    ]
    
    return(
        <>
            <TablePesertaDidik 
                page="pesertadidikkesehatan"
                tablehead={tablehead}
            />
        </>
    )
}

export default DataPersertaDidikKesehatan