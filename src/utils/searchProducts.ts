import medusa from "@/lib/medusa-client";
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing";

export const searchProducts = async (query: string): Promise<PricedProduct[]> => {
  try {
    const { products } = await medusa.products.list({
      q: query,
    });
    return products;
  } catch (error) {
    console.error("Error searching products:", error);
    return [];
  }
};