
import React from "react";
import {Link, useNavigate} from "react-router-dom";

interface MarketPlaceProps {
    
}

const MarketPlace:React.FC = (): JSX.Element => {
    const navigateTo = useNavigate();
    return (
        <React.Fragment>
            <h1>MarketPlace works!</h1>
        </React.Fragment>
    );  
}

export default MarketPlace;
    