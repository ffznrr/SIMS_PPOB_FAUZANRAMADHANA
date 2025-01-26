import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const InputField = ({
  type = "text",
  setData,
  placeholder,
  icon: Icon,
  inputValue,
  value,
  onClick,
  disabled = false,
  isPasswordField = false,
}) => (
  <div className="relative mb-7">
    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
      <Icon className="text-gray-400" />
    </div>
    {isPasswordField && (
      <div
        className="absolute inset-y-0 end-3 flex items-center ps-3.5 pointer-events-auto"
        onClick={onClick}
      >
        {value ? (
          <FaRegEye className="text-gray-400 w-5 h-5" />
        ) : (
          <FaRegEyeSlash className="text-gray-400 w-5 h-5" />
        )}
      </div>
    )}
    <input
      disabled={disabled}
      type={type}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder={placeholder}
      value={inputValue}
      onChange={(e) => setData(e.target.value)}
    />
  </div>
);

export default InputField;
