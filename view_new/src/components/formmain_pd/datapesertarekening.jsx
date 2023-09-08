import React, { useState, useEffect } from 'react';
import TablePesertaDidik from './table';
import { useParams } from 'react-router-dom';
import ModalPesertaDidik from './modal';
import axios from 'axios';
import Swal from "sweetalert2"
import {v4 as uuidv4} from "uuid"

const PesertaDidikRekening = (props) => {
    const tablehead = [
        "Nama Bank",
        "Nomor Rekening",
        "Rekening Atas Nama",
        
    ]
    const{id} = useParams()
    const[modal,setmodal] = useState(false)
    const[editedid,seteditedid] = useState()
    const[typeform,settypeform] = useState()
    const[updater,setupdater] = useState()
    const[isload,setisload] = useState(false)
    const[forminput,setforminput] = useState({
        peserta_didik_id:id,
        id_bank:null,
        no_rekening:null,
        rekening_atas_nama:null,
    })

    const handleModal = () => {
        setmodal(!modal)
    }

    const handleforminput = (e) => {
        setforminput({...forminput,[e.target.name]:e.target.value})
    }

    const getTypeBtn = (typebtn,id) => {
        settypeform(typebtn)
        seteditedid(id)
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
                text:"Terima kasih sudah mengisi data"
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

    const handlesubmit = (e) => {
        e.preventDefault()

        if(typeform === "tambah"){
            PostPutSubmit("peserta_didik_rekening","post")
        }
        else if (typeform === "edit"){
            PostPutSubmit(`peserta_didik_rekening/${editedid}`,"put")
        }
    }

    const handleIdBank = (option) => {
        setforminput({...forminput,id_bank:option.value})
    }

    useEffect(() => {
        console.log(forminput)
    })

    useEffect(() => {
        const getItem = async() => {
            try{
                if(typeform === "edit"){
                    let response = await axios.get(`${process.env.REACT_APP_LINK}peserta_didik_rekening/${editedid}`)
                    const data = response.data.data
                    setforminput({
                        peserta_didik_id:id,
                        id_bank:data.id_bank,
                        no_rekening:data.no_rekening,
                        rekening_atas_nama:data.rekening_atas_nama,
                    })
                }
                else{
                    setforminput({
                        peserta_didik_id:id,
                        id_bank:"",
                        no_rekening:"",
                        rekening_atas_nama:"",
                    })
                }
            }
            catch(e){
                console.log(e)
            }
        }
        getItem()
    },[editedid])

    return(
        <>
            <h5>Nama Siswa : {props.namasiswa}</h5>
            <TablePesertaDidik 
                page="pesertadidikrekening"
                tablehead={tablehead}
                handlemodal={handleModal}
                getTypeBtn={getTypeBtn}
                updater={updater}
                isload={isload}
            />

            {
                modal && 
                <ModalPesertaDidik 
                    page="pesertadidikrekening"
                    handlemodal={handleModal}
                    handlesubmit={handlesubmit}
                    forminput={forminput}
                    handleforminput={handleforminput}
                    handleidbank = {handleIdBank}
                    title={typeform === "tambah" ? "Tambah data" : (typeform === "edit"? "Edit data" : "Detail data")}
                />
            }
        </>
    )
}

export default PesertaDidikRekening