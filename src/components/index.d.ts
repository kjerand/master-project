type IntegerVariable = {
  min: number;
  max: number;
};

type DecimalVariable = {
  min: number;
  max: number;
};

type StringVariable = {
  options: string[];
};

type IntegerListVariable = {
  min: number;
  max: number;
  size: number;
};

type Variable = {
  data:
    | IntegerVariable
    | DecimalVariable
    | StringVariable
    | IntegerListVariable;
  name: string;
  type: "str" | "int" | "dec" | "int[]";
};

declare module "*.png";
