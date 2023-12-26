import Webcam from 'react-webcam';
import { useState, useRef } from 'react';
import { Camera, Cameraswitch, Check, Error, Replay, Search } from '@mui/icons-material';
import { Close } from '@mui/icons-material';
import Fab from '@mui/material/Fab';
import { useContent } from '../context/context';

const CustCamera = () => {
    const { closeCamera } = useContent();
    const [imgsrc, setImg] = useState("");
    const [data, setData] = useState(null);

    const [facingside, Setface] = useState("environment")
    const [capture, setCapture] = useState(false);
    const webcamRef = useRef(null);

    const FACING_MODE_USER = "user";
    const FACING_MODE_ENVIRONMENT = "environment";

    const Capture = () => {

        const img = webcamRef.current.getScreenshot();
        setImg(img);
        setCapture(true);
    }

    const Switch = () => {
        Setface(facingside === FACING_MODE_ENVIRONMENT ? FACING_MODE_USER : FACING_MODE_ENVIRONMENT)
    }

    const fetchData = async () => {
        console.log(imgsrc);

        var arr = imgsrc.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[arr.length - 1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    const fl = new File([u8arr], 'filename', {type:mime});
    console.log(fl);



        // const binaryString = atob(imgsrc.split(',')[1]); // Binary data string
        // const blob = new File([binaryString], { type: 'image/jpg' });
        // console.log(blob);
        const formData = new FormData();
        formData.append('image', fl);
        const res = await fetch('http://localhost:5000/predict', {
                method: 'POST',
                body: formData
            })
        const data = await res.json();
        console.log(data);
        setData(data.prediction);
    }

    const videoConstraints = {
        facingMode: facingside
    }

    const fetchSuspect = async() =>{
        
        var arr = imgsrc.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[arr.length - 1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    const fl = new File([u8arr], 'filename', {type:mime});
    console.log(fl);

        const formData = new FormData();
        formData.append('image', fl);
        const res = await fetch('http://localhost:5000/suspect', {
                method: 'POST',
                body: formData
            })
        const data = await res.json();
        console.log(data);
        setData(data.prediction);
    }

    return (
        <div className='camera'>
            {
                !capture &&
                <>
                    <Fab onClick={Switch} className='camera-controls'>
                        <Cameraswitch />
                    </Fab>

                    <Webcam ref={webcamRef} screenshotFormat={"image/jpeg"} videoConstraints={videoConstraints} width="60%" height="100%" />

                    <Fab onClick={closeCamera}>
                        <Close />
                    </Fab>

                    <Fab onClick={Capture} className='camera-controls'>
                        <Camera />
                    </Fab>
                </>
            }
            {
                capture &&
                <div className={`final-result ${(data!=null && data['Plant Name'] === "") && 'alert alert-danger'}`}>
                    <section className="img-section">
                        <img src={imgsrc} style={{
                            width: "100%",
                            height: "80%"
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
                            <Fab variant='extended' onClick={()=>{setData(null);setCapture(false)}}>
                                <Replay />
                                Retry
                            </Fab>
                            <Fab variant="extended" onClick={closeCamera}>
                                <Close />
                            </Fab>
                        </div>
                    </section>
                    {
                        (data!=null && data['Plant Name'] != "") &&
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
                    {
                        (data!=null && data['Plant Name'] === "") &&
                        <div className="no-plant">
                        <h1 className='alert alert-danger'>Not Plant</h1>
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export default CustCamera;