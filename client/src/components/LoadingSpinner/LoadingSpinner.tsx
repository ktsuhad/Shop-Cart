import { ColorRing } from "react-loader-spinner";

const LoadingSpinner = () => {
  return (
    <div className="flex  justify-center items-center h-screen">
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={["#", "#f47e60", "#fe15b648b26a", "#abbd81", "#849b87"]}
      />
    </div>
  );
};

export default LoadingSpinner;
