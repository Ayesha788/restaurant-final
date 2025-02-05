import client from "./sanity.client";

export const fetchFoods = async () => {
  const query = `*[_type == "food"] {
    id,
    name,
    category,
    price,
    originalPrice,
    tags,
    "image_url": image.asset->url,
    description,
    available
  }`;

  const data = await client.fetch(query);
  return data;
};
