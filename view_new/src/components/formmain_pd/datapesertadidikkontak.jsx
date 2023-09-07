import React, { useState, useEffect } from 'react';
import TablePesertaDidik from './table';
import useStore from 'src/state/pesertadidik';
import { useParams } from 'react-router-dom';
import ModalPesertaDidik from './modal';
import axios from 'axios';
import Swal from 'sweetalert2';
import {v4 as  uuidv4} from "uuid"

const PesertaDidikKontak = (props) => {
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
    const {id} = useParams()
    const[typeform,settypeform] = useState()
    const[editedid,seteditedid] = useState()
    const[isload,setisload] = useState(false)
    const[forminput,setforminput] = useState({
        peserta_didik_id:id,
        nomor_telepon_rumah:null,
        nomor_telepon_seluler:null,
        email:null,
        twitter:null,
        facebook:null,
        instagram:null,
        youtube:null

    })
    const[updater,setupdater] = useState([])

    const handleform = (e) => {
        setforminput({...forminput,[e.target.name]:e.target.value})
    }
    const getTypeBtn = (typebtn,id) => {
        settypeform(typebtn)
        seteditedid(id)
    }
    const handlemodal = () => {
        setmodal(!modal)
    }
    const PostPutSubmit = async(url,method) => {
        try{
            if(method === "post"){
                let response = await axios.post(`${process.env.REACT_APP_LINK}${url}`,forminput)
            }   
            else if(method === "put"){
                let response = await axios.put(`${process.env.REACT_APP_LINK}${url}`,forminput)
            }     
            Swal.fire({
                icon:"success",
                title:"Data terkirim",
                text:`Terima kasih sudah ${method === "post" ? "Mengisi" : "Mengedit"} data`
            })
            setupdater(uuidv4())    
            setisload(true)
            setTimeout(() => {
                setisload(false)
            }, 500);
        }
        catch(e){
            console.log(e)
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        
        if(typeform === "tambah"){
            PostPutSubmit("peserta_didik_kontak","post")      
        }
        else if(typeform === "edit"){
            PostPutSubmit(`peserta_didik_kontak/${editedid}`,"put")
        }
    }

    useEffect(() => {      
        const getItem = async() => {
            try{
                if(typeform === "edit"){
                    let response = await axios.get(`${process.env.REACT_APP_LINK}peserta_didik_kontak/${editedid}`)
                    const data = response.data.data
                    setforminput({
                        peserta_didik_id:id,
                        nomor_telepon_rumah:data.nomor_telepon_rumah,
                        nomor_telepon_seluler:data.nomor_telepon_seluler,
                        email:data.email,
                        twitter:data.twitter,
                        facebook:data.facebook,
                        instagram:data.instagram,
                        youtube:data.youtube
                })
                }
                else if(typeform === "tambah"){
                    setforminput({
                        peserta_didik_id:id,
                        nomor_telepon_rumah:"",
                        nomor_telepon_seluler:"",
                        email:"",
                        twitter:"",
                        facebook:"",
                        instagram:"",
                        youtube:""
                    })
                }
            }
            catch(e){
                console.log(e)
            }
        }
        getItem()
        
    },[editedid])

    useEffect(() => {
        console.log(forminput)
    })
    return(
        <>
            <h5>Nama Siswa : {props.namasiswa}</h5>
            <TablePesertaDidik 
                tablehead={tablehead}
                page='pesertadidikkontak'
                handlemodal={handlemodal}
                getTypeBtn={getTypeBtn}
                updater={updater}
                isload={isload}
            />

            {
                modal &&
                <ModalPesertaDidik 
                    page='pesertadidikkontak'
                    handlemodal={handlemodal}
                    handleforminput={handleform}
                    forminput={forminput}
                    handlesubmit={handleSubmit}
                    title={typeform === "tambah" ? "Tambah Data" : (typeform === "edit" ? "Edit Data" : "Detail Data")}
                />
            }

        </>
    )
}

export default PesertaDidikKontak