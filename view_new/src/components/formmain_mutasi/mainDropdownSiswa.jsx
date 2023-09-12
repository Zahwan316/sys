import { CButton, CForm, CTable, CTableBody, CTableHead } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import { CFormLabel,CFormSelect } from '@coreui/react';
import axios from 'axios';
import Swal from 'sweetalert2';
import {v4 as uuidv4} from "uuid"

const MainDropdownSiswa = (props) => {
    //data from api
    const[dataRombel,setdatarombel] = useState([])
    const[dataSiswa,setdatasiswa] = useState([])
    const[dataAnggotaRombel,setdataanggotarombel] = useState([])
    const[dataAnggotaRombelNew,setdataanggotarombelnew] = useState([])
    const[dataSemester,setdatasemester] = useState([])
    const[dataRombelNew,setdatarombelnew] = useState([])

    //set id
    const[idrombel,setidrombel] = useState()
    const[idsemesterold,setidsemesterold] = useState()
    const[idsemester,setidsemester] = useState()
    const[idrombelnew,setidrombelnew] = useState()

    const[siswaterpilih,setsiswaterpilih] = useState([])
    const[updater,setupdater] = useState()
    const[selectAll,setselectall] = useState(false)

    const[datarekap,setdatarekap] = useState([])


    const[forminput,setforminput] = useState({
        rombellama:"",
        rombelbaru:"",
        idsiswa:[]
    })

    //ambil data saat inisialisasi
    useEffect(() => {
        const getData = async() => {
            try{
                //let responseRombel = await axios.get(`${process.env.REACT_APP_LINK}kurikulum_rombongan_belajar`)
                let responseSiswa = await axios.get(`${process.env.REACT_APP_LINK}peserta_didik`)
                let responseSemester = await axios.get(`${process.env.REACT_APP_LINK}semester`)

                //filter data
                //let datarombel = responseRombel.data.data
                let datasiswa = responseSiswa.data.data
                let dataSemester = responseSemester.data.data

                //let datarombelold = datarombel.filter(item => item.semester_id === 20222 && item)
                
               // console.log(datarombelold)

                //setdatarombel(datarombelold)
                setdatasemester(responseSemester.data.data)
                setdatasiswa(responseSiswa.data.data)
                
            }
            catch(e){

            }
        }
        getData()
    },[])

    //ambil data saat idrombel ditemukan
    useEffect(() => {
        const getData = async() => {
            try{    
                let responseAnggotaRombel = await axios.get(`${process.env.REACT_APP_LINK}kurikulum_anggota_rombel/${idrombel}`)
                if(idrombel){
                    console.log(responseAnggotaRombel.data.data)
                    setdataanggotarombel(responseAnggotaRombel.data.data)
                }     
            }
            catch(e){
                console.log(e)
            }
        }
        getData()
        
    },[idrombel])

    //ambil data rombel id ketika memilih rombel bagian kanan
    useEffect(() => {
        const getData = async() => {
            try{
                let responseAnggotaRombel = await axios.get(`${process.env.REACT_APP_LINK}kurikulum_anggota_rombel/${idrombelnew}`)
                if(idrombel){
                    console.log(responseAnggotaRombel.data.data)
                    setdataanggotarombelnew(responseAnggotaRombel.data.data)
                }     
            }
            catch(e){
                console.log(e)
            }
        }
        getData()
    },[idrombelnew])

    //ambil data rombel ketika memilih semester baigan kanan
    useEffect(() => {
        let getdata = async() => {
            try{
                if(props.page === "siswareguler"){
                    let responseRombel = await axios.get(`${process.env.REACT_APP_LINK}kurikulum_rombongan_belajar`)
                    let datarombel = responseRombel.data.data
                    let datarombelnew = datarombel.filter(item => item.semester_id == idsemester && item)
                    setdatarombelnew(datarombelnew)
                }
                else if(props.page === "siswaindustri"){
                    let responseRombel = await axios.get(`${process.env.REACT_APP_LINK}kurikulum_rombongan_belajar`)
                    let datarombel = responseRombel.data.data
                    let datarombelnew = datarombel.filter(item => item.semester_id == idsemester && item.is_industri == 1 ? item : "")
                    setdatarombelnew(datarombelnew)
                }
            }
            catch(e){
                console.log(e)
            }
        }
        getdata()
    },[idsemester])

    //ambil data rombel ketika meimilih semester bagian kiri
    useEffect(() => {
        const getData = async() => {
            try{
                    let responseRombel = await axios.get(`${process.env.REACT_APP_LINK}kurikulum_rombongan_belajar`)
                    let responserombel = responseRombel.data.data
                    let datarombelold = responserombel.filter(item => item.semester_id == idsemesterold)
                    setdatarombel(datarombelold)
            }
            catch(e){
                console.log(e)
            }
        }
        getData()
    },[idsemesterold])

    //set ke state forminput ketika ada siswa yang terpilih
    useEffect(() => {
        setforminput({...forminput,idsiswa:siswaterpilih})
    },[siswaterpilih])

    useEffect(() => {
        const getData = async() => {
            try{
                let responsedatarombelold = await axios.get(`${process.env.REACT_APP_LINK}kurikulum_anggota_rombel/${idrombel}`)
                let responsedatarombelnew = await axios.get(`${process.env.REACT_APP_LINK}kurikulum_anggota_rombel/${idrombelnew}`)
            
                setdataanggotarombel(responsedatarombelold.data.data)
                setdataanggotarombelnew(responsedatarombelnew.data.data)
            }
            catch(e){
                console.log(e)
            }
        }
        getData()
    },[updater])

    useEffect(() => {
       /*   console.log(idrombel)
       console.log(siswaterpilih)
       console.log(idrombelnew)
       console.log(forminput)
       console.log(selectAll)  */
       console.log(idsemester) 
        console.log(dataRombel)
    })

    const handleOptionRombelLama = (e) => {
        setidrombel(e.target.value)
        setforminput({...forminput,rombellama:e.target.value})
    }
    
    const handleOptionSemesterIdOld = (e) => {
        setidsemesterold(e.target.value)
    }

    const handleOptionSemesterId = (e) => {
        setidsemester(e.target.value)
    }

    const handleOptionIdRombelNew = (e) => {
        setidrombelnew(e.target.value)
        setforminput({...forminput,rombelbaru:e.target.value})
    }

    const handleSelectAll = (e) => {
        setselectall(e.target.checked)

        if(e.target.checked){
            const allstudentid = dataAnggotaRombel.map((siswa) => siswa.peserta_didik_id)
            setsiswaterpilih(allstudentid)
        }
        else{
            setsiswaterpilih([])
        }
    }

    const handleChecked = (e) => {
        if(e.target.checked){
            setsiswaterpilih(pre => [...pre,e.target.value])
        }
        else{
            setsiswaterpilih(pre => pre.filter(id => id !== e.target.value))
        }
      // setsiswaterpilih({...siswaterpilih,[e.target.id]:e.target.checked})
    }

    const handleForm = (e) => {
        e.preventDefault()

        const sendData = async() => {
            try{   
                Swal.fire({
                    title:"Apakah Anda Yakin ?",
                    text:"Ingin Mutasi Rombel Ini ?",
                    icon:"warning",
                    showCancelButton:true,
                    confirmButtonText:"Ya,Mutasi",
                    cancelButtonText:"Batal"
                })
                .then(result => {
                    if(result.isConfirmed){
                        let editdata = async() => {
                            try{
                                if(forminput.rombellama !== "" && forminput.rombelbaru !== "" && forminput.idsiswa !== ""){

                                    let response = await axios.put(`${process.env.REACT_APP_LINK}kurikulum_anggota_rombel`,forminput)
                                    console.log(response.data)
                                    setupdater(uuidv4())
                                    let responselog = await axios.get(`${process.env.REACT_APP_LINK}datarekap`)
                                    setdatarekap(responselog.data.data)
                                    setforminput({
                                        rombellama:"",
                                        rombelbaru:"",
                                        idsiswa:[]
                                })
                                
                                Swal.fire(
                                    "Data berhasil dimutasi"
                                    )
                                }
                                else{
                                    Swal.fire(
                                        "Cari dulu rombelnya"
                                        )
                                }

                            }
                            catch(e){
                                console.log(e)
                                Swal.fire(
                                    "Data gagal dimutasi",
                                    e.message
                                )
                            }
                        }
                        editdata()
                    }
                })
            }
            catch(e){
                console.log(e)
            }
        }
        sendData()
    }

    return(
        <>
        <form onSubmit={handleForm}>
            <div className='d-flex flex-wrap' style={{gap:"4em"}}>

             {/* Kelas Lama */}
            <div className='' style={{width:"16vw"}}>
                {/* option semester */}
                <CFormLabel>Semester</CFormLabel>
                <CFormSelect
                    className='mb-3'
                    onChange={handleOptionSemesterIdOld}
                >
                    <option>Pilih Semester</option>
                    {
                        dataSemester.map(item => 
                            <option value={item.semester_id}>{item.nama}</option>    
                        )
                    }
                </CFormSelect>

                {/* option rombel */}
                <CFormLabel>Rombel Lama</CFormLabel>
                <CFormSelect
                    className='mb-5'
                    onChange={handleOptionRombelLama}
                >
                    <option>Pilih Rombel</option>
                    {
                        dataRombel.map((item,index) => 
                            <option value={item.rombongan_belajar_id}>{item.nama}</option>
                        )
                    }
                </CFormSelect>

                {/* Table main */}
                <CTable>
                        <CTableHead className='table-dark'>
                            <tr>
                                <th>
                                    <input
                                        type='checkbox'
                                        onChange={handleSelectAll}
                                        checked={selectAll}
                                        name='allchecked'
                                    />
                                </th>
                                <th>Nama</th>
                            </tr>
                        </CTableHead>
                        <CTableBody>
                            {
                                dataAnggotaRombel.map((item,index) => 
                                <tr key={index}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            onChange={handleChecked}
                                            checked={siswaterpilih[item.peserta_didik_id]}
                                            id={item.peserta_didik_id}
                                            value={item.peserta_didik_id}
                                        />
                                    </td>
                                    <td>
                                        {
                                            dataSiswa.map((items,index) => 
                                                items.peserta_didik_id === item.peserta_didik_id &&
                                                items.nama
                                            )
                                        }
                                    </td>
                                </tr>
                                
                                )
                            }
                        </CTableBody>
                </CTable>
                {/*  end table main */}
            </div>
            
            {/* Kelas Baru */}
            <div className='' style={{width:"16vw"}}>
                <CFormLabel>Semester</CFormLabel>
                <CFormSelect
                    onChange={handleOptionSemesterId}
                    className='mb-3'
                >
                    <option>Pilih Semester</option>    
                    {
                        dataSemester.map(item => 
                            <option value={item.semester_id}>{item.nama}</option>    
                        )
                    }
                </CFormSelect>
                <CFormLabel>Rombel Baru</CFormLabel>
                <CFormSelect
                    className='mb-5'
                    onChange={handleOptionIdRombelNew}
                >
                    <option>Pilih Rombel</option>
                    {
                        dataRombelNew.map((item,index) => 
                            <option value={item.rombongan_belajar_id}>{item.nama}</option>
                        )
                    }
                </CFormSelect>

                <CTable>
                        <CTableHead className='table-dark'>
                            <tr>
                                <th>No</th>
                                <th>Nama</th>
                            </tr>
                        </CTableHead>
                        <CTableBody>
                            {
                                dataAnggotaRombelNew.map((item,index) => 
                                <tr>
                                    <td>
                                        {index + 1}
                                    </td>
                                    <td>
                                        {
                                            dataSiswa.map((items,index) => 
                                                items.peserta_didik_id === item.peserta_didik_id &&
                                                items.nama
                                            )
                                        }
                                    </td>
                                </tr>
                                )
                            }
                           
                        </CTableBody>
                </CTable>
            </div>

            {/* Data Rekap */}
            <div style={{width:"15vw"}}>
                <CFormLabel>Data Rekap</CFormLabel>
                <CTable>
                    <CTableHead className='table-dark'>
                        <tr>
                            <th>No</th>
                            <th>Rombel</th>
                            <th>L</th>
                            <th>P</th>
                            <th>L + P</th>
                        </tr>
                    </CTableHead>
                    <CTableBody>
                       {
                            datarekap.map((item,index) => 
                                <tr key={index}>
                                    <td>
                                        {index + 1}.
                                    </td>
                                    <td>
                                        {
                                            item.namakelas
                                        }
                                    </td>
                                    <td>
                                        {
                                            item.l
                                        }
                                    </td>
                                    <td>
                                        {
                                            item.p
                                        }
                                    </td>
                                    <td>
                                        {
                                            item.l + item.p
                                        }
                                    </td>
                                </tr>
                            )
                       }
                    </CTableBody>
                </CTable>
            </div>

            </div>
            <CButton type="submit">Mutasi</CButton>
        </form>
        </>
    )
}

export default MainDropdownSiswa