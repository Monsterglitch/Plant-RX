import { useRef } from "react";
import CustCamera from './CustCamera';
import FileUpload from "./FileUpload";
import '../styles/options.css';

const Options = (props) => {
    const explore = useRef();

    return (
        <div className="explore-features">
            <div className="explore-contents" ref={explore}>
                {
                    props.type === "camera" ? <CustCamera /> : <FileUpload />
                }
            </div>
        </div>
    )
}

export default Options;