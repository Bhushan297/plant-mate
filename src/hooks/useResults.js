import { useState, useEffect } from 'react';
import dummy from '../api/dummy';

export default () => {
	const [results, setResults] = useState([]);
	const [errorMessage, setErrorMessage] = useState('');

	const searchApi = async () => {
		try {
            const response = await dummy.get('/plants');
            setResults(response.data);
        } catch(err) {
            console.log(err);
            setErrorMessage('Something went wrong');
        }
	};

	useEffect(() => {
		searchApi();
	}, []);

	return [results, errorMessage, searchApi];
};