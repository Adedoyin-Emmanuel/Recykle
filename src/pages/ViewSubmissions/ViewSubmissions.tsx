
import React from "react";
import {Link, useNavigate} from "react-router-dom";

interface ViewSubmissionsProps {
    
}

const ViewSubmissions:React.FC = (): JSX.Element => {
    const navigateTo = useNavigate();
    return (
        <React.Fragment>
            <h1>ViewSubmissions works!</h1>
        </React.Fragment>
    );  
}

export default ViewSubmissions;
    