"use client";

import React, { useEffect } from "react";
import ProductTile from "./ProductTile";
import ProductButton from "./ProductButton";
import Notification from "../Notification";
import { useRouter } from "next/navigation";

export default function CommonListing({ data }) {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, []);
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4 lg:mt-16">
          {data && data.length
            ? data.map((item) => (
                <article
                  className="relative flex flex-col overflow-hidden border cursor-pointer rounded-lg"
                  key={item._id}
                >
                  <div className="p-2">
                    <ProductTile item={item} />
                  </div>

                  <ProductButton item={item} />
                </article>
              ))
            : null}
        </div>
      </div>
      <Notification />
    </section>
  );
}
