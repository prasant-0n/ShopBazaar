"use client";
import React, { useContext, useEffect, useState } from "react";
import InputComponent from "@/components/FormElements/InputComponent";
import SelectComponent from "@/components/FormElements/SelectComponent";
import TileComponent from "@/components/FormElements/TileComponent";
import ComponentLevelLoader from "@/components/Loader/componentlevel";
import Notification from "@/components/Notification";
import { toast } from "react-toastify";

import {
  AvailableSizes,
  adminAddProductformControls,
  firebaseConfig,
  firebaseStorageURL,
} from "@/utils";
import { addNewProduct, updateAProduct } from "@/services/product";
import { GlobalContext } from "@/context";
import { BiImageAdd } from "react-icons/bi";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { initializeApp } from "firebase/app";
import { useRouter } from "next/navigation";

const app = initializeApp(firebaseConfig);
const storage = getStorage(app, firebaseStorageURL);

const createUniqueFileName = (getFile) => {
  const timeStamp = Date.now();
  const randomStringValue = Math.random().toString(36).substring(2, 12);

  return `${getFile.name}-${timeStamp}-${randomStringValue}`;
};

async function helperForUPloadingImageToFirebase(file) {
  const getFileName = createUniqueFileName(file);
  const storageReference = ref(storage, `ecommerce/${getFileName}`);
  const uploadImage = uploadBytesResumable(storageReference, file);

  return new Promise((resolve, reject) => {
    uploadImage.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
        reject(error);
      },
      () => {
        getDownloadURL(uploadImage.snapshot.ref)
          .then((downloadUrl) => resolve(downloadUrl))
          .catch((error) => reject(error));
      }
    );
  });
}

const initialFormData = {
  name: "",
  price: 0,
  description: "",
  category: "men",
  sizes: [],
  deliveryInfo: "",
  onSale: "no",
  imageUrl: "",
  priceDrop: 0,
};
export default function AdminAllProducts() {
  const [formData, setFormData] = useState(initialFormData);
  const {
    componentLevelLoader,
    setComponentLevelLoader,
    currentUpdatedProduct,
    setCurrentUpdatedProduct,
  } = useContext(GlobalContext);
  // console.log(currentUpdatedProduct);
  const router = useRouter();

  useEffect(() => {
    if (currentUpdatedProduct !== null) setFormData(currentUpdatedProduct);
  }, [currentUpdatedProduct]);

  async function handleImage(event) {
    const extractImageUrl = await helperForUPloadingImageToFirebase(
      event.target.files[0]
    );
    console.log(extractImageUrl);

    if (extractImageUrl !== "") {
      setFormData({
        ...formData,
        imageUrl: extractImageUrl,
      });
    }
  }

  const handleTileClick = (getCurrentItem) => {
    let cpySizes = [...formData.sizes];
    const index = cpySizes.findIndex((item) => item.id === getCurrentItem.id);
    if (index === -1) {
      cpySizes.push(getCurrentItem);
    } else {
      cpySizes = cpySizes.filter((item) => item.id !== getCurrentItem.id);
    }
    setFormData({
      ...formData,
      sizes: cpySizes,
    });
  };

  async function handleAddProduct() {
    const res =
      currentUpdatedProduct !== null
        ? await updateAProduct(formData)
        : await addNewProduct(formData);
    console.log(res);
    if (res.success) {
      setComponentLevelLoader({ loading: false, id: "" });
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });

      setFormData(initialFormData);
      setCurrentUpdatedProduct(null);
      setTimeout(() => {
        router.push("/admin-view/all-products");
      }, 1000);
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setComponentLevelLoader({ loading: false, id: "" });
      setFormData(initialFormData);
    }
  }

  console.log(formData);
  return (
    <div className="bg-white relative">
      <div className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-8 mr-auto xl:px-5 lg:flex-row">
        <div className="flex flex-col justify-center items-center w-full pr-10 pl-10 lg:flex-row">
          <div className="w-full mt-10 mr-0 mb-0 ml-0 relative max-w-2xl lg:mt-0 lg:w-5/12">
            <div className="flex flex-col justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl relative z-10">
              <p className="w-full text-xl md:text-2xl lg:text-3xl font-medium font-serif mb-6">
                Add Products
              </p>
              <label htmlFor="fileInput">Upload Image</label>
              {/* <BiImageAdd className=" cursor-pointer" /> */}
              <input
                id="fileInput"
                accept="image/*"
                max="1000000"
                type="file"
                onChange={handleImage}
              />
              <div className="flex gap-4 flex-col">
                <label>Available sizes</label>
                <TileComponent
                  selected={formData.sizes}
                  onClick={handleTileClick}
                  data={AvailableSizes}
                />
                {adminAddProductformControls.map((controlItem) =>
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
                  ) : controlItem.componentType === "select" ? (
                    <SelectComponent
                      label={controlItem.label}
                      options={controlItem.options}
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
                <button
                  onClick={handleAddProduct}
                  className="w-full sm:w-auto px-6 py-2 bg-gray-950 rounded-md text-white outline-none shadow-lg transform active:scale-x-105 transition-transform "
                >
                  {componentLevelLoader && componentLevelLoader.loading ? (
                    <ComponentLevelLoader
                      text={
                        currentUpdatedProduct !== null
                          ? "Updating Product"
                          : "Adding Product"
                      }
                      styles={""}
                      color={"#ffffff"}
                      loading={
                        componentLevelLoader && componentLevelLoader.loading
                      }
                    />
                  ) : currentUpdatedProduct !== null ? (
                    "Update Product"
                  ) : (
                    "Add Product"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Notification />
    </div>
  );
}
