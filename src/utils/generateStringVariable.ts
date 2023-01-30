export const generateStringVariable = (options: string[]) => {
  let index = Math.floor(Math.random() * options.length);
  return options[index];
};
