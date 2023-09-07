import React, { useState, useEffect } from 'react';
import TablePesertaDidik from './table';
import ModalPesertaDidik from './modal';
import useStore from 'src/state/pesertadidik';
import axios from 'axios';
import Swal from 'sweetalert2';
import {v4 as uuidv4}from "uuid"
import useFormPesertaDidikStore from 'src/state/form/pesertadidik';

const DataPesertaDidikBantuan = (props) => {
    const tablehead = [
        "No KKS",
        "No KPS",
        "Penerima KPS",
        'No KIP',
        "Layak KIP",
        "Alasan Layak PIP",
        "Nama Di KIP"
    ]

    const[forminput,setforminput] = useFormPesertaDidikStore((state) => [state,state.setform])
    const[modal,setmodal] = useState(false)
    const[editedid,seteditedid] = useState()
    const[typeform,settypeform] = useState()
    const pesertadidik = useStore((state)  => state.pesertadidik)
    const dataalasanlayakpip = useStore((state) => state.alasanlayakpip)
    const[updater,setupdater] = useState()
    const[isload,setisload] = useState(false)

    const handleforminput = (e) => {
        setforminput({
                  ...forminput,
                    [e.target.name]: e.target.value
                })
    }

    const handlemodal = () => {
        setmodal(!modal)
    }

    const getTypeBtn = (typebtn,id)=> {
        settypeform(typebtn)
        seteditedid(id)
    }

    const handleLayakpip = (option) => {
        setforminput({...forminput,alasan_layak_pip:option.value})
    }

    const PutData = async(url) => {
        try{
            let response = await axios.put(`${process.env.REACT_APP_LINK}${url}`,forminput)
            Swal.fire({
                icon:"success",
                title:"Data terkirim",
                text:"Terima kasih sudah mengedit data"
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

    const handleSubmit= (e) => {
        e.preventDefault()  

        PutData(`peserta_didik/edit/bantuan/${editedid}`)
    }

    useEffect(()=> {
        const getdata = async() => {
            try{
                let databantuan_object = pesertadidik.filter(item => item.peserta_didik_id === editedid)
                let databantuan = databantuan_object[0]
                setforminput({
                    no_kks: databantuan.no_kks,
                    no_kps: databantuan.no_kps,
                    penerima_kps: databantuan.penerima_kps,
                    no_kip: databantuan.no_kip,
                    layak_pip: databantuan.layak_pip,
                    alasan_layak_pip: databantuan.alasan_layak_pip,
                    nama_di_kip: databantuan.nama_di_kip,
                    penerima_kip:databantuan.penerima_kip,
                   
                })

            }
            catch(e){   
                console.log(e)  
            }
        }
        getdata()
    },[editedid])

    useEffect(() =>{
       console.log(forminput)
    })

    return(
        <>
            <h5>Nama Siswa : {props.namasiswa}</h5>
            <TablePesertaDidik 
                page="pesertadidikbantuan"
                tablehead={tablehead}
                getTypeBtn={getTypeBtn}
                handlemodal={handlemodal}
                updater={updater}
                isload={isload}
            />

            {
                modal && 
                    <ModalPesertaDidik 
                        page="pesertadidikbantuan"
                        title={typeform === "edit" ? "Edit Data" : "Detail Data" }  
                        forminput={forminput}
                        handleforminput={handleforminput}
                        handlemodal={handlemodal}
                        typeform={typeform}  
                        dataalasanlayakpip={dataalasanlayakpip}   
                        handleLayakpip={handleLayakpip}   
                        handlesubmit={handleSubmit}                                    
                    />
            }
        </>
    )
}

export default DataPesertaDidikBantuan;