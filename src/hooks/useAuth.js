
import { useState, useEffect } from 'react';
import plants from '../api/plants';

export default () => {

	const loginApi = async (username, password) =>{
		try {
			const loginData = {username, password}
            await plants.post('/login' , loginData)
			return true;
        } catch(err) {
            return false;
        }
	}

	return [loginApi];
};
