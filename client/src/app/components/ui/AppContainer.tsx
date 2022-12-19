type Props = { children: JSX.Element | JSX.Element[] | string };

const AppContainer = ({ children }: Props) => {
  return (
    <div className="p-3 mx-auto bg-slate-200 rounded-md shadow-lg flex items-center space-x-4 backdrop-filter backdrop-blur-md bg-opacity-20 h-5/6 w-5/6">
      {children}
    </div>
  );
};

export default AppContainer;
