import { CompleteHourType } from "./types/types";

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
  return `${hours}:${minutes}`
}

export function monthByNumber(month: number){
  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril',
    'Maio', 'Junho', 'Julho', 'Agosto',
    'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  return months[month]
}