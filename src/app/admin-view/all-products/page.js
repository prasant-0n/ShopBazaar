import CommonListing from "@/components/CommonListing";
import { getAllAdminProducts } from "@/services/product";
import React from "react";

export default async function AllProducts() {
  const allAdminProducts = await getAllAdminProducts();
  // console.log(allAdminProducts);
  return <CommonListing data={allAdminProducts && allAdminProducts.data} />;
}
