import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';

const LoginScreen = ({navigation}) => {
    return(
        <LoginForm authNavigation={navigation}/>
    )
}

export default LoginScreen;