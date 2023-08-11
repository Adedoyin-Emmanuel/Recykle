
import React from "react";
import {Link, useNavigate} from "react-router-dom";

interface DashboardProps {
    
}

const Dashboard:React.FC = (): JSX.Element => {
    const navigateTo = useNavigate();
    return (
        <React.Fragment>
            <h1>Dashboard works!</h1>
        </React.Fragment>
    );  
}

export default Dashboard;
    