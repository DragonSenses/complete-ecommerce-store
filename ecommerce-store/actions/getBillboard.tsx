import { Billboard } from "@/types";

// Dynamically build address to fetch a resource on the web
// The scheme/protocol & domain name are defined as an environment variable
const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

/**
 * 
 * @returns an individual Billboard
 */
const getCategories = async (): Promise<Billboard[]> => {
  // Send network request to the URL and save the response
  const res = await fetch(URL);

  // Return the response in JSON format
  return res.json();
}

export default getCategories;