import React, { useState, useEffect } from 'react';
import TablePtk from './table';
import ModalPtk from './modal';
import useFormPtkStore from 'src/state/form/ptkform';
import Swal from 'sweetalert2';
import axios from 'axios';
import {v4 as uuidv4} from "uuid"

const PtkBiodata = (props) => {
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
    const forminput = useFormPtkStore((state) => state)
    const resetform = useFormPtkStore((state) => state.resetform)
    const setform = useFormPtkStore((state) => state.setform)
    const[updater,setupdater] = useState()
    const[isload,setisload] = useState(false)

    const handlemodal = () => {
        setmodal(!modal)
        !modal && resetform()
    }

    const getTypeBtn = (typebtn,id) => {
        seteditedid(id)
        settypeform(typebtn)
    }

    const PostPutSubmit = async(url,method) => {
        try{ 
            switch (method){
                case "post":
                    await axios.post(`${process.env.REACT_APP_LINK}${url}`,forminput)
                    break;  
                case "put":
                    await axios.put(`${process.env.REACT_APP_LINK}${url}`,forminput)
                    break;

            }

            Swal.fire({
                icon:"success",
                title:"Data terkirim",
                text:"Terima kasih sudah mengisi data"
            })

            resetform()
            setupdater(uuidv4())
        }
        catch(e){

            console.log(e)
            Swal.fire({
                icon:"error",
                title:"Failure",
                text:`Maaf Terjadi Kesalahan : ${e.message}`
            })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if(typeform === "tambah"){
            PostPutSubmit(`ptk`,"post")
        }
        else if(typeform === "edit"){
            PostPutSubmit(`ptk/${editedid}`,"put")

        }
        setisload(true)
        setTimeout(() => {
            setisload(false)
        },500)
    }

    useEffect(() => {
        const getdata = async() => {
            try{
                if(typeform === "edit"){
                    const res = await axios.get(`${process.env.REACT_APP_LINK}ptk/${editedid}`)
                    const data = res.data.data
                    for(const key in data){
                        setform(key, data[key])
                    }
                }
                else if(typeform === "tambah"){
                    resetform()
                }
            }
            catch(e){
                console.log(e)
            }
        }
        getdata()
    },[editedid]);

    useEffect(() => {
        if(typeform == "tambah"){
            resetform()
        }
    },[typeform]);

    useEffect(() => {
        console.log(forminput)
    })

    return(
        <>
            <h5>Nama Ptk : {props.namaptk} </h5>
            <TablePtk 
                tablehead={tablehead}
                page="ptkbiodata"
                handlemodal={handlemodal}
                getTypeBtn={getTypeBtn}
                updater={updater}
                isload={isload}
            />

            {
                modal &&
                <ModalPtk 
                    page="ptkbiodata"
                    handlemodal={handlemodal}
                    typeform={typeform}
                    handlesubmit={handleSubmit}
                    title={typeform === "tambah" ? "Tambah Data" : (typeform === "edit" ? "Edit Data" : "Detail Data")}
                />
            }
        </>
    )
}

export default PtkBiodata;