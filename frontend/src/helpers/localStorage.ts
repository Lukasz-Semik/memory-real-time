export function getFromLocalStorage<T>(key: string): T {
  if (!localStorage) {
    return null;
  }

  return (localStorage.getItem(key) as unknown) as T;
}

export function setToLocalStorage(key: string, value: string) {
  if (!localStorage) {
    return null;
  }

  localStorage.setItem(key, value);
}
