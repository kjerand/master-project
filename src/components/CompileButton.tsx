import Button from "./base/Button";

const CompileButton = ({
  handleCompile,
  processing,
}: {
  handleCompile: Function;

  processing: boolean;
}) => {
  return (
    <div className="mt-auto flex flex-col">
      <Button
        text={processing ? "Running..." : "Compile and run"}
        onClick={() => handleCompile()}
        className={`${processing ? "bg-gray-600" : "bg-blue-500"} w-full mb-2`}
      />
      <Button
        text={"Submit"}
        onClick={() => handleCompile()}
        className={`bg-green-500 w-full `}
      />
    </div>
  );
};

export default CompileButton;
