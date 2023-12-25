"use client";
import React, { Fragment, useContext, useEffect } from "react";
import logo from "../../utils/logo1.jpg";
import Image from "next/image";
import profile from "../../utils/profile.png";
import Cart from "../../utils/bag.png";
import wishlist from "../../utils/wishlist.png";
import { adminNavOptions, navOptions } from "@/utils";
import { usePathname, useRouter } from "next/navigation";
import { GlobalContext } from "@/context";
import CommonModal from "../CommonModel";
import Cookies from "js-cookie";
import CartModal from "../CartModal";

function NavItems({ isModalView = false, isAdminView, router }) {
  return (
    <div
      className={`items-center justify-between w-full md:flex md:w-auto ${
        isModalView ? "" : "hidden"
      }`}
      id="nav-items"
    >
      <ul
        className={`flex flex-col p-4 md:p-0 mt-4 font-medium  rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-white ${
          isModalView ? "border-none" : "border border-gray-100"
        }`}
      >
        {isAdminView
          ? adminNavOptions.map((item) => (
              <li
                className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0 transform active:scale-x-105 transition-transform"
                key={item.id}
                onClick={() => router.push(item.path)}
              >
                {item.label}
              </li>
            ))
          : navOptions.map((item) => (
              <li
                className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0 transform active:scale-x-105 transition-transform"
                key={item.id}
                onClick={() => router.push(item.path)}
              >
                {item.label}
              </li>
            ))}
      </ul>
    </div>
  );
}

export default function Navbar() {
  // const { showNavmodal, setShowNavModal } = useContext(GlobalContext);
  const {
    user,
    isAuthUser,
    setIsAuthUser,
    setUser,
    showNavmodal,
    setShowNavModal,
    currentUpdatedProduct,
    setCurrentUpdatedProduct,
    showCartModal,
    setShowCartModal,
  } = useContext(GlobalContext);
  // console.log(currentUpdatedProduct);
  const pathName = usePathname();
  // console.log(pathName);

  useEffect(() => {
    if (
      pathName !== "/admin-view/add-product" &&
      currentUpdatedProduct !== null
    )
      setCurrentUpdatedProduct(null);
  }, [pathName]);
  const router = useRouter();
  function handleLogout() {
    setIsAuthUser(false);
    setUser(null);
    Cookies.remove("token");
    localStorage.clear();
    router.push("/");
  }
  const isAdminView = pathName.includes("admin-view");

  // console.log(isAdminView);
  return (
    <>
      <nav className="bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flex items-center cursor-pointer ">
            <span className="w-20 sm:w-24 md:w-32 lg:w-48 xl:w-56 slef-center transform active:scale-x-105 transition-transform">
              <Image src={logo} alt="logo" />
            </span>
          </div>
          <div className="flex md:order-2 gap-2">
            {!isAdminView && isAuthUser ? (
              <Fragment>
                <button
                  className={
                    "self-center text-sm sm:text-xs font-semibold whitespace-nowrap border border-black rounded px-2 py-1 transform active:scale-x-105 transition-transform"
                  }
                  onClick={() => router.push("/account")}
                >
                  Account
                </button>
                <button
                  className={
                    "self-center text-sm font-semibold whitespace-nowrap border border-black rounded px-2 py-1 transform active:scale-x-105 transition-transform"
                  }
                  onClick={() => setShowCartModal(true)}
                >
                  Cart
                </button>
              </Fragment>
            ) : null}
            {user?.role === "admin" && (
              <button
                className="self-center text-sm font-semibold whitespace-nowrap border border-black rounded px-2 py-1 transform active:scale-x-105 transition-transform"
                onClick={() => router.push(isAdminView ? "/" : "/admin-view")}
              >
                {isAdminView ? "Client View" : "Admin View"}
              </button>
            )}
            {isAuthUser ? (
              <button
                onClick={handleLogout}
                className={
                  "self-center text-sm font-semibold whitespace-nowrap border border-black rounded px-2 py-1 transform active:scale-x-105 transition-transform"
                }
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => router.push("/login")}
                className={
                  "self-center text-sm font-semibold whitespace-nowrap border border-black rounded px-2 py-1 transform active:scale-x-105 transition-transform"
                }
              >
                Login
              </button>
            )}
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
              onClick={() => setShowNavModal(true)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <NavItems router={router} isAdminView={isAdminView} />
        </div>
      </nav>
      <CommonModal
        showModalTitle={false}
        mainContent={
          <NavItems
            router={router}
            isModalView={true}
            isAdminView={isAdminView}
          />
        }
        show={showNavmodal}
        setShow={setShowNavModal}
      />
      {showCartModal && <CartModal />}
    </>
  );
}
