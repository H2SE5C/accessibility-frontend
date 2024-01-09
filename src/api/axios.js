import axios from 'axios';

let url = '';
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    url = 'https://localhost:5000';
}
else {
    url = 'https://accessibility-backend.azurewebsites.net'
}
export default axios.create({
    baseURL: url,
})