const Button = ({
  text,
  onClick,
  className,
}: {
  text: string;
  onClick: Function;
  className?: string;
}) => {
  return (
    <button
      onClick={() => onClick()}
      className={`mx-auto shadow hover:bg-gray-600 focus:shadow-outline focus:outline-none text-white text-md py-3 px-10 rounded ${className}`}
    >
      {text}
    </button>
  );
};
export default Button;
