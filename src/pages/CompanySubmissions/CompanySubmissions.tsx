
import React from "react";
import {Link, useNavigate} from "react-router-dom";

interface CompanySubmissionsProps {
    
}

const CompanySubmissions:React.FC = (): JSX.Element => {
    const navigateTo = useNavigate();
    return (
        <React.Fragment>
            <h1>CompanySubmissions works!</h1>
        </React.Fragment>
    );  
}

export default CompanySubmissions;
    