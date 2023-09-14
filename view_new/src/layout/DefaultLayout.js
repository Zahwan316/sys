import React, { useEffect } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import useRefStore from 'src/state/ref'
import useSekolahStore from 'src/state/sekolah'
import useItemStore from 'src/state/item'
import axios from 'axios'


const DefaultLayout = (props) => {
  const token = localStorage.getItem("token")
  const setmessagelogin = useRefStore((state) => state.setmessagelogin)
  const [sekolahidentitas,setsekolahidentitas] = useSekolahStore((state) => [state.sekolah_identitas,state.setsekolahidentitas])
  const [item_sekolahid,setitemsekolahid] = useItemStore((state) => [state.sekolah_id,state.setsekolahid])
  
  useEffect(() => {
    const fetchData  = async() => {
     if(Object.keys(sekolahidentitas).length == 0){
       try{
         const res = await axios.get(`${process.env.REACT_APP_LINK}sekolah_identitas`)
         const data = res.data.data
         if(data){
           setsekolahidentitas(data)
           const sekolah_id = data[0].sekolah_id
           if(sekolah_id){
            setitemsekolahid(sekolah_id) 
           }
         }
       }
       catch(e){
 
       }
     }
    }
    fetchData()     
   },[])
 
   useEffect(() => {
    
   })

  useEffect(() => {
    if (!token && props.name == "Home") {
      window.location.href = '.#/login'
      setmessagelogin("Login Terlebih Dahulu !!")
    }

  },[])
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
