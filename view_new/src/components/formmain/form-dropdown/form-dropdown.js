import React, { useState, useEffect } from 'react';

const FormDropdown = (props) => {
    const[datawilayah,setdatawilayah] = useState(props.data)
    const[loading,setloading] = useState(false);
    
    useEffect(() => {
        const loadData = async() => {
            try{
                const datas = props.data
                setdatawilayah(datas)
            }
            catch(e){
                console.log(e)
            }
            finally{
                setloading(false)
            }
        }
    },[])

    return(
        
        <div className='bg-white border position-absolute p-1' style={{width:"100%",maxHeight:"15vh",overflowY:"scroll"}}>
            <ul style={{padding:"0"}}>
                {
                    loading ?
                        <li>
                            <p>Data sedang di load</p>
                        </li>
                    :
                    datawilayah.map((item,index) => 
                        <li className='list-unstyled border-bottom border-gray p-1'>
                            <h6 >{item.nama}</h6>
                        </li>     
                    
                    )
                }
            </ul>
        </div>
    )
}

export default FormDropdown;