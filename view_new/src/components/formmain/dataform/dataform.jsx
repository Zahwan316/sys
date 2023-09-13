
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
    CTableHead,
    CTableBody,
    CTableRow,
    CTableHeaderCell,
    CTableDataCell
    
  } from '@coreui/react'
import axios from 'axios';
import Swal from 'sweetalert2';
import {v4 as uuidv4} from "uuid"
import ButtonActionKelembagaan from 'src/components/btngroup/btnactionkelembagaan';
import useItemStore from 'src/state/item';
import useSekolahStore from 'src/state/sekolah';


const DataForm = (props) => {
    const[dataSekolah,setdatasekolah] = useSekolahStore((state) => [state.sekolah_identitas,state.setsekolahidentitas])
    const[dataAlamat,setdataalamat] = useState([]);
    const[dataAkreditasi,setdataakreditasi] = useState([])
    const[dataIso,setdataiso] = useState([])
    const[dataRekening,setdatarekening] = useState([])
    const[dataKepemilikan,setdatakepemilikan] = useState([])
    const[bentukpendidikanid,setpendidikanid] = useItemStore((state) => [state.bentuk_pendidikan_id,state.setbentukpendidikanid])

    //for identitas page
    const[dataKbm,setdatakbm] = useState([]);
    const[dataPendidikan,setdatapendidikan] = useState([]);
    const[dataStatusSekolah,setdatastatus] = useState([])

    //for akreditasi page
    const[optionAkreditasi,setoptionakreditasi] = useState(props.data)

    //for iso page
    const[optionIso,setoptioniso] = useState([])

    //for bank page
    const[databank,setdatabank] = useState([])

    //for kepemilikan page
    const[optionKepemilikan,setoptionkepemilikan] = useState([])

    //variabel untuk memperbarui kode delete
    const[updatedelete,setupdatedelete] = useState([])

    const tablehead = props.tablehead

    useEffect(() => {
        const getData = async() => {
            
            //identitas page
            if(props.page === "identitas"){
                if(Object.keys(dataSekolah).length === 0){
                   const response_sekolah = await axios.get(process.env.REACT_APP_LINK + "sekolah_identitas")
                   setdatasekolah(response_sekolah.data.data)
                   const data = response_sekolah.data.data
                   setpendidikanid(data.bentuk_pendidikan_id) 
               }
            }
            const response_kbm = await axios.get(process.env.REACT_APP_LINK +"waktu_penyelenggaraan");
            const response_pendidikan = await axios.get(process.env.REACT_APP_LINK +"bentuk_pendidikan");
            const response_status = await axios.get(process.env.REACT_APP_LINK + "status_sekolah")
            
            //alamat page
            const response_alamat = await axios.get(process.env.REACT_APP_LINK + "sekolah_alamat")
            
            //akreditasi page
            if(props.page == "akreditasi"){
                const response_akreditasi = await axios.get(process.env.REACT_APP_LINK + "sekolah_akreditasi")
                const response_option_akreditasi = await axios.get(process.env.REACT_APP_LINK + "akreditasi")
                //akreditasi page
                setdataakreditasi(response_akreditasi.data.data)
                setoptionakreditasi(response_option_akreditasi.data.data)
            }
            
            //iso page 
            if(props.page === "iso"){
                const response_iso = await axios.get(process.env.REACT_APP_LINK + "sekolah_iso")
                const response_iso_sertifikat = await axios.get(process.env.REACT_APP_LINK + "sertifikasi_iso")
                 //iso page
                setoptioniso(response_iso_sertifikat.data.data)
                setdataiso(response_iso.data.data)
            }
                
            //rekening page
            if(props.page === "rekening"){
                const response_rekening = await axios.get(process.env.REACT_APP_LINK + "sekolah_bank")
                const response_rekening_bank = await axios.get(process.env.REACT_APP_LINK + "bank")

                //bank page
                setdatarekening(response_rekening.data.data)
                setdatabank(response_rekening_bank.data.data)
            }
            
            //kepemilikan page
            if(props.page === "kepemilikan"){
                const response_kepemilikan = await axios.get(process.env.REACT_APP_LINK + "sekolah_kepemilikan")
                const response_option_kepemilikan = await axios.get(process.env.REACT_APP_LINK + "status_kepemilikan")

                //kepemilikan page
                setdatakepemilikan(response_kepemilikan.data.data)
                setoptionkepemilikan(response_option_kepemilikan.data.data)
            }
            

           
            setdataalamat(response_alamat.data.data)
            
            //identitas page
            setdatapendidikan(response_pendidikan.data.data)
            setdatakbm(response_kbm.data.data)
            setdatastatus(response_status.data.data)
            
            
                    
            
        }

       
        
        getData()
     
    },[])

    //update data ketika data ditambahkan
    useEffect(() => {
        const getData = async() => {
            
            //identitas page
            const response_sekolah = await axios.get(process.env.REACT_APP_LINK + "sekolah_identitas")
            const response_kbm = await axios.get(process.env.REACT_APP_LINK +"waktu_penyelenggaraan");
            const response_pendidikan = await axios.get(process.env.REACT_APP_LINK +"bentuk_pendidikan");
            const response_status = await axios.get(process.env.REACT_APP_LINK + "status_sekolah")
            
            //alamat page
            const response_alamat = await axios.get(process.env.REACT_APP_LINK + "sekolah_alamat")
            
            //akreditasi page
            if(props.page == "akreditasi"){
                const response_akreditasi = await axios.get(process.env.REACT_APP_LINK + "sekolah_akreditasi")
                const response_option_akreditasi = await axios.get(process.env.REACT_APP_LINK + "akreditasi")
                //akreditasi page
                setdataakreditasi(response_akreditasi.data.data)
                setoptionakreditasi(response_option_akreditasi.data.data)
            }
            
            //iso page 
            if(props.page === "iso"){
                const response_iso = await axios.get(process.env.REACT_APP_LINK + "sekolah_iso")
                const response_iso_sertifikat = await axios.get(process.env.REACT_APP_LINK + "sertifikasi_iso")
                 //iso page
                setoptioniso(response_iso_sertifikat.data.data)
                setdataiso(response_iso.data.data)
            }
                
            //rekening page
            if(props.page === "rekening"){
                const response_rekening = await axios.get(process.env.REACT_APP_LINK + "sekolah_bank")
                const response_rekening_bank = await axios.get(process.env.REACT_APP_LINK + "bank")

                //bank page
                setdatarekening(response_rekening.data.data)
                setdatabank(response_rekening_bank.data.data)
            }
            
            //kepemilikan page
            if(props.page === "kepemilikan"){
                const response_kepemilikan = await axios.get(process.env.REACT_APP_LINK + "sekolah_kepemilikan")
                const response_option_kepemilikan = await axios.get(process.env.REACT_APP_LINK + "status_kepemilikan")

                //kepemilikan page
                setdatakepemilikan(response_kepemilikan.data.data)
                setoptionkepemilikan(response_option_kepemilikan.data.data)
            }
            

            setdatasekolah(response_sekolah.data.data)
            setdataalamat(response_alamat.data.data)
            
            //identitas page
            setdatapendidikan(response_pendidikan.data.data)
            setdatakbm(response_kbm.data.data)
            setdatastatus(response_status.data.data)
            
            
            
           
            
            
            
        }
        getData()
    },[props.updater])

    //update data ketika data dihapus
    useEffect(() => {
        const getData = async() => {
            
            //identitas page
            const response_sekolah = await axios.get(process.env.REACT_APP_LINK + "sekolah_identitas")
            const response_kbm = await axios.get(process.env.REACT_APP_LINK +"waktu_penyelenggaraan");
            const response_pendidikan = await axios.get(process.env.REACT_APP_LINK +"bentuk_pendidikan");
            const response_status = await axios.get(process.env.REACT_APP_LINK + "status_sekolah")
            
            //alamat page
            const response_alamat = await axios.get(process.env.REACT_APP_LINK + "sekolah_alamat")
            
            //akreditasi page
            if(props.page == "akreditasi"){
                const response_akreditasi = await axios.get(process.env.REACT_APP_LINK + "sekolah_akreditasi")
                const response_option_akreditasi = await axios.get(process.env.REACT_APP_LINK + "akreditasi")
                //akreditasi page
                setdataakreditasi(response_akreditasi.data.data)
                setoptionakreditasi(response_option_akreditasi.data.data)
            }
            
            //iso page 
            if(props.page === "iso"){
                const response_iso = await axios.get(process.env.REACT_APP_LINK + "sekolah_iso")
                const response_iso_sertifikat = await axios.get(process.env.REACT_APP_LINK + "sertifikasi_iso")
                 //iso page
                setoptioniso(response_iso_sertifikat.data.data)
                setdataiso(response_iso.data.data)
            }
                
            //rekening page
            if(props.page === "rekening"){
                const response_rekening = await axios.get(process.env.REACT_APP_LINK + "sekolah_bank")
                const response_rekening_bank = await axios.get(process.env.REACT_APP_LINK + "bank")

                //bank page
                setdatarekening(response_rekening.data.data)
                setdatabank(response_rekening_bank.data.data)
            }
            
            //kepemilikan page
            if(props.page === "kepemilikan"){
                const response_kepemilikan = await axios.get(process.env.REACT_APP_LINK + "sekolah_kepemilikan")
                const response_option_kepemilikan = await axios.get(process.env.REACT_APP_LINK + "status_kepemilikan")

                //kepemilikan page
                setdatakepemilikan(response_kepemilikan.data.data)
                setoptionkepemilikan(response_option_kepemilikan.data.data)
            }
            

            setdatasekolah(response_sekolah.data.data)
            setdataalamat(response_alamat.data.data)
            
            //identitas page
            setdatapendidikan(response_pendidikan.data.data)
            setdatakbm(response_kbm.data.data)
            setdatastatus(response_status.data.data)
            
            
            
           
            
            
            
        }
        getData()
    },[updatedelete])


    useEffect(() => {
        console.log(bentukpendidikanid)   
    })
    
    const handleUpdateDelete = () => {
        setupdatedelete(uuidv4())
    }

    const handleClickOption = (e) => {
        const idBtn = e.target.getAttribute("id")
        const typeBtn = e.target.getAttribute("typebtn")
   
        {
            props.page === "identitas" && typeBtn === "edit" && 
                props.handleopenmodal()
              
        }
        {
            props.page === "alamat" &&
             props.handleModal()
        }

        if(props.getTypeBtn){
            props.getTypeBtn(typeBtn,idBtn)
        }
       
        //identitas page
        if(props.page === "identitas"){
            if(typeBtn == "delete"){
                Swal.fire({
                    title:"Apakah Anda Yakin ?",
                    text:"Item yang sudah terhapus tidak dapat dikembalikan",
                    icon:"warning",
                    showCancelButton:true,
                    confirmButtonText:"Ya,Hapus",
                    cancelButtonText:"Batal"
                })
                .then((result) => {
                    if(result.isConfirmed){
                        axios.delete(`${process.env.REACT_APP_LINK}sekolah_identitas/${idBtn}`)
                            .then(res =>{ 
                                console.log(res)
                                handleUpdateDelete()
                                localStorage.clear()
                            })
                            .catch(e => console.log(e))

                        Swal.fire(
                            "Data Berhasil Dihapus"
                        )
                    }
                    
                })
            }
        }
        else if(props.page === "alamat"){
            if(typeBtn == "delete"){
                Swal.fire({
                    title:"Apakah Anda Yakin ?",
                    text:"Item yang sudah terhapus tidak dapat dikembalikan",
                    icon:"warning",
                    showCancelButton:true,
                    confirmButtonText:"Ya,Hapus",
                    cancelButtonText:"Batal"
                })
                .then((result) => {
                    if(result.isConfirmed){
                        axios.delete(`${process.env.REACT_APP_LINK}sekolah_alamat/${idBtn}`)
                        .then(res => {
                            console.log(res)
                            handleUpdateDelete()
                        })
                        .catch(e => console.log(e))
                        Swal.fire(
                            "Data Berhasil Dihapus"
                        )
                    }
                    
                })

                
            }
        }
        else if(props.page === "akreditasi"){
            if(typeBtn == "delete"){
                Swal.fire({
                    title:"Apakah Anda Yakin ?",
                    text:"Item yang sudah terhapus tidak dapat dikembalikan",
                    icon:"warning",
                    showCancelButton:true,
                    confirmButtonText:"Ya,Hapus",
                    cancelButtonText:"Batal"
                })
                .then((result) => {
                    if(result.isConfirmed){
                        axios.delete(`${process.env.REACT_APP_LINK}sekolah_akreditasi/${idBtn}`)
                        .then(res => {
                            console.log(res)
                            handleUpdateDelete()
                        })
                        .catch(e => console.log(e))
                        Swal.fire(
                            "Data Berhasil Dihapus"
                        )
                    }
                    
                })

               
            }
            else if(typeBtn === "edit"){
                props.handleopenmodal()
            }
        }
        else if(props.page === "iso"){
            if(typeBtn == "delete"){
                Swal.fire({
                    title:"Apakah Anda Yakin ?",
                    text:"Item yang sudah terhapus tidak dapat dikembalikan",
                    icon:"warning",
                    showCancelButton:true,
                    confirmButtonText:"Ya,Hapus",
                    cancelButtonText:"Batal"
                })
                .then((result) => {
                    if(result.isConfirmed){
                        axios.delete(`${process.env.REACT_APP_LINK}sekolah_iso/${idBtn}`)
                        .then(res => {
                            console.log(res)
                            handleUpdateDelete()
                        })
                        .catch(e => console.log(e))
                        Swal.fire(
                            "Data Berhasil Dihapus"
                        )
                    }
                    
                })

               
            }
            else if(typeBtn == "edit"){
                props.handleopenmodal()
            }
        }
        else if(props.page === "rekening"){
            if(typeBtn == "delete"){
                Swal.fire({
                    title:"Apakah Anda Yakin ?",
                    text:"Item yang sudah terhapus tidak dapat dikembalikan",
                    icon:"warning",
                    showCancelButton:true,
                    confirmButtonText:"Ya,Hapus",
                    cancelButtonText:"Batal"
                })
                .then((result) => {
                    if(result.isConfirmed){
                        axios.delete(`${process.env.REACT_APP_LINK}sekolah_bank/${idBtn}`)
                        .then(res => {
                            console.log(res)
                            handleUpdateDelete()
                        })
                            .catch(e => console.log(e))
                        Swal.fire(
                            "Data Berhasil Dihapus"
                        )
                    }
                    
                })

               
            }
            else if(typeBtn === "edit"){
                props.handleopenmodal()
            }
        }
        else if(props.page === "kepemilikan"){
            if(typeBtn == "delete"){
                Swal.fire({
                    title:"Apakah Anda Yakin ?",
                    text:"Item yang sudah terhapus tidak dapat dikembalikan",
                    icon:"warning",
                    showCancelButton:true,
                    confirmButtonText:"Ya,Hapus",
                    cancelButtonText:"Batal"
                })
                .then((result) => {
                    if(result.isConfirmed){
                        axios.delete(`${process.env.REACT_APP_LINK}sekolah_kepemilikan/${idBtn}`)
                        .then(res => {
                            console.log(res)
                            handleUpdateDelete()
                        })
                        .catch(e => console.log(e))
                        Swal.fire(
                            "Data Berhasil Dihapus"
                        )
                    }
                    
                })

                
            }
            else if(typeBtn === "edit"){
                props.handleopenmodal()
            }
        }
    }

    return(
        <div>
            <h2 className='mb-4'>{props.title}</h2>
            <CTable className='table-responsive'>
                <CTableHead className='table-dark'>
                    <CTableRow> 
                        {
                            tablehead.map((item,index) => 
                                <>
                                <CTableHeaderCell key={index}>
                                        {item}
                                </CTableHeaderCell>
                                </>
                           )
                        }
                        {
                            props.page === "alamat" &&
                            <th> 
                                <img onClick={handleClickOption}  typebtn="tambah" style={{cursor:"pointer"}} src="./img/icon/add bw.png" width="30" height="30" />   
                            </th>
                        }
                    
                    </CTableRow>
                </CTableHead>
                <CTableBody>

                    {/* Page Identitas */}
                    {
                        props.page === "identitas" &&
                            dataSekolah.map((item,index) => 
                                <CTableRow key={index}>
                                
                                    <td>{item.npsn}</td>
                                    <td>{item.nama}</td>
                                    <td>{
                                        dataPendidikan.map((items,index) => 
                                            items.bentuk_pendidikan_id === item.bentuk_pendidikan_id &&
                                            items.nama
                                        )
                                    }
                                    </td>
                                    <td>{
                                        dataKbm.map((items,index) => 
                                        items.waktu_penyelenggaraan_id == item.waktu_pbm_id &&
                                        items.nama
                                        )
                                    }
                                    </td>
                                    {/* <td>{item.sk_pendirian_sekolah}</td>
                                    <td>{item.tanggal_sk_pendirian}</td> */}
                                    <td>
                                        {
                                        dataStatusSekolah.map((items,index) => 
                                            items.status_sekolah == item.status_sekolah &&
                                            items.deskripsi
                                        )
                                        }
                                    </td>
                                    <td>{item.mbs_kode}</td>
                                    <td>{item.npwp}</td>
                                    <td>{item.nm_wp}</td>
                                    <td>{item.nomor_telepon}</td>
                                    <td>{item.email}</td>
                                    <td>{item.instagram}</td>
                                    
                                    <td>{item.website}</td>
                                    <td>
                                        <CButton color="link"typebtn="delete" id={item.sekolah_id} onClick={handleClickOption} >
                                            <img src="./img/icon/delete bw.jpg" width="20" height="20"typebtn="delete" onClick={handleClickOption} id={item.sekolah_id} ></img>
                                        </CButton>
                                        <CButton color="link" typebtn="edit" id={item.sekolah_id} onClick={handleClickOption} >
                                            <img src="./img/icon/write bw.png" width="20" height="20" typebtn="edit" onClick={handleClickOption} id={item.sekolah_id} ></img>
                                        </CButton>
                                        {/* <CButton className='text-white' color="danger" onClick={handleClickOption} typebtn="delete" id={item.sekolah_id}>Hapus</CButton>
                                        <CButton className='text-white' color="primary" onClick={handleClickOption} typebtn="edit" id={item.sekolah_id}>Edit</CButton> */}
                                        
                                    </td>
                        
                            
                                </CTableRow>
                                
                            )
                            
                            
                    }

                    {/* PAge Alamat */}
                    {
                        props.page === "alamat" && 
                            dataAlamat.map((item,index) => 
                                <tr key={index}>
                                    <td>
                                    {
                                        dataSekolah.map((items,index) => 
                                            items.sekolah_id == item.sekolah_id &&
                                            items.nama
                                        )
                                    }
                                </td>
                                <td>
                                    {
                                        item.alamat_jalan
                                    }
                                </td>
                                <td>
                                    {
                                        item.rt
                                    }
                                </td>
                                <td>
                                    {
                                        item.rw
                                    }
                                </td>
                                <td>
                                    {
                                        item.nama_dusun
                                    }
                                </td>
                                <td>
                                    {
                                        item.kode_wilayah
                                    }
                                </td>
                                <td>
                                    {
                                        item.kode_pos
                                    }
                                </td>
                                <td>
                                    {
                                        item.lintang
                                    }
                                </td>
                                <td>
                                    {
                                        item.bujur
                                    }
                                </td>
                                <td>
                                    {
                                        item.keaktifan
                                    }
                                </td>
                                <td>
                                        <CButton color="link"typebtn="delete" id={item.sekolah_alamat_id} onClick={handleClickOption} >
                                            <img src="./img/icon/delete bw.jpg" width="20" height="20"typebtn="delete" onClick={handleClickOption} id={item.sekolah_alamat_id} ></img>
                                        </CButton>
                                        <CButton color="link" typebtn="edit" id={item.sekolah_alamat_id} onClick={handleClickOption} >
                                            <img src="./img/icon/write bw.png" width="20" height="20" typebtn="edit" onClick={handleClickOption} id={item.sekolah_alamat_id} ></img>
                                        </CButton>

                                        {/* <CButton className='text-white mx-2' color="danger" onClick={handleClickOption} typebtn="delete" id={item.sekolah_alamat_id}>Hapus</CButton>
                                        <CButton className='text-white' color="primary" onClick={handleClickOption} typebtn="edit" id={item.sekolah_alamat_id}>Edit</CButton> */}
                                    </td>
                                </tr>
                            )
                    }

                    {/* Akreditasi Page */}

                    {
                        props.page === "akreditasi" &&
                        dataAkreditasi.map((item,index) => 
                            <tr key={index}>
                                <td>
                                    {
                                        dataSekolah.map((items,index) => 
                                            items.sekolah_id == item.sekolah_id &&
                                            items.nama

                                        )
                                    }
                                </td>
                                <td>
                                    {
                                        optionAkreditasi.map((items,index) => 
                                            items.akreditasi_id == item.status_akreditasi &&
                                            items.nama
                                        )
                                    }
                                </td>
                                <td>
                                    {
                                        item.nilai_akreditasi
                                    }
                                </td>
                                <td>
                                    {
                                        item.nomor_sk_akreditasi
                                    }
                                </td>
                                <td>
                                    {
                                        item.tanggal_sk_akreditasi
                                    }
                                </td>
                                <td>
                                        <CButton color="link"typebtn="delete" id={item.sekolah_akreditasi_id} onClick={handleClickOption} >
                                            <img src="./img/icon/delete bw.jpg" width="20" height="20"typebtn="delete" onClick={handleClickOption} id={item.sekolah_akreditasi_id} ></img>
                                        </CButton>
                                        <CButton color="link" typebtn="edit" id={item.sekolah_akreditasi_id} onClick={handleClickOption} >
                                            <img src="./img/icon/write bw.png" width="20" height="20" typebtn="edit" onClick={handleClickOption} id={item.sekolah_akreditasi_id} ></img>
                                        </CButton>

                                        {/* <CButton className='text-white mx-2' color="danger" onClick={handleClickOption} typebtn="delete" id={item.sekolah_akreditasi_id}>Hapus</CButton>
                                        <CButton className='text-white' color="primary" onClick={handleClickOption} typebtn="edit" id={item.sekolah_akreditasi_id}>Edit</CButton> */}
                                    </td>
                            </tr>
                        )
                    }

                    {/* Iso Page */}
                    {
                        props.page === "iso" && 
                            dataIso.map((item,index) => 
                                <tr key={index}>
                                    <td>
                                        {
                                           dataSekolah.map((items,index) => 
                                                items.sekolah_id == item.sekolah_id &&
                                                items.nama
                                           )
                                        }
                                    </td>
                                    <td>
                                        {
                                            optionIso.map((items,index) => 
                                                items.sertifikasi_iso_id == item.sertifikasi_iso_id &&
                                                items.nama
                                            )
                                        }
                                    </td>
                                    <td>
                                        {
                                            item.nomor_sertifikasi_iso
                                        }
                                    </td>
                                    <td>
                                        {
                                            item.tanggal_sertifikasi_iso
                                        }
                                    </td>
                                    <td>
                                        <ButtonActionKelembagaan 
                                            width="20"
                                            height="20"
                                            id={item.sekolah_sertifikasi_iso_id}
                                            onclick={handleClickOption}
                                        />
                                        
                                        {/* <CButton className='text-white mx-2' color="danger" onClick={handleClickOption} typebtn="delete" id={item.sekolah_sertifikasi_iso_id}>Hapus</CButton>
                                        <CButton className='text-white' color="primary" onClick={handleClickOption} typebtn="edit" id={item.sekolah_sertifikasi_iso_id}>Edit</CButton> */}
                                    </td>
                                    
                                </tr>
                            )
                    }

                    {/* rekening page */}
                    {
                        props.page === "rekening" && 
                        dataRekening.map((item,index) => 
                            <tr key={index}>
                                <td>
                                    {
                                        dataSekolah.map((items,index) => 
                                            items.sekolah_id == item.sekolah_id &&
                                            items.nama
                                        )
                                    }
                                </td>
                                <td>
                                    {
                                        databank.map((items,index) => 
                                            items.id_bank == item.id_bank &&
                                            items.nm_bank
                                        )
                                    }
                                </td>
                                <td>
                                    {
                                        item.cabang_kcp_unit
                                    }
                                </td>
                                <td>
                                    {
                                        item.no_rekening
                                    }
                                </td>
                                <td>
                                    {
                                        item.rekening_atas_nama
                                    }
                                </td>
                                <td>
                                        <ButtonActionKelembagaan 
                                            width="20"
                                            height="20"
                                            id={item.sekolah_bank_id}
                                            onclick={handleClickOption}
                                        />
                                        {/* <CButton className='text-white mx-2' color="danger" onClick={handleClickOption} typebtn="delete" id={item.sekolah_bank_id}>Hapus</CButton>
                                        <CButton className='text-white' color="primary" onClick={handleClickOption} typebtn="edit" id={item.sekolah_bank_id}>Edit</CButton> */}
                                    </td>

                            </tr>
                        )
                    }

                    {/* Kepemilikan page */}
                    {
                        props.page === "kepemilikan" &&
                        dataKepemilikan.map((item,index) => 
                            <tr key={index}>
                                <td>
                                    {
                                        dataSekolah.map((items,index) =>
                                            items.sekolah_id == item.sekolah_id &&
                                            items.nama
                                        )
                                    }
                                </td>
                                <td>
                                    {
                                        optionKepemilikan.map((items,index) => 
                                            items.status_kepemilikan_id == item.status_kepemilikan &&
                                            items.nama

                                        )
                                    }
                                </td>
                                <td>
                                    {
                                        item.nama_yayasan
                                    }
                                </td>
                                <td>
                                    {
                                        item.nama_notaris
                                    }
                                </td>
                                <td>
                                    {
                                        item.nomor_akte_notaris
                                    }
                                </td>
                                <td>
                                    {
                                        item.tanggal_akte_notaris
                                    }
                                </td>
                                <td>
                                        <ButtonActionKelembagaan 
                                            width="20"
                                            height="20"
                                            id={item.sekolah_kepemilikan_id}
                                            onclick={handleClickOption}
                                        />
                                        {/* <CButton className='text-white mx-2' color="danger" onClick={handleClickOption} typebtn="delete" id={item.sekolah_kepemilikan_id}>Hapus</CButton>
                                        <CButton className='text-white' color="primary" onClick={handleClickOption} typebtn="edit" id={item.sekolah_kepemilikan_id}>Edit</CButton> */}
                                </td>
                            </tr>
                        )
                    }
                </CTableBody>
            </CTable>
        </div>
    )
}
export default DataForm;