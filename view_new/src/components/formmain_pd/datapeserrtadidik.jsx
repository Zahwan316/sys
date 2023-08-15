import React, { useState, useEffect } from 'react';
import TablePesertaDidik from './table';


const DataPesertaDidikMain = () => {
    const tablehead = [
        "Nama",
        "NIPD",
        "NISN",
        "Jenis Kelamin",
        "Tempat Lahir",
        "Tanggal Lahir",
        "Agama",
        "Kewarganegaraan",

    ]
    
    
    return(
        <>
            <TablePesertaDidik
                tablehead={tablehead}
                page="pesertadidikbiodata"
            />
        </>
    )
}

export default DataPesertaDidikMain