import React, { useEffect } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import useRefStore from 'src/state/ref'
import useSekolahStore from 'src/state/sekolah'
import useItemStore from 'src/state/item'
import axios from 'axios'
import useKurikulumStore from 'src/state/kurikulum'


const DefaultLayout = (props) => {
  const token = localStorage.getItem("token")
  const setmessagelogin = useRefStore((state) => state.setmessagelogin)
  const [sekolahidentitas,setsekolahidentitas] = useSekolahStore((state) => [state.sekolah_identitas,state.setsekolahidentitas])
  const [item_sekolahid,setitemsekolahid] = useItemStore((state) => [state.sekolah_id,state.setsekolahid])
  const [semesterid,setsemesterid] = useItemStore((state) => [state.semester_id,state.setsemesterid])
  const [datasemester,setdatasemester] = useRefStore((state) => [state.semester,state.setsemester])
  const [bentukpendidikanid,setbentukpendidikanid] = useItemStore((state) => [state.bentuk_pendidikan_id,state.setbentukpendidikanid])
  const [datakurikulumsp,setdatakurikulumsp] = useKurikulumStore((state) => [state.kurikulum_sp,state.setkurikulumsp])
  const [kurikulumspid,setkurikulumspid] = useItemStore((state) => [state.kurikulum_sp_id,state.setkurikulum_sp_id])

  useEffect(() => {
    const fetchData  = async() => {
     if(Object.keys(sekolahidentitas).length == 0){
       try{
         const res = await axios.get(`${process.env.REACT_APP_LINK}sekolah_identitas`)
         const data = res.data.data
         if(data){
           setsekolahidentitas(data)
           const sekolah_id = data[0].sekolah_id
           const bentuk_pendidikan_id = data[0].bentuk_pendidikan_id
           if(bentuk_pendidikan_id){
            setbentukpendidikanid(bentuk_pendidikan_id)
           }
           if(sekolah_id){
            setitemsekolahid(sekolah_id) 
           }
         }
       }
       catch(e){
 
       }
     }
     if(Object.keys(datasemester).length === 0)
     {
      let res = await axios.get(`${process.env.REACT_APP_LINK}semester`)
      setdatasemester(res.data.data)
      const data = res.data.data
      if(data)
      {
        const semester_aktif_object = data.find(item => item.periode_aktif == 1)
        const semester_aktif = semester_aktif_object.semester_id
        setsemesterid(semester_aktif)
      }
     }
     if(Object.keys(datakurikulumsp).length === 0)
     {
      let res = await axios.get(`${process.env.REACT_APP_LINK}kurikulum_sp`)
      setdatakurikulumsp(res.data.data)
      const data = res.data.data
      if(data)
      {
        const find_kurikulum_sp = data.find(item => item.keaktifan == 1)
        const kurikulum_sp_id = find_kurikulum_sp.kurikulum_sp_id
        setkurikulumspid(kurikulum_sp_id)
      }
     }
    }
    fetchData()     
   },[])
 
   useEffect(() => {
    console.log({
      "semester id = " : semesterid,
      "bentuk pendidikan id" : bentukpendidikanid,
      "sekolah id = " : item_sekolahid,
      'Kurikulum sp id' : kurikulumspid
    })
   })

  useEffect(() => {
   /*  if (!token && props.name == "Home") {
      window.location.href = '.#/login'
      setmessagelogin("Login Terlebih Dahulu !!")
    } */

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
