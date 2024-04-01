export const isLocalStorageValid = (localStorageData: string) => {
  const { timestamp } = JSON.parse(localStorageData);
  const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
  const oneDayAgo = Date.now() - oneDayInMilliseconds;

  return timestamp > oneDayAgo;
};
