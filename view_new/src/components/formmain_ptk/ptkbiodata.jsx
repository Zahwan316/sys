import React, { useState, useEffect } from 'react';
import TablePtk from './table';
import ModalPtk from './modal';

const PtkBiodata = () => {
    const tablehead = [
        "Nama",
        "Jenis Kelamin",
        "Tempat Lahir",
        "Tanggal Lahir",
        "Agama",
        "NIK",
        "No_KK",
        "Kewarganegaraan"
    ]
    const[modal,setmodal] = useState(false)
    const[typeform,settypeform] = useState()
    const[editedid,seteditedid] = useState()

    const handlemodal = () => {
        setmodal(!modal)
    }

    const getTypeBtn = (typebtn,id) => {
        seteditedid(id)
        settypeform(typebtn)
    }


    return(
        <>
            <h5>Nama Ptk : </h5>
            <TablePtk 
                tablehead={tablehead}
                page="ptkbiodata"
                handlemodal={handlemodal}
                getTypeBtn={getTypeBtn}
            />

            {
                modal &&
                <ModalPtk 
                    page="ptkbiodata"
                    handlemodal={handlemodal}
                    typeform={typeform}
                    title={typeform === "tambah" ? "Tambah Data" : (typeform === "edit" ? "Edit Data" : "Detail Data")}
                />
            }
        </>
    )
}

export default PtkBiodata;