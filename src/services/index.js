import dataMock from './data.json'

export function fetchData () {
    const fetchResult = new Promise((resolve) => {
      setTimeout(() => resolve(dataMock), 500);
    });
    return fetchResult.then(res => res);
}