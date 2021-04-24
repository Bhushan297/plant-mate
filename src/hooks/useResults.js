import { useState, useEffect } from 'react';
import plants from '../api/plants';
import i18n from 'i18n-js';

export default () => {
	const [results, setResults] = useState([]);
    const [waiting, setWaiting] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const searchApi = async () => {
		try {
            setWaiting(true);
            const response = await plants.get(i18n.t('plantApi'));
            setResults(response.data);
            setWaiting(false);
        } catch(err) {
            console.log(err);
            setErrorMessage('Something went wrong');
        }
	};

	return [results, errorMessage, waiting, searchApi];
};