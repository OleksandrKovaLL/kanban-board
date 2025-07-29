/**
 * Set data in localStorage with type safety.
 * @param key The key under which the data will be stored.
 * @param value The value to store (must be serializable).
 */
export const setLocalStorageItem = <T>(key: string, value: T): void => {
  try {
    const serializedValue = JSON.stringify(value)
    localStorage.setItem(key, serializedValue)
  } catch (error) {
    console.error(`Error setting item in localStorage: ${error}`)
  }
}

/**
 * Get data from localStorage with type safety.
 * @param key The key to retrieve the data for.
 * @returns The parsed value or null if the key doesn't exist or parsing fails.
 */
export const getLocalStorageItem = <T>(key: string): T | null => {
  try {
    const serializedValue = localStorage.getItem(key)
    return serializedValue ? (JSON.parse(serializedValue) as T) : null
  } catch (error) {
    console.error(`Error getting item from localStorage: ${error}`)
    return null
  }
}

/**
 * Remove data from localStorage.
 * @param key The key to remove.
 */
export const removeLocalStorageItem = (key: string): void => {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error(`Error removing item from localStorage: ${error}`)
  }
}

/**
 * Clear all data in localStorage.
 */
export const clearLocalStorage = (): void => {
  try {
    localStorage.clear()
  } catch (error) {
    console.error(`Error clearing localStorage: ${error}`)
  }
}
