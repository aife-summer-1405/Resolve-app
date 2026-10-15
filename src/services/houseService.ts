
export interface House {
  id: string;
  title: string;
  price?: number;
  area?: number;
  images?: string[];
}

export async function getHouses(page = 1) {
  const response = await fetch(
    `https://delta-project.liara.run/api/houses?page=${page}&limit=10`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch houses");
  }

  return response.json();
}
