import React from 'react'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import '../styles/navbar.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../context/context';

function NavBar() {
    // const { language } = useContent();
    const [lang, setLang] = useState('en');

    return (
        <nav>
            <h2 className='navbar-title'>PlantRX</h2>

            <div className="navbar-items">
                <Link className='navbar-item' to="/maps">Maps</Link>
                <Link className='navbar-item' to="/med-plants">Med Plants</Link>
                <div id="google-translator" > </div>  
                {/* <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        label="lang"
                        value={lang}
                        onChange={(evt) => { setLang(evt.target.value) }}
                    >
                        <MenuItem value={'en'}>English</MenuItem>
                        <MenuItem value={'ta'}>Tamil</MenuItem>
                        <MenuItem value={'hi'}>Hindi</MenuItem>
                    </Select>
                </FormControl> */}
            </div>
        </nav>
    )
}

export default NavBar