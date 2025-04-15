import axios from 'axios';
import { SchedulingType, ServiceType } from '../utils/types/types';

export async function getServices(): Promise<Array<ServiceType>> {
    return await axios.get(`http://localhost:3000/services`).then((response) => {
        return response.data 
    }).catch((error) => {
        return [];
    });
}

export async function getSchedulings(): Promise<Array<SchedulingType>> {
    return await axios.get(`http://localhost:3000/schedulings`).then((response) => {
        return response.data 
    }).catch((error) => {
        return [];
    });
}

export async function getSchedulingById(schedulingId: string): Promise<SchedulingType> {
    return await axios.get(`http://localhost:3000/schedulings/${schedulingId}`).then((response) => {
        return response.data 
    }).catch((error) => {
        return [];
    });
}

export async function getUserSchedulings(userId: number | undefined): Promise<Array<SchedulingType>> {
    if(!userId) return []
    return await axios.get(`http://localhost:3000/schedulings`, {
        params: {
            user_id: userId
        }
    }).then((response) => {
        return response.data 
    }).catch((error) => {
        return [];
    });
}

export async function saveScheduling(schedulingData: SchedulingType){
    schedulingData['created_at'] = new Date();
    schedulingData['updated_at'] = new Date();

    return await axios.post(`http://localhost:3000/schedulings`, schedulingData).then((response) => {
        return response.data 
    }).catch((error) => {
        return null;
    });
}

export async function updateScheduling(schedulingData: SchedulingType){
    return await axios.put(`http://localhost:3000/schedulings/${schedulingData.id}`, schedulingData).then((response) => {
        return response.data 
    }).catch((error) => {
        return null;
    });
}
