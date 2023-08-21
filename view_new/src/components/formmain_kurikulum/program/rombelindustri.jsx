import React, { useState, useEffect } from 'react';
import TableMain from '../table';
import ModalProgramPage from './modal';

const RombelIndustri = () => {
    const tablehead = [
        "Semester",
        "Program",
        "Nama Rombel",
        "Tingkat",
        "Jenis Rombel"
    ]
    const[modal,setmodal] = useState(false)
    const[typeform,settypeform] = useState()
    const[editedid,seteditedid] = useState()

    const getTypeBtn = (typebtn,id) => {
        settypeform(typebtn)
        seteditedid(id)
    }

    const handlemodal = () => {
        setmodal(!modal)
    }

    return(
        <>
            <TableMain 
                tablehead={tablehead}
                page='rombelindustri'
                handleModal={handlemodal}
                getTypeBtn={getTypeBtn}
            />

            {
                modal &&
                <ModalProgramPage 
                    page='rombelindustri'
                    handleModal={handlemodal}
                />
            }
        </>
    )
}

export default RombelIndustri