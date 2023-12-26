import React, { useState } from 'react'
import NavBar from './NavBar';
import Controllers from './Controllers';
import { useContent } from '../context/context';
import Options from './Options';
import About from './About';
import { Fab } from '@mui/material';
import CustChatBot from './CustChatBot';
import { Close } from '@mui/icons-material';
import bot from '../assets/bot.jpg';

function Home() {
    const { name, state } = useContent();
    const [states,setStates] = useState(false);

    return (
        <div className='home'>
            {
                state && <Options type={name} />
            }
            {
                !state &&
                <>
                    <NavBar />
                    <About />
                    <Controllers />
                    {
                        states && <CustChatBot />
                    }
                    <Fab onClick={()=>{setStates(!states)}} style={{
                        position:"fixed",
                        bottom:"10px",
                        left:"10px",
                        // backgroundColor:"aquamarine",
                        backgroundImage:`url(${bot})`,
                        backgroundSize:"cover"
                    }}>
                        {
                            states ? <Close /> : ''
                        }
                    </Fab>
                </>
            }
        </div>
    )
}

export default Home