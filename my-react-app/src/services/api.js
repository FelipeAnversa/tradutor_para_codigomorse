import axios from "axios";

const api = axios.create({
    baseURL: 'https://api.funtranslations.com'
});

export default api