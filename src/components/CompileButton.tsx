import Button from "./base/Button";

const CompileButton = ({
  handleCompile,
  handleSubmit,
  processing,
  processingSubmit,
  evaluation,
  nextStage,
}: {
  handleCompile: Function;
  handleSubmit: Function;
  processing: boolean;
  processingSubmit: boolean;
  evaluation: number;
  nextStage: Function;
}) => {
  return (
    <div className="mt-auto flex flex-col">
      <Button
        text={processing ? "Running..." : "Compile and run"}
        onClick={handleCompile}
        className={`${processing ? "bg-gray-600" : "bg-blue-600"} w-full mb-2`}
      />
      <Button
        text={
          processingSubmit
            ? "Submitting..."
            : evaluation === 1
            ? "Next stage"
            : "Submit"
        }
        onClick={() => {
          if (evaluation !== 1) handleSubmit();
          else nextStage();
        }}
        className={`${
          processingSubmit
            ? "bg-gray-600"
            : evaluation === 1
            ? "bg-green-600"
            : "bg-yellow-600"
        } w-full `}
      />
    </div>
  );
};

export default CompileButton;
