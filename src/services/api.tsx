import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:3000',
});

export const getApplications = async () => {
    const res = await API.get('/applications');
    return res.data;
}