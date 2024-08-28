import React from 'react'

const ContentCenter = ({children, className}) => {
  return (
    <div className={`w-11/12 md:w-4/5 2xl:w-3/5 mx-auto ${className}`}>
      {children}
    </div>
  )
}

export default ContentCenter
