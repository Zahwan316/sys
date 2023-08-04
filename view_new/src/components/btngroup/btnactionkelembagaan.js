import React, { useState, useEffect } from 'react';
import { CButton } from '@coreui/react';

const ButtonActionKelembagaan = (props) => {
    return(
        <>
            <CButton color="link"typebtn="delete" id={props.id} onClick={props.onclick} >
                <img src="./img/icon/delete bw.jpg" width={props.width} height={props.height} typebtn="delete" onClick={props.onclick} id={props.id} ></img>
            </CButton>
            <CButton color="link" typebtn="edit" id={props.id} onClick={props.onclick} >
                <img src="./img/icon/write bw.png"width={props.width} height={props.height} onClick={props.onclick} id={props.id} ></img>
            </CButton>
        </>
    )
}

export default ButtonActionKelembagaan;