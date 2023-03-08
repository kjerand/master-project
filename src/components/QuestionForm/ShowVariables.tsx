import Header from "../base/Header";
const ColRow = ({
  name,
  type,
  value,
  remove,
}: {
  name: string;
  type: string;
  value: string;
  remove: Function;
}) => {
  return (
    <>
      <p className="col-span-2 font-normal text-md text-gray-700 m-auto font-mono">
        {name}
      </p>
      <p className="col-span-2 font-normal text-md text-gray-700 m-auto font-mono">
        {type}
      </p>
      <p className="col-span-5 font-normal text-md text-gray-700 m-auto font-mono">
        {value}{" "}
      </p>
      <p
        className="col-span-1 font-normal text-sm text-gray-700 m-auto cursor-pointer font-mono"
        onClick={() => remove(name)}
      >
        Remove
      </p>
    </>
  );
};

const ShowVariables = ({
  variables,
  setVariables,
}: {
  variables: Variable[];
  setVariables: Function;
}) => {
  const remove = (name: string) =>
    setVariables(variables.filter((v) => v.name !== name));

  return variables.length > 0 ? (
    <div className="grid w-full grid-cols-10 gap-4 my-5 m-auto bg-gray-100 rounded-md p-3">
      <Header title="Name" size="sm" className="col-span-2" />
      <Header title="Type" size="sm" className="col-span-2" />
      <Header title="Values" size="sm" className="col-span-5" />
      <div className="col-span-1"></div>
      {variables &&
        variables.map((variable) => {
          if (variable.type === "str") {
            const data = variable.data as StringVariable;

            let output = "";
            for (let option of data.options) output += "'" + option + "', ";
            if (data.options.length > 0)
              output = output.substring(0, output.length - 2);
            return (
              <ColRow
                key={variable.name}
                name={variable.name}
                type="String"
                value={output}
                remove={remove}
              />
            );
          } else if (variable.type === "int") {
            const data = variable.data as IntegerVariable;

            return (
              <ColRow
                key={variable.name}
                name={variable.name}
                type="Integer"
                value={`[${data.min}, ${data.max}]`}
                remove={remove}
              />
            );
          } else if (variable.type === "dec") {
            const data = variable.data as DecimalVariable;
            return (
              <ColRow
                key={variable.name}
                name={variable.name}
                type="Decimal"
                value={`[${data.min}, ${data.max}]`}
                remove={remove}
              />
            );
          } else if (variable.type === "int[]") {
            const data = variable.data as IntegerListVariable;

            return (
              <ColRow
                key={variable.name}
                name={variable.name}
                type="Integer[]"
                value={`[${data.min}, ${data.max}] x ${data.size}`}
                remove={remove}
              />
            );
          }
          return <></>;
        })}
    </div>
  ) : (
    <></>
  );
};

export default ShowVariables;
