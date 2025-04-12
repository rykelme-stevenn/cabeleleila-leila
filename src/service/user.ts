import axios from 'axios';
import { User } from '../utils/types/types';
type LoginData = {
    email: string;
    password: string;
  };

export async function login(loginData: LoginData): Promise<User> {
    return await axios.get(`http://localhost:3000/users`, {
        params: {
            email: loginData.email
        }
    }).then((response) => {
        console.log(response);
        if (response?.data?.length > 0 && response?.data[0].password === loginData.password) {
            return response?.data[0];
        }
        return null
    }).catch((error) => {
        return error;
    });
}