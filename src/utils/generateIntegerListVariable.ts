export const generateIntegerListVariable = (
  min: number,
  max: number,
  size: number
) => {
  let list = [];
  for (let i = 0; i < size; i++)
    list.push(Math.floor(Math.random() * (max - min + 1) + min));
  return "[" + list + "]";
};
