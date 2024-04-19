"use client";
type InputFieldProps = {
  value: string;
  label?: string;
  handleChange: any;
  name: string;
  type?: string;
  placeholder?: string
};

const InputField = ({ value, handleChange, label ,name , type = "text" , placeholder}: InputFieldProps) => {

  return (
    <div className="mb-4">
      <label
        htmlFor={label}
        className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        placeholder={placeholder}
        type={type}
        id={label}
        name={name}
        value={value}
        onChange={handleChange}
        className="block w-full outline-none rounded-md border-gray-300 shadow-sm  h-[35px] p-2 mt-3"
      />
    </div>
  );
};
export default InputField;
