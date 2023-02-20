import Button from "./base/Button";

const CodeOutput = ({
  handleCompile,
  output,
}: {
  handleCompile: Function;
  output: Function;
}) => {
  return (
    <div className="w-1/5 bg-blue">
      <div className="overflow-scroll">{output()}</div>
      <Button
        text="Compile and run"
        onClick={() => handleCompile()}
        className="bg-blue-500 p-5 flex mt-4"
      />
    </div>
  );
};

export default CodeOutput;
