import React from 'react';
import ForgotPassForm from '../components/ForgotPassForm';

const ForgotPassScreen = ({navigation}) => {
    return(
        <ForgotPassForm authNavigation={navigation}/>
    )
}

export default ForgotPassScreen;