"use client";
export default function InputComponent({
  label,
  placeholder,
  onChange,
  value,
  type,
}) {
  return (
    <div className="relative">
      <p className="pt-0 pr-2 absolute pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 bg-white text-xs sm:text-sm md:text-base ">
        {label}
      </p>
      <input
        placeholder={placeholder}
        type={type || "text"}
        value={value}
        onChange={onChange}
        className="border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-2 sm:pt-3 md:pt-4  pr-4 pb-2 sm:pb-3 md:pb-4  pl-4 sm:pl-5 md:pl-6   mr-0 mt-0 ml-0 text-xs sm:text-sm md:text-base  block bg-white border-gray-300 rounded-md"
      />
    </div>
  );
}
