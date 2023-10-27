export const login = async (FormData) => {
  try {
    const response = await fetch("/api/login", {
      method: "POST",
      header: {
        "content-type": "application/json",
      },
      body: JSON.stringify(FormData),
    });
    const data = response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
