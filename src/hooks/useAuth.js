import plants from '../api/plants';

export const loginApi = async (username, password) =>{
	try {
		const loginData = {username, password}
		await plants.post('/login' , loginData)
		return true;
	} catch(err) {
		return false;
	}
}

export const registerApi = async (name, username, password, answer1, answer2) =>{
	try {
		const regData = {name, username, password, answer1, answer2}
		await plants.post('/register' , regData)
		return true;
	} catch(err) {
		return false;
	}
}

export const forgotApi = async (username, password, answer1, answer2) =>{
	try {
		const resetData = {username, password, answer1, answer2}
		await plants.post('/forget', resetData)
		return true;
	} catch(err) {
		return false;
	}
}

