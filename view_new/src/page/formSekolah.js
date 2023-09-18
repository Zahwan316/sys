import React, { useState, useEffect } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CRow,
  CButtonGroup,
  CFormCheck,
  CFormSelect,
  
} from '@coreui/react'
import { DocsExample } from 'src/components'
import IdentitasForm from 'src/components/formmain/identitas'
import AlamatForm from 'src/components/formmain/alamat'
import AkreditasiForm from 'src/components/formmain/akreditasi'
import IsoForm from 'src/components/formmain/iso'
import RekeningForm from 'src/components/formmain/rekening'
import KepemilikanForm from 'src/components/formmain/kepemilikan'
import "../../src/assets/css/radio.css"
const FormSekolahPage = () => {
  const[code,setcode] = useState("identitas");
  const[sekolahid,setsekolahid] = useState()

  const handleGetSekolahId = (kode) => {
    setsekolahid(kode)
    console.log(sekolahid)
  }

  const handleMenuForm = (e) => {
    let btncode = e.target.getAttribute("code");
    setcode(btncode)
    console.log(btncode)
  }

  useEffect(() => {
    console.log(sekolahid)
  })

  return (
    <CCol xs={12}>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Kelembagaan</strong>
        </CCardHeader>
        <CButtonGroup  role="group" aria-label="Basic checkbox toggle button group" className="p-3" style={{borderColor:"black"}}>
          <CFormCheck
            type="radio"
            button={{ color: 'dark', variant: 'outline' }}
            name="btnradio"
            id="btnradio1"
            autoComplete="off"
           /*  label={
              <div className='d-flex justify-content-center align-items-center w-100 h-100'>
              <img src="./img/identitassiswa1.png" width="30" height="20" style={{marginRight:"6px"}}></img>
              <p style={{marginBottom:0}}> Identitas</p>
              </div>
            } */
            label={"Identitas"}
            code="identitas"
            onClick={handleMenuForm}
            defaultChecked={code == "identitas"}
            style={{color:"red"}}
          />
      
          <CFormCheck
            type="radio"
            button={{ color: 'dark', variant: 'outline' }}
            name="btnradio"
            id="btnradio2"
            autoComplete="off"
            code="alamat"
            onClick={handleMenuForm}
            defaultChecked={code == "alamat"}
           /*  label={
              <div className='d-flex justify-content-center align-items-center w-100 h-100'>
              <img src="./img/alamat.png" width="23" height="25" style={{marginRight:"6px"}}></img>
              <p style={{marginBottom:0}}> Alamat</p>
              </div>
            } */
            label={"Alamat"}
          />
          <CFormCheck
            type="radio"
            button={{ color: 'dark', variant: 'outline' }}
            name="btnradio"
            id="btnradio3"
            autoComplete="off"
           /*  label={
              <div className='d-flex justify-content-center align-items-center'>
              <img src="./img/logoakreditasiBIRU.png" width="26" height="30" style={{marginRight:"6px"}}></img>
              <p style={{marginBottom:0}}> Akreditasi</p>
              </div>
            } */
            code="akreditasi"
            onClick={handleMenuForm}
            defaultChecked={code == "akreditasi"}
            label={"Akreditasi"}
          />
          <CFormCheck
            type="radio"
            button={{ color: 'dark', variant: 'outline' }}
            name="btnradio"
            id="btnradio4"
            autoComplete="off"
            /* label={
              <div className='d-flex justify-content-center align-items-center'>
              <img src="./img/logoisoBIRU.png" width="26" height="30" style={{marginRight:"6px"}}></img>
              <p style={{marginBottom:0}}> ISO</p>
              </div>
            } */
            code="iso"
            onClick={handleMenuForm}
            defaultChecked={code == "iso"}
            label={"Iso"}
          />
          <CFormCheck
            type="radio"
            button={{ color: 'dark', variant: 'outline' }}
            name="btnradio"
            id="btnradio5"
            autoComplete="off"
           /*  label={
              <div className='d-flex justify-content-center align-items-center'>
              <img src="./img/logorekeningBIRU.png" width="26" height="30" style={{marginRight:"6px"}}></img>
              <p style={{marginBottom:0}}> Rekening</p>
              </div>
            } */
            code="rekening"
            onClick={handleMenuForm}
            defaultChecked={code == "rekening"}
            label={"Rekening"}
          />
          <CFormCheck
            type="radio"
            button={{ color: 'dark', variant: 'outline' }}
            name="btnradio"
            id="btnradio6"
            autoComplete="off"
            /* label={
              <div className='d-flex justify-content-center align-items-center'>
              <img src="./img/kepemilikan.png" width="26" height="30" style={{marginRight:"6px"}}></img>
              <p style={{marginBottom:0}}> Kepemilikan</p>
              </div>
            } */
            code="kepemilikan"
            onClick={handleMenuForm}
            defaultChecked={code == "kepemilikan"}
            label={"Kepemilikan"}
          />
        </CButtonGroup>
        <CCardBody>
         
            {/* Form Identitas */}
            {
              code == "identitas"?
              <IdentitasForm 
                getsekolahid={handleGetSekolahId}
              />
              :
              ""
            }
            {/* End */}

            {/* Form Alamat */}
            {
              code == "alamat"?
              <AlamatForm 
                sekolahid={sekolahid}
              />
              :
              ""
            }
            {/* End */}

            {/* Akreditas */}
              {
                code == "akreditasi" ?
                <AkreditasiForm
                  sekolahid={sekolahid}
                 
                />
                :
                ""
              }
            {/* end */}

            {/* iso */}
                {
                  code == "iso" ? 
                  <IsoForm
                    sekolahid={sekolahid}
                  />
                  : 
                  ""
                }
            {/* end */}

            {/* Rekening */}
                {
                  code == "rekening" ? 
                  <RekeningForm 
                    sekolahid={sekolahid}
                  />
                  :
                  null
                }
            {/* End */}

            {/* kepemilikan */}
                {
                  code == "kepemilikan"?
                  <KepemilikanForm
                    sekolahid={sekolahid}
                    getsekolahid={handleGetSekolahId}
                  />
                  :
                  null
                }
            {/* end */}
         
        </CCardBody>
      </CCard>
    </CCol>
  )
}

export default FormSekolahPage
