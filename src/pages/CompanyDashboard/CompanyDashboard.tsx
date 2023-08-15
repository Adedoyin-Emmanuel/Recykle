
import React from "react";
import {Link, useNavigate} from "react-router-dom";

interface CompanyDashboardProps {
    
}

const CompanyDashboard:React.FC = (): JSX.Element => {
    const navigateTo = useNavigate();
    return (
        <React.Fragment>
            <h1>CompanyDashboard works!</h1>
        </React.Fragment>
    );  
}

export default CompanyDashboard;
    