//import React from 'react'
import React, { useState, useEffect } from 'react';


import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CFormCheck,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  
} from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
  cilNotes,
} from '@coreui/icons'
import {Chart} from "react-google-charts"

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'

import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import useSekolahStore from 'src/state/sekolah';
import axios from 'axios';
import useItemStore from 'src/state/item';
import useKurikulumStore from 'src/state/kurikulum';
import useRefStore from 'src/state/ref';
import usePesertaDidikStore from 'src/state/pesertadidik';
import usePtkStore from 'src/state/ptk';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import JurusanItemComponent from './dashboard_item/jurusan_item';
import KonsentrasiItemComponent from './dashboard_item/konsentrasi_item';

const Dashboard = () => {
  const [dataKurikulumSp,setDataKurikulumSp] = useKurikulumStore((state) => [state.kurikulum_sp,state.setkurikulumsp])
  const [refKurikulum,setrefkurikulum] = useRefStore((state) => [state.kurikulum,state.setkurikulum])
  const [dataKurikulumProgram,setdatakurikulumprogram] = useKurikulumStore((state) => [state.kurikulum_program,state.setkurikulumprogram])
  const [datapesertadidik,setdatapesertadidik] = usePesertaDidikStore((state) => [state.pesertadidik,state.setdatapesertadidik])
  const [dataptk,setdataptk] = usePtkStore((state) => [state.ptk,state.setdataptk])

  useEffect(() => {
    const fetchdata = async() => {
      try{
        if(Object.keys(dataKurikulumSp).length === 0)
        {
          let res = await axios.get(`${process.env.REACT_APP_LINK}kurikulum_sp`)
          setDataKurikulumSp(res.data.data)
        }
        if(Object.keys(refKurikulum).length === 0)
        {
          let res = await axios.get(`${process.env.REACT_APP_LINK}ref_kurikulum`)
          setrefkurikulum(res.data.data)
        }
        if(Object.keys(dataKurikulumProgram).length === 0)
        {
          let res = await axios.get(`${process.env.REACT_APP_LINK}kurikulum_program`)
          setdatakurikulumprogram(res.data.data)
        }
        if(Object.keys(datapesertadidik).length === 0)
        {
          let res = await axios.get(`${process.env.REACT_APP_LINK}peserta_didik`)
          setdatapesertadidik(res.data.data)
        }
        if(Object.keys(dataptk).length === 0)
        {
          let res = await axios.get(`${process.env.REACT_APP_LINK}ptk`)
          setdataptk(res.data.data)
        }
      }
      catch(e){

      }
    }
    fetchdata()
  },[])

  useEffect(() => {
    console.log(dataKurikulumSp)
  })

  const jeniskelamin_peserta_didik = (jk,option) => {
    let jumlah_lakilaki = 0
    let jumlah_perempuan = 0
    
    if(datapesertadidik != null && option === "siswa")
    {
      datapesertadidik.forEach(item => {
        if(item.jenis_kelamin == "L")
        {
          jumlah_lakilaki++
        }
        else if(item.jenis_kelamin == "P")
        {
          jumlah_perempuan++
        }
      })
    }

    else if(dataptk != null && option === "guru")
    {
      dataptk.forEach(item => {
        if(item.jenis_kelamin == "L")
        {
          jumlah_lakilaki++
        }
        else if(item.jenis_kelamin == "P")
        {
          jumlah_perempuan++
        }
      })
    }

    return jk === "L" ? jumlah_lakilaki : jumlah_perempuan
  }

  const options = {
    pieHole:0.3
  }

  const data_pesertadidik = [
    ["Jenis Kelamin","total"],
    ["Laki Laki",jeniskelamin_peserta_didik("L","siswa")],
    ["Perempuan",jeniskelamin_peserta_didik("P","siswa")]
  ]

  const data_guru = [
    ["Jenis Kelamin","total"],
    ["Laki Laki",jeniskelamin_peserta_didik("L","guru")],
    ["Perempuan",jeniskelamin_peserta_didik("P","guru")]
  ]

  return (
    <>
      <div className='d-flex' style={{gap:"1rem"}}>     
        <CCard className="mb-4" style={{width:"20rem"}} color='dark'>
          <CCardBody>
            <CCol className='d-flex'>
              <div className='d-flex justify-content-center align-items-center ' style={{height:"100%",width:"20%"}}>
                <CIcon icon={cilNotes} className='text-white p-1' style={{width:"120%",height:"100%"}}></CIcon>
              </div>
              <div className='d-flex flex-column mx-2'>
                <h3 className='text-white'>Jenis Kurikulum</h3>
                <p className='text-white'>
                  {
                    dataKurikulumSp.map(item =>
                      refKurikulum.map(items => 
                        items.kurikulum_kode == item.kurikulum_kode && item.keaktifan == 1 &&
                        items.deskripsi
                        )
                    )
                  }
                </p>
              </div>
            </CCol>
          </CCardBody>
        </CCard> 
        <CCard className="mb-4 " style={{width:"20rem"}}>
          <CCardBody>
            <CRow>
              <h3>Jenis Kurikulum</h3>
              <p>
                {
                  dataKurikulumSp.map(item =>
                    refKurikulum.map(items => 
                      items.kurikulum_kode == item.kurikulum_kode && item.keaktifan == 1 &&
                      <p>{items.deskripsi}</p>
                      )
                  )
                }
              </p>
            </CRow>
          </CCardBody>
        </CCard> 
      </div>
      <div className='d-flex' style={{gap:"1rem"}}>
        <CCard className="mb-4" style={{width:"50%"}}>
          <CCardBody>
            <CRow>
              <h3>Siswa</h3>
              <h5>Jumlah Siswa : {datapesertadidik != null && datapesertadidik.length} </h5>
              <Chart 
               width="100%"
               height="10rem"
               chartType='PieChart'
               data={data_pesertadidik}
               options={options}
              />
            </CRow>
          </CCardBody>
        </CCard> 
        <CCard className="mb-4" style={{width:"50%"}}>
          <CCardBody>
            <CRow>
              <h3>Guru</h3>
              <h5>Jumlah Guru : {dataptk != null && dataptk.length} </h5>
              <Chart 
               width="100%"
               height="10rem"
               chartType='PieChart'
               data={data_guru}
               options={options}
              />
            </CRow>
          </CCardBody>
        </CCard> 
      </div>
      <div className='d-flex'>
       <CCard className="mb-4" style={{width:"50%"}}>
        <CCardBody>
          <h4 className='mb-3'>Program</h4>
          <Tabs style={{height:"100%"}}>
            <TabList>
              <Tab>Keahlian</Tab>
              <Tab>Konsentrasi</Tab>
            </TabList>
            <TabPanel>
              <JurusanItemComponent/>
            </TabPanel>
            <TabPanel>
              <KonsentrasiItemComponent />
            </TabPanel>
          </Tabs>
        </CCardBody>
       </CCard>
      </div>
     
    </>
  )
}

export default Dashboard
