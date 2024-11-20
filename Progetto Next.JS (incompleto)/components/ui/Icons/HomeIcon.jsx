// BottleIcon.js
import { RiHome4Line } from "react-icons/ri";
import { RiHome4Fill } from "react-icons/ri";

const HomeIcon = ({ filled }) => {
  return filled ? (
    <RiHome4Fill className="h-full w-full" />
  ) : (
    <RiHome4Line className="h-full w-full" />
  );
};

export default HomeIcon;

/*

<svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="rgba(255,255,255,1)"
    >
      <path d="M20 20C20 20.5523 19.5523 21 19 21H5C4.44772 21 4 20.5523 4 20V11L1 11L11.3273 1.6115C11.7087 1.26475 12.2913 1.26475 12.6727 1.6115L23 11L20 11V20ZM11 13V19H13V13H11Z"></path>
    </svg>




<svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="rgba(255,255,255,1)"
    >
      <path d="M19 21H5C4.44772 21 4 20.5523 4 20V11L1 11L11.3273 1.6115C11.7087 1.26475 12.2913 1.26475 12.6727 1.6115L23 11L20 11V20C20 20.5523 19.5523 21 19 21ZM13 19H18V9.15745L12 3.7029L6 9.15745V19H11V13H13V19Z"></path>
    </svg>*/
