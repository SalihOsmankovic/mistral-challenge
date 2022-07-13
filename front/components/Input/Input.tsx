import { FunctionComponent, useId } from "react";
import { InputProps } from "./types";

const Input: FunctionComponent<InputProps> = ({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  error,
}) => {
  const id = useId();

  return (
    <div>
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        className={`bg-gray-50 border ${
          error
            ? "border-red-400 focus:ring-red-500 focus:border-red-500"
            : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        } text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5`}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
