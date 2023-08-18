import React, { useState, useEffect } from 'react';
import TablePesertaDidik from './table';
import ModalPesertaDidik from './modal';
import axios from 'axios';
import {v4 as uuidv4} from "uuid"

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

    const[modal,setmodal] = useState(false)
    const[editedid,seteditedid] = useState()
    const[typeform,settypeform] = useState()
    const[dataAgama,setdataagama] = useState([])
    const[dataKewarganegaraan,setdatakewarganegaraan] = useState([])
    const[updater,setupdater] = useState()
    
    useEffect(() => {
        const getData = async() => {
            try{
                let response_agama = await axios.get(`${process.env.REACT_APP_LINK}agama`)
                let response_kewarganegaraan = await axios.get(`${process.env.REACT_APP_LINK}jenis_kewarganegaraan`)

                setdataagama(response_agama.data.data)
                setdatakewarganegaraan(response_kewarganegaraan.data.data)
            }
            catch(e){
                console.log(e)
            }
        }
        getData()
    },[])

    useEffect(() => {
        console.log(editedid)
    })

    const handlemodal = () => {
        setmodal(!modal)
    }

    const getTypeBtn = (typebtn,id) => {
        seteditedid(id)
        settypeform(typebtn)
    }

    const handlesubmit = (e) => {
        e.preventDefault()
    }

    return(
        <>
            <TablePesertaDidik
                tablehead={tablehead}
                page="pesertadidikbiodata"
                handlemodal={handlemodal}
                getTypeBtn={getTypeBtn}
            />
            {
                modal && 
                <ModalPesertaDidik 
                    page='pesertadidikbiodata'
                    handlemodal={handlemodal}
                    handlesubmit={handlesubmit}
                    dataagama={dataAgama}
                    datakewarganegaraan={dataKewarganegaraan}
                    title={typeform === "tambah" ? "Tambah Data" : (typeform === "edit" ? "Edit Data" : "Detail Data")}
                />
            }
        </>
    )
}

export default DataPesertaDidikMain