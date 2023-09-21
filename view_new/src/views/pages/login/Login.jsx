import React, { useEffect,useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import useRefStore from 'src/state/ref'

const Login = () => {
  const[forminput,setforminput] = useState({
    email:"",
    password:""
  })
  const messagelogin = useRefStore((state) => state.messagelogin)


  const handleFormInput = (e) => {
    setforminput({
    ...forminput,
      [e.target.name]:e.target.value
    })
  }

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    const sendata = async() => {
      try{
          let res = await axios.post(`${process.env.REACT_APP_LINK}login`,forminput)  
          let data = res.data
          console.log(data)
          localStorage.setItem("token",data.token)
          localStorage.setItem("user",data.user.ptk_id)
          localStorage.setItem("level_user",data.user.level_id)
          
          Swal.fire({
              icon:'success',
              title: "Berhasil Login",
              showConfirmButton: false,
              timer: 1500
          })

          setTimeout(() => {
            navigate("/dashboard")
          },1700)
          
      }
      catch(e){
          console.log(e)
          Swal.fire({
            icon:'error',
            title: 'Gagal',
            text: e.message
        })
      }
    }
    sendata()
  }

  const resetToken = () => {
    localStorage.removeItem("token")
  }


  useEffect(() => {
    console.log(forminput)
  })

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
          {
            messagelogin &&
            <CAlert color='danger'>
              {messagelogin}
            </CAlert>
          }
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput required placeholder="Email" autoComplete="email" name="email" onChange={handleFormInput} />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        name="password"
                        onChange={handleFormInput}
                        required
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton type='submit' color="primary" className="px-4">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0" onClick={resetToken}>
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              {/* <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard> */}
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
