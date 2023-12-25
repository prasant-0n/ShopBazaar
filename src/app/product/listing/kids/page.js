import CommonListing from "@/components/CommonListing";
import { productByCategory } from "@/services/product";

export default async function WomenAllProducts() {
  try {
    const getAllProducts = await productByCategory("kids");

    if (getAllProducts.error) {
      // Handle the error case
      console.error("Error fetching products:", getAllProducts.error);
      return <div>Error fetching products</div>;
    }

    console.log(getAllProducts);

    return <CommonListing data={getAllProducts && getAllProducts.data} />;
  } catch (error) {
    console.error("Error fetching products:", error);
    // Handle the error or return an error component
    return <div>Error fetching products</div>;
  }
}
