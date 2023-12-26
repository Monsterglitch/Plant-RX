import React, { useRef, useEffect, useState } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';
import '../styles/maps.css';
import axios from 'axios'; // Import Axios

export default function CustMap(props) {
  // console.log(props.data);
  const mapContainer = useRef(null);
  const map = useRef(null);


  const India = { long: 79.3832, lat: 23.6325 };

  const [location, setLocation] = useState([]);
  

  console.log(location);

  const [zoom] = useState(3.5);
  const name=useRef();
  maptilersdk.config.apiKey = 'wbrYhSY66HizG6tkiSmf';

  // Function to get location name from coordinates
  const getLocationName = async (latitude, longitude) => {
   
      const response = await  axios.get(`https://api.api-ninjas.com/v1/reversegeocoding?lat=${latitude}&lon=${longitude}`,{headers: {'X-Api-Key': "JrraOAG1/dszP47Pd5JajQ==Ox6qLryrEKEtb0uW"}})
      console.log(response.data[0].name)
      name.current=response.data[0].name
      return response.data[0].name
  } 

  const fetchTooltop = async(data) => {
    console.log(2);
    console.log(data);
    let location = data;
    // if (map.current) return;

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.STREETS,
      center: [India.long, India.lat],
      zoom: zoom,
    });

    location.map(async (data) => {
      console.log(data);
      const marker = new maptilersdk.Marker({
        element: createCustomMarker(await getLocationName(data.lat, data.long)),
        anchor: 'center',
      })
        .setLngLat([data.long, data.lat])
        .addTo(map.current);

      const tooltip = new maptilersdk.Popup().setHTML(`<strong>${name.current}</strong>`);

      marker.getElement().addEventListener('mouseenter', () => {
        tooltip.addTo(map.current);
        tooltip.setLngLat([data.long, data.lat]);
      });

      marker.getElement().addEventListener('mouseleave', () => {
        tooltip.remove();
      });
    });
  }

  useEffect(()=>{
    fetchTooltop();
  },[location])

  const changeLocations = ()=>{
    setLocation(props.data);
    console.log(1);
    fetchTooltop(props.data)
  }

  useEffect(()=>{
    changeLocations()
  })

  // Function to create a custom marker element
  const createCustomMarker = (name) => {
    const customMarker = document.createElement('div');
    customMarker.className = 'custom-marker';
    customMarker.innerHTML = `<img src="https://thenounproject.com/api/private/icons/211194/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23000000&foregroundOpacity=1&imageFormat=png&rotation=0" alt="${name}" style="width: 32px; height: 32px;" />`;
    return customMarker;
  };

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
}
