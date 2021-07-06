export const getFromStore = (key) => {
  const data = sessionStorage.getItem(key);
  if (data) {
    return data;
  }
  return null;
};
