import axios from 'axios';
import { Scheduling, Service } from '../utils/types/types';

export async function getServices(): Promise<Array<Service>> {
    return await axios.get(`http://localhost:3000/services`).then((response) => {
        console.log(response);
        return response.data 
    }).catch((error) => {
        console.log(error)
        return [];
    });
}

export async function getSchedulings(): Promise<Array<Scheduling>> {
    return await axios.get(`http://localhost:3000/schedulings`).then((response) => {
        console.log(response);
        return response.data 
    }).catch((error) => {
        console.log(error)
        return [];
    });
}