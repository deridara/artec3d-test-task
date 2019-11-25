export const renderTimeString = runtime => {
  const hours = ~~(runtime / 60);
  const minutes = runtime % 60;
  return `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
};

export const dataToEntities = (array, key) => {
  return array.reduce((acc, element) => ({...acc, [element[key]]: element}), {})
}