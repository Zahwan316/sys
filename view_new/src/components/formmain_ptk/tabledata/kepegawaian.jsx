import React, { useState, useEffect } from 'react';
import { CButton } from '@coreui/react';
import useRefStore from 'src/state/ref';
import { useParams } from 'react-router-dom';

const KepegawaianTableBody = (props) => {
    const status_kepegawaian = useRefStore((state) => state.status_kepegawaian)
    const jenis_ptk = useRefStore((state) => state.jenis_ptk)
    const{id} = useParams()

    return(
        <>
            {
                props.dataptk.map(item =>
                    id != null ?
                    item.ptk_id == id &&
                    <tr>
                        <td>
                            {item.nip}
                        </td>
                        <td>
                            {item.nuptk}
                        </td>
                        <td>
                            {item.nuks}
                        </td>
                        <td>
                            {item.karpeg}
                        </td>
                        <td>
                            {item.karpas}
                        </td>
                        <td>
                            {
                                status_kepegawaian.map(items =>
                                    items.status_kepegawaian_id === item.status_kepegawaian_id &&
                                    items.nama
                                )
                            }
                        </td>
                        <td>
                            {
                               jenis_ptk.map(items =>
                                    items.jenis_ptk_id === item.jenis_ptk_id &&
                                    items.jenis_ptk
                                )
                            }
                        </td>
                        <td>
                            {
                                item.tmt_pengangkatan
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
                    :
                    "Data Kosong"
                )
            }
        </>
    )
}

export default KepegawaianTableBody;