import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilInstitution,
  cilNewspaper,
  cilMemory,
  cilUser,
  cilListNumbered,
  cilClock,
  cilTransfer,
  cilPeople,
  cilMoney,
  cilBook,
  cilCloudUpload
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  // {
  //   component: CNavTitle,
  //   name: 'Theme',
  // },
  // {
  //   component: CNavItem,
  //   name: 'Colors',
  //   to: '/theme/colors',
  //   icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavItem,
  //   name: 'Typography',
  //   to: '/theme/typography',
  //   icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavTitle,
  //   name: 'Components',
  // },
  {
    component: CNavGroup,
    name: 'Pengelolaan',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items:[
      {
        component: CNavItem,
             name: 'Kelembagaan',
             to: '/tambahsekolah',
             icon:<CIcon icon={cilInstitution} customClassName="nav-icon" />
       
      },
      {
        component: CNavGroup,
          name: 'Kurikulum',
          icon:<CIcon icon={cilNewspaper} customClassName="nav-icon" />,
          items:[
            {
              component:CNavItem,
                name:"Program",
                to:"/program",
                icon:<CIcon icon={cilMemory} customClassName="nav-icon" />,
            },
            {
              component:CNavItem,
                name:"Mata Pelajaran",
                to:"/mapel",
                icon:<CIcon icon={cilBook} customClassName="nav-icon" />,
            },
            {
              component:CNavItem,
                name:"Rombel",
                icon:<CIcon icon={cilUser} customClassName="nav-icon" />,
                to:"/rombel"
            },
            {
              component:CNavItem,
                name:"Tugas Mengajar",
                icon:<CIcon icon={cilListNumbered} customClassName="nav-icon" />,
                to:"/tugasmengajar"
            },
            {
              component:CNavItem,
                name:"Jadwal",
                icon:<CIcon icon={cilClock} customClassName="nav-icon" />,
                to:"/jadwal"
            },
           
          ]
      },
      {
        component:CNavGroup,
        name:"Mutasi",
        icon:<CIcon icon={cilTransfer} customClassName="nav-icon" />,
        items:[
          {
            component:CNavItem,
            name:"Semester",
            icon:<CIcon icon={cilDescription} customClassName="nav-icon" />,
            to:"/mutasisemester"
          },
          {
            component:CNavItem,
            name:"Rombel",
            icon:<CIcon icon={cilClock} customClassName="nav-icon" />,
            to:"/mutasirombel"
          },
          {
            component:CNavItem,
            name:"Siswa",
            icon:<CIcon icon={cilPeople} customClassName="nav-icon" />,
            to:"/mutasisiswa"
          }
        ]
      },
      {
        component:CNavGroup,
        name:"Peserta Didik",
        icon:<CIcon icon={cilUser} customClassName="nav-icon" />,
        items:[
          {
            component:CNavItem,
            name:"Upload",
            icon:<CIcon icon={cilCloudUpload} customClassName="nav-icon" />,
            to:"/pesertadidik"
          },
          {
            component:CNavItem,
            name:"Biodata",
            icon:<CIcon icon={cilCloudUpload} customClassName="nav-icon" />,
            to:"/datapesertadidik"
          },
        ]
      }
     
    ]
    
  },
]

export default _nav
