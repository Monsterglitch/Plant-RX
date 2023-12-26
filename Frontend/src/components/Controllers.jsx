import React from 'react'
import { useState, useRef } from 'react';
import Fab from '@mui/material/Fab';
import SearchIcon from '@mui/icons-material/Search';
import { CameraAlt } from '@mui/icons-material';
import { CloudUpload } from '@mui/icons-material';
import { Close } from '@mui/icons-material';
import { useContent } from '../context/context';
import Options from './Options';
import { Tooltip } from '@mui/material';

function Controllers() {
    const { setOptions } = useContent();

    const [open, setOpen] = useState(false);

    return (
        <>
            {
                open &&
                <Tooltip title="Camera" arrow>
                    <Fab style={{
                        backgroundColor: "aquamarine",
                        position: "fixed",
                        right: "10%",
                        bottom: "2%"
                    }} onClick={() => { setOptions("camera") }}>
                        <CameraAlt />
                    </Fab>
                </Tooltip>
            }

            <Fab style={{
                backgroundColor: "aquamarine",
                position: "fixed",
                right: "1%",
                bottom: "2%",
                padding: "1.5%"
            }} variant='extended' onClick={() => { setOpen(!open) }}>
                {
                    open === false ? <SearchIcon fontSize='large' style={{ paddingRight: "10px" }} /> : <Close fontSize='large' style={{ paddingRight: "10px" }} />
                }
                {
                    open === false ? 'Explore' : 'Close'
                }

            </Fab>

            {
                open &&
                <Tooltip title="Upload" arrow>
                    <Fab style={{
                        backgroundColor: "aquamarine",
                        position: "fixed",
                        right: "1%",
                        bottom: "13%"
                    }} onClick={() => { setOptions("upload") }}>
                        <CloudUpload />
                    </Fab>
                </Tooltip>
            }
        </>
    )
}

export default Controllers