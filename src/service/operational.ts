import axios from 'axios';
import { Service } from '../utils/types/types';

export async function getServices(): Promise<Array<Service>> {
    return await axios.get(`http://localhost:3000/services`).then((response) => {
        console.log(response);
        return response.data 
    }).catch((error) => {
        console.log(error)
        return [];
    });
}