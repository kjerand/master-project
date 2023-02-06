const Header = ({ title, size }: { title: string; size: string }) => {
  return (
    <h3
      className={`font-medium leading-tight text-${size} mt-0 mb-2 text-gray-700 text-center`}
    >
      {title}
    </h3>
  );
};

export default Header;
