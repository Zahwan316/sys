import React, { useState, useEffect } from 'react';
import { CButton } from '@coreui/react';
import { useParams } from 'react-router-dom';
import useRefStore from 'src/state/ref';
import axios from 'axios';

const KompetensiTableData = (props) => {
    const{id} = useParams()
    const [keahlian_laboratorium,setkeahlian_laboratorium] = useRefStore((state) => [state.keahlian_laboratorium,state.setkeahlian_laboratorium])

    useEffect(() => {
        const refetch_data = async() => {
            try{
                if(keahlian_laboratorium.length == 0 || keahlian_laboratorium == null){
                    let res = await axios.get(`${process.env.REACT_APP_LINK}keahlian_laboratorium`)
                    setkeahlian_laboratorium(res.data.data)
                    console.log(res.data.data)
                }
            }
            catch(err){
                console.log(err)
            }
        }
        refetch_data()
    },[])

    return(
        <>
            {
                id != null ?
                props.dataptk.map(item => 
                    item.ptk_id == id &&
                    <tr>
                        <td>
                            {
                                item.sudah_lisensi_kepala_sekolah == 1 ? "Iya" : "Tidak"
                            }
                        </td>
                        <td>
                            {
                                keahlian_laboratorium.map(items => 
                                    items.keahlian_laboratorium_id == item.keahlian_laboratorium_id &&
                                    items.nama   
                                )
                            }
                        </td>
                        <td>
                            {
                                item.mampu_handle_kk == 1 ? "Iya" : "Tidak"
                            }
                        </td>
                        <td>
                            {
                                item.keahlian_braille == 1 ? "Iya" : "Tidak"
                            }
                        </td>
                        <td>
                            {
                                item.keahlian_bhs_isyarat == 1 ? "Iya" : "Tidak"
                            }
                        </td>
                        <td>
                            <CButton color="link" typebtn="detail" id={item.ptk_id} onClick={props.handleclickbutton}  >
                                <img src="./img/icon/view.png" width="20" height="20" typebtn="detail" onClick={props.handleclickbutton}  id={item.ptk_id} ></img>
                            </CButton>
                            <CButton color="link" typebtn="edit" id={item.ptk_id} onClick={props.handleclickbutton}  >
                                <img src="./img/icon/write bw.png" width="20" height="20" typebtn="edit" onClick={props.handleclickbutton}  id={item.ptk_id} ></img>
                            </CButton>
                        </td>
                    </tr>
                )
                :
                <h4>Data Kosong</h4>
            }
        </>
    )
}

export default KompetensiTableData;