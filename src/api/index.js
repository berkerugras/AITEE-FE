import axios from 'axios';
// linki kontrol
const url = 'http://localhost:5000/posts';

export const fetchUsers = () => axios.get(url);