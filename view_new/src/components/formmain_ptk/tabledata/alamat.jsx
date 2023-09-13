import { CFormCheck,CButton } from '@coreui/react';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import usePtkStore from 'src/state/ptk';

const PtkAlamatTableData = (props) => {
    const[ptkalamat,setptkalamat] = usePtkStore((state) => [state.ptk_alamat,state.setptkalamat]);
    const{id} = useParams()

    useEffect(() => {
        const fetchData = async() => {
            try{
                if(Object.keys(ptkalamat).length === 0){
                    let res = await axios.get(`${process.env.REACT_APP_LINK}ptk_alamat`)
                    setptkalamat(res.data.data)
                }
            }
            catch(e){

            }
        }
        fetchData()
    },[])

    return(
        <>
            {
                ptkalamat != null ?
                ptkalamat.map((item,index) => 
                    item.ptk_id === id &&
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
                                //disabled
                                defaultChecked={item.keaktifan == 1}
                                checked={item.keaktifan == 1}
                                readOnly
                           />
                        </td>
                        <td>
                            <CButton color="link" typebtn="detail" id={item.ptk_alamat_id} onClick={props.handleclickbutton}  >
                                <img src="./img/icon/view.png" width="20" height="20" typebtn="detail" onClick={props.handleclickbutton}  id={item.ptk_alamat_id} ></img>
                            </CButton>
                            <CButton color="link" typebtn="edit" id={item.ptk_alamat_id} onClick={props.handleclickbutton}  >
                                <img src="./img/icon/write bw.png" width="20" height="20" typebtn="edit" onClick={props.handleclickbutton}  id={item.ptk_alamat_id} ></img>
                            </CButton>
                            <CButton color="link" typebtn="delete" id={item.ptk_alamat_id} onClick={props.handleclickbutton}  >
                                <img src="./img/icon/delete bw.jpg" width="20" height="20" typebtn="delete" onClick={props.handleclickbutton}  id={item.ptk_alamat_id} ></img>
                            </CButton>
                        </td>
                    </tr>
                )
                :
                <h2>Data masih kosong</h2>
            }
        </>
    )
}

export default PtkAlamatTableData