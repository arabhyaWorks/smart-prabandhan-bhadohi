export function getDaysInMonth(date: Date): (number | null)[] {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
  
    const days: (number | null)[] = Array(35).fill(null);
    
    for (let i = 0; i < daysInMonth; i++) {
      days[i + firstDayOfMonth] = i + 1;
    }
  
    return days;
  }
  
  export function getMonthName(date: Date): string {
    return date.toLocaleString('default', { month: 'long' });
  }
  
  export function formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    return `${day}-${month}-${year}`;
  }
  
  export function formatFullDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
  
  export const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  export function generateYearRange(currentYear: number): number[] {
    const years: number[] = [];
    const startYear = currentYear - 100;
    const endYear = currentYear + 100;
    
    for (let year = startYear; year <= endYear; year++) {
      years.push(year);
    }
    
    return years;
  }