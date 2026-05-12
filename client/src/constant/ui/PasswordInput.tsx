import { useState } from "react";
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";


interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const PasswordInput = ({ label, className = "", ...props }: Props) => {
  const [show, setShow] = useState(false);

  return (
    <div className="flex flex-col mb-4">
      <label className="text-xs uppercase text-gray-400">{label}</label>

      <div className="relative">
        <input
          {...props}
          type={show ? "text" : "password"}
          className={`w-full mt-2 px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:ring-2 focus:ring-cyan-400 outline-none ${className}`}
        />

        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute items-center right-3 top-1/2 -translate-y-1/4 text-gray-200 hover:text-gray-500 transition"
        >
          {show ? <IoIosEye  size={18} /> :  <IoIosEyeOff size={18} />}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;