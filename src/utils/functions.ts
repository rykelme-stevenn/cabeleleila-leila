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

