const Container = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  return <div className="flex justify-center">{children}</div>;
};

export default Container;
