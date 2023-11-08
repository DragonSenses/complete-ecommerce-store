import queryString from "query-string"

import { Product } from "@/types";

// Dynamically build address to fetch a resource on the web
// The scheme/protocol & domain name are defined as an environment variable
const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

interface Query {
  categoryId?: string;
  colorId?: string;
  sizeId?: string;
  isFeatured?: boolean;
}

/**
 * 
 * @returns an array of products
 */
const getProducts = async (query: Query): Promise<Product[]> => {
  // Generate a url constant where we add parameters via queryString
  // Stringify an object into a URL with a query string and sorting the keys
  const url = queryString.stringifyUrl({
    url: URL,
    query: {
      colorId: query.colorId,
      sizeId: query.sizeId,
      categoryId: query.categoryId,
      isFeatured: query.isFeatured,
    },
  })

  // Send network request to the URL and save the response
  const res = await fetch(url);

  // Return the response in JSON format
  return res.json();
}

export default getProducts;