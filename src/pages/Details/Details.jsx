import React from 'react'
import useFetch from '../../hooks/useFetch'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';

const Details = () => {

  const {mediaType, id} = useParams();

  const posterImg = useSelector((state)=>state.home)
  const {data, loading} = useFetch(`/${mediaType}/${id}`)

  return (
    <div className='text-white w-[400px]'>
      {!loading ? (
        <div>
          <img src={posterImg.url + data?.backdrop_path} alt="" />
        </div>
      ): (
        <div></div>
      )}
    </div>
  )
}

export default Details
