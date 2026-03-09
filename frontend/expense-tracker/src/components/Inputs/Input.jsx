import { useState } from "react";

const Input = ({ type, value, placeholder, onChange, label }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <label className="text-[13px] text-slate-800">{label}</label>
      <div className="input-box">
        <input
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          onChange={(e) => onChange(e)}
          className="w-full bg-transparent outline-none"
          placeholder={placeholder}
          value={value}
        />
        {type === "password" && (
          <>
            {showPassword ? (
              <i class="fa-solid fa-eye" onClick={() => toggleShowPassword}></i>
            ) : (
              <i
                class="fa-solid fa-eye-slash"
                onClick={() => toggleShowPassword}
              ></i>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Input;
