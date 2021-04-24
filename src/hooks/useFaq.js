import plants from '../api/plants';

export const addQuesApi = async (author, question) =>{
	try {
		await plants.post('/addQuestion', {author,question})
		return true;
	} catch(err) {
		return false;
	}
}

