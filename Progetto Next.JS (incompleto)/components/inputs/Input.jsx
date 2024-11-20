"use client";

const Input = ({
  id,
  label,
  type,
  disabled,
  formatPrice,
  required,
  register,
  errors,
}) => {
  return (
    <div className="relative w-full">
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
        type={type}
        className={`peer w-full rounded-lg border-2 bg-white p-3 pt-6 outline-none transition focus:border-blue-150 disabled:cursor-not-allowed disabled:opacity-70 ${
          errors[id] ? "border-red-600 focus:border-red-600" : ""
        } ${formatPrice ? "pl-9" : "pl-4"} ${type === "password" ? "font-black" : ""}`}
      />
      <label
        className={`absolute top-1 z-10 origin-[0] text-blue-150 duration-150 ${
          formatPrice ? "left-9" : "left-4"
        } text-md ${
          errors[id] ? "text-red-600" : ""
        } peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-1 peer-focus:scale-75`}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
