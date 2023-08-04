import { CFormCheck, CTableBody } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CTable,CTableHead,CButton } from '@coreui/react';
import Swal  from 'sweetalert2';

const TableMutasi = (props) => {
    //semester page
    const[dataSemester,setdatasemester] = useState([])


    useEffect(() => {
        const getData = async() => {
            try{
                let response = await axios.get(`${process.env.REACT_APP_LINK}semester`)
                setdatasemester(response.data.data)
            }
            catch(e){
                console.log(e)
            }
        }
        getData()
    },[])

    const deleteData = async(url) => {
        try{
            Swal.fire({
                title:"Apakah Anda Yakin ?",
                text:"Ingin Menghapus Data Ini ?",
                icon:"warning",
                showCancelButton:true,
                confirmButtonText:"Ya,Hapus",
                cancelButtonText:"Batal"
            })
            .then((result) => {
                if(result.isConfirmed){
                    axios.delete(`${process.env.REACT_APP_LINK}${url}`) 
                        .then(res => {
                            Swal.fire(
                                "Data berhasil dihapus"
                            )
                        })
                }
            })
        }
        catch(e){
            console.log(e)
        }
    }

    const handleclickbutton = (e) => {
        let typebtn = e.target.getAttribute("typebtn")
        let id = e.target.getAttribute("id")

        props.getTypeBtn(typebtn,id)
        if(typebtn != "delete"){
            props.handlemodal()

        }
        
        if(typebtn === "delete"){
            if(props.page === "semester"){
                deleteData(`semester/${id}`)
            }
        }

    }

    return(
        <>
         <CTable>
                <CTableHead className='table-dark'>
                        <tr>
                        {
                                props.tablehead.map((item,index) =>
                                <th>
                                    {item}
                                </th>
                                )
                            }
                            <th>
                                <img onClick={handleclickbutton}  typebtn="tambah" style={{cursor:"pointer"}} src="./img/icon/add bw.png" width="30" height="30" />
                            </th>    
                        </tr>
                </CTableHead>
                <CTableBody>
                    {
                        props.page == "semester" &&
                        dataSemester.map((item,index) => 
                            <tr style={{verticalAlign:"middle"}}>
                                <td>
                                    {item.nama}
                                </td>
                                <td>
                                    {item.semester}
                                </td>
                                <td>
                                    <CFormCheck
                                        readOnly
                                        checked={item.periode_aktif == 1}
                                    />
            
                                </td>
                                <td>
                                         <CButton color="link" typebtn="detail" id={item.semester_id} onClick={handleclickbutton}  >
                                            <img src="./img/icon/view.png" width="20" height="20" typebtn="detail" onClick={handleclickbutton}  id={item.semester_id} ></img>
                                        </CButton>
                                        <CButton color="link" typebtn="edit" id={item.semester_id} onClick={handleclickbutton}  >
                                            <img src="./img/icon/write bw.png" width="20" height="20" typebtn="edit" onClick={handleclickbutton}  id={item.semester_id} ></img>
                                        </CButton>
                                        <CButton color="link" typebtn="delete" id={item.semester_id} onClick={handleclickbutton}  >
                                            <img src="./img/icon/delete bw.jpg" width="20" height="20" typebtn="delete" onClick={handleclickbutton}  id={item.semester_id} ></img>
                                        </CButton>
                                    </td>
                            </tr>
                        
                        )
                    }
                </CTableBody>
            </CTable>
    
    </>
    )
}

export default TableMutasi