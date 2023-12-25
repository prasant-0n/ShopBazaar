"use client";

import InputComponent from "@/components/FormElements/InputComponent";
import SelectComponent from "@/components/FormElements/SelectComponent";
import ComponentLevelLoader from "@/components/Loader/componentlevel";
import Notification from "@/components/Notification";
import { GlobalContext } from "@/context";
import { registerNewUser } from "@/services/register";
import { registrationFormControls } from "@/utils";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const initialFormData = {
  name: "",
  email: "",
  password: "",
  role: "customer",
};

export default function Register() {
  const [formData, setFormData] = useState(initialFormData);
  const [isRegistered, setIsRegistered] = useState(false);
  const { pageLevelLoader, setPageLevelLoader, isAuthUser } =
    useContext(GlobalContext);

  const router = useRouter();

  console.log(formData);

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

  console.log(isFormValid());

  async function handleRegisterOnSubmit() {
    setPageLevelLoader(true);
    const data = await registerNewUser(formData);

    if (data.success) {
      toast.success(data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsRegistered(true);
      setPageLevelLoader(false);
      setFormData(initialFormData);
    } else {
      toast.error(data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setPageLevelLoader(false);
      setFormData(initialFormData);
    }

    console.log(data);
  }

  useEffect(() => {
    if (isAuthUser) router.push("/");
  }, [isAuthUser]);

  return (
    <div className="bg-white relative">
      <div className="flex flex-col items-center justify-between pt-8 pr-4 pb-8 pl-4 lg:pt-12 lg:pr-10 lg:pb-12 lg:pl-10 xl:pl-5 xl:pr-5">
        <div className="flex flex-col justify-center items-center w-full lg:flex-row">
          <div className="w-full mt-10 mb-10 max-w-2xl lg:w-5/12">
            <div className="w-full sm:11-/12 md:w-8/12 lg:w-8/12 xl:w-9/12 2xl:w-11/12 pt-10 px-6 pb-10 bg-white shadow-lg hover:shadow-2xl hover:duration-300 rounded-xl relative z-10 flex flex-col justify-center">
              <p className="w-full text-xl md:text-2xl lg:text-3xl font-medium text-center font-serif mb-4">
                {isRegistered
                  ? "Registration Successfull !"
                  : "Sign up for an account"}
              </p>
              {isRegistered ? (
                <button
                  className="w-full sm:w-auto px-6 py-2 bg-gray-950 rounded-md text-white outline-none shadow-lg transform active:scale-x-105 transition-transform"
                  onClick={() => router.push("/login")}
                >
                  Login
                </button>
              ) : (
                <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-6 flex flex-col justify-center">
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
                  <div className="flex flex-col justify-center">
                    <button
                      className="w-full sm:w-auto px-6 py-2 bg-gray-950 rounded-md text-white outline-none shadow-lg transform active:scale-x-105 transition-transform "
                      disabled={!isFormValid()}
                      onClick={handleRegisterOnSubmit}
                    >
                      {pageLevelLoader ? (
                        <ComponentLevelLoader
                          text={"Logging In"}
                          color={"#ffffff"}
                          loading={pageLevelLoader}
                        />
                      ) : (
                        <span className="text-lg">LogIn</span>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Notification />
    </div>
  );
}
