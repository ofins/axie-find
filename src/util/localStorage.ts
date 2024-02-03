export const fetchLocalStorage = (query: string) => {
  const storedData = localStorage.getItem(query);

  if (storedData && storedData !== "undefined") {
    return JSON.parse(storedData);
  } else {
    console.error("stored data does not exist");
  }
};

export const setLocalStorageItem = (query: string, data) => {
  if (data) {
    localStorage.setItem(query, JSON.stringify(data));
  }
};
