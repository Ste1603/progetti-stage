"use client";
const Button = ({ label, onClick, disabled, small, icon:Icon }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative w-full flex items-center justify-center gap-2 py-1 disabled:opacity-70 disabled:cursor-not-allowed rounded-lg bg-orange border ${
        small ? "bg-white border border-blue-150" : "glass"
      }`}
    >
      {Icon && <Icon className="h-full w-auto" />}
      {label}
    </button>
  );
};

export default Button;
