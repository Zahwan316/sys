import React, { useState, useEffect } from 'react';
import TablePesertaDidik from './table';
import ModalPesertaDidik from './modal';
import useStore from 'src/state';

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

    const[forminput,setforminput] = useState({
        no_kks: "",
        no_kps: "",
        penerima_kps: "",
        no_kip: "",
        layak_kip: "",
        alasan_layak_pip: "",
        nama_di_kip: ""
    })
    const[modal,setmodal] = useState(false)
    const[editedid,seteditedid] = useState()
    const[typeform,settypeform] = useState()
    const pesertadidik = useStore((state)  => state.pesertadidik)

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

    useEffect(()=> {
        const getdata = async() => {
            try{

            }
            catch(e){

            }
        }
    },[editedid])

    return(
        <>
            <h5>Nama Siswa : {props.namasiswa}</h5>
            <TablePesertaDidik 
                page="pesertadidikbantuan"
                tablehead={tablehead}
                getTypeBtn={getTypeBtn}
                handlemodal={handlemodal}
            />

            {
                modal && 
                    <ModalPesertaDidik 
                        page="pesertadidikbantuan"
                        forminput={forminput}
                        handleforminput={handleforminput}
                        handlemodal={handlemodal}
                        typeform={typeform}                                            
                    />
            }
        </>
    )
}

export default DataPesertaDidikBantuan;