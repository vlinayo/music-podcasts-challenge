export const storeDataInStorage = (data: any, keyName: string) => {
  const timestamp = Date.now();
  localStorage.setItem(keyName, JSON.stringify({ data, timestamp }));
};
