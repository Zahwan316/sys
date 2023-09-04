import React, { useState, useEffect } from 'react';
import { CButton } from '@coreui/react';
import useRefStore from 'src/state/ref';
import { useParams } from 'react-router-dom';
const BiodataTableBody = (props) => {
    const agama = useRefStore((state) => state.agama)
   
    return(
        <>
            {
                props.dataptk.map(item => 
                    <tr>
                        <td onClick={props.selectPtk} id={item.ptk_id}>
                            {item.nama}
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
                            {
                               agama.map(items => 
                                    items.agama_id == item.agama_id &&
                                    items.nama
                                )
                            }
                        </td>
                        <td>
                            {item.nik}
                        </td>
                       
                        <td>    
                            {item.no_kk}
                        </td>
                        <td>    
                            {item.kewarganegaraan}
                        </td>
                        <td>
                             <CButton color="link" typebtn="detail" id={item.ptk_id} onClick={props.handleclickbutton}  >
                                <img src="./img/icon/view.png" width="20" height="20" typebtn="detail" onClick={props.handleclickbutton}  id={item.ptk_id} ></img>
                            </CButton>
                            <CButton color="link" typebtn="edit" id={item.ptk_id} onClick={props.handleclickbutton}  >
                                <img src="./img/icon/write bw.png" width="20" height="20" typebtn="edit" onClick={props.handleclickbutton}  id={item.ptk_id} ></img>
                            </CButton>
                            <CButton color="link" typebtn="delete" id={item.ptk_id} onClick={props.handleclickbutton}  >
                                <img src="./img/icon/delete bw.jpg" width="20" height="20" typebtn="delete" onClick={props.handleclickbutton}  id={item.ptk_id} ></img>
                            </CButton>
                        </td>
                    </tr>
                    
                )
            }
        </>
    )
}

export default BiodataTableBody;