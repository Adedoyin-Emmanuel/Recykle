
import React from "react";
import {Link, useNavigate} from "react-router-dom";

interface CompanySettingsProps {
    
}

const CompanySettings:React.FC = (): JSX.Element => {
    const navigateTo = useNavigate();
    return (
        <React.Fragment>
            <h1>CompanySettings works!</h1>
        </React.Fragment>
    );  
}

export default CompanySettings;
    