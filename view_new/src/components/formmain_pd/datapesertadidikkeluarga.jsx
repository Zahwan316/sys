import React, { useState, useEffect } from 'react';
import TablePesertaDidik from './table';
import { useParams } from 'react-router-dom';
import useStore from 'src/state';
import ModalPesertaDidik from './modal';
import axios from 'axios';
import Swal from 'sweetalert2';
import {v4 as uuidv4} from "uuid"

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
    const[forminput,setforminput] = useState({
        nik:null,
        anak_keberapa:null,
        jumlah_saudara_kandung:null,
        nama_ayah:null,
        pendidikan_ayah_id:null,
        pekerjaan_ayah_id:null,
        tanggal_lahir_ayah:null,
        nama_ibu:null,
        pendidikan_ibu_id:null,
        pekerjaan_ibu_id:null,
        tanggal_lahir_ibu:null,
        nama_wali:null,
        pendidikan_wali_id:null,
        pekerjaan_wali_id:null,
        tanggal_lahir_wali:null,
        no_kk:null,
    })

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
   }

   useEffect(() => {
        console.log(forminput)
   })

   useEffect(() => {
        const getData = async() => {
            try{
                const getPesertaDidik_object = pesertadidik.filter(item => item.peserta_didik_id === editedid)
                const getPesertadidik = getPesertaDidik_object[0]
                setforminput({
                    nik:getPesertadidik.nik,
                    anak_keberapa:getPesertadidik.anak_keberapa,
                    jumlah_saudara_kandung:getPesertadidik.jumlah_saudara_kandung,
                    nama_ayah:getPesertadidik.nama_ayah,
                    pendidikan_ayah_id:getPesertadidik.pendidikan_ayah_id,
                    pekerjaan_ayah_id:getPesertadidik.pekerjaan_ayah_id,
                    tanggal_lahir_ayah:getPesertadidik.tanggal_lahir_ayah,
                    nama_ibu:getPesertadidik.nama_ibu_kandung,
                    pendidikan_ibu_id:getPesertadidik.pendidikan_ibu_id,
                    pekerjaan_ibu_id:getPesertadidik.pekerjaan_ibu_id,
                    tanggal_lahir_ibu:getPesertadidik.tanggal_lahir_ibu,
                    nama_wali:getPesertadidik.wali,
                    pendidikan_wali_id:getPesertadidik.pendidikan_wali_id,
                    pekerjaan_wali_id:getPesertadidik.pekerjaan_wali_id,
                    tanggal_lahir_wali:getPesertadidik.tanggal_lahir_wali,
                })
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
                    title="Edit Data"
                    forminput={forminput}
                />
            }
        </>
    )
}

export default DataPesertaDidikKeluarga