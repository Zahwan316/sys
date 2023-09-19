import { CTable, CTableBody, CTableHead, CTableRow } from '@coreui/react';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import useKurikulumStore from 'src/state/kurikulum';
import useRefStore from 'src/state/ref';

const KonsentrasiItemComponent = () => {
 const [dataKurikulumProgram,setdatakurikulumprogram] = useKurikulumStore((state) => [state.kurikulum_program,state.setkurikulumprogram])
 const [dataJurusan,setdatajurusan] = useRefStore((state) => [state.jurusan,state.setjurusan])

 useEffect(() => {
  const fetchData = async() => {
    try{
     if(Object.keys(dataKurikulumProgram).length === 0)
     {
      let res = await axios.get(`${process.env.REACT_APP_LINK}kurikulum_program`)
      setdatakurikulumprogram(res.data.data)
     }
     if(Object.keys(dataJurusan).length === 0)
     {
      let res = await axios.get(`${process.env.REACT_APP_LINK}jurusan`)  
      setdatajurusan(res.data.data)
     }
    }
    catch(e){

    }
  }
  fetchData()
 },[])

 useEffect(() => {
  console.log(dataKurikulumProgram)  
 })

 return(
    <>
    <CTable>
     <CTableHead>
        <CTableRow>
            <th>Nama</th>
        </CTableRow>
     </CTableHead>
     <CTableBody>
            {
             dataKurikulumProgram != null ?
             dataKurikulumProgram.map((item,index) => 
              item.jurusan_id.trim().length === 5 &&
                <tr key={index}>
                    {
                     dataJurusan.map(items => 
                      items.jurusan_id === item.jurusan_id.trim() &&
                        <td>
                            { items.nama_jurusan}
                        </td>
                     ) 
                    }
                </tr>
             )
             :
             <strong>Data Masih Kosong</strong>
            }
     </CTableBody>
    </CTable>
    </>
 )
}

export default KonsentrasiItemComponent



