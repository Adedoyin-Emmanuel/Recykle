
import React from "react";
import {Link, useNavigate} from "react-router-dom";

interface CompanyMaterialsProps {
    
}

const CompanyMaterials:React.FC = (): JSX.Element => {
    const navigateTo = useNavigate();
    return (
        <React.Fragment>
            <h1>CompanyMaterials works!</h1>
        </React.Fragment>
    );  
}

export default CompanyMaterials;
    