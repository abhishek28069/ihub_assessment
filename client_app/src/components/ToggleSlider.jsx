import React from "react";

export const ToggleSlider = ({ children, isChecked, handleToggle }) => {
  return (
    <label htmlFor="toggle" className="flex items-center cursor-pointer">
      <div className="relative">
        <input id="toggle" type="checkbox" className="hidden" checked={isChecked} onChange={handleToggle} />
        <div className="w-10 h-5 p-1 bg-gray-300 rounded-full shadow-inner "></div>
        <div
          className={` absolute w-4 h-4 rounded-full shadow inset-y-0 top-[2px] ${isChecked ? "right-[2px] bg-zinc-700" : "left-[2px] bg-zinc-400"}`}
        ></div>
      </div>
      <div className="ml-3 text-[#8c8c8c] font-medium">{children}</div>
    </label>
  );
};
