
import React from "react";
import {Link, useNavigate} from "react-router-dom";

interface CompanyProfileProps {
    
}

const CompanyProfile:React.FC = (): JSX.Element => {
    const navigateTo = useNavigate();
    return (
        <React.Fragment>
            <h1>CompanyProfile works!</h1>
        </React.Fragment>
    );  
}

export default CompanyProfile;
    