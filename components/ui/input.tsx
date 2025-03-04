import { UseFormRegister } from "react-hook-form";

interface InputProps {
    label?: string;
    name: string;
    placeholder?: string;
    type: string;
    errorMessage?: string;
    register: UseFormRegister<any>;
    required?: boolean;
    value?: string;
  }
  
  const Input = ({ label, type, placeholder, value, required, errorMessage, register, name }: InputProps) => {
    return (
      <div className="flex flex-col gap-2">
        {label && <label className="font-medium">{label}</label>}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          required={required}
          {...register(name, { value })}
          className={`border rounded-md p-2 ${errorMessage ? "border-red-500" : "border-gray-300"}`}
        />
        {errorMessage && <span className="text-red-500 text-sm">{errorMessage}</span>}
      </div>
    );
  };
  
  export default Input;
  