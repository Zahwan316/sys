import React, { useState, useEffect } from 'react';
import TablePtk from './table';

const PtkBiodata = () => {
    const tablehead = [
        "Nama",
        "Jenis Kelamin",
        "Tempat Lahir",
        "Tanggal Lahir",
        "Agama",
        "NIK",
        "No_KK"
    ]

    return(
        <>
            <h5>Nama Ptk : </h5>
            <TablePtk 
                tablehead={tablehead}
                page="ptkbiodata"
            />
        </>
    )
}

export default PtkBiodata;