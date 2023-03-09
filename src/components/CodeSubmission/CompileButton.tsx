import Button from "../base/Button";

const CompileButton = ({
  handleCompile,
  handleSubmit,
  processing,
  processingSubmit,
  evaluation,
  nextStage,
  loading,
}: {
  handleCompile: Function;
  handleSubmit: Function;
  processing: boolean;
  processingSubmit: boolean;
  evaluation: number;
  nextStage: Function;
  loading: boolean;
}) => {
  return (
    <div className="mt-auto flex flex-col">
      <Button
        text={processing ? "Running..." : "Compile and run"}
        onClick={handleCompile}
        className={`${
          processing || loading
            ? "bg-gray-400"
            : "bg-blue-600 hover:bg-blue-500"
        } w-full mb-2`}
        disabled={loading}
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
          processingSubmit || loading
            ? "bg-gray-600 "
            : evaluation === 1
            ? "bg-green-600 hover:bg-green-500"
            : "bg-yellow-600 hover:bg-yellow-500"
        } w-full `}
        disabled={loading}
      />
    </div>
  );
};

export default CompileButton;
