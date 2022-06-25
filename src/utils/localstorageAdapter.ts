const writeToLocalstorage = (key: string, value: string): void => {
  try {
    localStorage.setItem(key, value)
  } catch (e) {
    console.error(e)
  }
}

const readFromLocalstorage = (key: string): string | void => {
  try {
    return localStorage.getItem(key) || ''
  } catch (e) {
    console.error(e)
  }
}

export { readFromLocalstorage, writeToLocalstorage }
