import React, { useState, useEffect } from 'react';
import TablePtk from './table';
import ModalPtk from './modal';
import useFormPtkStore from 'src/state/form/ptkform';
import axios from 'axios';
import Swal from 'sweetalert2';
import {v4 as uuidv4} from "uuid"

const PtkKepegawaian = (props) => {
    const tablehead = [
        "NIP",
        "NUPTK",
        "NUKS",
        "Karpeg",
        "Karpas",
        "Status Kepegawaian",
        "Jenis PTK",
        "TMT Pengangkatan"
    ]

    const[modal,setmodal] = useState(false)
    const[editedid,setediteid] = useState()
    const[typeform,settypeform] = useState()
    const[updater,setupdater] = useState()
    const setdata = useFormPtkStore((state) => state.setform)
    const forminput = useFormPtkStore((state) => state)
    
    const handleModal = () => {
        setmodal(!modal)
    }

    const getTypeBtn = (typebtn,id) => {
        setediteid(id)
        settypeform(typebtn)
    }

    useEffect(() => {
        const refetch_data = async() => {
            try{
                let res = await axios.get(`${process.env.REACT_APP_LINK}ptk/${editedid}`)
                const data =  res.data.data
                for(const key in data){
                    setdata(key,data[key])
                }  
                
            }
            catch(e){
                console.log(e)
            }
        }
        refetch_data()

    },[editedid])

    const PutData = async() => {
        try{
            let res = await axios.put(`${process.env.REACT_APP_LINK}ptk/edit/kepegawaian/${editedid}`,forminput)
            Swal.fire({
                icon:'success',
                title: 'Berhasil',
                text: 'Data berhasil diubah'
            })
            setupdater(uuidv4())
        }
        catch(e){
            console.log(e)
        }
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()

        PutData()
    }

    return(
        <>
            <h5>Nama Ptk : {props.namaptk} </h5>
            <TablePtk 
                tablehead={tablehead}
                page="ptkkepegawaian"
                getTypeBtn={getTypeBtn}
                handlemodal={handleModal}
                updater={updater}
            />

            {
                modal &&
                <ModalPtk 
                    page="ptkkepegawaian"
                    handlemodal={handleModal}
                    title={typeform === "edit" ? "Edit Data" : "Detail Data"}
                    typeform={typeform}
                    handlesubmit={handleSubmit}
                />
            }
        </>
    )
}

export default PtkKepegawaian;