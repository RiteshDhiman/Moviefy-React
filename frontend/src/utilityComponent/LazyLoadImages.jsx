import React from 'react'
// import LazyLoad from 'react-lazyload'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css';

const LazyLoadImages = ({src, alt, className}) => {
  return (
    // <LazyLoadImage className={className || ''}>
    //   <img src={src} alt={alt} />
    // </LazyLoadImage>
    <LazyLoadImage className={className || ''} src={src} alt={alt} effect='blur' style={{ height: '100%', width: '100%' }}/>
  )
}

export default LazyLoadImages
