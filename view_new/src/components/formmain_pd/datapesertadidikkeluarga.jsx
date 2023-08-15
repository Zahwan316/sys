import React, { useState, useEffect } from 'react';
import TablePesertaDidik from './table';

const DataPesertaDidikKeluarga = () => {
    const tablehead = [
        "Nama",
        "Anak Ke Berapa",
        'Jumlah Saudara Kandung',
        "Nama Ayah",
        "Tanggal Lahir Ayah",
        "Pendidikan Ayah",
        "Pekerjaan Ayah",
        "Nama Ibu",
        "Tanggal Lahir Ibu",
        "Pendidikan Ibu",
        "Pekerjaan Ibu",
    ]

    return(
        <>
            <TablePesertaDidik 
                page='pesertadidikkeluarga'
                tablehead={tablehead}
            />
        </>
    )
}

export default DataPesertaDidikKeluarga