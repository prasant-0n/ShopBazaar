const Cookies = require("js-cookie");

const uploadImageToServer = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/admin/upload-image", {
      method: "POST",
      body: formData,
      // Add the following line to set the correct Content-Type header
      headers: {
        // "Content-Type": "multipart/form-data", // Uncomment this line
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });

    const data = await response.json();

    if (data.success) {
      return data.imageUrl;
    } else {
      throw new Error("Image upload failed");
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
