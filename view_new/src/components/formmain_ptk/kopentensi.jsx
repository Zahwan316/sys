import React, { useState, useEffect } from 'react';
import TablePtk from './table';

const PtkKompetensi = () => {
    const tablehead = [
        "Punya Lisensi Kepala Sekolah",
        "Keahlian Laboratorium",
        "Mampu Menangani Kebutuhan Khusus",
        "Keahlian Braille",
        "Keahlian Bahasa Isyarat"
    ]

    return(
        <>
            <TablePtk 
                tablehead={tablehead}
                page="ptkkompetensi"
            />
        </>
    )
}

export default PtkKompetensi;