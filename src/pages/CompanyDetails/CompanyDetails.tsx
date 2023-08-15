
import React from "react";
import {Link, useNavigate} from "react-router-dom";

interface CompanyDetailsProps {
    
}

const CompanyDetails:React.FC = (): JSX.Element => {
    const navigateTo = useNavigate();
    return (
        <React.Fragment>
            <h1>CompanyDetails works!</h1>
        </React.Fragment>
    );  
}

export default CompanyDetails;
    