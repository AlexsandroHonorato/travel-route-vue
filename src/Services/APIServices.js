import axios from 'axios';

export const http = axios.create({     
    baseURL: 'https://localhost:44314/api/',
    headers: {
        'Content-Type': 'application/json',
    }    
})
