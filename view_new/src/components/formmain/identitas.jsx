import React, { useState, useEffect } from 'react';
import {
    CButton,
    CFormInput,
    CFormLabel,
    CFormSelect,
    CModal,
    CModalBody,
    CModalContent,
    CModalHeader,
    CModalFooter,
    CModalTitle
    
  } from '@coreui/react'
import axios from 'axios';
import {v4 as uuidv4} from "uuid"
import Swal from 'sweetalert2';
import validator from 'validator';
import DataForm from './dataform/dataform';
import useRefStore from 'src/state/ref';

const IdentitasForm = (props) => {
    const[dataKbm,setdatakbm] = useState([]);
    const[dataPendidikan,setdatapendidikan] = useRefStore((state) => [state.bentuk_pendidikan,state.bentuk_pendidikan])
    const[dataStatusSekolah,setdatastatus] = useState([])
    const[dataIdentitas,setdataidentitas] = useState([])
    const[editedData,setediteddata] = useState([])

    const[editedId,seteditedid] = useState()
    const[typeform,settypeform] = useState()

    const[dataForm,setdataform] = useState(
      {
        sekolahid:"",
        npsn:0,
        nama:"",
        bentuk_pendidikan:"",
        waktu_kbm:"",
        sk_pendirian:"",
        status_sekolah:"",
        tanggal_sk:"",
        mbskode:"",
        npwp:"",
        nmwp:"",
        no_telpon:"",
        email:"",
        instagram:"",
        facebook:"",
        web:"",
        keaktifan:"",
        tmt:""
      }
    )

    const[errorcount,seterrorcount] = useState(0)
    const[errormessage,seterrormessage] = useState("")
    const[updater,setupdater] = useState();
    const[isclicked,setisclicked] = useState(false);
    const[clickededit,setclickededit] = useState(false)


    const tableHead_object = [
      
      "NPSN",
      "Nama",
      "Bentuk Pendidikan",
      "Waktu Kbm",
      // "Sk Pendirian",
      // "Tanggal SK Pendirian",
      "Status Sekolah",
      "MBS Kode",
      "NPWP",
      "NMWP",
      "No Telpon",
      "Email",
      "Instagram",
      "Web",
      "Action"
      
    ]

    useEffect(() => {
      //mengambil data  dari api
      const getdatakbm = async() => {
        try{
          const response_kbm = await axios.get(process.env.REACT_APP_LINK +"waktu_penyelenggaraan");
          if(Object.keys(dataPendidikan).length === 0){
            const response_pendidikan = await axios.get(process.env.REACT_APP_LINK +"bentuk_pendidikan");
            setdatapendidikan(response_pendidikan.data.data)
          }
            const response_status = await axios.get(process.env.REACT_APP_LINK + "status_sekolah")
            const resposne_data_identitas = await axios.get(process.env.REACT_APP_LINK + "sekolah_identitas")
            setdatakbm(response_kbm.data.data)
            setdatastatus(response_status.data.data)
            setdataidentitas(resposne_data_identitas.data.data)
            
        }
        catch(e){
          console.log(e.message)
        }
      }
      getdatakbm()
      //end

      
    },[])

    //untuk mengambil data buat diedit
    useEffect(() => {
      const getData = async() => {
        try{
          if(typeform === "edit"){

            let response = await axios.get(`${process.env.REACT_APP_LINK}sekolah_identitas/${editedId}`)
            let data_get = response.data.data
            setdataform(
              {
                sekolahid:data_get.sekolah_id,
                npsn:data_get.npsn,
                nama:data_get.nama,
                bentuk_pendidikan:data_get.bentuk_pendidikan_id,
                waktu_kbm:data_get.waktu_pbm_id,
                sk_pendirian:data_get.sk_pendirian_sekolah,
                status_sekolah:data_get.status_sekolah,
                tanggal_sk:data_get.tanggal_sk_pendirian,
                mbskode:data_get.mbs_kode,
                npwp:data_get.npwp,
                nmwp:data_get.nm_wp,
                no_telpon:data_get.nomor_telepon,
                email:data_get.email,
                instagram:data_get.instagram,
                facebook:data_get.facebook,
                web:data_get.website,
                keaktifan:"",
                tmt:data_get.tmt
            }
            )
          }
          else{
            setdataform({
              sekolahid:"",
              npsn:0,
              nama:"",
              bentuk_pendidikan:"",
              waktu_kbm:"",
              sk_pendirian:"",
              status_sekolah:"",
              tanggal_sk:"",
              mbskode:"",
              npwp:"",
              nmwp:"",
              no_telpon:"",
              email:"",
              instagram:"",
              facebook:"",
              web:"",
              keaktifan:"",
              tmt:""
            })
          }
          
        }
        catch(e){
          console.log(e)
        }
      }
      getData()
    },[editedId])

    //
    useEffect(() => {
      console.log(dataForm)  
    })

    //
    const handleForm = (e) => {
      setdataform({...dataForm,[e.target.name]:e.target.value})

      // let valueAttr = e.target.getAttribute("value");
      // if(e.target.name == "bentuk_pendidikan"){
      //     setdataform({...dataForm,bentuk_pendidikan:valueAttr})
      // }
    }

    //
    const handleClickOption = (e) => {
        let valAtt = e.target.getAttribute("value");
        setdataform({...dataForm,bentuk_pendidikan:valAtt})
        setdataform({...dataForm,waktu_kbm:valAtt})
    }

    //
    const handleSubmit = async(e) => {
      e.preventDefault();
      console.log(dataForm);
      dataForm.sekolahid = uuidv4();
      console.log(dataForm)
      

      //validate notelpon
      if(!validator.isMobilePhone(dataForm.no_telpon,"id-ID", { strictMode: false })){
          seterrormessage("Nomor telepon tidak valid")
      }
      
      //validasi email
      else if(!validator.isEmail(dataForm.email)){
          seterrormessage("Email tidak valid")
      }
      
      else if(!validator.isURL(dataForm.web)){
        seterrormessage("Alamat web tidak valid")     
      }
      else{
        seterrormessage("")
      }

      if(errormessage == ""){

        try{
          const response = await axios.post(process.env.REACT_APP_LINK + "sekolah_identitas",dataForm);
          console.log(response)
          props.getsekolahid(dataForm.sekolahid)
          localStorage.setItem("sekolah_id",dataForm.sekolahid)
          setupdater(uuidv4())
          Swal.fire({
            icon:"success",
            title:"Data berhasil tersimpan",
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

    else{
      console.log(errormessage)
      Swal.fire({
        icon:"error",
        title:"Kesalahan dalam input",
        text:errormessage
      })
    }
    }

    //edit submit
    const handleEditSubmit = async(e) => {
      e.preventDefault();
      console.log(dataForm);
      

      //validate notelpon
      if(!validator.isMobilePhone(dataForm.no_telpon,"id-ID", { strictMode: false })){
          seterrormessage("Nomor telepon tidak valid")
      }
      
      //validasi email
      else if(!validator.isEmail(dataForm.email)){
          seterrormessage("Email tidak valid")
      }
      
      else if(!validator.isURL(dataForm.web)){
        seterrormessage("Alamat web tidak valid")     
      }
      else{
        seterrormessage("")
      }

      if(errormessage == ""){

        try{
          const response = await axios.put(process.env.REACT_APP_LINK + "sekolah_identitas/" + editedId,dataForm);
          console.log(response)
          props.getsekolahid(dataForm.sekolahid)
          setupdater(uuidv4())
          Swal.fire({
            icon:"success",
            title:"Data berhasil diedit",
            text:"Terima kasih sudah mengedit data"
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

    else{
      console.log(errormessage)
      Swal.fire({
        icon:"error",
        title:"Kesalahan dalam input",
        text:errormessage
      })
    }

    }
    //untuk mengambil type button 
    const handleGetTypeBtn = (btntype,id) => {
        settypeform(btntype)
        seteditedid(id)
        console.log(id)
    }

    const handleOpenForm = () => {
      setisclicked(!isclicked)
    }

    const handleclickededit = () => {
      setclickededit(!clickededit)
    }


    return(
        <>   
            <DataForm 
              title="Data Identitas" 
              tablehead={tableHead_object} 
              page="identitas" 
              updater={updater} 
              getTypeBtn={handleGetTypeBtn} 
              handleopenmodal={handleclickededit}
            />

            <CButton 
            className='mb-5' 
            color="dark" 
            onClick={handleOpenForm}
            typebtn = "tambah"
            >
              Tambah
            </CButton>
          {
            isclicked ?
              <CModal visible={isclicked} size="xl" onClose={handleOpenForm}>
                  <form onSubmit={handleSubmit}>
                  <CModalHeader>
                    <CModalTitle>Tambah Data</CModalTitle>
                  </CModalHeader>
                  <CModalBody>
                      {/* Npsn */}
                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">Npsn</CFormLabel>
                        <CFormInput
                          type="number"
                          id="exampleFormControlInput1"
                          placeholder="234232"
                          name="npsn"
                          onChange={handleForm}
                          required
                          
                        />
                      </div>
                      {/* End Npsn */}
      
                      {/* Nama */}
                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">Nama</CFormLabel>
                        <CFormInput
                          type="text"
                          id="exampleFormControlInput1"
                          placeholder="SMKN 1 Sumedang"
                          name="nama"
                          onChange={handleForm}
                          required
                        
                        />
                      </div>
                      {/* End nama */}
      
                      {/* Bentuk Pendidikan */}
                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">Bentuk Pendidikan</CFormLabel>
                        <CFormSelect 
                          name="bentuk_pendidikan"
                          required
                          onChange={handleForm} 
                        >
                          <option>Pilih Bentuk Pendidikan</option> 
                            {
                              dataPendidikan.map((data,index) => 
                                <option key={index} onClick={handleClickOption} id={data.bentuk_pendidikan_id} value={data.bentuk_pendidikan_id}>{data.nama}</option> 
                              )
                            }
                        </CFormSelect>  
                      </div>
                      {/* end */}
      
                      {/* status */}
                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">Status Sekolah</CFormLabel>
                        <CFormSelect
                          name="status_sekolah"
                          onChange={handleForm} 
                          required
                        >
                        <option>Pilih Status Sekolah</option> 
                          {
                            dataStatusSekolah.map((data,index) => 
                              <option key={index} id={data.waktu_penyelenggaraan_id} value={data.status_sekolah}>{data.deskripsi}</option>  
                            )
                          }
                        </CFormSelect>  
                      </div>
      
                      {/* end status */}
      
                      {/* bentuk pendidikan */}
                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">Waktu Kbm</CFormLabel>
                        <CFormSelect
                          name="waktu_kbm"
                          onChange={handleForm} 
                          required
                        >
                        <option>Pilih Waktu Kbm</option> 
                          {
                            dataKbm.map((data,index) => 
                              <option key={index} id={data.waktu_penyelenggaraan_id} value={data.waktu_penyelenggaraan_id}>{data.nama}</option>  
                            )
                          }
                        </CFormSelect>  
                      </div>
                      {/* end */}
      
                      {/* SK Pendirian Sekolah */}
                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">SK Pendirian Sekolah </CFormLabel>
                        <CFormInput
                          type="text"
                          id="exampleFormControlInput1"
                          placeholder="392/102.8h/MN/2000"
                          name="sk_pendirian"
                          onChange={handleForm} 
                          required
                        />
                      </div>
                      {/* End */}
      
                      {/* Tanggal Pendirian */}
                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">Tanggal SK Pendirian</CFormLabel>
                        <CFormInput
                          type="date"
                          id="exampleFormControlInput1"
                          placeholder="20-3-1995"
                          name="tanggal_sk"
                          onChange={handleForm} 
                          required
                        />
                      </div>
                      {/* end */}
      
                      {/* mbskode */}
                        <div className="mb-3">
                          <CFormLabel htmlFor="exampleFormControlInput1">MBS Kode</CFormLabel>
                          <CFormInput
                            type="number"
                            id="exampleFormControlInput1"
                            placeholder="987"
                            name="mbskode"
                            onChange={handleForm} 
                            required
                          />
                        </div>
                      {/* end */}
      
                      {/* NPWP */}
                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">NPWP</CFormLabel>
                        <CFormInput
                          type="text"
                          id="exampleFormControlInput1"
                          placeholder="00543543858"
                          name="npwp"
                          onChange={handleForm} 
                          required
                        />
                      </div>
                      {/* End NPWP */}
      
                      {/* NMWP */}
                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">NM WP</CFormLabel>
                        <CFormInput
                          type="text"
                          id="exampleFormControlInput1"
                          placeholder="NM WP"
                          name="nmwp"
                          onChange={handleForm} 
                          required
                        />
                      </div>
                      {/* End */}
      
                      {/* No Telepon */}
                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">Nomor Telepon</CFormLabel>
                        <CFormInput
                          type="Number"
                          id="exampleFormControlInput1"
                          placeholder="087.."
                          name="no_telpon"
                          onChange={handleForm} 
                          required
                        />
                      </div>
                        {/* End */}
      
                      {/* Email */}
                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">Email</CFormLabel>
                        <CFormInput
                          type="email"
                          id="exampleFormControlInput1"
                          placeholder="name@example.com"
                          name="email"
                          onChange={handleForm} 
                          required
                        />
                      </div>
                      {/* End */}
      
                      {/* Instagram */}
                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">Instagram</CFormLabel>
                        <CFormInput
                          type="text"
                          id="exampleFormControlInput1"
                          placeholder="user..."
                          name="instagram"
                          onChange={handleForm} 
                        />
                      </div>
                      {/* End */}
      
                      {/* Facebook */}
                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">Facebook</CFormLabel>
                        <CFormInput
                          type="text"
                          id="exampleFormControlInput1"
                          placeholder="user..."
                          name="facebook"
                          onChange={handleForm} 
                        />
                      </div>
                      {/* End */}
      
                      {/* Website */}
                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">Website</CFormLabel>
                        <CFormInput
                          type="text"
                          id="exampleFormControlInput1"
                          placeholder="xyz.com"
                          name="web"
                          onChange={handleForm} 
                        />
                      </div>
                      {/* End */}
      
                      {/* Keaktifan */}
                      {/* <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">Keaktifan</CFormLabel>
                        <CFormInput
                          type="text"
                          id="exampleFormControlInput1"
                          placeholder="Tidak/Aktif"
                          name="keaktifan"
                          onChange={handleForm} 
                        />
                      </div> */}
                      {/* End */}
      
                      {/* tmt */}
                      <div className="mb-5">
                        <CFormLabel htmlFor="exampleFormControlInput1">TMT</CFormLabel>
                        <CFormInput
                          type="date"
                          id="exampleFormControlInput1"
                          placeholder="name@example.com"
                          name="tmt"
                          onChange={handleForm} 
                        />
                      </div>
                      {/* end */}
      
                      {/* Button tambah */}

                      {/* <div className="mb-5">
                          <CButton color="primary" type='submit' >{typeform === "edit" ? "Edit Data" : "Tambah Data"}</CButton>
                      </div> */}
                      {/* end */}

                  </CModalBody>
                  <CModalFooter>
                    <CButton color="secondary" onClick={handleOpenForm}>Close</CButton>
                    <CButton color="primary" type="submit">{typeform === "edit" ? "Edit Data" : "Tambah Data"}</CButton>
                  </CModalFooter>
              </form>
              </CModal>
              :
              ""
           
          }

          {
            clickededit  ?
            <CModal visible={clickededit} size="xl" onClose={handleclickededit}>
                  <form onSubmit={handleEditSubmit}>
                  <CModalHeader>
                    <CModalTitle>Edit data</CModalTitle>
                  </CModalHeader>
                  <CModalBody>
                      {/* Npsn */}
                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">Npsn</CFormLabel>
                        <CFormInput
                          type="text"
                          id="exampleFormControlInput1"
                          placeholder="234232"
                          name="npsn"
                          onChange={handleForm}
                          value={
                            dataForm.npsn
                          }
                          required
                        />
                      </div>
                      {/* End Npsn */}
      
                      {/* Nama */}
                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">Nama</CFormLabel>
                        <CFormInput
                          type="text"
                          id="exampleFormControlInput1"
                          placeholder="SMKN 1 Sumedang"
                          name="nama"
                          onChange={handleForm}
                          required
                          value={
                            dataForm.nama
                          }
                        />
                      </div>
                      {/* End nama */}
      
                      {/* Bentuk Pendidikan */}
                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">Bentuk Pendidikan</CFormLabel>
                        <CFormSelect 
                          name="bentuk_pendidikan"
                          required
                          onChange={handleForm} 
                          value={
                            dataForm.bentuk_pendidikan
                          }
                        >
                          <option>Pilih Bentuk Pendidikan</option> 
                            {
                              dataPendidikan.map((data,index) => 
                                <option key={index} onClick={handleClickOption} id={data.bentuk_pendidikan_id} value={data.bentuk_pendidikan_id}>{data.nama}</option> 
                              )
                            }
                        </CFormSelect>  
                      </div>
                      {/* end */}
      
                      {/* status */}
                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">Status Sekolah</CFormLabel>
                        <CFormSelect
                          name="status_sekolah"
                          onChange={handleForm} 
                          required
                          value={
                            dataForm.status_sekolah
                          }
                        >
                        <option>Pilih Status Sekolah</option> 
                          {
                            dataStatusSekolah.map((data,index) => 
                              <option key={index} id={data.waktu_penyelenggaraan_id} value={data.status_sekolah}>{data.deskripsi}</option>  
                            )
                          }
                        </CFormSelect>  
                      </div>
      
                      {/* end status */}
      
                      {/* bentuk pendidikan */}
                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">Waktu Kbm</CFormLabel>
                        <CFormSelect
                          name="waktu_kbm"
                          onChange={handleForm} 
                          required
                          value={
                            dataForm.waktu_kbm
                          }
                        >
                        <option>Pilih Waktu Kbm</option> 
                          {
                            dataKbm.map((data,index) => 
                              <option key={index} id={data.waktu_penyelenggaraan_id} value={data.waktu_penyelenggaraan_id}>{data.nama}</option>  
                            )
                          }
                        </CFormSelect>  
                      </div>
                      {/* end */}
      
                      {/* SK Pendirian Sekolah */}
                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">SK Pendirian Sekolah </CFormLabel>
                        <CFormInput
                          type="text"
                          id="exampleFormControlInput1"
                          placeholder="392/102.8h/MN/2000"
                          name="sk_pendirian"
                          onChange={handleForm} 
                          required
                          value={
                            dataForm.sk_pendirian
                          }
                        />
                      </div>
                      {/* End */}
      
                      {/* Tanggal Pendirian */}
                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">Tanggal SK Pendirian</CFormLabel>
                        <CFormInput
                          type="date"
                          id="exampleFormControlInput1"
                          placeholder="20-3-1995"
                          name="tanggal_sk"
                          onChange={handleForm} 
                          required
                          value={
                            dataForm.tanggal_sk
                          }
                        />
                      </div>
                      {/* end */}
      
                      {/* mbskode */}
                        <div className="mb-3">
                          <CFormLabel htmlFor="exampleFormControlInput1">MBS Kode</CFormLabel>
                          <CFormInput
                            type="number"
                            id="exampleFormControlInput1"
                            placeholder="987"
                            name="mbskode"
                            onChange={handleForm} 
                            required
                            value={
                              dataForm.mbskode
                            }
                          />
                        </div>
                      {/* end */}
      
                      {/* NPWP */}
                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">NPWP</CFormLabel>
                        <CFormInput
                          type="text"
                          id="exampleFormControlInput1"
                          placeholder="00543543858"
                          name="npwp"
                          onChange={handleForm} 
                          required
                          value={
                            dataForm.npwp
                          }
                        />
                      </div>
                      {/* End NPWP */}
      
                      {/* NMWP */}
                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">NM WP</CFormLabel>
                        <CFormInput
                          type="text"
                          id="exampleFormControlInput1"
                          placeholder="NM WP"
                          name="nmwp"
                          onChange={handleForm} 
                          required
                          value={
                            dataForm.nmwp
                          }
                        />
                      </div>
                      {/* End */}
      
                      {/* No Telepon */}
                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">Nomor Telepon</CFormLabel>
                        <CFormInput
                          type="Number"
                          id="exampleFormControlInput1"
                          placeholder="087.."
                          name="no_telpon"
                          onChange={handleForm} 
                          required
                          value={
                            dataForm.no_telpon
                          }
                        />
                      </div>
                        {/* End */}
      
                      {/* Email */}
                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">Email</CFormLabel>
                        <CFormInput
                          type="email"
                          id="exampleFormControlInput1"
                          placeholder="name@example.com"
                          name="email"
                          onChange={handleForm} 
                          required
                          value={
                            dataForm.email
                          }
                        />
                      </div>
                      {/* End */}
      
                      {/* Instagram */}
                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">Instagram</CFormLabel>
                        <CFormInput
                          type="text"
                          id="exampleFormControlInput1"
                          placeholder="user..."
                          name="instagram"
                          onChange={handleForm} 
                          value={
                            dataForm.instagram
                          }
                        />
                      </div>
                      {/* End */}
      
                      {/* Facebook */}
                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">Facebook</CFormLabel>
                        <CFormInput
                          type="text"
                          id="exampleFormControlInput1"
                          placeholder="user..."
                          name="facebook"
                          onChange={handleForm} 
                          value={
                            dataForm.facebook
                          }
                        />
                      </div>
                      {/* End */}
      
                      {/* Website */}
                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">Website</CFormLabel>
                        <CFormInput
                          type="text"
                          id="exampleFormControlInput1"
                          placeholder="xyz.com"
                          name="web"
                          onChange={handleForm} 
                          value={
                            dataForm.web
                          }
                        />
                      </div>
                      {/* End */}
      
                      {/* Keaktifan */}
                      {/* <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">Keaktifan</CFormLabel>
                        <CFormInput
                          type="text"
                          id="exampleFormControlInput1"
                          placeholder="Tidak/Aktif"
                          name="keaktifan"
                          onChange={handleForm} 
                        />
                      </div> */}
                      {/* End */}
      
                      {/* tmt */}
                      <div className="mb-5">
                        <CFormLabel htmlFor="exampleFormControlInput1">TMT</CFormLabel>
                        <CFormInput
                          type="date"
                          id="exampleFormControlInput1"
                          placeholder="name@example.com"
                          name="tmt"
                          onChange={handleForm} 
                          value={
                            dataForm.tmt
                          }
                        />
                      </div>
                      {/* end */}
      
                      {/* Button tambah */}

                      {/* <div className="mb-5">
                          <CButton color="primary" type='submit' >{typeform === "edit" ? "Edit Data" : "Tambah Data"}</CButton>
                      </div> */}
                      {/* end */}

                  </CModalBody>
                  <CModalFooter>
                    <CButton color="secondary" onClick={handleclickededit}>Close</CButton>
                    <CButton color="primary" type="submit">Edit Data</CButton>
                  </CModalFooter>
              </form>
            </CModal>
            :
            ""
          }
        </>
    )
}

export default IdentitasForm