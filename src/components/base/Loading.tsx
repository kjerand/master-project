import FadeLoader from "react-spinners/FadeLoader";
import Header from "./Header";

const Loading = () => {
  return (
    <div>
      <div className="flex justify-center mt-10">
        <FadeLoader className="" />
      </div>
      <Header title="Loading..." size="lg" className="my-10" />
    </div>
  );
};

export default Loading;
