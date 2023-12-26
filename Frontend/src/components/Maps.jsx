import React, { useEffect, useState } from 'react'
import '../styles/maps.css';
import CustMap from './CustMap';

function Maps() {

            const [data,setData] = useState();
            const [loading,setLoading] = useState(true);
            let [plants,setPlants] = useState()
    const [key,setKey] = useState('Aloevera');
    const [apidata,setApiData] = useState();

    const fetchData = async()=>{
        const res = await fetch("http://localhost:5000/plant-details")
        const data = await res.json()
        setData(data.data)
        let plant = []
        for(let item of data.data){
            plant.push(item['name'])
            if(item['name'] === "Aloevera"){
                console.log(item['points']);
                setApiData(item['points']);
            }
        }
        setPlants(plant);
        setLoading(false)
    }

    const changeKey = (key) =>{
        for(let item of data){
            if(item.name === key){
                setApiData(item.points);
                console.log(item.points);
                return;
            }
        }

    }

    useEffect(()=>{
        fetchData();
    },[])


    if(loading){
        return(
            <h1>Loading...</h1>
        )
    }

  return (
    <div className="maps">
        <div className="maps-plants">
            <h3>Medicinal Plants</h3>
            {
                plants.map((item)=>(
                    <button className='btn map-btn' onClick={()=>{changeKey(item)}}>{item}</button>
                ))
            }
        </div>
        <div className="maps-world-map">
            <CustMap data = {apidata} />
        </div>
    </div>
  )
}

export default Maps