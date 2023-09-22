import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'

import { CBadge } from '@coreui/react'



export const AppSidebarNav = ({ items }) => {
  const [currentlevel,setcurrentlevel] = useState(parseInt(localStorage.getItem("level_user")) || null)
  const location = useLocation()
  //const[filteredItems,setfilteredItems] = useState([])

  useEffect(() => {
    //setcurrentlevel(parseInt(localStorage.getItem("level_user")) || null)
  },[])

 
  useEffect(() => {
    console.log(currentlevel)
  })

  const navLink = (name, icon, badge) => {
    return (
      <>
        {icon && icon}
        {name && name}
        {badge && (
          <CBadge color={badge.color} className="ms-auto">
            {badge.text}
          </CBadge>
        )}
      </>
    )
  }

  const navItem = (item, index) => {
    const { component, name, badge, icon, ...rest } = item
    const Component = component
    return (
      <Component
        {...(rest.to &&
          !rest.items && {
            component: NavLink,
          })}
        key={index}
        {...rest}
      >
        {navLink(name, icon, badge)}
      </Component>
    )
  }
  const navGroup = (item, index) => {
    const { component, name, icon, to, ...rest } = item
    const Component = component
    return (
      <Component
        idx={String(index)}
        key={index}
        toggler={navLink(name, icon)}
        visible={location.pathname.startsWith(to)}
        {...rest}
      >
        {item.items?.map((item, index) =>
          item.items ? navGroup(item, index) : navItem(item, index),
        )}
      </Component>
    )
  }

  const filtermenu = (items,currlevel) => {
   return items.filter((item) => {
    if(item.level && item.level.includes(currlevel)){
      if(item.items){
        item.items = filtermenu(item.items,currlevel)
      }
      return true
    }
    return false

  })
  //return item.level.includes(currlevel)
  }

 /*  useEffect(() => {
    const filtered = filtermenu(items,currentlevel)
    setfilteredItems(filtered)
    console.log(filtered)
  },[]) */


  const filteredItems = filtermenu(items,currentlevel)

  return (
    <React.Fragment>
      {
        filteredItems &&
        filteredItems.map((item, index) => (item.items ? navGroup(item, index) : navItem(item, index)))
      }
     {/*  {items &&
        items.map((item, index) => (item.items ? navGroup(item, index) : navItem(item, index)))
      } */}
    </React.Fragment>
  )
}

AppSidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
}
