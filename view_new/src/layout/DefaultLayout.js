import React, { useEffect } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import useRefStore from 'src/state/ref'


const DefaultLayout = (props) => {
  const token = localStorage.getItem("token")
  const setmessagelogin = useRefStore((state) => state.setmessagelogin)

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
