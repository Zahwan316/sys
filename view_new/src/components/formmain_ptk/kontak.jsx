import React, { useState, useEffect } from 'react';
import TablePtk from './table';

const PtkKontak = (props) => {
    const tablehead = [
        "Email",
        "No HP",
        "No Telpon Rumah",
    ]
    return(
        <>
            <h5>Nama Ptk : {props.namaptk} </h5>
            <TablePtk 
                tablehead={tablehead}
                page="ptkkontak"
            />
        </>
    )
}

export default PtkKontak;