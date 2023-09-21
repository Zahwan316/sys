import React, { useEffect,useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  CButton,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBell, cilEnvelopeOpen, cilList, cilMenu } from '@coreui/icons'

import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'
import { logo } from 'src/assets/brand/logo'
import axios from 'axios'
import usePtkStore from 'src/state/ptk'

const AppHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const ptk_id = localStorage.getItem("user")
  const [ptk,setptk] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    const getdata = async() => {
      try{  
        let res = await axios.get(`${process.env.REACT_APP_LINK}ptk/${ptk_id}`)
        setptk(res.data.data)
      }
      catch(e){
        console.log(e)
      }
    }
    getdata()
  },[])
  
  useEffect(() => {
    //console.log(ptk)
  })

  const redirectToLogin = () => {
    //navigate(".#/login")
    window.location.href = ".#/login"
  }

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <CIcon icon={logo} height={48} alt="Logo" />
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink to="/dashboard" component={NavLink}>
              Dashboard
            </CNavLink>
          </CNavItem>
           {/* <CNavItem>
            <CNavLink href="#">Users</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">Settings</CNavLink>
          </CNavItem> */}
        </CHeaderNav>
        <CHeaderNav className='d-flex align-items-center'>
          {/* <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilBell} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilList} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilEnvelopeOpen} size="lg" />
            </CNavLink>
          </CNavItem>  */}
          {
            ptk_id != null && ptk != null &&
            <h5>{ptk.nama}</h5>

          }
        </CHeaderNav> 
        <CHeaderNav className="ms-3">
          {
            ptk_id != null ?
            <AppHeaderDropdown />
            :
            <CButton variant='outline' onClick={redirectToLogin}>Login</CButton>

          }
        </CHeaderNav>
      </CContainer>
      <CHeaderDivider />
      <CContainer fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
