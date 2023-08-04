import React, { useState, useEffect } from 'react';
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CForm,
    CFormInput,
    CFormLabel,
    CFormTextarea,
    CRow,
    CButtonGroup,
    CFormCheck,
    CFormSelect,
    CTable,
    CSpinner,
    CTableHead,
    CTableBody,
    CModal,
    CModalBody,
    CModalHeader,
    CModalTitle,
    CModalFooter
    
  } from '@coreui/react'
import "../../assets/css/tabel.css"
import axios from 'axios';
import {debounce, dropRight} from "lodash"
import FormDropdown from './form-dropdown/form-dropdown';
import Swal from 'sweetalert2';
import sweetAlert from 'sweet-alert';
import DataForm from './dataform/dataform';
import {v4 as uuidv4} from "uuid"

const AlamatForm = (props) => {
    const[dataWilayah,setdatawilayah] = useState([]);
    const[loading,setloading] = useState(true);
    const[kodewilayah,setkodewilayah] = useState()
    const[namawilayah,setnamawilayah] = useState()
    const[kecamatandata,setkecamatandata] = useState([]);
    const[desadata,setdesadata] = useState()
    const[kodekota,setkodekota] = useState();
    const[kodekecamatan,setkodekecamatan] = useState();
    const[loadingData,setloadingdata] = useState(false)
    const[dataAlamat,setdalaalamat] = useState([])
    const[dataSekolah,setdatasekolah] = useState([])
    const[updater,setupdater] = useState([]);
    const[sekolahidcode,setsekolahid] = useState(localStorage.getItem("sekolah_id"))

    const[forminput,setforminput] = useState({
        sekolah_id:sekolahidcode,
        alamatjalan:"",
        rt:"",
        rw:"",
        alamatjalan:"",
        namadusun:"",
        kodewilayah:"",
        kodepos:"",
        lintang:"",
        bujur:"",
        tmt:"",
        keaktifan:"",
        kdkecamatan:"",
        kdkota:""
    })
    const[kodedesa,setkodedesa] = useState()
    //longitude state
    const [position,setposition] = useState({
        lintang:"",
        bujur:""
    })
    //modal state
    const[isclicked,setisclicked] = useState(false)
    //judul tabel
    const tablehead = [
        "Sekolah",
        "Alamat",
        "RT",
        "RW",
        "Nama Dusun",
        "Desa",
        "Kode Pos",
        "Lintang",
        "Bujur",
        "Action"

    ]
    //filter data provinsi
    const provinsi = dataWilayah.filter(item => {
        const jabar = item.id_wilayah.startsWith(32);
        if(item.id_wilayah.length <= 2 && jabar){
            return item
        }
    })
    //filter data kota
    const kota = dataWilayah.filter(item => {
        const jabar = item.id_wilayah.startsWith(32);
        if(item.id_wilayah.length > 2 && item.id_wilayah.length < 5 && jabar){
            return item
        }
    })
    //filter data kecamatan
    const kecamatan = dataWilayah.filter(item => {
        let jabar = item.id_wilayah.startsWith(kodekota);
        let datakecamatan;
        if(item.id_wilayah.length > 4 && item.id_wilayah.length < 7 && jabar){
            datakecamatan = item
        }
        return datakecamatan
    })
    //memfilter data daerah
    const desa = dataWilayah.filter(item => {
        const jabar = item.id_wilayah.startsWith(32)
         if(item.id_wilayah.length > 6 && jabar){    
                return item  
            }
        })
    const[typeform,settypeform] = useState()
    const[iditem,setiditem] = useState();
    const[clickededit,setclickededit] = useState(false);
        //untuk menyimpan kode wilayah
    const handleKodeWilayah = (e) => {     
            setnamawilayah(e.target.value)
            setloadingdata(true)           
    }
        
        //meyimpan kode provinsi
    const handleKodeProvinsi = (e) => {
            let kodeProv = provinsi.filter(item => item.nama === e.target.value)
            console.log(kodeProv)
    }
        //menyimpan kode kota
    const handleKodeKota = (e) => {
            setkodekota(e.target.value)
            console.log(e.target.value)
    }

    const handleKodeKecamatan = (e) => {
            setkodekecamatan(e.target.value)
    }
        
    const handleKodeDesa = (e) => {
            setkodedesa(e.target.value)
            setkodewilayah(e.target.value)
            setforminput({...forminput,kodewilayah:e.target.value})
            let filternama = desa.filter(item => item.id_wilayah === e.target.value)
            let namewilayah = filternama[0].nama
            setnamawilayah(namewilayah)
            console.log(namewilayah)
    }
    //state untuk edit
    const[editkodekota,seteditkodekota] = useState()
    const[editkodekecamatan,seteditkodekecamatan] = useState()

    useEffect(() => {
            const getWilayah = async() => {
                try{
                    const response = await axios.get(process.env.REACT_APP_LINK + "wilayah");      
                    const response_alamat = await axios.get(process.env.REACT_APP_LINK + "sekolah_alamat")  
                    const response_sekolah = await axios.get(process.env.REACT_APP_LINK + "sekolah_identitas")
                    
                    const datawilayahmain = response.data.data
    
                    //filter data kota
                    const kotajabar = datawilayahmain.filter((item,index) => {
                        let kodejabar = item.id_wilayah.startsWith(32);
                        if(item.id_wilayah.length > 2 && item.id_wilayah.length < 5 && kodejabar){
                            return item
                        }
                    })
    
                    //filter data kecamatan
                    const kecamatanjabar = datawilayahmain.filter((item,index) => {
                        let kodejabar = item.id_wilayah.startsWith(32);
                        if(item.id_wilayah.length > 4 && item.id_wilayah.length < 7 && kodejabar){
                            return item
                        }
                    })
    
                    //filter data desa
                    const desamain = dataWilayah.filter(item => {
                        const jabar = item.id_wilayah.startsWith(32)
                         if(item.id_wilayah.length > 6 && jabar){    
                                return item  
                         }
                    })
    
                    setkecamatandata(kecamatanjabar)
                    setdesadata(desamain)
                    setdatawilayah(response.data.data)
                    setdalaalamat(response_alamat.data.data)
                    setdatasekolah(response_sekolah.data.data)
                }
                catch(e){
                    console.log(e)
                }
                finally{
                    setloading(false)
                }
            }
            getWilayah()
            console.log(kecamatan)
        },[])
        
    useEffect(() => {
        //jika kode wilayah sudah ditemukan
         if(kodewilayah){

            const kodemain = kodewilayah.toString();
            const kodekecamatan = kodemain.substring(0,6)
            const kodekota = kodemain.substring(0,4)
            const kodeprov = kodemain.substring(0,2)
            console.log(kodemain)

            const getdatawilayah = async () => {
                try{
                    let response = await axios.get(`${process.env.REACT_APP_LINK}wilayah/kecamatan/${kodekecamatan}`)
                    let responsekota = await axios.get(`http://localhost:3100/wilayah/kota/${kodekota}`)
                    let responseprov = await axios.get(`http://localhost:3100/wilayah/provinsi/${kodeprov}`)
                    
                    getdatalatlong(responsekota.data.data.nama,response.data.data.nama);   
                    console.log(response)            
                }
                catch(e){
                    console.log(e)
                }
            }

            const getdatalatlong = async(namakota,namakecamatan) => {
                try{
                    let response = await axios.get(`http://localhost:3100/location/${namakota.toUpperCase()}/${namakecamatan.toUpperCase()}/${namawilayah.toUpperCase()}`)
                    let data = response.data
                    console.log(data)
                    setposition({
                        lintang:data.position.lintang.toFixed(5),
                        bujur:data.position.bujur.toFixed(5)
                    }
                    )
                    setforminput({
                        ...forminput,
                        lintang:data.position.lintang.toFixed(5),
                        bujur:data.position.bujur.toFixed(5)
                    })
                }
                catch(e){
                    console.log(e)
                }
            }

            getdatawilayah()
            console.log(namawilayah)
            setTimeout(() => {
                

            },1000)
        } 
    },[namawilayah])


    useEffect(() => {
        const getData = async() => {
            try{
                if(typeform === "edit"){

                    let response = await axios.get(process.env.REACT_APP_LINK + "sekolah_alamat/" + iditem)
                    let data = response.data.data
                let kd_kota_raw = data.kode_wilayah
                let kd_kecamatan_raw = data.kode_wilayah
                let kd_kota = kd_kota_raw.substring(0,4)
                let kd_kecamatan = kd_kecamatan_raw.substring(0,6)
                
                seteditkodekecamatan(kd_kecamatan)
                seteditkodekota(kd_kota)
                
                console.log(kd_kota,kd_kecamatan)
                
                setforminput({
                    alamatjalan:data.alamat_jalan,
                    rt:data.rt,
                    rw:data.rw,
                    namadusun:data.nama_dusun,
                    kodewilayah:data.kode_wilayah,
                    kodepos:data.kode_pos,
                    lintang:data.lintang,
                    bujur:data.bujur,
                    tmt:data.tmt,
                    kdkecamatan:kd_kecamatan,
                    kdkota:kd_kota
                })
                }
                else{
                    setforminput({
                        sekolah_id:sekolahidcode,
                        alamatjalan:"",
                        rt:"",
                        rw:"",
                        alamatjalan:"",
                        namadusun:"",
                        kodewilayah:"",
                        kodepos:"",
                        lintang:"",
                        bujur:"",
                        tmt:"",
                        keaktifan:"",
                        kdkecamatan:"",
                        kdkota:""
                    })
                }
            }
            catch(e){
                console.log(e)
            }
        }
        getData()
    },[iditem])

   //membaca value form
    const handleInputForm = (e) => {
        setforminput({...forminput,[e.target.name]:e.target.value})
    }

    //submit form
    const handleSubmitForm = (e) => {
        e.preventDefault();
        console.log(forminput)

        //setforminput({...forminput,sekolahid:sekolahidcode})

        const sentData = async() => {
            try{
                let response = await axios.post(process.env.REACT_APP_LINK +"sekolah_alamat",forminput)
                console.log(response.data)
                setupdater(uuidv4())
                Swal.fire({
                    icon:"success",
                    title:"Data terkirim",
                    text:"Terima kasih sudah mengisi data"
                })
            }   
            catch(e){
                console.log(e)
                Swal.fire({
                    icon:"error",
                    title:"Kesalahan dalam input",
                    text:e.response.data.message
                })
            }
        }
        sentData()
    }

    const handleIsClicked = () => {
        setisclicked(!isclicked)
    }

    const handleClickedEdit = () => {
        setclickededit(!clickededit)
    }

    const handleGetTypeBtn = (typebtn,id) => {
        settypeform(typebtn)
        setiditem(id)
        console.log(typebtn)
    }

    const handleTambahButton = (e) => {
        let typebtn = e.target.getAttribute("typebtn")
        settypeform(typebtn)
        handleIsClicked()
    }

    useEffect(() => {
        console.log(sekolahidcode)
       
    })

    return(
        <>
        {
            loading ?
            <div className='d-flex align-items-center ' style={{height:"6vh"}}>
                <CSpinner color="danger" style={{marginRight:"1rem"}} />
            <p className='mb-0'>Mengolah Data Wilayah</p>
        </div>
            :
            <>
                          
                <DataForm 
                 title="Alamat" 
                 tablehead={tablehead}
                 page="alamat" 
                 updater={updater} 
                 handleopenmodal={handleClickedEdit}
                 getTypeBtn={handleGetTypeBtn} />
                <CButton color='dark' onClick={handleTambahButton} typebtn="tambah">Tambah Alamat</CButton>
                {
                    //modal tambah
                    isclicked && 
                    <CModal visible={isclicked} size="xl" onClose={handleIsClicked} >
                        <form onSubmit={handleSubmitForm}>
                         <CModalHeader>
                            <CModalTitle>Tambah Alamat</CModalTitle>
                        </CModalHeader>
                        <CModalBody className='p-3'>
                            <div className='mb-3'>
                                <CFormLabel>Alamat</CFormLabel>
                                <CFormInput 
                                    type='text'
                                    name="alamatjalan"
                                    onChange={handleInputForm}
                                    required
                                />
                            </div>
                            <div className='mb-3 d-flex'>
                                <div style={{marginRight:"3rem"}}>
                                    <CFormLabel>RT</CFormLabel>
                                    <CFormInput 
                                        style={{width:"10vw"}}
                                        type='number'
                                        name="rt"
                                        onChange={handleInputForm}
                                        required
                                        />
                                </div>
                                <div>
                                    <CFormLabel>RW</CFormLabel>
                                    <CFormInput 
                                        style={{width:"10vw"}}
                                        type='number'
                                        name="rw"
                                        onChange={handleInputForm}
                                        required
                                        />
                                </div>
                            </div>



                            <div className='mb-3'>
                                <CFormLabel>Nama Dusun</CFormLabel>
                                <CFormInput 
                                    type='text'
                                    name="namadusun"
                                    onChange={handleInputForm}
                                    required
                                />
                            </div>

                            {/*Input Baru*/}
                            <div className='mb-3 d-flex flex-wrap' style={{gap:"3em"}}>

                                {/* provinsi */}
                                <div>
                                    <CFormLabel>Provinsi</CFormLabel>
                                    <CFormSelect
                                        type='text'
                                        list="option-provinsi"
                                        onChange={handleKodeProvinsi}
                                        required
                                    >
                                        {
                                            provinsi.map((item,index) => 
                                                    <option key={index}>{item.nama}</option>                               
                                                )
                                        }
                                    </CFormSelect>
                                
                                
                                </div>

                                {/* kota */}
                                <div>
                                    <CFormLabel>Kabupaten / Kota</CFormLabel>
                                    <CFormSelect 
                                        type='text'                  
                                        onChange={handleKodeKota}
                                        list="option-kota"
                                        required
                                    >
                                        <option>Pilih Kabupaten/Kota</option>
                                        {
                                            kota.map((item,index) => 
                                                    <option key={index} idkota={item.id_wilayah} value={item.id_wilayah} onClick={handleKodeKota}>{item.nama}</option>                               
                                                )
                                        }
                                    </CFormSelect>                                       
                                </div>
                                
                                {/* kecamatan */}
                                <div>                                                              
                                    <CFormLabel>Kecamatan</CFormLabel>
                                    <CFormSelect
                                        type='text'                       
                                        list="option-kecamatan"
                                        onChange={handleKodeKecamatan}
                                        required
                                    >    
                                        { 
                                            kecamatandata.map((item,index) => 
                                            {                                                                       
                                                if(item.id_wilayah.startsWith(kodekota)){
                                                    return <option key={index} idname={item.nama} value={item.id_wilayah}>{item.nama}</option>                                                     
                                                }
                                            }
                                                )
                                        }            
                                    </CFormSelect>
                                </div>

                                {/* Desa */}
                                <div className='position-relative'>
                                    <CFormLabel>Desa</CFormLabel>
                                    <CFormSelect
                                        type='text'
                                        list='option_wilayah'
                                        onBlur={handleKodeDesa}
                                        onChange={handleKodeDesa}
                                        required
                                    >                                                 
                                        {
                                            desa.map((item,index) => 
                                            {
                                                if(item.id_wilayah.startsWith(kodekecamatan)){
                                                    return <option key={index} value={item.id_wilayah} >{item.nama}</option>                                                     
                                                }
                                            }
                
                                            )
                                        }                     
                                    </CFormSelect>                                                  
                                    
                                   
                                </div>
                                                                                        
                                {/* kode wilayah */}
                                
                            </div>

                            {/* end */}

                            <div className='mb-3'>
                                
                            </div>

                            <div className='mb-3'>
                                <CFormLabel>Kode Pos</CFormLabel>
                                <CFormInput 
                                    type='text'
                                    name="kodepos"
                                    onChange={handleInputForm}
                                    required
                                />
                            </div>
                            <div className='mb-3'>
                                <CFormLabel>Lintang</CFormLabel>
                                <CFormInput 
                                    type='text'
                                    name="lintang"
                                    value={position.lintang}
                                    onChange={handleInputForm}
                                />
                            </div>
                            <div className='mb-3'>
                                <CFormLabel>Bujur</CFormLabel>
                                <CFormInput 
                                    type='text'
                                    name="bujur"
                                    value={position.bujur}
                                    onChange={handleInputForm}
                                />
                            </div>
                        
                            <div className='mb-3'>
                                <CFormLabel>TMT</CFormLabel>
                                <CFormInput 
                                    type='date'
                                    name="tmt"
                                    onChange={handleInputForm}
                                />
                            </div>
                        
                        </CModalBody>
                        <CModalFooter>
                            <CButton color="secondary" onClick={handleIsClicked}>Close</CButton>
                            <CButton color="primary" type="submit">Save changes</CButton>
                        </CModalFooter>
                    </form> 
                    </CModal>
                }
                {
                    //modal edit
                    clickededit && 
                    <CModal visible={clickededit} size="xl" onClose={handleClickedEdit} >
                        <form onSubmit={handleSubmitForm}>
                         <CModalHeader>
                            <CModalTitle>Edit Alamat</CModalTitle>
                        </CModalHeader>
                        <CModalBody className='p-3'>
                            <div className='mb-3'>
                                <CFormLabel>Alamat</CFormLabel>
                                <CFormInput 
                                    type='text'
                                    name="alamatjalan"
                                    onChange={handleInputForm}
                                    required
                                    value={forminput.alamatjalan}
                                />
                            </div>
                            <div className='mb-3 d-flex'>
                                <div style={{marginRight:"3rem"}}>
                                    <CFormLabel>RT</CFormLabel>
                                    <CFormInput 
                                        style={{width:"10vw"}}
                                        type='number'
                                        name="rt"
                                        onChange={handleInputForm}
                                        required
                                        value={forminput.rt}
                                        />
                                </div>
                                <div>
                                    <CFormLabel>RW</CFormLabel>
                                    <CFormInput 
                                        style={{width:"10vw"}}
                                        type='number'
                                        name="rw"
                                        onChange={handleInputForm}
                                        required
                                        value={forminput.rw}
                                        />
                                </div>
                            </div>



                            <div className='mb-3'>
                                <CFormLabel>Nama Dusun</CFormLabel>
                                <CFormInput 
                                    type='text'
                                    name="namadusun"
                                    onChange={handleInputForm}
                                    required
                                    value={forminput.namadusun}
                                />
                            </div>

                            {/*Input Baru*/}
                            <div className='mb-3 d-flex flex-wrap' style={{gap:"3em"}}>

                                {/* provinsi */}
                                <div>
                                    <CFormLabel>Provinsi</CFormLabel>
                                    <CFormSelect
                                        type='text'
                                        list="option-provinsi"
                                        onChange={handleKodeProvinsi}
                                        required                                    
                                    >
                                        {
                                            provinsi.map((item,index) => 
                                                    <option key={index}>{item.nama}</option>                               
                                                )
                                        }
                                    </CFormSelect>
                                
                                
                                </div>

                                {/* kota */}
                                <div>
                                    <CFormLabel>Kabupaten / Kota</CFormLabel>
                                    <CFormSelect 
                                        type='text'                  
                                        onChange={handleKodeKota}
                                        list="option-kota"
                                        required
                                       
                                        name="kdkota"
                                    >
                                        <option>Pilih Kabupaten/Kota</option>
                                        {
                                            kota.map((item,index) => 
                                                    <option key={index} idkota={item.id_wilayah} value={item.id_wilayah} onClick={handleKodeKota}>{item.nama}</option>                               
                                                )
                                        }
                                    </CFormSelect>                                       
                                </div>
                                
                                {/* kecamatan */}
                                <div>                                                              
                                    <CFormLabel>Kecamatan</CFormLabel>
                                    <CFormSelect
                                        type='text'                       
                                        list="option-kecamatan"
                                        onChange={handleKodeKecamatan}
                                        required
                                        value={forminput.kdkecamatan}
                                        name="kdkecamatan"
                                    >    
                                        { 
                                            kecamatandata.map((item,index) => 
                                            {                                                                       
                                                if(item.id_wilayah.startsWith(kodekota)){
                                                    return <option key={index} idname={item.nama} value={item.id_wilayah}>{item.nama}</option>                                                     
                                                }
                                            }
                                                )
                                        }            
                                    </CFormSelect>
                                </div>

                                {/* Desa */}
                                <div className='position-relative'>
                                    <CFormLabel>Desa</CFormLabel>
                                    <CFormSelect
                                        type='text'
                                        list='option_wilayah'
                                        onBlur={handleKodeDesa}
                                        onChange={handleKodeDesa}
                                        required
                                        value={forminput.kodewilayah}
                                    >                                                 
                                        {
                                            desa.map((item,index) => 
                                            {
                                                if(item.id_wilayah.startsWith(kodekecamatan)){
                                                    return <option key={index} value={item.id_wilayah} >{item.nama}</option>                                                     
                                                }
                                            }
                
                                            )
                                        }                     
                                    </CFormSelect>                                                  
                                    
                                   
                                </div>
                                                                                        
                                {/* kode wilayah */}
                                
                            </div>

                            {/* end */}

                            <div className='mb-3'>
                                
                            </div>

                            <div className='mb-3'>
                                <CFormLabel>Kode Pos</CFormLabel>
                                <CFormInput 
                                    type='text'
                                    name="kodepos"
                                    onChange={handleInputForm}
                                    required
                                    value={forminput.kodepos}
                                />
                            </div>
                            <div className='mb-3'>
                                <CFormLabel>Lintang</CFormLabel>
                                <CFormInput 
                                    type='text'
                                    name="lintang"
                                    value={position.lintang}
                                    onChange={handleInputForm}
                                    
                                />
                            </div>
                            <div className='mb-3'>
                                <CFormLabel>Bujur</CFormLabel>
                                <CFormInput 
                                    type='text'
                                    name="bujur"
                                    value={position.bujur}
                                    onChange={handleInputForm}
                                />
                            </div>
                        
                            <div className='mb-3'>
                                <CFormLabel>TMT</CFormLabel>
                                <CFormInput 
                                    type='date'
                                    name="tmt"
                                    onChange={handleInputForm}
                                    value={forminput.tmt}
                                />
                            </div>
                        
                        </CModalBody>
                        <CModalFooter>
                            <CButton color="secondary" onClick={handleClickedEdit}>Close</CButton>
                            <CButton color="primary" type="submit">Save changes</CButton>
                        </CModalFooter>
                    </form> 
                    </CModal>
                }

            </>
        }
            
        </>
    )
}

export default AlamatForm;