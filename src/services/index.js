import dataMock from './data.json'

export function fetchData () {
    const fetch = new Promise((resolve) => {
      setTimeout(() => resolve(dataMock), 500);
    });
    return fetch.then(res => res);
}