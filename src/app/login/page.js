"use client";

import InputComponent from "@/components/FormElements/InputComponent";
import ComponentLevelLoader from "@/components/Loader/componentlevel";
import Notification from "@/components/Notification";
import { GlobalContext } from "@/context";
import { login } from "@/services/login";
import { loginFormControls } from "@/utils";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

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

  // console.log(formData);

  function isValidForm() {
    return formData &&
      formData.email &&
      formData.email.trim() !== "" &&
      formData.password &&
      formData.password.trim() !== ""
      ? true
      : false;
  }

  async function handleLogin() {
    setComponentLevelLoader({ loading: true, id: "" });
    const res = await login(formData);

    // console.log(res);

    if (res.success) {
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsAuthUser(true);
      setUser(res?.finalData?.user);
      setFormData(initialFormdata);
      Cookies.set("token", res?.finalData?.token);
      localStorage.setItem("user", JSON.stringify(res?.finalData?.user));
      setComponentLevelLoader({ loading: false, id: "" });
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsAuthUser(false);
      setComponentLevelLoader({ loading: false, id: "" });
    }
  }

  // console.log(isAuthUser, user);

  useEffect(() => {
    if (isAuthUser) router.push("/");
  }, [isAuthUser]);

  return (
    <div className="bg-white relative">
      <div className="flex flex-col items-center justify-between pt-8 pr-4 pb-8 pl-4 lg:pt-12 lg:pr-10 lg:pb-12 lg:pl-10 xl:pl-5 xl:pr-5">
        <div className="flex flex-col justify-center items-center w-full lg:flex-row">
          <div className="w-full mt-10 mb-10 max-w-2xl lg:w-5/12">
            <div className="w-full sm:11-/12 md:w-8/12 lg:w-8/12 xl:w-9/12 2xl:w-11/12 pt-10 px-6 pb-10 bg-white shadow-lg hover:shadow-2xl hover:duration-300 rounded-xl relative z-10">
              <p className="w-full text-xl md:text-2xl lg:text-3xl font-medium text-center font-serif mb-4">
                Login Here !
              </p>
              <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-6 flex justify-center flex-col">
                {loginFormControls.map((controlItem) =>
                  controlItem.componentType === "input" ? (
                    <InputComponent
                      type={controlItem.type}
                      placeholder={controlItem.placeholder}
                      label={controlItem.label}
                      value={formData[controlItem.id]}
                      onChange={(event) => {
                        setFormData({
                          ...formData,
                          [controlItem.id]: event.target.value,
                        });
                      }}
                    />
                  ) : null
                )}
                <div className="flex flex-col justify-center">
                  <button
                    className="w-full sm:w-auto px-6 py-2 bg-gray-950 rounded-md text-white outline-none shadow-lg transform active:scale-x-105 transition-transform "
                    disabled={!isValidForm()}
                    onClick={handleLogin}
                  >
                    {componentLevelLoader && componentLevelLoader.loading ? (
                      <ComponentLevelLoader
                        text={"Logging In"}
                        color={"#ffffff"}
                        loading={
                          componentLevelLoader && componentLevelLoader.loading
                        }
                      />
                    ) : (
                      <span className="text-lg">LogIn</span>
                    )}
                  </button>
                </div>
                <div className="flex justify-center flex-col">
                  <p>New to website ?</p>
                  <button
                    className="w-full sm:w-auto px-6 py-2 bg-gray-950 rounded-md text-white outline-none shadow-lg transform active:scale-x-105 transition-transform"
                    onClick={() => router.push("/register")}
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Notification />
    </div>
  );
}
