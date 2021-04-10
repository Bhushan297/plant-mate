import { useState, useEffect } from 'react';
import trefle from '../api/trefle';

export default () => {
	const [results, setResults] = useState([]);
	const [errorMessage, setErrorMessage] = useState('');

	const searchApi = async (searchTerm) => {
		try {
            const response = await trefle.get('/search', {
                params: {
                    q: searchTerm
                },
            });
            setResults(response.data.data);
        } catch(err) {
            setErrorMessage('Something went wrong');
        }
	};

	useEffect(() => {
		searchApi('cherry');
	}, []);

	return [results, errorMessage, searchApi];
};