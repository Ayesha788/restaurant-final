// types.ts
export  interface Food {
    id: number;
    name: string;
    category: string;
    price: number;
    originalPrice: number;
    tags: string[];
    image_url: string;
    description: string;
    available: boolean;
  }
  