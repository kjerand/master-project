import CodeOutput from "./CodeOutput";
import CompileButton from "./CompileButton";

const Sidebar = ({
  handleCompile,
  output,
  processing,
}: {
  handleCompile: Function;
  output: Function;
  processing: boolean;
}) => {
  return (
    <div className="w-1/5 flex-row flex flex-col mx-2">
      <CodeOutput output={output} />
      <CompileButton handleCompile={handleCompile} processing={processing} />
    </div>
  );
};

export default Sidebar;
