import axios from 'axios';

export default axios.create({
	baseURL: 'https://trefle.io/api/v1/plants',
	headers: {
		Authorization: 'token gG0oRf7zchYbi5d54jKuAeY8Wk-SoPYuFOCHT2m9fLg',
	},
});
