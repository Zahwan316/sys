import React, { useState, useEffect } from 'react';
import TablePesertaDidik from './table';
import { useParams } from 'react-router-dom';
import useStore from 'src/state/pesertadidik';
import ModalPesertaDidik from './modal';
import axios from 'axios';
import Swal from 'sweetalert2';
import {v4 as uuidv4} from "uuid"
import useFormPesertaDidikStore from 'src/state/form/pesertadidik';

const DataPesertaDidikKeluarga = (props) => {
    const tablehead = [ 
        "No KK",
        "NIK",   
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
    const[modal,setmodal] = useState(false)
    const[typeform,settypeform] = useState()
    const[editedid,seteditedid] = useState()
    const pendidikan = useStore((state) => state.pendidikan)
    const pekerjaan = useStore((state) => state.pekerjaan)
    const pesertadidik = useStore((state) => state.pesertadidik)
    const[updater,setupdater] = useState()
    const[isload,setisload] = useState(false)
    const[forminput,setforminput] = useFormPesertaDidikStore((state) => [state,state.setform])

    const handleforminput = (e) => {
        setforminput({...forminput,[e.target.name]:e.target.value})
    }
   
   const handlemodal = ()=> {
        setmodal(!modal)
   }

   const getTypeBtn = (typebtn,id) => {
        settypeform(typebtn)
        seteditedid(id)
   }

   const submiteditdata = async(url) => {
        try{
            let response = await axios.put(`${process.env.REACT_APP_LINK}${url}`,forminput)
            Swal.fire({
                icon:"success",
                title:"Data terkirim",
                text:"Terima kasih sudah mengedit data"
            })
        }
        catch(e){
            console.log(e)
        }
   }

   const handleSubmit = (e) => {
        e.preventDefault()

        submiteditdata(`peserta_didik/edit/keluarga/${editedid}`)
        setupdater(uuidv4())
        setisload(true)
        setTimeout(() => {
            setisload(false)
        }, 500);
   }

   useEffect(() => {
        console.log(forminput)
   })

   useEffect(() => {
        const getData = async() => {
            try{
                const getPesertaDidik_object = pesertadidik.filter(item => item.peserta_didik_id == editedid)
                const getPesertadidik = getPesertaDidik_object[0]
                for(let key in getPesertadidik) 
                {
                    setforminput(key, getPesertadidik[key])
                }
                console.log(getPesertadidik)
            }   
            catch(e){
                console.log(e)
            }
        }
        getData()
   },[editedid])
    
    


    return(
        <>
            <h5>Nama Siswa : {props.namasiswa}</h5>
            <TablePesertaDidik 
                page='pesertadidikkeluarga'
                tablehead={tablehead}
                handlemodal={handlemodal}
                getTypeBtn={getTypeBtn}
                updater={updater}
                isload={isload}
            />
            {
                modal &&
                <ModalPesertaDidik 
                    typeform={typeform}
                    handlemodal={handlemodal}
                    page="pesertadidikkeluarga"
                    datapendidikan={pendidikan}
                    datapekerjaan={pekerjaan}
                    handleforminput={handleforminput}
                    handlesubmit={handleSubmit}
                    title={typeform === "edit" ? "Edit data" : "Detail data"}
                    forminput={forminput}
                />
            }
        </>
    )
}

export default DataPesertaDidikKeluarga