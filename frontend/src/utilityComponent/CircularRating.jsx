import React from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const CircleRating = ({rating, width}) => {
  return (
    <div className={width}>
        <CircularProgressbar 
        className='rounded-full font-bold top-8 right-2 bg-black backdrop-blur-50'
        value={rating} 
        maxValue={10} 
        text={rating.toFixed(1)} 
        styles={buildStyles({textSize:'35px', textColor: 'white', pathColor: rating < 5 ? 'red' : rating < 7 ? 'orange' : 'green'})}
        />
    </div>
      
  )
}

export default CircleRating
