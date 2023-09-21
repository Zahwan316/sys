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
  cilCloudUpload,
  cilListRich,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    level:[1,2,3,null],
  },
  {
    component: CNavGroup,
    name: 'Pengelolaan',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    level:[1,2,3],
    items:[
      {
        component: CNavItem,
             name: 'Kelembagaan',
             to: '/tambahsekolah',
             icon:<CIcon icon={cilInstitution} customClassName="nav-icon" />,
             level:[2,3],
      },
      {
        component: CNavGroup,
          name: 'Kurikulum',
          icon:<CIcon icon={cilNewspaper} customClassName="nav-icon" />,
          level:[3],
          items:[
            {
              component:CNavItem,
                name:"Program",
                to:"/program",
                icon:<CIcon icon={cilMemory} customClassName="nav-icon" />,
                level:[3]
            },
            {
              component:CNavItem,
                name:"Mata Pelajaran",
                to:"/mapel",
                icon:<CIcon icon={cilBook} customClassName="nav-icon" />,
                level:[3]
            },
            {
              component:CNavItem,
                name:"Rombel",
                icon:<CIcon icon={cilUser} customClassName="nav-icon" />,
                to:"/rombel",
                level:[3]
            },
            {
              component:CNavItem,
                name:"Tugas Mengajar",
                icon:<CIcon icon={cilListNumbered} customClassName="nav-icon" />,
                to:"/tugasmengajar",
                level:[3]
            },
            {
              component:CNavItem,
                name:"Jadwal",
                icon:<CIcon icon={cilClock} customClassName="nav-icon" />,
                to:"/jadwal",
                level:[3]
            },
           
          ]
      },
      {
        component:CNavGroup,
        name:"Mutasi",
        icon:<CIcon icon={cilTransfer} customClassName="nav-icon" />,
        level:[3],
        items:[
          {
            component:CNavItem,
            name:"Semester",
            icon:<CIcon icon={cilDescription} customClassName="nav-icon" />,
            to:"/mutasisemester",
            level:[3]
          },
          {
            component:CNavItem,
            name:"Rombel",
            icon:<CIcon icon={cilClock} customClassName="nav-icon" />,
            to:"/mutasirombel",
            level:[3]
          },
          {
            component:CNavItem,
            name:"Siswa",
            icon:<CIcon icon={cilPeople} customClassName="nav-icon" />,
            to:"/mutasisiswa",
            level:[3]
          }
        ]
      },
      {
        component:CNavGroup,
        name:"Peserta Didik",
        icon:<CIcon icon={cilUser} customClassName="nav-icon" />,
        level:[1,2,3],
        items:[
          {
            component:CNavItem,
            name:"Upload",
            icon:<CIcon icon={cilCloudUpload} customClassName="nav-icon" />,
            to:"/pesertadidik",
            level:[1,2,3],
          },
          {
            component:CNavItem,
            name:"Biodata",
            icon:<CIcon icon={cilListRich} customClassName="nav-icon" />,
            to:"/datapesertadidik",
            level:[1,2,3],
          },
        ]
      },
      {
        component:CNavGroup,
        name:"PTK",
        icon:<CIcon icon={cilUser} customClassName="nav-icon" />,
        level:[1,2,3],
        items:[
          {
            component:CNavItem,
            name:"Upload",
            icon:<CIcon icon={cilCloudUpload} customClassName="nav-icon" />,
            to:"/uploadptk",
            level:[1,2,3],
          },
          {
            component:CNavItem,
            name:"Biodata",
            icon:<CIcon icon={cilListRich} customClassName="nav-icon" />,
            to:"/dataptk",
            level:[1,2,3],
          },
        ]
      },
     
    ]
    
  },
]

export default _nav
