import React, { useState, useEffect } from 'react';
import TablePtk from './table';

const PtkKepegawaian = (props) => {
    const tablehead = [
        "NIP",
        "NUPTK",
        "NUKS",
        "Karpeg",
        "Karpas",
        "Status Kepegawaian",
        "Jenis PTK"
    ]
    
    return(
        <>
            <TablePtk 
                tablehead={tablehead}
                page="ptkkepegawaian"
            />
        </>
    )
}

export default PtkKepegawaian;