// components/LoadingSpinner.js
import "@styles/LoaderStyle.css";

const LoadingSpinner = () => {
  return (
    <div className="h-screen w-screen  grid place-items-center absolute top-0 z-50">
      <div className="relative dot-spinner">
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
