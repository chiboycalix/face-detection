import React from 'react';
import './FaceRecognition.css'

const FaceRecognition = ({ imageUrl, box }) =>{
    return(
        <div className="center ma">
          <div className="absolute mt2">
            <img alt='' id="inputimage" src={imageUrl} width="500px" height="auto"/>
            <div className="bounding-box" style={{top: 196.98043750000002, left: 95.4017,bottom:112.20193749999999,right: 88.72768500000001}}>

            </div>
          </div>
        </div>
    )
}
export default FaceRecognition;