
import React from "react";
import {Link, useNavigate} from "react-router-dom";

interface SettingsProps {
    
}

const Settings:React.FC = (): JSX.Element => {
    const navigateTo = useNavigate();
    return (
        <React.Fragment>
            <h1>Settings works!</h1>
        </React.Fragment>
    );  
}

export default Settings;
    