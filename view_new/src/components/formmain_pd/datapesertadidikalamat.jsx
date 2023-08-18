import React, { useState, useEffect } from 'react';
import TablePesertaDidik from './table';

const DataPesertaDidikAlamat = () => {
    const tablehead = [
        "Nama",
        "RT",
        "RW",
        "Dusun",
        "Kode Wilayah",
        "Kode Pos",
        "Lintang",
        "Bujur",
        "Jenis Tinggal",
        "Jarak Ke Sekolah",
        "Keaktifan"
    ]

    return(
        <>
            <TablePesertaDidik 
                page='pesertadidikalamat'
                tablehead={tablehead}
            />
        </>
    )
}

export default DataPesertaDidikAlamat