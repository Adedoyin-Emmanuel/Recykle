
import React from "react";
import {Link, useNavigate} from "react-router-dom";

interface NotFoundProps {
    
}

const NotFound:React.FC = (): JSX.Element => {
    const navigateTo = useNavigate();
    return (
        <React.Fragment>
            <h1>NotFound works!</h1>
        </React.Fragment>
    );  
}

export default NotFound;
    