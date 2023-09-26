import { CButton } from '@coreui/react';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import usePtkStore from 'src/state/ptk';
import useRefStore from 'src/state/ref';

const ProgramStudiTableBody = (props) => {
 const [dataprogramstudi,setdataprogramstudi] = usePtkStore((state) => [state.ptk_program_studi,state.setptkprogramstudi])
 const [datapendidikan,setdatapendidikan] = useRefStore((state) => [state.pendidikan,state.setdatapendidikan])
 const [gelarakademik,setgelarakademik] = useRefStore((state) => [state.gelar_akademik,state.setgelarakademik])
 const [programstudi,setprogramstudi] = useRefStore((state) => [state.program_studi,state.setprogramstudi])
 const {id} = useParams()

 useEffect(() => {
  const fetchData = async() => {  
    try{
     if(Object.keys(dataprogramstudi).length === 0)
     {
      let res = await axios.get(`${process.env.REACT_APP_LINK}ptk_pend_formal`)
      setdataprogramstudi(res.data.data)
     }
     if(Object.keys(datapendidikan).length === 0)
     {
      let res = await axios.get(`${process.env.REACT_APP_LINK}jenjang_pendidikan`)
      setdatapendidikan(res.data.data)
     }
     if(Object.keys(gelarakademik).length === 0)
     {
      let res = await axios.get(`${process.env.REACT_APP_LINK}gelar_akademik`)
      setgelarakademik(res.data.data)
     }
     if(Object.keys(programstudi).length === 0)
     {
      let res = await axios.get(`${process.env.REACT_APP_LINK}program_studi`)
      setprogramstudi(res.data.data)
     }

    }
    catch(e)
    {

    }
  }
  fetchData()

 },[])

 useEffect(() => {
   
 }) 

 return(
    <>
        {
            dataprogramstudi != [] ?
                dataprogramstudi.map(item => 
                    item.ptk_id == id &&
                    <tr>
                     <td>
                      {
                        datapendidikan.map(items => 
                          items.jenjang_pendidikan_id == item.jenjang_pendidikan_id &&
                          items.nama    
                        )
                      }    
                     </td>
                     <td>
                        {
                            programstudi.map(items => 
                             items.program_studi_id == item.program_studi_id &&
                             items.nama    
                            ) 
                        }
                     </td>
                     <td>
                        {
                          gelarakademik.map(items => 
                           items.gelar_akademik_id == item.gelar_akademik_id &&
                           items.nama    
                          )
                        }
                     </td>
                     <td>
                        {item.fakultas}
                     </td>
                     <td>
                        {item.tahun_lulus}
                     </td>
                     <td>
                        {item.nim}
                     </td>
                     <td>
                        {item.status_kuliah === 1 ? "Lulus Kuliah" : "Masih Kuliah"}
                     </td>
                     <td>
                        {item.ipk}
                     </td>
                     <td>
                        <CButton color="link" typebtn="detail" id={item.ptk_pend_formal_id} onClick={props.handleclickbutton}  >
                            <img src="./img/icon/view.png" width="20" height="20" typebtn="detail" onClick={props.handleclickbutton}  id={item.ptk_pend_formal_id} ></img>
                        </CButton>
                        <CButton color="link" typebtn="edit" id={item.ptk_pend_formal_id} onClick={props.handleclickbutton}  >
                            <img src="./img/icon/write bw.png" width="20" height="20" typebtn="edit" onClick={props.handleclickbutton}  id={item.ptk_pend_formal_id} ></img>
                        </CButton>
                        <CButton color="link" typebtn="delete" id={item.ptk_pend_formal_id} onClick={props.handleclickbutton}  >
                            <img src="./img/icon/delete bw.jpg" width="20" height="20" typebtn="delete" onClick={props.handleclickbutton}  id={item.ptk_pend_formal_id} ></img>
                        </CButton>
                        </td>
                    </tr>    
                )
                :
                <h2>Data Kosong</h2>
        }
    </>
 )
}

export default ProgramStudiTableBody