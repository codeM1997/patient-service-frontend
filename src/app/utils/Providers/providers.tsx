export const myFetch = (url: string, options: any) => {
  try {
    return fetch(url, options);
  } catch (error) {
    alert("Something went wrong");
  }
};
