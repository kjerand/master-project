import Header from "./base/Header";

const CodeOutput = ({ output }: { output: Function }) => {
  return (
    <div className="h-1/2 bg-gray-100 p-3 rounded-md">
      <Header title="Output" size="lg" />
      {output()}
    </div>
  );
};

export default CodeOutput;
