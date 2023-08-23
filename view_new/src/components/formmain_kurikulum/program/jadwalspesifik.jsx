import React, { useState, useEffect } from 'react';
import TableMain from '../table';

const JadwalSpesifik = (props) => {
    const tablehead = [
        "Mapel",
        "Guru",
        "Kelas",
        "Hari_ke",
        "Jam_ke",
        "Tanggal",
    ]

    useEffect(() => {
        console.log(props.ptk_id.id)
    })

    return(
        <>
            <TableMain 
                page="jadwalspesifik"
                tablehead={tablehead}
                ptk_id={props.ptk_id}
            />
        </>
    )
}

export default JadwalSpesifik