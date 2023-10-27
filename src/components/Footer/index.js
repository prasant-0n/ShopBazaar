"use client";

import Image from "next/image";
import logo from "../../utils/logo1.jpg";
import logo2 from "../../utils/logo2.svg";

export default function Footer() {
  return (
    <>
      <footer className="px-3 pt-4 lg:px-9 border-t-2 bg-gray mx-auto">
        <div className="grid gap-10 row-gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2">
            <a href="#" className="inline-flex items-center">
              <span className="w-20 sm:w-24 md:w-32 lg:w-48 xl:w-56 slef-center">
                <Image src={logo} alt="logo" />
              </span>
              {/* <span className="ml-2 text-xl font-bold tracking-wide text-gray-800">
                Company Name
              </span> */}
            </a>
            <div className="mt-6 lg:max-w-xl">
              <p className="text-md text-gray-800">
                ShopBazar, your ultimate online shopping destination! Discover a
                world of quality products, unbeatable prices, and exceptional
                customer service. We curate a wide range of items, from fashion
                to electronics, ensuring a seamless shopping experience.
                Explore, shop, and indulge in the joy of finding exactly what
                you need, right here at ShopBazar.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 text-sm">
            <p className="text-base font-bold tracking-wide text-gray-900">
              Popular Courses
            </p>
            <a href="#">UPSC - Union Public Service Commission</a>
            <a href="#">General Knowledge</a>
            <a href="#">MBA</a>
            <p className="text-base font-bold tracking-wide text-gray-900">
              Popular Topics
            </p>
            <a href="#">Human Resource Management</a>
            <a href="#">Operations Management</a>
            <a href="#">Marketing Management</a>
          </div>

          <div>
            <p className="text-base font-bold tracking-wide text-gray-900">
              COMPANY IS ALSO AVAILABLE ON
            </p>
            <div className="flex items-center gap-1 px-2">
              <a href="#" className="w-full min-w-xl">
                <Image
                  src="https://mcqmate.com/public/images/icons/playstore.svg"
                  alt="Playstore Button"
                  className="h-10"
                  width={90}
                  height={90}
                />
              </a>
              <a
                className="w-full min-w-xl"
                href="https://www.youtube.com/channel/UCo8tEi6SrGFP8XG9O0ljFgA"
              >
                <Image
                  src={logo2}
                  alt="Youtube Button"
                  className="h-28"
                  style={`w-8 h-8 slef-center`}
                />
              </a>
            </div>
            <p className="text-base font-bold tracking-wide text-gray-900">
              Contacts
            </p>
            <div className="flex">
              <p className="mr-1 text-gray-800">Email:</p>
              <a href="#" title="send email">
                admin@company.com
              </a>
            </div>
            <div class="mt-6 lg:mb-0 mb-6">
              <button
                class="bg-white text-lightBlue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                type="button"
              >
                <i class="fab fa-twitter"></i>
              </button>
              <button
                class="bg-white text-lightBlue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                type="button"
              >
                <i class="fab fa-facebook-square"></i>
              </button>
              <button
                class="bg-white text-pink-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                type="button"
              >
                <i class="fab fa-dribbble"></i>
              </button>
              <button
                class="bg-white text-blueGray-800 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                type="button"
              >
                <i class="fab fa-github"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col-reverse justify-between pt-5 pb-10 border-t lg:flex-row">
          <p className="text-sm text-gray-600">
            © Copyright 2023 Company. All rights reserved.br
          </p>
          <p className="text-sm text-gray-600">Designed By Prashant</p>

          <ul className="flex flex-col mb-3 space-y-2 lg:mb-0 sm:space-y-0 sm:space-x-5 sm:flex-row">
            <li>
              <a
                href="#"
                className="text-sm text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
              >
                Privacy &amp; Cookies Policy
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-sm text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
              >
                Disclaimer
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
}
