import React from 'react'

export const Layout = (props) => {
  console.log("layout")
  return (
    <div className='bg-[#010101]'>{props.children}</div>
  )
}
