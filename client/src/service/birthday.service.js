import axios from 'axios';

const API_URL = 'https://birthdaynotify.herokuapp.com/api/v1';

const postBirthday = mydata => {
    return axios.post(`${API_URL}/postBirth`, mydata);
};

const getBirthday = () => {
    return axios.get(`${API_URL}/allBirthday`);
}

export { postBirthday, getBirthday };
