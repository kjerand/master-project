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
      <div className={size}>
        <h3
          className={`leading-tight mt-0 mb-2 text-gray-700 text-center font-mono`}
        >
          {title}
        </h3>
      </div>
    </div>
  );
};

export default Header;
