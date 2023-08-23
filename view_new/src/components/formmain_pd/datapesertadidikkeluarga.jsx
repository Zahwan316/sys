import React, { useState, useEffect } from 'react';
import TablePesertaDidik from './table';
import { useParams } from 'react-router-dom';
import useStore from 'src/state';

const DataPesertaDidikKeluarga = (props) => {
    const tablehead = [    
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
            <h5>Nama Siswa : {props.namasiswa}</h5>
            <TablePesertaDidik 
                page='pesertadidikkeluarga'
                tablehead={tablehead}
            />
        </>
    )
}

export default DataPesertaDidikKeluarga