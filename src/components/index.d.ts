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

type Variable = {
  data: IntegerVariable | DecimalVariable | StringVariable;
  name: string;
  type: "str" | "int" | "dec";
};
