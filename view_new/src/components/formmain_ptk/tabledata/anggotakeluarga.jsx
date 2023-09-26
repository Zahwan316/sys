import { CButton } from '@coreui/react';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useItemStore from 'src/state/item';
import usePtkStore from 'src/state/ptk';
import useRefStore from 'src/state/ref';

const AnggotaKeluargaTableBody = (props) => {
 const [ptkanggotakeluarga,setptkanggotakeluarga] = usePtkStore((state) => [state.ptk_anggota_keluarga,state.setptkanggotakeluarga])
 const [hubungankeluarga,sethubungankeluarga] = useRefStore((state) => [state.hubungan_keluarga,state.sethubungankeluarga])
 const [datapekerjaan,setdatapekerjaan] = useRefStore((state) => [state.pekerjaan,state.setdatapekerjaan])
 const {id} = useParams()

 useEffect(() => {
    const fetchdata = async() => {
     try{
        if(Object.keys(ptkanggotakeluarga).length === 0){
         let res = await axios.get(`${process.env.REACT_APP_LINK}ptk_anggota_keluarga`)
         setptkanggotakeluarga(res.data.data)
        }
        if(Object.keys(hubungankeluarga).length === 0){
         let res = await axios.get(`${process.env.REACT_APP_LINK}hubungan_keluarga`)
         sethubungankeluarga(res.data.data)
        }
        if(Object.keys(datapekerjaan).length === 0){
         let res = await axios.get(`${process.env.REACT_APP_LINK}ref_pekerjaan`)
         setdatapekerjaan(res.data.data)
        }
     }
     catch(e){

     }
    }
    fetchdata()
 },[])

 useEffect(() =>{
    console.log(datapekerjaan)
 })

 return(
    <>
        {
            ptkanggotakeluarga.map(item => 
                item.ptk_id === id &&
                <tr>
                    <td>
                        {
                            item.nama
                        }
                    </td>
                    <td>
                        {
                            item.jenis_kelamin == "L" ? "Laki-Laki" : "Perempuan"
                        }
                    </td>
                    <td>
                        {
                            item.tempat_lahir
                        }
                    </td>
                    <td>
                        {
                            item.tanggal_lahir
                        }
                    </td>
                    <td>
                        {
                            hubungankeluarga.map(items => 
                                items.hubungan_keluarga_id == item.hubungan_keluarga_kode &&
                                items.nama 
                            )
                        }
                    </td>
                    <td>
                        {
                            datapekerjaan.map(items => 
                             items.pekerjaan_id == item.pekerjaan_id &&
                             items.nama   
                            )
                        }
                    </td>
                    <td>
                            <CButton color="link" typebtn="detail" id={item.ptk_anggota_keluarga_id} onClick={props.handleclickbutton}  >
                                <img src="./img/icon/view.png" width="20" height="20" typebtn="detail" onClick={props.handleclickbutton}  id={item.ptk_anggota_keluarga_id} ></img>
                            </CButton>
                            <CButton color="link" typebtn="edit" id={item.ptk_anggota_keluarga_id} onClick={props.handleclickbutton}  >
                                <img src="./img/icon/write bw.png" width="20" height="20" typebtn="edit" onClick={props.handleclickbutton}  id={item.ptk_anggota_keluarga_id} ></img>
                            </CButton>
                            <CButton color="link" typebtn="delete" id={item.ptk_anggota_keluarga_id} onClick={props.handleclickbutton}  >
                                <img src="./img/icon/delete bw.jpg" width="20" height="20" typebtn="delete" onClick={props.handleclickbutton}  id={item.ptk_anggota_keluarga_id} ></img>
                            </CButton>
                        </td>
                </tr>
            )
        }
    </>
 )
}

export default AnggotaKeluargaTableBody