import { useState, useEffect } from 'react';
import plants from '../api/plants';
import i18n from 'i18n-js';

export default () => {
	const [results, setResults] = useState([]);
	const [errorMessage, setErrorMessage] = useState('');

	const searchApi = async () => {
		try {
            const response = await plants.get(i18n.t('plantApi'));
            setResults(response.data);
        } catch(err) {
            console.log(err);
            setErrorMessage('Something went wrong');
        }
	};

	return [results, errorMessage, searchApi];
};