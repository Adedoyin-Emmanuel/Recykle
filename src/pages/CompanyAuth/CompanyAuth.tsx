
import React from "react";
import {Link, useNavigate} from "react-router-dom";

interface CompanyAuthProps {
    
}

const CompanyAuth:React.FC = (): JSX.Element => {
    const navigateTo = useNavigate();
    return (
        <React.Fragment>
            <h1>CompanyAuth works!</h1>
        </React.Fragment>
    );  
}

export default CompanyAuth;
    