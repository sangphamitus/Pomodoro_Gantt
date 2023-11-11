const LoadingPage = () => {
  const circleCommonClasses = 'h-2.5 w-2.5 bg-primary color-primary rounded-full';

  return (
    <div className="absolute bg-primaryBg top-0 left-0 h-screen w-screen items-center flex justify-center ">
      <div className="flex">
        <div className={`${circleCommonClasses} mr-1 animate-bounce`}></div>
        <div className={`${circleCommonClasses} mr-1 animate-bounce200`}></div>
        <div className={`${circleCommonClasses} animate-bounce400`}></div>
      </div>
    </div>
  );
};

export default LoadingPage;
