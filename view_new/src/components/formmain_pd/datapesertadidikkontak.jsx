import React, { useState, useEffect } from 'react';
import TablePesertaDidik from './table';
import useStore from 'src/state';

const PesertaDidikKontak = () => {
    const tablehead = [
        
        "Nomor Telepon Rumah",
        "Nomor Telepon Seluler",
        "Email",
        "Twitter",
        "Facebok",
        "Instagram",
        "Youtube"
    ]
    const[modal,setmodal] = useState(false)
    const[typeform,settypeform] = useState()
    const[editedid,seteditedid] = useState()
    
    const handlemodal = () => {
        setmodal(!modal)
    }

    const data = useStore((state) => state.data)

    useEffect(() => {
        console.log(data)
    })
    return(
        <>
            <TablePesertaDidik 
                tablehead={tablehead}
                page='pesertadidikkontak'
                handlemodal={handlemodal}
            />

        </>
    )
}

export default PesertaDidikKontak