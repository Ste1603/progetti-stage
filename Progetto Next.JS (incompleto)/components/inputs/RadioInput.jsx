import React from "react";
import "@styles/RadioStyle.css";
const RadioInput = ({ id, label, disabled, register, errors }) => (
  <div className="flex gap-2 items-center">
    <input
      type="radio"
      value={id}
      id={id}
      {...register("userType")}
      className="w-5 h-5 bg-blue-150"

    />
    <label htmlFor={id}>
      {label}
    </label>  
  </div>
);

export default RadioInput;
