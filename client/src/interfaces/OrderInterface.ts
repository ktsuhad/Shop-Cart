export interface OrderInteface {
    _id: string;
    userid: string;
    products: Product[];
    amount: number;
    address: Address;
    status: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  
  interface Address {
    firstName: string;
    lastName: string;
    email: string;
    country: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
  }
  
  interface Product {
    quantity: number;
    _id: string;
    image:string,
    title:string
  }