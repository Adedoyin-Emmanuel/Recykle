
import React from "react";
import {Link, useNavigate} from "react-router-dom";

interface UserSubmissionsProps {
    
}

const UserSubmissions:React.FC = (): JSX.Element => {
    const navigateTo = useNavigate();
    return (
        <React.Fragment>
            <h1>UserSubmissions works!</h1>
        </React.Fragment>
    );  
}

export default UserSubmissions;
    