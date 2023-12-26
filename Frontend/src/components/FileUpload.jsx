import { Check, Close, Error, Replay, Search, UploadFile } from '@mui/icons-material';
import React from 'react'
import { useState } from 'react'
import Fab from '@mui/material/Fab';
import { useContent } from '../context/context';
import '../styles/fileupload.css';

function FileUpload() {
    const [img, setImg] = useState();
    const [data, setData] = useState(null);

    const { closeCamera } = useContent();
    console.log(img);

    const fetchData = async () => {
        const formData = new FormData();
        formData.append('image', img);
        const res = await fetch('http://localhost:5000/predict', {
                method: 'POST',
                body: formData
            })
        const data = await res.json();
        console.log(data);
        setData(data.prediction);
    }

    const fetchSuspect = async () => {
        const formData = new FormData();
        formData.append('image', img);
        const res = await fetch('http://localhost:5000/suspect', {
                method: 'POST',
                body: formData
            })
        const data = await res.json();
        console.log(data);
        setData(data.prediction);
    }

    return (
        <div className={`file-upload ${(data!=null && data['Plant Name'] === "") && 'alert alert-danger'} ${(data!=null && data['type']) && (data['type'] === "TOXIC" ? 'alert alert-danger' : 'alert alert-success ')}`}>
            {
                img === undefined &&
                <div className="file-upload-section">
                    <div className="upload-input-details">
                        <UploadFile className='upload-icon' fontSize='40px' />
                        <label className='upload-input-title'>Choose your file from device</label>
                    </div>
                    <input className='form-control upload-img' type="file" onChange={(evt) => { setImg(evt.target.files[0]) }} />
                    <Fab variant="extended" onClick={closeCamera} style={{marginTop:"5%"}} >
                        <Close />
                    </Fab>
                </div>
            }


            {
                img != undefined &&
                <div className="final-result">
                    <section className="img-section">
                        <img src={img != undefined && URL.createObjectURL(img)} style={{
                            width: "100%",
                            height: "80%",
                            borderRadius:"12px",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"
                        }} />
                        <div className="upload-files-controllers">
                            <Fab variant="extended" onClick={fetchData}>
                                <Search />
                                Predict
                            </Fab>
                            <Fab variant="extended" onClick={fetchSuspect}>
                                <Error />
                                Suspect
                            </Fab>
                            <Fab variant='extended' onClick={()=>{setImg(undefined);setData(null)}}>
                                <Replay />
                                Retry
                            </Fab>
                            <Fab variant="extended" onClick={closeCamera}>
                                <Close />
                            </Fab>
                        </div>
                    </section>
                    {
                        (data!=null && data['type']) && 
                        <div className="no-plant">
                        <h1>{data['type']}</h1>
                        </div>
                    }
                    {
                        (data!=null && data['Plant Name'] === "") &&
                        <div className="no-plant">
                        <h1>Not Plant</h1>
                            
                        </div>
                    }
                    {
                        (data!=null && data['Plant Name'] != "" && data['type'] === undefined) &&
                        <div className="plant-details">
                            <h1 className='plant-title'>Plant : {data['Plant Name']}</h1>
                            <p className='plant-biology'>Biological Name : {data['Biological Name']}</p>
                            <label htmlFor="">Uses:</label>
                            <ul>
                            {data['Medicinal Uses'].split("*").map((item)=>
                            (
                                (item.trim().length != 0) &&
                                    <li>{item}</li>
                            ))}
                            </ul>
                        </div>
                    }
                </div>
            }

        </div>
    )
}

export default FileUpload