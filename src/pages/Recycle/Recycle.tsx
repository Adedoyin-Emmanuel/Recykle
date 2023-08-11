
import React from "react";
import {Link, useNavigate} from "react-router-dom";

interface RecycleProps {
    
}

const Recycle:React.FC = (): JSX.Element => {
    const navigateTo = useNavigate();
    return (
        <React.Fragment>
            <h1>Recycle works!</h1>
        </React.Fragment>
    );  
}

export default Recycle;
    