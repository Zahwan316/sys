import React, { useState, useEffect } from 'react';
import TablePtk from './table';

const PtkKontak = () => {
    const tablehead = [
        "Email",
        "No HP",
        "No Telpon Rumah",
    ]
    return(
        <>
            <TablePtk 
                tablehead={tablehead}
                page="ptkkontak"
            />
        </>
    )
}

export default PtkKontak;