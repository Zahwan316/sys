import React, { useState, useEffect } from 'react';
import TableMain from '../table';
import ModalProgramPage from './modal';
import axios from 'axios';
import {v4 as uuidv4} from "uuid"
import Swal from 'sweetalert2';
import { CFormLabel, CFormSelect } from '@coreui/react';
import usePtkStore from 'src/state/ptk';
import useJadwalStore from 'src/state/jadwal';
import useRefStore from 'src/state/ref';
import useKurikulumStore from 'src/state/kurikulum';

const JadwalPage = (props) => {
    const[dataJadwal,setdatajadwal] = useJadwalStore((state) => [state.jadwal_kbm,state.setjadwalkbm])
    const[dataJadwalRaw,setdatajadwalraw] = useState([])
    const[dataMapel,setdatamapel] = useRefStore((state) => [state.kbm_mapel_sp,state.setkbmmapelsp])
    const[dataRombel,setdatarombel] = useKurikulumStore((state) => [state.kurikulum_rombongan_belajar,state.setkurikulumrombonganbelajar])
    const[dataHari,setdatahari] = useRefStore((state) => [state.hari,state.sethari])
    const[dataWaktuKbm,setdatawaktukbm] = useJadwalStore((state) => [state.waktu_kbm,state.setwaktukbm])
    const[dataTugasMengajar,setdatatugasmengajar] = usePtkStore((state) => [state.ptk_tugas_mengajar,state.setptktugasmengajar])
    const[dataGuru,setdataguru] = usePtkStore((state) => [state.ptk,state.setptk])
    const[selectedTugasMengajar,setselectedtugasmengajar] = useState()

    const[typeform,settypeform] = useState()
    const[itemid,setitemid] = useState()
    const[modal,setmodal] = useState(false)
    const[updater,setupdater] = useState()
    const[isload,setisload] = useState(false)
    const[loading,isloading] = useState(true)
    const[mapelid,setmdapelid] = useState()
    const[selectmapelid,setselectmapelid] = useState()

    const[forminput,setforminput] = useState({
        ptk_penugasan_id:null,
        ptk_id:null,
        rombongan_belajar_id:null,
        hari_ke:null,
        jam_ke:null,
        tanggal:null,
    })

    const handleresetform = () => {
        setforminput({
            ptk_penugasan_id:null,
            ptk_id:null,
            rombongan_belajar_id:null,
            hari_ke:null,
            jam_ke:null,
            tanggal:null
        })
    }


    //header table
    const tablehead = [    
        "Mapel",
        "Guru",
        "Rombel",
        "Hari",
        "Jam Ke",
        "Waktu Mulai",
        "Waktu Berakhir"
    ]

    const tablehead_industri = [
        "Mapel",
        "Guru",
        "Kelas",
        "Tanggal",
    ]

    useEffect(() => {
        //console.log(selectedTugasMengajar)
       /*  console.log(selectmapelid)
        console.log(dataJadwalRaw)
        console.log(forminput)
        console.log(props.page) */
        console.log(forminput)
    })

    //ketika id edit dan delete ditemukan
    useEffect(() => {
        const getData = async() => {
            try{
                if(typeform === "edit" || typeform==="detail"){
                    let response = await axios.get(`${process.env.REACT_APP_LINK}jadwal_kbm/id/${itemid}`)
                
                    const data = response.data.data
                    const newtugasmengajar_raw = dataTugasMengajar.find(item => item.ptk_penugasan_id === data.ptk_penugasan_id )
                    const newtugasmengajar = newtugasmengajar_raw

                    let mapelid_raw = dataTugasMengajar.filter(item => 
                        item.ptk_penugasan_id === data.ptk_penugasan_id && 
                        item.ptk_id === newtugasmengajar.ptk_id ? 
                            item.mapel_sp_id
                            : 
                            ""
                    )
                    let mapelid = mapelid_raw[0].mapel_sp_id
                    
                    setforminput({
                        ptk_penugasan_id:data.ptk_penugasan_id,
                        ptk_id:newtugasmengajar.ptk_id,
                        rombongan_belajar_id:data.rombongan_belajar_id,
                        hari_ke:data.hari_ke,
                        jam_ke:data.jam_ke,
                        tanggal:data.tanggal
                    })
                    setmdapelid(mapelid)
                    
                }
                else{
                    setforminput({
                        ptk_penugasan_id:null,
                        ptk_id:null,
                        rombongan_belajar_id:null,
                        hari_ke:null,
                        jam_ke:null,
                        tanggal:null
                    })
                }
            }
            catch(e){
                console.log(e)
            }
        }
        getData()
    },[itemid])

    //ketika form guru terisi
    useEffect(() => {
        const getData = async() => {
            try{
                let response = await axios.get(`${process.env.REACT_APP_LINK}ptk_tugas_mengajar/ptkid/${forminput.ptk_penugasan_id}`)
                setselectedtugasmengajar(response.data.data)
            }
            catch(e){
                console.log(e)
            }
        }
        getData()
    },[forminput.ptk_penugasan_id])

    useEffect(() => {
        const fetchdata = async() => {
            try{
                if(Object.keys(dataGuru).length === 0)
                {
                    let res = await axios.get(`${process.env.REACT_APP_LINK}ptk`)
                    setdataguru(res.data.data)
                }
                if(Object.keys(dataJadwal).length === 0)
                {
                    let res = await axios.get(`${process.env.REACT_APP_LINK}jadwal_kbm`)
                    setdatajadwal(res.data.data)
                }
                if(Object.keys(dataMapel).length === 0)
                {
                    let res = await axios.get(`${process.env.REACT_APP_LINK}kbm_mapel_sp`)
                    setdatamapel(res.data.data)
                }
                if(Object.keys(dataRombel).length === 0)
                {
                    let res = await axios.get(`${process.env.REACT_APP_LINK}kurikulum_rombongan_belajar`)
                    setdatarombel(res.data.data)
                }
                if(Object.keys(dataHari).length === 0)
                {
                    let res = await axios.get(`${process.env.REACT_APP_LINK}hari`)
                    setdatahari(res.data.data)
                }
                if(Object.keys(dataWaktuKbm).length === 0)
                {
                    let res = await axios.get(`${process.env.REACT_APP_LINK}waktu_kbm`)
                    setdatawaktukbm(res.data.data)
                }
                if(Object.keys(dataTugasMengajar).length === 0)
                {
                    let res = await axios.get(`${process.env.REACT_APP_LINK}ptk_tugas_mengajar`)
                    setdatatugasmengajar(res.data.data)
                }    
            }
            catch(e){

            }
        }
        fetchdata()
    },[])

    //ketika mata pelajaran terpilih
    useEffect(() => {
        const getData = async() => {
            try{
                let response = await axios.get(`${process.env.REACT_APP_LINK}jadwal_kbm/`)
                let response_tugas = await axios.get(`${process.env.REACT_APP_LINK}ptk_tugas_mengajar/${selectmapelid}`)
                let datamain = response.data.data
                let datatugas = response_tugas.data.data
                let dataraw = datatugas.filter(item => datamain.filter(items => items.ptk_penugasan_id == item.ptk_penugasan_id && items))
                let emptydata = []
                datatugas.map((item) => 
                    datamain.map(items => 
                            items.ptk_penugasan_id == item.ptk_penugasan_id && 
                            emptydata.push(items)
                        )
                )
                console.log(emptydata)
                setdatajadwalraw(emptydata)


            }
            catch(e){

            }
        }
        getData()
    },[selectmapelid])

    const handleInput = (e) => {
        setforminput({...forminput,[e.target.name]:e.target.value})
    }

    const getTypeBtn = (typebtn,id) => {
        setitemid(id)
        settypeform(typebtn)

        if(typebtn === "tambah"){
            handleresetform()
        }
    }

    const handlemodal = (e) => {
        setmodal(!modal)
    }

    const handlemapelid = (e) => {
        setmdapelid(e.target.value)
    }

    const guruOnblur = (e) => {
        let ptk_penugasan;
        if(e.target.value != null && e.target.value != ''){
            let ptk_penugasan_raw =  dataTugasMengajar.filter((item,index) => forminput.ptk_id === item.ptk_id && mapelid === item.mapel_sp_id ?
                item.ptk_penugasan_id
                :
                null
            )
            if(ptk_penugasan_raw[0] != undefined)
            {
                console.log(ptk_penugasan_raw)
                ptk_penugasan = ptk_penugasan_raw[0].ptk_penugasan_id
            }
            else{
                ptk_penugasan = null
            }
            
            setforminput({...forminput,ptk_penugasan_id:ptk_penugasan})
        }
        else{
            ptk_penugasan = null
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        

        const sendData = async() => {
            try{
                if(typeform === "tambah"){
                    let response = await axios.post(`${process.env.REACT_APP_LINK}jadwal_kbm`,forminput)
                    Swal.fire({
                        title:"Data berhasil ditambahkan",
                        text:"Terima Kasih telah menambah data",
                        icon:"success",
                
                    })             
                }
                else if(typeform === "edit"){
                    let response = await axios.put(`${process.env.REACT_APP_LINK}jadwal_kbm/${itemid}`,forminput)
                    Swal.fire({
                        title:"Data berhasil diedit",
                        text:"Terima Kasih telah mengedit data",
                        icon:"success",
                
                    })      
                }
                setupdater(uuidv4())
                setisload(true)
                setTimeout(() => {
                    setisload(false)
                },500)
            }
            catch(e){
                console.log(e)
                Swal.fire({
                    title:"Error",
                    text:e.message,
                    icon:"error",
            
                })
            }
        }
        sendData()
    }

    const handleChangeId = (e) => {
        setselectmapelid(e.target.value)
    }
    
    return(
        <>        
            <>
                <CFormLabel>Mata Pelajaran</CFormLabel>
                <CFormSelect
                    onChange={handleChangeId}
                >
                    <option>Silahkan Pilih Mata Pelajaran</option>
                    {
                        dataMapel.map((item) => 
                            props.page === "jadwalreguler" ?
                                (
                                    item.is_industri == 0 &&
                                        <option value={item.mapel_sp_id}>{item.nama}</option>

                                )
                                :
                                (
                                    item.is_industri == 1 &&
                                        <option value={item.mapel_sp_id}>{item.nama}</option>

                                )
                                )
                    }
                </CFormSelect>
            </>

        
        <TableMain 
            page={props.page}
            tablehead={props.page === "jadwalreguler" ? tablehead : tablehead_industri}
            handleModal={handlemodal}
            getTypeBtn={getTypeBtn}
            selectmapelid={selectmapelid}
            datajadwal={dataJadwalRaw}
            updater={updater}
            isload={isload}
        />
       {
        modal && 
        <ModalProgramPage 
            page={props.page}
            handleModal={handlemodal}
            title={typeform === "tambah" ? "Tambah data" : (typeform === "edit" ? "Edit Data" :"Detail Data")}
            dataJadwal={dataJadwal}
            dataMapel={dataMapel}
            dataRombel={dataRombel}
            dataHari={dataHari}
            dataWaktuKbm={dataWaktuKbm}
            dataTugasMengajar={dataTugasMengajar}
            dataGuru={dataGuru}
            handleforminput={handleInput}
            forminput={forminput}
            formtype={typeform}
            selectedTugasMengajar={selectedTugasMengajar}
            setmapelid={handlemapelid}
            mapelid={mapelid}
            handlesubmit={handleSubmit}
            guruonblur={guruOnblur}

        />
       }
        </>
    )
}

export default JadwalPage