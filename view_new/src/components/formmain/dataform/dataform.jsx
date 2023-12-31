
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
import useRefStore from 'src/state/ref';


const DataForm = (props) => {
    const[dataSekolah,setdatasekolah] = useSekolahStore((state) => [state.sekolah_identitas,state.setsekolahidentitas])
    const[dataAlamat,setdataalamat] = useSekolahStore((state) => [state.sekolah_alamat,state.setsekolahalamat]);
    const[dataAkreditasi,setdataakreditasi] = useSekolahStore((state) => [state.sekolah_akreditasi,state.setsekolahakreditasi])
    const[dataIso,setdataiso] = useSekolahStore((state) => [state.sekolah_iso,state.setsekolahiso])
    const[dataRekening,setdatarekening] = useSekolahStore((state) => [state.sekolah_rekening,state.setsekolahrekening])
    const[dataKepemilikan,setdatakepemilikan] = useSekolahStore((state) => [state.sekolah_kepemilikan,state.setsekolahkepemilikan])
    const[bentukpendidikanid,setpendidikanid] = useItemStore((state) => [state.bentuk_pendidikan_id,state.setbentukpendidikanid])
    const[sekolahid,setsekolahid] = useItemStore((state) => [state.sekolah_id,state.setsekolahid])
    //for identitas page
    const[dataKbm,setdatakbm] = useRefStore((state) => [state.waktu_penyelenggaraan,state.setwaktupenyelenggaraan]);
    const[dataPendidikan,setdatapendidikan] = useRefStore((state) => [state.bentuk_pendidikan,state.setbentukpendidikan])
    const[dataStatusSekolah,setdatastatus] = useRefStore((state) => [state.status_sekolah,state.setstatussekolah])

    //for akreditasi page
    const[optionAkreditasi,setoptionakreditasi] = useState(props.data)

    //for iso page
    const[optionIso,setoptioniso] = useRefStore((state) => [state.sertifikasi_iso,state.setsertifikasiiso])

    //for bank page
    const[databank,setdatabank] = useRefStore((state) => [state.bank,state.setbank])

    //for kepemilikan page
    const[optionKepemilikan,setoptionkepemilikan] = useRefStore((state) => [state.status_kepemilikan,state.setstatuskepemilikan])

    //variabel untuk memperbarui kode delete
    const[updatedelete,setupdatedelete] = useState([])

    const tablehead = props.tablehead
    const[isload,setisload] = useState(false)

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

            if(Object.keys(dataKbm).length === 0)
            {
             const response_kbm = await axios.get(process.env.REACT_APP_LINK +"waktu_penyelenggaraan");
             setdatakbm(response_kbm.data.data)
            }
            if(Object.keys(dataPendidikan).length === 0)
            {
             const response_pendidikan = await axios.get(process.env.REACT_APP_LINK +"bentuk_pendidikan");
             setdatapendidikan(response_pendidikan.data.data)
            }
            if(Object.keys(dataStatusSekolah).length === 0)
            {
             const response_status = await axios.get(process.env.REACT_APP_LINK + "status_sekolah")
             setdatastatus(response_status.data.data)
            }
            
            //alamat page
            if(props.page === "alamat")
            {
             if(Object.keys(dataAlamat).length === 0)
             {
               const response_alamat = await axios.get(process.env.REACT_APP_LINK + "sekolah_alamat")
               setdataalamat(response_alamat.data.data)
             }
            }
            
            //akreditasi page
            if(props.page == "akreditasi"){
             if(Object.keys(dataAkreditasi).length === 0)
             {
               const response_akreditasi = await axios.get(process.env.REACT_APP_LINK + "sekolah_akreditasi")
               setdataakreditasi(response_akreditasi.data.data)
             }      
            }
            
            //iso page 
            if(props.page === "iso"){
                if(Object.keys(dataIso).length === 0)
                {
                 const response_iso = await axios.get(process.env.REACT_APP_LINK + "sekolah_iso")
                 setdataiso(response_iso.data.data)
                }
                if(Object.keys(optionIso).length === 0)
                {
                 const response_iso_sertifikat = await axios.get(process.env.REACT_APP_LINK + "sertifikasi_iso")
                 setoptioniso(response_iso_sertifikat.data.data)
                }
                
            }
                
            //rekening page
            if(props.page === "rekening"){
             if(Object.keys(dataRekening).length === 0)
             {
              const response_rekening = await axios.get(process.env.REACT_APP_LINK + "sekolah_bank")
              setdatarekening(response_rekening.data.data)
             }
             if(Object.keys(databank).length === 0)
             {
              const response_rekening_bank = await axios.get(process.env.REACT_APP_LINK + "bank")
              setdatabank(response_rekening_bank.data.data)
             }           
            }  

            //kepemilikan page
            if(props.page === "kepemilikan"){
             if(Object.keys(dataKepemilikan).length === 0)
             {
              const response_kepemilikan = await axios.get(process.env.REACT_APP_LINK + "sekolah_kepemilikan")
              setdatakepemilikan(response_kepemilikan.data.data)
             }
             if(Object.keys(optionKepemilikan).length === 0)
             {
              const response_option_kepemilikan = await axios.get(process.env.REACT_APP_LINK + "status_kepemilikan")
              setoptionkepemilikan(response_option_kepemilikan.data.data)
             }


            }    
        }     
        getData()
     
    },[])

    //update data ketika data ditambahkan
    useEffect(() => {
        const getData = async() => {
            if(props.isload)
            {

            
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
        }
        getData()
    },[props.updater])

    //update data ketika data dihapus
    useEffect(() => {
        const getData = async() => {
            if(isload)
            {

            
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
        }
        getData()
    },[updatedelete])


    useEffect(() => {
        console.log()   
    })
    
    const handleUpdateDelete = () => {
        setupdatedelete(uuidv4())
    }

    const handleDelete = async(url) => {
     try{
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
            axios.delete(`${process.env.REACT_APP_LINK}${url}`)
                .then(res =>{ 
                    console.log(res)
                    handleUpdateDelete()
                    setisload(true)
                    setTimeout(() => {
                     setisload(false)
                    }, 500);
                })
                .catch(e => console.log(e))

            Swal.fire(
                "Data Berhasil Dihapus"
            )
        }

    })

     }
     catch(e)
     {

     }
    }

    const handleClickOption = (e) => {
        const idBtn = e.target.getAttribute("id")
        const typeBtn = e.target.getAttribute("typebtn")
        {
           typeBtn != "delete" &&
             props.handlemodal()
        }
      
        props.getTypeBtn(typeBtn,idBtn)
              
        //identitas page
        if(props.page === "identitas"){
            if(typeBtn == "delete"){
                setsekolahid(null)
                handleDelete(`sekolah_identitas/${idBtn}`)
            }
        }
        else if(props.page === "alamat"){
            if(typeBtn == "delete"){
             handleDelete(`sekolah_alamat/${idBtn}`)            
            }
        }
        else if(props.page === "akreditasi"){
            if(typeBtn == "delete"){
             handleDelete(`sekolah_akreditasi/${idBtn}`)       
            }
            
        }
        else if(props.page === "iso"){
            if(typeBtn == "delete"){
             handleDelete(`sekolah_iso/${idBtn}`)
            }      
        }
        
        else if(props.page === "rekening"){
         if(typeBtn == "delete")
         {
          handleDelete(`sekolah_bank/${idBtn}`)
         }
        }
        else if(props.page === "kepemilikan"){
         if(typeBtn == "delete")
         {
          handleDelete(`sekolah_kepemilikan/${idBtn}`)
         }
        }
    }

    return(
        <div>
            <h2 className='mb-4'>{props.title}</h2>
            <CTable className='table-responsive' style={{verticalAlign:"middle"}}>
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
                            props.page === "alamat" || props.page === "identitas" ?
                            <th> 
                                <img onClick={handleClickOption}  typebtn="tambah" style={{cursor:"pointer"}} src="./img/icon/add bw.png" width="30" height="30" />   
                            </th>
                            :
                            ""
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
                                    
                                    <td>
                                        {
                                        dataStatusSekolah.map((items,index) => 
                                            items.status_sekolah == item.status_sekolah &&
                                            items.deskripsi
                                        )
                                        }
                                    </td>
                                   
                                    
                                    <td>{item.npwp}</td>
                                    <td>{item.nomor_telepon}</td>
                                    <td>{item.email}</td>
                                    <td>
                                        <CFormCheck 
                                         defaultChecked={item.keaktifan == 1}

                                         readOnly
                                        />
                                    </td>
                                    <td>
                                        <CButton color="link" typebtn="detail" id={item.sekolah_id} onClick={handleClickOption} >
                                            <img src="./img/icon/view.png" width="20" height="20" typebtn="detail" onClick={handleClickOption} id={item.sekolah_id} ></img>
                                        </CButton>
                                        <CButton color="link"typebtn="delete" id={item.sekolah_id} onClick={handleClickOption} >
                                            <img src="./img/icon/delete bw.jpg" width="20" height="20"typebtn="delete" onClick={handleClickOption} id={item.sekolah_id} ></img>
                                        </CButton>
                                        <CButton color="link" typebtn="edit" id={item.sekolah_id} onClick={handleClickOption} >
                                            <img src="./img/icon/write bw.png" width="20" height="20" typebtn="edit" onClick={handleClickOption} id={item.sekolah_id} ></img>
                                        </CButton>
                            
                                        
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
                                    <CFormCheck 
                                     checked={item.keaktifan === 1}
                                     readOnly
                                    />
                                </td>
                                <td>
                                        <CButton color="link"typebtn="delete" id={item.sekolah_alamat_id} onClick={handleClickOption} >
                                            <img src="./img/icon/delete bw.jpg" width="20" height="20" typebtn="delete" onClick={handleClickOption} id={item.sekolah_alamat_id} ></img>
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
                                    <CFormCheck
                                     defaultChecked={item.keaktifan == 1}
                                    />
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
                                   <CFormCheck
                                    defaultChecked={item.keaktifan == 1}
                                   />
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