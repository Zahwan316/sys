import React, { useState, useEffect } from 'react';

const RowTable = (props) => {
    return(
        <>
            <tr>
               <td>
                    {props.children}
               </td>
            </tr>
        </>
    )
}

export default RowTable