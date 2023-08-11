
import React from "react";
import {Link, useNavigate} from "react-router-dom";

interface AuthProps {
    
}

const Auth:React.FC = (): JSX.Element => {
    const navigateTo = useNavigate();
    return (
        <React.Fragment>
            <h1>Auth works!</h1>
        </React.Fragment>
    );  
}

export default Auth;
    