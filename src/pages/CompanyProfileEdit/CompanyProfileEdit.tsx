
import React from "react";
import {Link, useNavigate} from "react-router-dom";

interface CompanyProfileEditProps {
    
}

const CompanyProfileEdit:React.FC = (): JSX.Element => {
    const navigateTo = useNavigate();
    return (
        <React.Fragment>
            <h1>CompanyProfileEdit works!</h1>
        </React.Fragment>
    );  
}

export default CompanyProfileEdit;
    