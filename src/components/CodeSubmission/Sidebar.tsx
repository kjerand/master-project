import CodeOutput from "./CodeOutput";
import EvaluationOutput from "./EvaluationOutput";
import CompileButton from "./CompileButton";

const Sidebar = ({
  handleCompile,
  handleSubmit,
  evaluation,
  output,
  processing,
  processingSubmit,
  nextStage,
  loading,
}: {
  handleCompile: Function;
  handleSubmit: Function;
  evaluation: number;
  output: Function;
  processing: boolean;
  processingSubmit: boolean;
  nextStage: Function;
  loading: boolean;
}) => {
  return (
    <div className="w-2/5 flex-row flex flex-col ml-2">
      <CodeOutput output={output} />
      <EvaluationOutput evaluation={evaluation} loading={loading} />
      <CompileButton
        handleSubmit={handleSubmit}
        handleCompile={handleCompile}
        processing={processing}
        processingSubmit={processingSubmit}
        evaluation={evaluation}
        nextStage={nextStage}
        loading={loading}
      />
    </div>
  );
};

export default Sidebar;
