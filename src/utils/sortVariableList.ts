export const sortVariableList = (variables: Variable[]): Variable[] => {
  let sortedVariables = [];
  for (let v of variables) if (v.type === "str") sortedVariables.push(v);
  for (let v of variables) if (v.type === "int") sortedVariables.push(v);
  for (let v of variables) if (v.type === "int[]") sortedVariables.push(v);
  for (let v of variables) if (v.type === "dec") sortedVariables.push(v);
  return sortedVariables;
};
