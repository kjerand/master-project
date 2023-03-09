const Button = ({
  text,
  onClick,
  className,
  disabled = false,
}: {
  text: string;
  onClick: Function;
  className?: string;
  disabled?: boolean;
}) => {
  return (
    <button
      onClick={() => onClick()}
      className={`${className} mx-auto shadow focus:shadow-outline focus:outline-none text-white text-md py-3 rounded font-mono`}
      disabled={disabled}
    >
      {text}
    </button>
  );
};
export default Button;
