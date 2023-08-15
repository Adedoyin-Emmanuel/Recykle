
import React from "react";
import {Link, useNavigate} from "react-router-dom";

interface ProfileEditProps {
    
}

const ProfileEdit:React.FC = (): JSX.Element => {
    const navigateTo = useNavigate();
    return (
        <React.Fragment>
            <h1>ProfileEdit works!</h1>
        </React.Fragment>
    );  
}

export default ProfileEdit;
    