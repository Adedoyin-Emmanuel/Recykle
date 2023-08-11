
import React from "react";
import {Link, useNavigate} from "react-router-dom";

interface HomeProps {
    
}

const Home:React.FC = (): JSX.Element => {
    const navigateTo = useNavigate();
    return (
        <React.Fragment>
            <h1>Home works!</h1>
        </React.Fragment>
    );  
}

export default Home;
    