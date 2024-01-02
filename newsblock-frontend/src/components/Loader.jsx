import { RotatingLines } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="loader-container flex justify-center items-center p-7">
      <RotatingLines
        visible={true}
        height="80"
        width="80"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
      />
    </div>
  );
};

export default Loader;
