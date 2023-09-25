import React, { useState, useEffect } from 'react';
import TablePtk from './table';
import useFormStore from 'src/state/form/formmain';
import ModalPtk from './modal';

const PtkAnggotaKeluarga = (props) => {
 const tablehead = [
    "Nama",
    "Jenis Kelamin",
    "Tempat Lahir",
    "Tanggal Lahir",
    "Hubungan Keluarga",
    "Pekerjaan",
 ]
 const[modal,setmodal] = useState(false)
 const[typeform,settypeform] = useState()
 const[editedid,seteditedid] = useState()
 const[forminput,setforminput] = useFormStore((state) => [state.form,state.setform])
 const[updater,setupdater] = useState()
 const[isload,setisload] = useState(false)

 const handlemodal = () => {
  setmodal(!modal)
 }

 const getTypeBtn = (typebtn,id) => {
  settypeform(typebtn)
  seteditedid(id)
 }

 const handlesubmit = (e) => {
  e.preventDefault() 
 }

 return(
    <>
     <h5>Nama Ptk : {props.namaptk}</h5>
     <TablePtk 
        tablehead={tablehead}
        page="ptkanggotakeluarga"
        handlemodal={handlemodal}
        getTypeBtn={getTypeBtn}
     />

     {
      modal &&
      <ModalPtk 
        page="ptkanggotakeluarga"
        handlemodal={handlemodal}
        handlesubmit={handlesubmit}
      />
     }
    </>
 )

}

export default PtkAnggotaKeluarga