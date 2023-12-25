"use client";

import ComponentLevelLoader from "@/components/Loader/componentlevel";
import { GlobalContext } from "@/context";
import { addToCart } from "@/services/cart";
import { deleteAProduct } from "@/services/product";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";
import { toast } from "react-toastify";

export default function ProductButton({ item }) {
  const {
    setCurrentUpdatedProduct,
    setComponentLevelLoader,
    componentLevelLoader,
    user,
    showCartModal,
    setShowCartModal,
  } = useContext(GlobalContext);
  const pathName = usePathname();
  const router = useRouter();

  const isadminView = pathName.includes("admin-view");

  async function handleAddToCart(getItem) {
    setComponentLevelLoader({ loading: true, id: getItem._id });

    const res = await addToCart({ productID: getItem._id, userID: user._id });

    if (res.success) {
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setComponentLevelLoader({ loading: false, id: "" });
      setShowCartModal(true);
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setComponentLevelLoader({ loading: false, id: "" });
      setShowCartModal(true);
    }

    // console.log(res);
  }

  async function handleDeleteProduct(item) {
    setComponentLevelLoader({ loading: true, id: item._id });

    const res = await deleteAProduct(item._id);

    if (res.success) {
      setComponentLevelLoader({ loading: false, id: "" });
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      router.refresh();
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setComponentLevelLoader({ loading: false, id: "" });
    }
  }

  return isadminView ? (
    <div className="flex p-2 gap-3 ml-8">
      <button
        className="mt-1.5 w-14 bg-black px-2 py-1 text-[8px] font-medium tracking-wide text-gray-300 rounded-lg hover:bg-slate-800 hover:text-white"
        onClick={() => {
          setCurrentUpdatedProduct(item);
          router.push("/admin-view/add-product");
        }}
      >
        Update
      </button>{" "}
      <button
        onClick={() => handleDeleteProduct(item)}
        className="mt-1.5 w-14 bg-black px-2 py-1 text-[8px] font-medium tracking-wide text-gray-300 rounded-lg hover:bg-slate-800 hover:text-white"
      >
        {componentLevelLoader &&
        componentLevelLoader.loading &&
        item._id === componentLevelLoader.id ? (
          <ComponentLevelLoader
            // text={"Deleting Product"}
            styles={"h-[0.5px] w-[3px] -mt-2"}
            // className="h-[2px] w-[6px]"
            color={"#ffffff"}
            loading={componentLevelLoader && componentLevelLoader.loading}
          />
        ) : (
          "Delete"
        )}
      </button>
    </div>
  ) : (
    <>
      <button
        onClick={() => handleAddToCart(item)}
        className="mt-1.5 w-14 bg-black px-2 py-1 text-[8px] font-medium tracking-wide text-gray-300 rounded-lg hover:bg-slate-800 hover:text-white"
      >
        {componentLevelLoader &&
        componentLevelLoader.loading &&
        componentLevelLoader.id === item._id ? (
          <ComponentLevelLoader
            // text={"Adding "}
            // styles={"h-[0.5px] w-[3px] -mt-2"}
            color={"#ffffff"}
            loading={componentLevelLoader && componentLevelLoader.loading}
          />
        ) : (
          "Add"
        )}
      </button>
    </>
  );
}
