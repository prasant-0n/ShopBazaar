"use client";

import InputComponent from "@/components/FormElements/InputComponent";
import SelectComponent from "@/components/FormElements/SelectComponent";
import { registerNewUser } from "@/services/register";
import { registrationFormControls } from "@/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

const initialFormData = {
  name: "",
  email: "",
  password: "",
  role: "customer",
};
export default function Register() {
  const [formData, setFormData] = useState(initialFormData);
  const [isRegistered, setIsRegistered] = useState(false);

  function handleSubmit() {}
  function isFormValid() {
    return formData &&
      formData.name &&
      formData.name.trim() !== "" &&
      formData.email &&
      formData.email.trim() !== "" &&
      formData.password &&
      formData.password.trim() !== ""
      ? true
      : false;
  }

  const handleRegisterOnSubmit = async () => {
    const data = await registerNewUser(formData);
    console.log(data);
  };

  const router = useRouter();
  return (
    <div className="bg-white relative">
      <div className="flex flex-col items-center justify-between pt-8 pr-4 pb-8 pl-4 lg:pt-12 lg:pr-10 lg:pb-12 lg:pl-10 xl:pl-5 xl:pr-5">
        <div className="flex flex-col justify-center items-center w-full lg:flex-row">
          <div className="w-full mt-10 mb-10 max-w-2xl lg:w-5/12">
            <div className="w-full sm:w-11/12 md:w-10/12 lg:w-9/12 xl:w-8/12 2xl:w-/12 pt-10 px-6 pb-10 bg-white shadow-lg hover:shadow-2xl hover:duration-300 rounded-xl relative z-10">
              <p className="w-full text-xl md:text-2xl lg:text-3xl font-medium text-center font-serif mb-4">
                {isRegistered
                  ? "Registration Successful!"
                  : "Sign up for an account"}
              </p>
              {isRegistered ? (
                <button
                  type="button"
                  className="w-full sm:w-auto px-4 py-3 bg-gray-950 rounded-md text-white outline-none shadow-lg transform active:scale-x-30 transition-transform"
                >
                  <span class="">Login</span>
                </button>
              ) : (
                <div className="w-full mt-6 space-y-4 sm:space-y-6 md:space-y-6">
                  {registrationFormControls.map((controlItem) =>
                    controlItem.componentType === "input" ? (
                      <InputComponent
                        type={controlItem.type}
                        placeholder={controlItem.placeholder}
                        label={controlItem.label}
                        onChange={(event) => {
                          setFormData({
                            ...formData,
                            [controlItem.id]: event.target.value,
                          });
                        }}
                        value={formData[controlItem.id]}
                      />
                    ) : controlItem.componentType === "select" ? (
                      <SelectComponent
                        options={controlItem.options}
                        label={controlItem.label}
                        onChange={(event) => {
                          setFormData({
                            ...formData,
                            [controlItem.id]: event.target.value,
                          });
                        }}
                        value={formData[controlItem.id]}
                      />
                    ) : null
                  )}
                  <div className="flex justify-center flex-col">
                    <button
                      type="button"
                      className="w-full sm:w-auto px-6 py-2 bg-gray-950 rounded-md text-white outline-none shadow-lg transform active:scale-x-105 transition-transform"
                      disabled={!isFormValid()}
                      onClick={handleRegisterOnSubmit}
                    >
                      <span className="text-lg">Register</span>
                    </button>

                    <div className="flex justify-center flex-col mt-4">
                      Heaving an Account ?
                      <button
                        type="button"
                        className=" disabled:opacity-50 w-full sm:w-auto px-6 py-2 bg-gray-950 rounded-md text-white outline-none shadow-lg transform active:scale-x-105 transition-transform"
                        onClick={() => router.push("/login")}
                      >
                        <span className="text-lg">Login</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
