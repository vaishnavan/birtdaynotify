import axios from 'axios';

const API_URL = 'https://birthdaynotify.herokuapp.com/api/v1';

const postBirthday = mydata => {
    return axios.post(`${API_URL}/postBirth`, mydata);
};

export { postBirthday };
