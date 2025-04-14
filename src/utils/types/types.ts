export type User = {
    id: number
    email: string,
    name: string
}

export type Service = {
    id: number,
    name: string,
    value: number,
    estimated_time: number
}

export type CompleteDate = {
    day: number;
    month: number;
    year: number;
    weekday: string;
}

export type CompleteHour = {
    hour: number;
    minute: number;
}

export type Scheduling = {
    id: number;
    user_id: number;
    day: number;
    month: number;
    weekday: string;
    year: number;
    hour: number;
    minute: number;
  };