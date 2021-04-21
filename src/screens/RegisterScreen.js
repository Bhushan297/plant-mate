import React, { useState } from 'react';
import RegisterForm from '../components/RegisterForm';

const RegisterScreen = ({navigation}) => {
    return(
        <RegisterForm authNavigation={navigation}/>
    )
}

export default RegisterScreen;