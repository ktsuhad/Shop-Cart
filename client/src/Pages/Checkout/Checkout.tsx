import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Checkout = () => {
//   const { items, totalDiscount, totalPrice } = useSelector(
//     (state: RootState) => state.cart
//   );

//   const totalPriceWithoutDiscount = items.reduce(
//     (acc, product) => acc + product.price,
//     0
//   );
  const address = [
    {
      name: "suhad",
      email: "suhadkt@gmail.com",
      phone: 1234567891,
      city: "Areekode",
      state: "kerala",
      pin: 56677,
    },
    {
      name: "danish",
      email: "danish@gmail.com",
      phone: 879456123,
      city: "kondotty",
      state: "kerala",
      pin: 5565668,
    },
  ];
  return (
    <div className="container mx-auto flex flex-col md:flex-row">
      <div className="flex-[3] bg-white px-3 md:px-5 h-screen overflow-y-auto py-5">
        <h1 className="text-2xl font-bold">Personal Information</h1>
        <p className="text-sm mt-3 ">
          Use permanent address where you can receive mail
        </p>
        <div className="flex flex-wrap gap-5 py-5">
          <div className="flex-1">
            <label htmlFor="firstName" className="block">
              First name
            </label>
            <input
              type="text"
              className="border border-gray-400 rounded-md px-2 py-1 focus:ring-2 focus:outline-none "
            />
          </div>
          <div className="flex-1">
            <label htmlFor="lastName" className="block">
              Last name
            </label>
            <input
              type="text"
              className="border border-gray-400 rounded-md px-2 py-1 focus:ring-2 focus:outline-none "
            />
          </div>
        </div>
        <label htmlFor="email" className="block">
          Email Address
        </label>
        <input
          type="email"
          className="border border-gray-400 rounded-md px-2 py-1 focus:ring-2 focus:outline-none  w-full md:w-1/2"
        />
        <label htmlFor="country" className="block mt-5">
          Country
        </label>
        <input
          type="text"
          className="border border-gray-400 rounded-md px-2 py-1 focus:ring-2 focus:outline-none "
        />
        <label htmlFor="street" className="block mt-5">
          Street address
        </label>
        <textarea
          name="address"
          className="w-full border border-gray-400 rounded-md px-2 py-1 focus:ring-2 focus:outline-none "
        ></textarea>
        <div className="flex flex-wrap gap-5 mt-5">
          <div className="flex-1">
            <label htmlFor="city" className="block">
              City
            </label>
            <input
              type="text"
              className="border border-gray-400 rounded-md px-2 py-1 focus:ring-2 focus:outline-none "
            />
          </div>
          <div className="flex-1">
            <label htmlFor="state" className="block">
              State / Province
            </label>
            <input
              type="text"
              className="border border-gray-400 rounded-md px-2 py-1 focus:ring-2 focus:outline-none "
            />
          </div>
          <div className="flex-1">
            <label htmlFor="postalcode" className="block">
              ZIP / Postal code
            </label>
            <input
              type="number"
              className="border border-gray-400 rounded-md px-2 py-1 focus:ring-2 focus:outline-none "
            />
          </div>
        </div>
        <hr className="my-10" />
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Address
        </h2>
        <p className="text-gray-600 text-sm">Choose from existing address</p>
        <ul>
          {address.map((address) => (
            <li key={address.email} className="">
              <div className="flex justify-between border-solid border-2 mt-5 p-3 rounded-md">
                <div className="py-3 flex gap-4">
                  <div className="">
                    <input type="radio" name="address" id="" />
                  </div>
                  <div>
                    <p className="truncate text-sm font-semibold text-gray-900">
                      {address.name}
                    </p>
                    <p className="truncate text-xs text-gray-500">
                      {address.city}
                    </p>
                    <p className="truncate text-xs text-gray-500">
                      {address.pin}
                    </p>
                  </div>
                </div>
                <div className="py-3">
                  <p className="truncate text-xs text-gray-500">
                    Phone :{address.phone}
                  </p>
                  <p className="truncate text-xs text-gray-500">
                    {address.state}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            Payment Methods
          </h3>
          <p className="text-gray-600 text-sm py-2">Choose One</p>
        </div>
        <div className="flex flex-col gap-3 py-2">
          <div className="flex items-center gap-x-3">
            <input
              type="radio"
              name="payments"
              id="cash"
              className="h-4 w-4 border border-gray-300 text-indigo-600"
            />
            <label
              htmlFor="push-everything"
              className="block text-sm font-medium"
            >
              Cash
            </label>
          </div>
          <div className="flex items-center gap-x-3">
            <input
              type="radio"
              name="payments"
              id="card-payment"
              className="h-4 w-4 border border-gray-300 text-indigo-600"
            />
            <label
              htmlFor="push-everything"
              className="block text-sm font-medium"
            >
              Card Payment
            </label>
          </div>
        </div>
      </div>

      {/* Price Detailes */}
      <div className="flex-1 px-3 md:px-5">
        <h1 className="py-5 font-bold">Price Details</h1>
        <ul>
          <li className="flex justify-between">
            Price({5})<span>${56}</span>
          </li>
          <li className="flex justify-between ">
            Discount
            <span className="text-green-600">${44}</span>
          </li>
          <li className="flex justify-between border-b border-dashed pb-2">
            Delivery
            <span className="text-green-600">FREE Delivery</span>
          </li>
          <li className="flex justify-between pt-5 font-bold">
            Total Amount
            <span>${555}</span>
          </li>
          <li className="text-green-600 py-5">
            You will save ${4} on this order
          </li>
        </ul>
        <div className=" bg-white flex border-y border-x-0 py-5 border-gray-300 mb-20">
          <div className="flex-1  flex flex-col justify-center gap-2">
            <p className="font-semibold tracking-wide">{54}</p>
            <a href="" className="text-xs text-blue-700">
              View Price details
            </a>
          </div>
          <div className="flex-1  flex flex-col justify-center items-end  ">
            <button className="bg-amber-400 w-max p-2 px-2 rounded-sm text-sm">
              CONTACT NOW
            </button>
          </div>
        </div>
        {/* //pay and Order */}
        <Link to={"/checkout"} className="flex items-center justify-center">
          <Button variant="contained" style={{ backgroundColor: "green" }}>
            Pay and Order
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Checkout;