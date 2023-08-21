import { CTable, CTableBody, CTableHead, CTableHeaderCell, CTableRow,CButton,CSpinner } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from "sweetalert2"
import {v4 as uuidv4} from "uuid"
import RowTable from '../table/row';


const TablePesertaDidik = (props) => {
    const[datapesertadidik,setdatapesertadidik] = useState([])
    const[datajenjangpendidikan,setdatajenjangpendidkan] = useState([])
    const[datapekerjaan,setdatapekerjaan] = useState([])
    const[datalayakpip,setdatalayakpip] = useState([])
    const[loading,setloading] = useState(true)
    const[updaterdelete,setupdaterdelete] = useState()
    const[dataalamat,setdataalamat] = useState([])
    const[datajenistinggal,setdatajenistinggal] = useState([])
    const[datakesehatan,setdatakesehatan] = useState([])

    useEffect(() => {
        let getData = async() => {
            try{
                setloading(true)
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
                    let response_layak_pip = await axios.get(`${process.env.REACT_APP_LINK}alasan_layak_pip`)

                    setdatapesertadidik(response.data.data)
                    setdatalayakpip(response_layak_pip.data.data)
                }
                else if(props.page === 'pesertadidikalamat'){
                    let response = await axios.get(`${process.env.REACT_APP_LINK}peserta_didik`)
                    let response_alamat = await axios.get(`${process.env.REACT_APP_LINK}peserta_didik_alamat`)
                    let response_jenis_tinggal = await axios.get(`${process.env.REACT_APP_LINK}jenis_tinggal`)

                    setdatapesertadidik(response.data.data)
                    setdataalamat(response_alamat.data.data)
                    setdatajenistinggal(response_jenis_tinggal.data.data)
                }   
                else if(props.page === "pesertadidikkesehatan"){
                    let response = await axios.get(`${process.env.REACT_APP_LINK}peserta_didik`)
                    let response_kesehatan = await axios.get(`${process.env.REACT_APP_LINK}peserta_didik_kesehatan`)
                    

                    setdatapesertadidik(response.data.data)
                    setdatakesehatan(response_kesehatan.data.data)
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
        let getData = async() => {
            try{
               
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
                
            }
            catch(e){
                console.log(e)
            }
        }
        getData()
    },[updaterdelete])
    
    useEffect(() => {
        //console.log(datakesehatan)
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
        }

    }

    return(
        <>
            <CTable>
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
                            props.page != "pesertadidikbantuan" || props.page != "pesertaddidikkeluarga"?
                            <th> 
                                <img onClick={handleclickbutton}  typebtn="tambah" style={{cursor:"pointer"}} src="./img/icon/add bw.png" width="30" height="30" />   
                            </th>
                            :
                            ""
                        }

                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {
                        props.page === "pesertadidikbiodata" &&
                        (!loading?
                        datapesertadidik.length > 0 ?
                        datapesertadidik.map((item,index) =>               
                            <tr key={index} style={{verticalAlign:"middle"}}>
                                <td>
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

                    {
                        props.page === 'pesertadidikkeluarga' && 
                       ( !loading ? 
                        datapesertadidik.length > 0 ?
                        datapesertadidik.map((item,index) => 
                            <tr key={index} style={{verticalAlign:"middle"}}>
                                <td>
                                    {item.nama}
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
                            </tr>    
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

                    {
                        props.page === 'pesertadidikbantuan' &&
                       ( !loading ?
                        datapesertadidik.length > 0 ?
                        datapesertadidik.map(item => 
                            <tr>
                                <td>
                                    {item.nama}
                                </td>
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
                                    {item.layak_kip}
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
                                    {item.nama_di_kip}
                                </td>
                            </tr>
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

                    {
                        props.page === "pesertadidikalamat" &&
                        (!loading ?
                            dataalamat.map(item => 
                               <tr style={{verticalAlign:"middle"}}>
                                    <td>
                                        {
                                            datapesertadidik.map(items => 
                                                item.peserta_didik_id === items.peserta_didik_id &&
                                                items.nama
                                            )
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

                                        />
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
                            )
                        :
                        <h3>Data Masih Kosong</h3>
                        )
                    }
                    {
                        props.page === "pesertadidikkesehatan" &&
                        (!loading ?
                            datakesehatan.map(item =>
                                <tr style={{verticalAlign:"middle"}}>
                                    <td>
                                        {
                                            datapesertadidik.map(items => 
                                                items.peserta_didik_id == item.peserta_didik_id &&
                                                items.nama 
                                            )
                                        }
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
                                        {item.tanggal_test}
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
                            )
                        :
                        <h2>Data Masih Kosong</h2>    
                        )
                    }
                </CTableBody>
            </CTable>
        </>
    )
}

export default TablePesertaDidik