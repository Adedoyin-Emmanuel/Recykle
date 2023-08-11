
import React from "react";
import {Link, useNavigate} from "react-router-dom";

interface ProfileProps {
    
}

const Profile:React.FC = (): JSX.Element => {
    const navigateTo = useNavigate();
    return (
        <React.Fragment>
            <h1>Profile works!</h1>
        </React.Fragment>
    );  
}

export default Profile;
    