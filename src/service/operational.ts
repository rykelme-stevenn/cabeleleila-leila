import axios from 'axios';
import { SchedulingType, ServiceType } from '../utils/types/types';

export async function getServices(): Promise<Array<ServiceType>> {
    return await axios.get(`http://localhost:3000/services`).then((response) => {
        console.log(response);
        return response.data 
    }).catch((error) => {
        console.log(error)
        return [];
    });
}

export async function getSchedulings(): Promise<Array<SchedulingType>> {
    return await axios.get(`http://localhost:3000/schedulings`).then((response) => {
        console.log(response);
        return response.data 
    }).catch((error) => {
        console.log(error)
        return [];
    });
}

export async function saveScheduling(schedulingData: SchedulingType){
    return await axios.post(`http://localhost:3000/schedulings`, schedulingData).then((response) => {
        console.log(response);
        return response.data 
    }).catch((error) => {
        console.log(error)
        return null;
    });
}