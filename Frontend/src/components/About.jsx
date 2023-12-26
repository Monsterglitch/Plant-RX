import React from 'react';
import '../styles/about.css';
import image from '../assets/preload-bg.jpg';

function About() {
  return (
    <div className="about">
        <div className="about-contents">
            <h5>{`Home > Explore > Capture`}</h5>
            <h2 className='about-contents-title'>Find your Plant:</h2>
            <p className='about-contents-details'>
            Upload your plant image to identify and explore more details. PlantRX is designed specifically for plant identification, allowing users to identify plants quickly by snapping a photo and receiving information about the plant.
            
            </p>
        </div>
        <div className="about-image">
        <img src={image} alt="" style={{width:"100%",height:"100%",borderRadius:"12px"}}/>

        </div>
    </div>
  )
}

export default About