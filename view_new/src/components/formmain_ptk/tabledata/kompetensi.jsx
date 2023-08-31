import React, { useState, useEffect } from 'react';
import { CButton } from '@coreui/react';

const KompetensiTableData = (props) => {
   

    return(
        <>
            {
                props.dataptk.map(item => 
                    <tr>
                        <td>
                            {
                                item.sudah_lisensi_kepala_sekolah
                            }
                        </td>
                        <td>
                            {
                                item.keahlian_laboratorium_id
                            }
                        </td>
                        <td>
                            {
                                item.mampu_handle_kk
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
            }
        </>
    )
}

export default KompetensiTableData;