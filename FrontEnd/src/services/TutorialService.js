import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/tutorials/';

const getAll = () => axios.get(API_URL);
const get = id => axios.get(`${API_URL}${id}/`);
const create = data => axios.post(API_URL, data);
const update = (id, data) => axios.put(`${API_URL}${id}/`, data);
const remove = id => axios.delete(`${API_URL}${id}/`);

const TutorialService = { getAll, get, create, update, remove };
export default TutorialService;
