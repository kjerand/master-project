const Header = ({
  title,
  size,
  className = "",
}: {
  title: string;
  size: string;
  className?: string;
}) => {
  return (
    <div className={className}>
      <h3
        className={`font-medium leading-tight text-${size} mt-0 mb-2 text-gray-700 text-center font-mono`}
      >
        {title}
      </h3>
    </div>
  );
};

export default Header;
