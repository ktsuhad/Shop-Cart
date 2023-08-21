export interface userInterface {
    name: string;
    email: string;
    password: string;
    avatar?:string | null
    role?:string
  }

export interface productInterface  {
  _id: string;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  brand: string;
  category: string;
  image: string;
}