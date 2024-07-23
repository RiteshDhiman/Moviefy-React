import React from 'react'
import LazyLoad from 'react-lazyload'

const LazyLoadImages = ({src, alt, className}) => {
  return (
    <LazyLoad className={className || ''}>
      <img src={src} alt={alt} />
    </LazyLoad>
  )
}

export default LazyLoadImages
