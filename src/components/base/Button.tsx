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
      className={`${className} mx-auto shadow focus:shadow-outline focus:outline-none text-white text-md py-3 rounded `}
    >
      {text}
    </button>
  );
};
export default Button;
