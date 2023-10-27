"use client";

import InputComponent from "@/components/FormElements/InputComponent";
import { GlobalContext } from "@/context";
import { login } from "@/services/login";
import { loginFormControls } from "@/utils";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
const initialFormdata = {
  email: "",
  password: "",
};

export default function Login() {
  const [formData, setFormData] = useState(initialFormdata);
  const {
    isAuthUser,
    setIsAuthUser,
    user,
    setUser,
    componentLevelLoader,
    setComponentLevelLoader,
  } = useContext(GlobalContext);
  const router = useRouter();

  const isFormValid = () => {
    return formData &&
      formData.email.trim() !== "" &&
      formData.password &&
      formData.password.trim() !== ""
      ? true
      : false;
  };
  async function handleLogin() {
    const res = await login(formData);
    // console.log(res);
    if (res.success) {
      setIsAuthUser(true);
      setUser(res?.finalData.user);
      setFormData(initialFormdata);
      Cookies.set("token", res?.finalData.Cookies);
      localStorage.setItem("user", JSON.stringify(res?.finalData.user));
    } else {
      setIsAuthUser(false);
    }
    console.log(isAuthUser, user);
  }

  useEffect(() => {
    if (isAuthUser) router.push("/");
  }, [isAuthUser]);
  // console.log(formData);
  return (
    <div className="bg-white relative">
      <div className="flex flex-col items-center justify-between pt-8 pr-4 pb-8 pl-4 lg:pt-12 lg:pr-10 lg:pb-12 lg:pl-10 xl:pl-5 xl:pr-5">
        <div className="flex flex-col justify-center items-center w-full lg:flex-row">
          <div className="w-full mt-10 mb-10 max-w-2xl lg:w-5/12">
            <div className="w-full sm:w-11/12 md:w-10/12 lg:w-9/12 xl:w-8/12 2xl:w-/12 pt-10 px-6 pb-10 bg-white shadow-lg hover:shadow-2xl hover:duration-300 rounded-xl relative z-10">
              <p className="w-full text-xl md:text-2xl lg:text-3xl font-medium text-center font-serif mb-4">
                Login Here!
              </p>
              <div className="w-full mt-6 space-y-4 sm:space-y-6">
                {loginFormControls.map((controlItem) =>
                  controlItem.componentType === "input" ? (
                    <InputComponent
                      key={controlItem.id}
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
                  ) : null
                )}
                <div className="flex justify-center flex-col">
                  <button
                    type="button"
                    className="w-full sm:w-auto px-6 py-2 bg-gray-950 rounded-md text-white outline-none shadow-lg transform active:scale-x-105 transition-transform"
                    disabled={!isFormValid()}
                    onClick={handleLogin}
                  >
                    <span className="text-lg">LogIn</span>
                  </button>
                </div>
                <div className="flex justify-center flex-col">
                  <p className="">New to Website ?</p>
                  <button
                    type="button"
                    className="w-full sm:w-auto px-6 py-2 bg-gray-950 rounded-md text-white outline-none shadow-lg transform active:scale-x-105 transition-transform"
                    onClick={() => router.push("/register")}
                  >
                    <span className="text-lg">Register</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
