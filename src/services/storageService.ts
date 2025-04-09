/**
 * Service for handling local storage operations
 */

// Keys for localStorage
const STORAGE_KEYS = {
  SALARY: 'salary',
};

/**
 * Get the saved salary from localStorage
 * @returns The saved salary or empty string if not found
 */
export const getSalary = (): string => {
  return localStorage.getItem(STORAGE_KEYS.SALARY) || '';
};

/**
 * Save salary to localStorage
 * @param salary The salary to save
 */
export const saveSalary = (salary: string): void => {
  localStorage.setItem(STORAGE_KEYS.SALARY, salary);
}; 