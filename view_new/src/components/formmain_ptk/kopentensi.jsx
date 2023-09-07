import React, { useState, useEffect } from 'react';
import TablePtk from './table';
import useFormPtkStore from 'src/state/form/ptkform';
import axios from 'axios';
import Swal from 'sweetalert2';
import {v4 as uuidv4} from "uuid"
import { get } from 'lodash';
import ModalPtk from './modal';

const PtkKompetensi = (props) => {
    const tablehead = [
        "Punya Lisensi Kepala Sekolah",
        "Keahlian Laboratorium",
        "Mampu Menangani Kebutuhan Khusus",
        "Keahlian Braille",
        "Keahlian Bahasa Isyarat"
    ]
    const[modal,setmodal] = useState(false)
    const[editedid,setediteid] = useState()
    const[typeform,settypeform] = useState()
    const[updater,setupdater] = useState()
    const setdata = useFormPtkStore((state) => state.setform)
    const forminput = useFormPtkStore((state) => state)
    const[isload,setisload] = useState(false)
    
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
            let res = await axios.put(`${process.env.REACT_APP_LINK}ptk/edit/kompetensi/${editedid}`,forminput)
            Swal.fire({
                icon:'success',
                title: 'Berhasil',
                text: 'Data berhasil diubah'
            })
            setupdater(uuidv4())
            setisload(true)
            setTimeout(() => {
                setisload(false)
            },500)
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
                page="ptkkompetensi"
                handlemodal={handleModal}
                updater={updater}
                getTypeBtn={getTypeBtn}
                isload={isload}
            />

            {
                modal &&
                <ModalPtk 
                    page='ptkkompetensi'
                    title={typeform == "edit" ? "Edit Data" : "Detail Data"}
                    handlesubmit={handleSubmit}
                    handlemodal={handleModal}
                    typeform={typeform}
                />
            }
        </>
    )
}

export default PtkKompetensi;