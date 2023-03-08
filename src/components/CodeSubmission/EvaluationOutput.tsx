const EvaluationOutput = ({ evaluation }: { evaluation: number }) => {
  const getEvaluation = () => {
    switch (evaluation) {
      case 0: {
        return <></>;
      }
      case 1: {
        return (
          <p className="px-2 py-1 font-normal text-lg font-mono text-green-700">
            Correct answer!
          </p>
        );
      }
      case 2: {
        return (
          <p className="px-2 py-1 font-normal text-lg font-mono text-red-500">
            Wrong answer!
          </p>
        );
      }
      case 3: {
        return (
          <p className="px-2 py-1 font-normal text-md font-mono text-red-500">
            You can't just print the solution!
          </p>
        );
      }
    }
  };
  return <div className="flex mx-auto mt-2">{getEvaluation()}</div>;
};

export default EvaluationOutput;
