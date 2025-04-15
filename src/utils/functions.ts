import { useTheme } from "@mui/material";
import { CompleteHourType, SchedulingType } from "./types/types";

export function formatarMoedaReal(value: number, decimals: number = 2): string {
  if (isNaN(value)) {
    return 'R$ 0,00';
  }

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value);
}

export function estimateHour(selectedHour: CompleteHourType, serviceHour: number) {
  let totalMinutes = (selectedHour.hour * 60) + (selectedHour.minute + serviceHour)
  let hours = Math.floor(totalMinutes / 60)
  let minutes = totalMinutes - (hours * 60)
  return formatDate(hours, minutes, ':')
}

export function monthByNumber(month: number) {
  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril',
    'Maio', 'Junho', 'Julho', 'Agosto',
    'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  return months[month]
}

export function formatDate(item1: number, item2: number, separator: string) {
  return (`${item1 < 10 ? '0' : ''}${item1}${separator}${item2 < 10 ? '0' : ''}${item2}`)
}

export function statusValue(status: number) {
  switch (status) {
    case 1:
      return 'Solicitado'
    case 2:
      return 'Confirmado'
    case 3:
      return 'Finalizado'
    case 4:
      return 'Cancelado'
    default:
      break;
  }
}


export function validEditingPossible(schedulingMade: SchedulingType | undefined): boolean {
  if (!schedulingMade) return false
  let today = new Date();
  today.setDate(today.getDate() + 2);
  let scheduledDate = new Date(schedulingMade.year, schedulingMade.month, schedulingMade.day);

  return today <= scheduledDate;
}

export function weekdayToNumber(weekday: string) {
  let weekdayNumber = 0
  switch (weekday.toLowerCase()) {
    case 'seg':
      weekdayNumber = 1
      break;
    case 'ter':
      weekdayNumber = 2
      break;
    case 'qua':
      weekdayNumber = 3
      break;
    case 'qui':
      weekdayNumber = 4
      break;
    case 'sex':
      weekdayNumber = 5
      break;
    case 'sab':
      weekdayNumber = 6
      break;
    case 'dom':
      weekdayNumber = 7
      break;
  }
  return weekdayNumber
}

export function numberToWeekday(weekdayNumber: number): string {
  let weekday = '';
  switch (weekdayNumber) {
    case 1:
      weekday = 'Dom';
      break;
    case 2:
      weekday = 'Seg';
      break;
    case 3:
      weekday = 'Ter';
      break;
    case 4:
      weekday = 'Qua';
      break;
    case 5:
      weekday = 'Qui';
      break;
    case 6:
      weekday = 'Sex';
      break;
    case 7:
      weekday = 'Sab';
      break;
  }
  return weekday;
}