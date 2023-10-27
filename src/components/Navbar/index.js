"use client";
import React, { Fragment, useContext } from "react";
import logo from "../../utils/logo1.jpg";
import Image from "next/image";
import profile from "../../utils/profile.png";
import Cart from "../../utils/bag.png";
import wishlist from "../../utils/wishlist.png";
import { adminNavOptions, navOptions } from "@/utils";
import { useRouter } from "next/navigation";
import { GlobalContext } from "@/context";
import CommonModal from "../CommonModel";

const isAdminView = false;
const isAuthUser = false;
const user = {
  role: "admin",
};

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

export default function Navbar({ router }) {
  const { showNavmodal, setShowNavModal } = useContext(GlobalContext);

  return (
    <>
      <nav className="bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flex items-center cursor-pointer ">
            <span className="w-20 sm:w-24 md:w-32 lg:w-48 xl:w-56 slef-center transform active:scale-x-105 transition-transform">
              <Image src={logo} alt="logo" />
            </span>
          </div>
          <div className="flex md:order-2 gap-4 ">
            {user?.role === "admin" ? (
              isAdminView ? (
                <button className="self-center text-sm font-semibold whitespace-nowrap border border-black rounded px-2 py-1 transform active:scale-x-105 transition-transform">
                  Client View
                </button>
              ) : (
                <button className="self-center text-xs sm:text-sm font-semibold whitespace-nowrap border border-black rounded px-2 py-1 sm:px-2 transform active:scale-x-105 transition-transform">
                  Admin View
                </button>
              )
            ) : null}
            {!isAuthUser && isAdminView ? (
              <Fragment>
                <button className="slef-center text-sm font-semibold whitespace-nowrap transform active:scale-x-105 transition-transform">
                  Account
                </button>
                <button className="slef-center text-sm font-semibold whitespace-nowrap transform active:scale-x-105 transition-transform">
                  Cart
                </button>
              </Fragment>
            ) : null}
            {isAuthUser ? (
              <button className="self-center text-xs sm:text-sm font-semibold whitespace-nowrap border border-black rounded px-2 py-1 sm:px-2 transform active:scale-x-105 transition-transform">
                LogOut
              </button>
            ) : (
              <button className="self-center text-xs sm:text-sm font-semibold whitespace-nowrap border border-black rounded px-2 py-1 sm:px-2 transform active:scale-x-105 transition-transform">
                LogIn
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
          <NavItems router={router} />
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
    </>
  );
}

// <Fragment>
//               <div className="flex flex-col items-center cursor-pointer text-gray-600 hover:text-gray-900 hover:grayscale-0 transition duration-300 ease-in-out  ">
//                 <Image
//                   src={profile}
//                   alt="profile"
//                   className="w-4 slef-center"
//                 />
//                 <span className="slef-center text-sm font-semibold whitespace-nowrap ">
//                   Profile
//                 </span>
//               </div>
//               <div className="flex flex-col items-center cursor-pointer text-gray-600 hover:text-gray-900 hover:grayscale-0 transition duration-300 ease-in-out  ">
//                 <Image src={Cart} alt="cart" className="w-4 slef-center " />
//                 <span className="slef-center text-sm font-semibold whitespace-nowrap">
//                   Cart
//                 </span>
//               </div>
//               <div className="flex flex-col items-center cursor-pointer text-gray-600 hover:text-gray-900 hover:grayscale-0 transition duration-300 ease-in-out  ">
//                 <Image src={wishlist} alt="cart" className="w-4 slef-center " />
//                 <span className="slef-center text-sm font-semibold whitespace-nowrap">
//                   Wishlist
//                 </span>
//               </div>
//             </Fragment>
