import { Product } from "@/types";

// Dynamically build address to fetch a resource on the web
// The scheme/protocol & domain name are defined as an environment variable
const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

/**
 * 
 * @returns an individual Product
 */
const getProduct = async (id: string): Promise<Product> => {
  // Send network request to the URL and save the response
  const res = await fetch(`${URL}/${id}`);

  // Return the response in JSON format
  return res.json();
}

export default getProduct;