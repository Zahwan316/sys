import React, { useState, useEffect } from 'react';
import { CButton } from '@coreui/react';

const KontakTableBody = (props) => {


    return(
        <>
            {
                props.dataptk.map(item => 
                    <tr>
                        <td>
                            {
                                item.email
                            }
                        </td>
                        <td>
                            {
                                item.no_hp
                            }
                        </td>
                        <td>
                            {
                                item.nomor_telepon_rumah
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
            }
        </>
    )
}

export default KontakTableBody