export type UserType = {
    id: number
    email: string,
    name: string,
    owner: string
}

export type ServiceType = {
    id: number,
    name: string,
    value: number,
    estimated_time: number
}

export type CompleteDateType = {
    day: number;
    month: number;
    year: number;
    weekday: string;
}

export type CompleteHourType = {
    hour: number;
    minute: number;
}

export type SchedulingType = {
    id?: string;
    user_id: number;
    day: number;
    month: number;
    weekday: string;
    year: number;
    hour: number;
    minute: number;
    service: ServiceType;
    status: number;
    created_at?: Date;
    updated_at?: Date;
  };