// BottleIcon.js
import { RiAccountCircleLine } from "react-icons/ri";
import { RiAccountCircleFill } from "react-icons/ri";

const UserIcon = ({ filled }) => {
  return filled ? (
    <RiAccountCircleFill className="h-full w-full" />
  ) : (
    <RiAccountCircleLine className="h-full w-full" />
  );
};

export default UserIcon;


/*
 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%" fill="#ffffff">
    <circle cx="12" cy="12" r="10" fill="#ffffff" stroke="rgba(64, 93, 114, 1)" stroke-width="1.5" />
    <path d="M7.5 17C9.8317 14.5578 14.1432 14.4428 16.5 17M14.4951 9.5C14.4951 10.8807 13.3742 12 11.9915 12C10.6089 12 9.48797 10.8807 9.48797 9.5C9.48797 8.11929 10.6089 7 11.9915 7C13.3742 7 14.4951 8.11929 14.4951 9.5Z" fill="#ffffff" stroke="rgba(64, 93, 114, 1)" stroke-width="1.5" stroke-linecap="round" />
</svg>



<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%" color="#ffffff" fill="none">
    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" />
    <path d="M7.5 17C9.8317 14.5578 14.1432 14.4428 16.5 17M14.4951 9.5C14.4951 10.8807 13.3742 12 11.9915 12C10.6089 12 9.48797 10.8807 9.48797 9.5C9.48797 8.11929 10.6089 7 11.9915 7C13.3742 7 14.4951 8.11929 14.4951 9.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
</svg>*/
