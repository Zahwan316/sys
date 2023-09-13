import React, { useState, useEffect } from 'react';
import TablePtk from './table';
import ModalPtk from './modal';
import usePesertaDidikStore from 'src/state/pesertadidik';
import axios from 'axios';
import { keyBy, startsWith } from 'lodash';
import usePtkAlamatFormStore from 'src/state/form/pttkalamat';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import {v4 as uuidv4} from "uuid"


const PtkAlamatPage = (props) => {
    const tablehead = [
        "Alamat Jalan",
        "RT",
        "RW",
        "Nama Dusun",
        "Kode Wilayah",
        "Kode Pos",
        "Lintang",
        "Bujur",
        "Keaktifan"
    ]
    const[modal,setmodal] = useState(false)
    const[typeform,settypeform] = useState()
    const[editedid,seteditedid] = useState()
    const[datawilayah,setdatawilayah] = usePesertaDidikStore((state) => [state.datawilayah,state.setdatawilayah])
    const[kodekota,setkodekota] = useState()
    const[kodekecamatan,setkodekecamatan] = useState()
    const[kodedesa,setkodedesa] = useState()
    const[namadesa,setnamadesa] = useState()
    const [forminput,setforminput] = usePtkAlamatFormStore((state) => [state,state.setform])
    const[updater,setupdater] = useState()
    const[isload,setisload] = useState()
    const resetform = usePtkAlamatFormStore((state) => state.resetform)
    //const forminput = usePtkAlamatFormStore((state) => state)
    const {id} = useParams()
    
    
    useEffect(() => {
        setforminput("ptk_id",id)
        const fetchData = async() => {
            if(Object.keys(datawilayah).length === 0)
            {
                let response = await axios.get(`${process.env.REACT_APP_LINK}wilayah`)
                const data = response.data.data
                const wilayahjabar = data.filter(item => item.id_wilayah.startsWith(32))
                setdatawilayah(wilayahjabar)
            }
        }
        fetchData()
    },[])

    useEffect(() => {
        setforminput("kode_wilayah",kodedesa)
        if(kodedesa){       
            const getdatawilayah = async() => {
                    let response_kota = await axios.get(`${process.env.REACT_APP_LINK}wilayah/kota/${kodekota}`)
                    let response_kecamatan = await axios.get(`${process.env.REACT_APP_LINK}wilayah/kota/${kodekecamatan}`)

                    const calldatalatlong = async(kota,kecamatan) => {
                        try{

                            let response_location = await axios.get(`${process.env.REACT_APP_LINK}location/${kota.toUpperCase()}/${kecamatan.toUpperCase()}/${namadesa}`)
                            let bujur = response_location.data.position.bujur
                            let lintang = response_location.data.position.lintang
                        /*  setdatalintang(lintang)
                            setdatabujur(bujur) */
                            setforminput("lintang",lintang.toFixed(5))
                            setforminput("bujur",bujur.toFixed(5))
                            
                        }
                        catch(e){
                            console.log(e)
                        }
                    }
                    if(response_kota != null && response_kecamatan != null){
                        calldatalatlong(response_kota.data.data.nama,response_kecamatan.data.data.nama)
                    }
            }
            getdatawilayah()
        }
    },[kodedesa])

    useEffect(() =>{
        const refetch_data = async() => {
            try{
                if(typeform === "edit"){
                    let res = await axios.get(`${process.env.REACT_APP_LINK}ptk_alamat/${editedid}`)
                    const data = res.data.data
                
                    for(const key in data){
                        setforminput(key,data[key])
                    }
                    setkodekota(data.kode_wilayah.substring(0,4))
                    setkodekecamatan(data.kode_wilayah.substring(0,6))
                }
            }
            catch(e){

            }
        }
        refetch_data()
    },[editedid])

    useEffect(() => {
        console.log(kodekota)
    })

    const resetallform = () => {
        resetform()
        setforminput("ptk_id",id)
        setkodekota()
        setkodekecamatan()
    }

    const datakota = datawilayah.filter(item => item.id_wilayah.length <= 4 )
    const handlekodekota = (e) => {
        setkodekota(e.target.value)
    }

    const datakecamatan = datawilayah.filter(item => {
        const kodekota_start = item.id_wilayah.startsWith(kodekota)
        if(item.id_wilayah.length > 4 && item.id_wilayah.length <= 6 && kodekota_start)
        {
            return item
        }
    })
    const handlekodekecamatan = (e) => {
        setkodekecamatan(e.target.value)
    }

    const datadesa = datawilayah.filter(item => {
        const kode_start = item.id_wilayah.startsWith(kodekecamatan)
        if(item.id_wilayah.length > 6 && kode_start){
            return item
        }
    })
    const handlekodedesa = (e) =>  {
        setkodedesa(e.target.value)
        const namadesa_object = datawilayah.find(item => item.id_wilayah === e.target.value)
        const namadesa_main = namadesa_object.nama || null
        setnamadesa(namadesa_main.toUpperCase())
    }


    const handlemodal = () => {
        setmodal(!modal)
       
    }

    const getTypBtn = (typebtn,id) => {
        settypeform(typebtn)
        seteditedid(id)
        if(typebtn === "tambah" ){
            resetallform()
        }
    }

    const PutPostData = async(url,method) => {
        try{    
            let res;
            switch(method){
                case "post":
                    res = await axios.post(`${process.env.REACT_APP_LINK}${url}`,forminput)
                    console.log(res)
                    break;
                case "put":
                    res = await axios.put(`${process.env.REACT_APP_LINK}${url}`,forminput)
                    break;

            }
            Swal.fire({
                icon:"success",
                title:"Data terkirim",
                text:`Terima kasih sudah ${method === "post" ? "menambah" : "mengedit"} data`
            })
            setupdater(uuidv4())
            setisload(true)
            setTimeout(() => {
                setisload(false)
            },500)
            resetform()
            setforminput("ptk_id",id)
        }
        catch(e){
            console.log(e)
        }
    }

    const handlesubmit = (e) => {
        e.preventDefault()

        if(typeform === "tambah"){
            PutPostData(`ptk_alamat`,"post")
        }
        else if(typeform === "edit"){
            PutPostData(`ptk_alamat/${editedid}`,"put")

        }
    }

    

    return (
        <>
            <h5>Nama Ptk : {props.namaptk}</h5>
            <TablePtk 
                tablehead={tablehead}
                page="ptkalamat"
                getTypeBtn={getTypBtn}
                handlemodal={handlemodal}
                updater={updater}
                isload={isload}
            />

            {
                modal &&
                <ModalPtk 
                    page="ptkalamat"
                    handlemodal={handlemodal}
                    title={typeform === "tambah" ? "Tambah Data" : (typeform === "edit" ? "Edit Data" : "Detail Data")}
                    datakota={datakota}
                    handlekodekota={handlekodekota}
                    kodekota={kodekota}
                    datakecamatan={datakecamatan}
                    handlekodekecamatan={handlekodekecamatan}
                    kodekecamatan={kodekecamatan}
                    datadesa={datadesa}
                    handlekodedesa={handlekodedesa}
                    handlesubmit={handlesubmit}
                    typeform={typeform}
                />
            }
        </>
    )
}

export default PtkAlamatPage;