import { CTable, CTableBody, CTableHead, CTableHeaderCell, CTableRow,CButton,CSpinner } from '@coreui/react';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Swal from "sweetalert2"
import {v4 as uuidv4} from "uuid"
import RowTable from '../table/row';
import useStore from 'src/state/pesertadidik';
import useRefStore from 'src/state/ref';
import { useNavigate, useParams } from 'react-router-dom';

const TablePesertaDidik = (props) => {
    const[datajenjangpendidikan,setdatajenjangpendidkan] = useState([])
    const[datalayakpip,setdatalayakpip] = useRefStore((state) => [state.alasanlayakpip,state.setalasanlayakpip])
    const[loading,setloading] = useState(true)
    const[updaterdelete,setupdaterdelete] = useState()
    const[dataalamat,setdataalamat] = useStore((state) => [state.pesertadidikalamat,state.setdatapesertadidikalamat])
    const[datajenistinggal,setdatajenistinggal] = useState([])
    const[datakesehatan,setdatakesehatan] = useStore((state) => [state.pesertadidikkesehatan,state.setdatapesertadidikkesehatan])
    const[datakontak,setdatakontak] = useStore((state) => [state.pesertadidikkontak,state.setdatapesertadidikkkontak])
    const[datarekening,setdatarekening] = useStore((state) => [state.pesertadidikrekening,state.setdatapesertadidikrekening])
    const[databank,setdatabank] = useStore((state) => [state.namabank,state.setnamabank])
    const[datapesertadidik,setdatapesertadidik] = useStore((state) => [state.pesertadidik,state.setdatapesertadidik])
    const[datapendidikan,setdatapendidikan] = useRefStore((state) => [state.pendidikan,state.setdatapendidikan])
    const[datapekerjaan,setdatapekerjaan] = useRefStore((state) => [state.pekerjaan,state.setdatapekerjaan])
    const[jenistinggal,setjenistinggal] = useRefStore((state) =>[state.jenis_tinggal,state.setjenistinggal])
    const[datawilayah,setdatawilayah] = useStore((state) => [state.datawilayah,state.setdatawilayah])
    let setpesertadidikid = useStore((state) => state.setpesertadidikid)
    const {id}= useParams()
    const[isload,setisload] = useState(false)

    useEffect(() => {
        let getData = async() => {
            try{
                setloading(true)
                if(props.page === "pesertadidikbiodata"  ){
                    if(Object.keys(datapesertadidik).length === 0){
                        let response = await axios.get(`${process.env.REACT_APP_LINK}peserta_didik`)
                        setdatapesertadidik(response.data.data)
                    }
                    if(Object.keys(jenistinggal).length === 0){
                        let response_jenis_tinggal = await axios.get(`${process.env.REACT_APP_LINK}jenis_tinggal`)
                        setjenistinggal(response_jenis_tinggal.data.data)
                    }
                    if(Object.keys(datawilayah).length === 0)
                    {
                        let response_wilayah = await axios.get(`${process.env.REACT_APP_LINK}wilayah`)
                        //set data wilayah
                        const data_wilayah = response_wilayah.data.data
                        const filtered_data_wilayah = data_wilayah.filter(item => {
                            const jabar = item.id_wilayah.startsWith(32)
                            if(item.id_wilayah.length > 2 && jabar){
                                return item
                            }
                        })
                        setdatawilayah(filtered_data_wilayah)
                    }
                    
                }
                else if(props.page === 'pesertadidikkeluarga'){
                    if(Object.keys(datapendidikan).length === 0)
                    {
                        let response_pendidikan = await axios.get(`${process.env.REACT_APP_LINK}jenjang_pendidikan`)
                        setdatapendidikan(response_pendidikan.data.data)
                    }
                    if(Object.keys(datapekerjaan).length === 0)
                    {
                        let response_pekerjaan= await axios.get(`${process.env.REACT_APP_LINK}ref_pekerjaan`)
                        setdatapekerjaan(response_pekerjaan.data.data)
                    }
                }
                else if(props.page === "pesertadidikbantuan"){ 
                    if(Object.keys(datalayakpip).length === 0)
                    {
                        let response_layak_pip = await axios.get(`${process.env.REACT_APP_LINK}alasan_layak_pip`)
                        setdatalayakpip(response_layak_pip.data.data)
                    }
                }
                else if(props.page === 'pesertadidikalamat'){ 
                    if(Object.keys(dataalamat).length === 0)
                    {
                        let response_alamat = await axios.get(`${process.env.REACT_APP_LINK}peserta_didik_alamat`)
                        setdataalamat(response_alamat.data.data)
                    }   
                    if(Object.keys(jenistinggal).length === 0)
                    {
                        let response_jenis_tinggal = await axios.get(`${process.env.REACT_APP_LINK}jenis_tinggal`)
                        setdatajenistinggal(response_jenis_tinggal.data.data)
                    }
                }   
                else if(props.page === "pesertadidikkesehatan"){
                    if(Object.keys(datapesertadidik).length === 0){
                        let response = await axios.get(`${process.env.REACT_APP_LINK}peserta_didik`)
                        setdatapesertadidik(response.data.data)
                    }
                    if(Object.keys(datakesehatan).length === 0)
                    {
                        let response_kesehatan = await axios.get(`${process.env.REACT_APP_LINK}peserta_didik_kesehatan`)
                        setdatakesehatan(response_kesehatan.data.data)
                    }
                }
                else if(props.page === "pesertadidikkontak"){
                    if(Object.keys(datakontak).length === 0){
                        let response_kontak = await axios.get(`${process.env.REACT_APP_LINK}peserta_didik_kontak`)
                        setdatakontak(response_kontak.data.data)
                    }
                }
                else if(props.page === "pesertadidikrekening"){
                    if(Object.keys(datarekening).length === 0){
                        let response_rekening = await axios.get(`${process.env.REACT_APP_LINK}peserta_didik_rekening`)
                        setdatarekening(response_rekening.data.data)
                    }
                    if(Object.keys(databank).length === 0){
                        let response_bank = await axios.get(`${process.env.REACT_APP_LINK}bank`)
                        setdatabank(response_bank.data.data)
                    }
                }
                
            }
            catch(e){
                console.log(e)
            }
            finally{
                setloading(false)
            }
        }
        getData()
    },[])

    useEffect(() => {
        let getdata = async() => {
            try{
                setloading(true)
                if(props.isload){

                
                if(props.page === "pesertadidikbiodata"  ){
                    let response = await axios.get(`${process.env.REACT_APP_LINK}peserta_didik`)
                    let response_wilayah = await axios.get(`${process.env.REACT_APP_LINK}wilayah`)
                    let response_jenis_tinggal = await axios.get(`${process.env.REACT_APP_LINK}jenis_tinggal`)

                    setdatapesertadidik(response.data.data)
                    //set data wilayah
                    const data_wilayah = response_wilayah.data.data
                    const filtered_data_wilayah = data_wilayah.filter(item => {
                        const jabar = item.id_wilayah.startsWith(32)
                        if(item.id_wilayah.length > 2 && jabar){
                            return item
                        }
                    })
                    setdatawilayah(filtered_data_wilayah)

                    //set jenis tinggal
                    setjenistinggal(response_jenis_tinggal.data.data)
                }
                else if(props.page === 'pesertadidikkeluarga'){
                    /* let response_pendidikan = await axios.get(`${process.env.REACT_APP_LINK}jenjang_pendidikan`)
                    let response_pekerjaan= await axios.get(`${process.env.REACT_APP_LINK}ref_pekerjaan`)

                    setdatapendidikan(response_pendidikan.data.data)
                    setdatapekerjaan(response_pekerjaan.data.data) */

                    let response = await axios.get(`${process.env.REACT_APP_LINK}peserta_didik`)
                    setdatapesertadidik(response.data.data)
                }
                else if(props.page === "pesertadidikbantuan"){ 
                    let response_layak_pip = await axios.get(`${process.env.REACT_APP_LINK}alasan_layak_pip`)
                    setdatalayakpip(response_layak_pip.data.data)
                }
                else if(props.page === 'pesertadidikalamat'){    
                    let response_alamat = await axios.get(`${process.env.REACT_APP_LINK}peserta_didik_alamat`)
                    let response_jenis_tinggal = await axios.get(`${process.env.REACT_APP_LINK}jenis_tinggal`)

                    setdataalamat(response_alamat.data.data)
                    setdatajenistinggal(response_jenis_tinggal.data.data)
                }   
                else if(props.page === "pesertadidikkesehatan"){
                    let response = await axios.get(`${process.env.REACT_APP_LINK}peserta_didik`)
                    let response_kesehatan = await axios.get(`${process.env.REACT_APP_LINK}peserta_didik_kesehatan`)
                    

                    setdatapesertadidik(response.data.data)
                    setdatakesehatan(response_kesehatan.data.data)
                }
                else if(props.page === "pesertadidikkontak"){
                    let response_kontak = await axios.get(`${process.env.REACT_APP_LINK}peserta_didik_kontak`)
       
                    setdatakontak(response_kontak.data.data)
                }
                else if(props.page === "pesertadidikrekening"){
                    let response_rekening = await axios.get(`${process.env.REACT_APP_LINK}peserta_didik_rekening`)
                    let response_bank = await axios.get(`${process.env.REACT_APP_LINK}bank`)
                    
                    setdatarekening(response_rekening.data.data)
                    setdatabank(response_bank.data.data)
                }
            }
            }
            catch(e){
                console.log(e)
            }
            finally{
                setloading(false)
            }
        }
        getdata()
    },[props.updater])

    useEffect(() => {
        let getData = async() => {
            try{
               if(isload){

                if(props.page === "pesertadidikbiodata"  ){
                    let response = await axios.get(`${process.env.REACT_APP_LINK}peserta_didik`)
                    setdatapesertadidik(response.data.data)
                   
                }
                else if(props.page === 'pesertadidikkeluarga'){
                    let response = await axios.get(`${process.env.REACT_APP_LINK}peserta_didik`)
                    let response_pendidikan = await axios.get(`${process.env.REACT_APP_LINK}jenjang_pendidikan`)
                    let response_pekerjaan= await axios.get(`${process.env.REACT_APP_LINK}ref_pekerjaan`)
                    setdatapesertadidik(response.data.data)
                    setdatajenjangpendidkan(response_pendidikan.data.data)
                    setdatapekerjaan(response_pekerjaan.data.data)
                }
                else if(props.page === "pesertadidikbantuan"){
                    let response = await axios.get(`${process.env.REACT_APP_LINK}peserta_didik`)
                    setdatapesertadidik(response.data.data)
                    
                }
                else if(props.page === 'pesertadidikalamat'){    
                    let response_alamat = await axios.get(`${process.env.REACT_APP_LINK}peserta_didik_alamat`)
                    let response_jenis_tinggal = await axios.get(`${process.env.REACT_APP_LINK}jenis_tinggal`)

                    setdataalamat(response_alamat.data.data)
                    setdatajenistinggal(response_jenis_tinggal.data.data)
                }   
                else if(props.page === "pesertadidikkesehatan"){
                    let response = await axios.get(`${process.env.REACT_APP_LINK}peserta_didik`)
                    let response_kesehatan = await axios.get(`${process.env.REACT_APP_LINK}peserta_didik_kesehatan`)
                    

                    setdatapesertadidik(response.data.data)
                    setdatakesehatan(response_kesehatan.data.data)
                }
                else if(props.page === "pesertadidikkontak"){
                    let response_kontak = await axios.get(`${process.env.REACT_APP_LINK}peserta_didik_kontak`)
       
                    setdatakontak(response_kontak.data.data)
                }
                else if(props.page === "pesertadidikrekening"){
                    let response_rekening = await axios.get(`${process.env.REACT_APP_LINK}peserta_didik_rekening`)
                    let response_bank = await axios.get(`${process.env.REACT_APP_LINK}bank`)
                    
                    setdatarekening(response_rekening.data.data)
                    setdatabank(response_bank.data.data)
                }
                setisload(false)
            }             
            }
            catch(e){
                console.log(e)
            }
        }
        getData()
    },[updaterdelete])
    
    useEffect(() => {
        
        
    })

    const deleteData = async(url) => {
        try{
            Swal.fire({
                title:"Apakah Anda Yakin ?",
                text:"Item yang sudah terhapus tidak dapat dikembalikan",
                icon:"warning",
                showCancelButton:true,
                confirmButtonText:"Ya,Hapus",
                cancelButtonText:"Batal"
            })
            .then(result => {
                if(result.isConfirmed){
                    axios.delete(`${process.env.REACT_APP_LINK}${url}`)
                        .then(res => {
                            setupdaterdelete(uuidv4())
                            setisload(true)
                            Swal.fire(
                                "Data berhasil dihapus"
                                )
                            }
                        )
                        .catch(e => 
                            console.log(e)
                        )

                }
            })

        }

        catch(e){
            console.log(e)
        }
    }

    const handleclickbutton = (e) => {
        let typebtn = e.target.getAttribute("typebtn")
        let id = e.target.getAttribute("id")

        if(typebtn !== "delete"){
            props.handlemodal()
        }

        props.getTypeBtn(typebtn,id)

        if(typebtn === "delete"){
            if(props.page === "pesertadidikbiodata"){
                deleteData(`peserta_didik/${id}`)
            }
            if(props.page === "pesertadidikalamat"){
                deleteData(`peserta_didik_alamat/${id}`)
            }
            if(props.page === "pesertadidikkesehatan"){
                deleteData(`peserta_didik_kesehatan/${id}`)
            }
            if(props.page === "pesertadidikkontak"){
                deleteData(`peserta_didik_kontak/${id}`)
            }
            if(props.page === "pesertadidikrekening"){
                deleteData(`peserta_didik_rekening/${id}`)
            }
            
        }

    }

    const navigate = useNavigate()

    const handleNama = (e) => {
       let id = e.target.getAttribute("id")
       navigate(`/datapesertadidik/${id}`)
       setpesertadidikid(id)
    }


    return(
        <>
            <CTable hover >
                <CTableHead>
                    <CTableRow className='table-dark'>
                        {
                            props.tablehead.map((item,index) => 
                                 <th key={index} style={{verticalAlign:"middle"}}>
                                     {item}
                                 </th>    
                            )
                        }
                        {
                            props.page == "pesertadidikbantuan" || props.page == "pesertadidikkeluarga"?
                            <th>

                            </th>
                            :
                            <th> 
                                <img onClick={handleclickbutton}  typebtn="tambah" style={{cursor:"pointer"}} src="./img/icon/add bw.png" width="30" height="30" />   
                            </th>
                        }

                    </CTableRow>
                </CTableHead>
                <CTableBody style={{cursor:"pointer"}}>
                    {/* form biodata */}
                    {
                        props.page === "pesertadidikbiodata" &&
                        (!loading?
                        datapesertadidik.length > 0 ?
                        datapesertadidik.map((item,index) =>               
                            <tr key={index} style={{verticalAlign:"middle"}}>
                                <td onClick={handleNama} id={item.peserta_didik_id}>
                                    {item.nama}
                                </td>
                                <td>
                                    {item.nipd}
                                </td>
                                <td>
                                    {item.nisn}
                                </td>
                                <td>
                                    {item.jenis_kelamin}
                                </td>
                                <td>
                                    {item.tempat_lahir}
                                </td>
                                <td>
                                    {item.tanggal_lahir}
                                </td>
                                <td>
                                    {item.agama && item.agama.nama}
                                </td>
                                <td>
                                    {item.kewarganegaraan}
                                </td>
                                <td>
                                         <CButton color="link" typebtn="detail" id={item.peserta_didik_id} onClick={handleclickbutton}  >
                                            <img src="./img/icon/view.png" width="20" height="20" typebtn="detail" onClick={handleclickbutton}  id={item.peserta_didik_id} ></img>
                                        </CButton>
                                        <CButton color="link" typebtn="edit" id={item.peserta_didik_id} onClick={handleclickbutton}  >
                                            <img src="./img/icon/write bw.png" width="20" height="20" typebtn="edit" onClick={handleclickbutton}  id={item.peserta_didik_id} ></img>
                                        </CButton>
                                        <CButton color="link" typebtn="delete" id={item.peserta_didik_id} onClick={handleclickbutton}  >
                                            <img src="./img/icon/delete bw.jpg" width="20" height="20" typebtn="delete" onClick={handleclickbutton}  id={item.peserta_didik_id} ></img>
                                        </CButton>
                                    </td>
                            </tr>
                        ) :
                        <div>
                            <h2>Data Masih Kosong</h2>
                        </div>
                        :
                        <div className='d-flex align-items-center ' style={{height:"6vh"}}>
                            <CSpinner color="primary" style={{marginRight:"1rem"}} />
                            <p className='mb-0'>Mengolah Data Siswa</p>
                        </div>)
                    }

                    {/* form keluarga */}
                    {
                        props.page === 'pesertadidikkeluarga' && 
                       ( !loading ? 
                        datapesertadidik.length > 0 ?
                        datapesertadidik.map((item,index) => 
                            id != null ?
                            item.peserta_didik_id === id &&
                                <tr key={index} style={{verticalAlign:"middle"}}>
                                  
                                    <td>
                                        {item.no_kk}
                                    </td>
                                    <td>
                                        {item.nik}
                                    </td>
                                    <td>
                                        {item.anak_keberapa}
                                    </td>
                                    <td>
                                        {item.jumlah_saudara_kandung}
                                    </td>
                                    <td>
                                        {item.nama_ayah}
                                    </td>
                                    <td>
                                        {item.tanggal_lahir_ayah}
                                    </td>
                                    <td>
                                        {datajenjangpendidikan.map(items => 
                                            items.jenjang_pendidikan_id == item.pendidikan_ayah_id &&
                                            items.nama
                                        )}
                                    </td>
                                    <td>
                                        {
                                            datapekerjaan.map(items => 
                                                items.pekerjaan_id == item.pekerjaan_ayah_id &&
                                                items.nama
                                            )
                                        }
                                    </td>
                                    <td>
                                        {item.nama_ibu_kandung}
                                    </td>
                                    <td>
                                        {item.tanggal_lahir}
                                    </td>
                                    <td>
                                        {datajenjangpendidikan.map(items => 
                                            items.jenjang_pendidikan_id == item.pendidikan_ibu_id &&
                                            items.nama
                                        )}
                                    </td>
                                    <td>
                                        {
                                            datapekerjaan.map(items => 
                                                items.pekerjaan_id == item.pekerjaan_ibu_id &&
                                                items.nama
                                            )
                                        }
                                    </td>
                                    <td>
                                         <CButton color="link" typebtn="detail" id={item.peserta_didik_id} onClick={handleclickbutton}  >
                                            <img src="./img/icon/view.png" width="20" height="20" typebtn="detail" onClick={handleclickbutton}  id={item.peserta_didik_id} ></img>
                                        </CButton>
                                        <CButton color="link" typebtn="edit" id={item.peserta_didik_id} onClick={handleclickbutton}  >
                                            <img src="./img/icon/write bw.png" width="20" height="20" typebtn="edit" onClick={handleclickbutton}  id={item.peserta_didik_id} ></img>
                                        </CButton>
                                       {/*  <CButton color="link" typebtn="delete" id={item.peserta_didik_id} onClick={handleclickbutton}  >
                                            <img src="./img/icon/delete bw.jpg" width="20" height="20" typebtn="delete" onClick={handleclickbutton}  id={item.peserta_didik_id} ></img>
                                        </CButton> */}
                                    </td>
                                </tr> 
                                :
                                "" 
                        )
                        :
                        <div>
                            <h2>Data masih kosong</h2>
                        </div>

                        :
                        <div className='d-flex align-items-center ' style={{height:"6vh"}}>
                            <CSpinner color="primary" style={{marginRight:"1rem"}} />
                            <p className='mb-0'>Mengolah Data Siswa</p>
                         </div>)
                    }

                    {/* form bantuan */}
                    {
                        props.page === 'pesertadidikbantuan' &&
                       ( !loading ?
                        datapesertadidik.length > 0 ?
                        datapesertadidik.map(item => 
                            id != null ?
                                item.peserta_didik_id == id &&
                                <tr style={{verticalAlign:"middle"}}>
                                    <td>
                                        {item.no_kks}
                                    </td>
                                    <td>
                                        {item.no_kps}
                                    </td>
                                    <td>
                                        {item.penerima_kps === 1 ?"Iya":"Tidak"}
                                    </td>
                                    <td>
                                        {item.no_kip}
                                    </td>
                                    <td>
                                        {item.layak_pip === 1 ? "Iya":"Tidak"}
                                    </td>
                                    <td>
                                        {
                                            datalayakpip.map(items =>
                                                items.id_layak_pip === item.alasan_layak_pip &&
                                                items.alasan_layak_pip    
                                            )
                                        }
                                    </td>
                                    <td>
                                        {item.nama_di_kip === 1 ? "Terdaftar" : "Tidak Terdaftar"}
                                    </td>
                                    <td>
                                         <CButton color="link" typebtn="detail" id={item.peserta_didik_id} onClick={handleclickbutton}  >
                                            <img src="./img/icon/view.png" width="20" height="20" typebtn="detail" onClick={handleclickbutton}  id={item.peserta_didik_id} ></img>
                                        </CButton>
                                        <CButton color="link" typebtn="edit" id={item.peserta_didik_id} onClick={handleclickbutton}  >
                                            <img src="./img/icon/write bw.png" width="20" height="20" typebtn="edit" onClick={handleclickbutton}  id={item.peserta_didik_id} ></img>
                                        </CButton>
                                        
                                    </td>
                                </tr>
                                :
                                ""
                        )
                        :
                        <div>
                            <h2>Data Masih Kosong</h2>
                        </div>
                        :
                        <div className='d-flex align-items-center ' style={{height:"6vh"}}>
                            <CSpinner color="primary" style={{marginRight:"1rem"}} />
                            <p className='mb-0'>Mengolah Data Siswa</p>
                        </div>)
                    }

                    {/* form alamat */}
                    {
                        props.page === "pesertadidikalamat" &&
                        (!loading ?
                            dataalamat.map(item => 
                                id != null ?
                                item.peserta_didik_id === id &&
                                    <tr style={{verticalAlign:"middle"}}>
                                            
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
                                                    datajenistinggal.map(items => 
                                                        items.jenis_tinggal_id === item.jenis_tinggal_id &&
                                                        items.nama
                                                    )
                                                }
                                            </td>
                                            <td>
                                                {
                                                    item.jarak_ke_sekolah
                                                }
                                            </td>
                                            <td>
                                                <input 
                                                    type='checkbox' 
                                                    defaultChecked={item.keaktifan == 1}
                                                    readOnly
                                                />
                                            </td>
                                            <td>
                                                <CButton color="link" typebtn="detail" id={item.peserta_didik_alamat_id} onClick={handleclickbutton}  >
                                                    <img src="./img/icon/view.png" width="20" height="20" typebtn="detail" onClick={handleclickbutton}  id={item.peserta_didik_alamat_id} ></img>
                                                </CButton>
                                                <CButton color="link" typebtn="edit" id={item.peserta_didik_alamat_id} onClick={handleclickbutton}  >
                                                    <img src="./img/icon/write bw.png" width="20" height="20" typebtn="edit" onClick={handleclickbutton}  id={item.peserta_didik_alamat_id} ></img>
                                                </CButton>
                                                <CButton color="link" typebtn="delete" id={item.peserta_didik_alamat_id} onClick={handleclickbutton}  >
                                                    <img src="./img/icon/delete bw.jpg" width="20" height="20" typebtn="delete" onClick={handleclickbutton}  id={item.peserta_didik_alamat_id} ></img>
                                                </CButton>
                                            </td>
                                    </tr>
                               :
                               ""
                            )
                        :
                        <h3>Data Masih Kosong</h3>
                        )
                    }

                    {/* form kesehatan */}
                    {
                        props.page === "pesertadidikkesehatan" &&
                        (!loading ?
                            datakesehatan.map(item =>
                                id != null ?
                                    item.peserta_didik_id === id &&
                                    <tr style={{verticalAlign:"middle"}}>
                                         <td>
                                            {item.tanggal_test}
                                        </td>
                                        <td>
                                            {item.buta_warna}
                                        </td>
                                        <td>
                                            {item.berat_badan}
                                        </td>
                                        <td>
                                            {item.tinggi_badan}
                                        </td>
                                        <td>
                                            {item.lingkar_kepala}
                                        </td>
                                        <td>
                                            {item.visus_mata}
                                        </td>
                                        <td>
                                            {item.ldl}
                                        </td>
                                        <td>
                                            {item.hdl}
                                        </td>
                                        <td>
                                            {item.gula_darah}
                                        </td>
                                        <td>
                                            {item.tekanan_darah}
                                        </td>
                                       
                                        <td>
                                            <CButton color="link" typebtn="detail" id={item.peserta_didik_kesehatan_id} onClick={handleclickbutton}  >
                                                <img src="./img/icon/view.png" width="20" height="20" typebtn="detail" onClick={handleclickbutton}  id={item.peserta_didik_kesehatan_id} ></img>
                                            </CButton>
                                            <CButton color="link" typebtn="edit" id={item.peserta_didik_kesehatan_id} onClick={handleclickbutton}  >
                                                <img src="./img/icon/write bw.png" width="20" height="20" typebtn="edit" onClick={handleclickbutton}  id={item.peserta_didik_kesehatan_id} ></img>
                                            </CButton>
                                            <CButton color="link" typebtn="delete" id={item.peserta_didik_kesehatan_id} onClick={handleclickbutton}  >
                                                <img src="./img/icon/delete bw.jpg" width="20" height="20" typebtn="delete" onClick={handleclickbutton}  id={item.peserta_didik_kesehatan_id} ></img>
                                            </CButton>
                                        </td>
                                    </tr>
                                    :
                                    ""    
                            )
                        :
                        <h2>Data Masih Kosong</h2>    
                        )
                    }

                    {/* form kontak */}
                    {
                        props.page === "pesertadidikkontak" &&
                        (!loading ?
                            datakontak.map(item =>
                                id != null ?
                                    item.peserta_didik_id === id &&
                                <tr style={{verticalAlign:"middle"}}>
                                    <td>
                                        {
                                           item.nomor_telepon_rumah
                                        }
                                    </td>
                                    <td>
                                        {
                                           item.nomor_telepon_seluler
                                        }
                                    </td>
                                    <td>
                                        {
                                           item.email
                                        }
                                    </td>
                                    <td>
                                        {
                                           item.twitter
                                        }
                                    </td>
                                    <td>
                                        {
                                           item.facebook
                                        }
                                    </td>
                                    <td>
                                        {
                                           item.instagram
                                        }
                                    </td>
                                    <td>
                                        {
                                           item.youtube
                                        }
                                    </td>
                                    <td>
                                                <CButton color="link" typebtn="detail" id={item.peserta_didik_kontak_id} onClick={handleclickbutton}  >
                                                    <img src="./img/icon/view.png" width="20" height="20" typebtn="detail" onClick={handleclickbutton}  id={item.peserta_didik_kontak_id} ></img>
                                                </CButton>
                                                <CButton color="link" typebtn="edit" id={item.peserta_didik_kontak_id} onClick={handleclickbutton}  >
                                                    <img src="./img/icon/write bw.png" width="20" height="20" typebtn="edit" onClick={handleclickbutton}  id={item.peserta_didik_kontak_id} ></img>
                                                </CButton>
                                                <CButton color="link" typebtn="delete" id={item.peserta_didik_kontak_id} onClick={handleclickbutton}  >
                                                    <img src="./img/icon/delete bw.jpg" width="20" height="20" typebtn="delete" onClick={handleclickbutton}  id={item.peserta_didik_kontak_id} ></img>
                                                </CButton>
                                    </td>
                                </tr>    
                                :
                                ""
                            )
                            :
                            <h3>Data masih kosong</h3>
                        )
                    }

                    {/* form rekening */}
                    {
                        props.page === "pesertadidikrekening" &&
                        (!loading ?
                            datarekening.map(item =>
                                id != null ?
                                item.peserta_didik_id === id &&
                                <tr style={{verticalAlign:"middle"}}>
                                    <td>
                                        {
                                            databank.map(items =>
                                                items.id_bank == item.id_bank.trim() &&
                                                items.nm_bank
                                            )
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
                                                <CButton color="link" typebtn="detail" id={item.peserta_didik_rekening_id} onClick={handleclickbutton}  >
                                                    <img src="./img/icon/view.png" width="20" height="20" typebtn="detail" onClick={handleclickbutton}  id={item.peserta_didik_rekening_id} ></img>
                                                </CButton>
                                                <CButton color="link" typebtn="edit" id={item.peserta_didik_rekening_id} onClick={handleclickbutton}  >
                                                    <img src="./img/icon/write bw.png" width="20" height="20" typebtn="edit" onClick={handleclickbutton}  id={item.peserta_didik_rekening_id} ></img>
                                                </CButton>
                                                <CButton color="link" typebtn="delete" id={item.peserta_didik_rekening_id} onClick={handleclickbutton}  >
                                                    <img src="./img/icon/delete bw.jpg" width="20" height="20" typebtn="delete" onClick={handleclickbutton}  id={item.peserta_didik_rekening_id} ></img>
                                                </CButton>
                                    </td>
                                </tr>
                                :
                                ""
                            )

                            :
                            "loading"
                        )
                    }
                </CTableBody>
            </CTable>

          
        </>
    )
}

export default TablePesertaDidik