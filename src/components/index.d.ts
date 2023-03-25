type UsageData = {
  id?: string;
  timestamp: string;
  type: string;
  userID: string;
  questionID: string;
  code?: string;
};

type Question = {
  id?: string;
  questionBody: string;
  solutionBody: string;
  textSolution: string;
  initialCode?: string;
  codeSolution: string;
  title: string;
  variant: "code" | "text";
  subject: string;
};

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
