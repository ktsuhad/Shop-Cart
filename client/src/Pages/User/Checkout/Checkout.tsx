import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/Store/store";
import { Address } from "../../../interfaces/AddressIntrface";
import AddressInput from "../../../components/AddressInputs/AddressInputs";
import PayButton from "../../../components/Payment/PayButton";
import { Button, Tooltip } from "@mui/material";

const Checkout = () => {
  const [address, setAddress] = useState<Address | null>(null);
  const [existingAddresses, setExistingAddresses] = useState<Address[]>([]);

  const { items, totalPrice } = useSelector(
    (state: RootState) => state.cart
  );

  // saveExistingAddressesToLocalStorage
  const saveExistingAddressesToLocalStorage = (addresses: Address[]) => {
    localStorage.setItem("Addresses", JSON.stringify(addresses));
  };

  // handleSaveAddress
  const handleSaveAddress = (formData: Address) => {
    // Check if the address already exists
    const isExistingAddress = existingAddresses.some(
      (existingAddress) =>
        existingAddress.email === formData.email ||
        existingAddress.firstName === formData.firstName
    );
    if (!isExistingAddress) {
      setAddress(formData);
      const updatedAddresses = [...existingAddresses, formData];
      setExistingAddresses(updatedAddresses);
      saveExistingAddressesToLocalStorage(updatedAddresses); // Save to localStorage
    }
  };

  // removeExistingAddress
  const removeExistingAddress = (emailToRemove: string) => {
    const updatedAddresses = existingAddresses.filter(
      (address) => address.email !== emailToRemove
    );
    setExistingAddresses(updatedAddresses);
    saveExistingAddressesToLocalStorage(updatedAddresses); // Save to localStorage
  };

  // handleSelectAddress
  const handleSelectAddress = (selected: Address | null) => {
    setAddress(selected);
  };

  useEffect(() => {
    const storedAddresses = localStorage.getItem("Addresses");
    if (storedAddresses) {
      setExistingAddresses(JSON.parse(storedAddresses));
    }
  }, []);

  return (
    <div className="container mx-auto flex flex-col md:flex-row">
      <div className="flex-[3] bg-white px-3 md:px-5 h-screen overflow-y-auto py-5">
        <h1 className="text-2xl font-bold">Personal Information</h1>
        <p className="text-sm mt-3">
          Use a permanent address where you can receive mail
        </p>
        {/* Address Input form */}
        <AddressInput onSaveAddress={handleSaveAddress} />
        <hr className="my-10" />
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Address
        </h2>
        <p className="text-gray-600 text-sm">Choose from existing addresses</p>
        <ul>
          {existingAddresses.map((existingAddress, index) => (
            <li key={index} className="">
              <div className="flex justify-between border-solid border-2 mt-5 p-3 rounded-md">
                <div className="py-3 flex gap-4">
                  <div>
                    <input
                      type="radio"
                      name="address"
                      id={existingAddress.email}
                      checked={address?.email === existingAddress.email}
                      onChange={() => handleSelectAddress(existingAddress)}
                    />
                  </div>
                  <div>
                    <p className="truncate text-sm font-semibold text-gray-900">
                      {`${existingAddress.firstName} ${existingAddress.lastName}`}
                    </p>
                    <p className="truncate text-xs text-gray-500">
                      {existingAddress.city}
                    </p>
                    <p className="truncate text-xs text-gray-500">
                      {existingAddress.country}
                    </p>
                  </div>
                </div>
                <div className="py-3">
                  <p className="truncate text-xs text-gray-500">
                    Address: {existingAddress.street}
                  </p>
                  <p className="truncate text-xs text-gray-500">
                    {existingAddress.state}
                  </p>
                  <Tooltip title="Remove">
                    <Button
                      variant="contained"
                      size="small"
                      color="error"
                      style={{ marginTop: "10px" }}
                      onClick={() => removeExistingAddress(existingAddress.email)}
                    >
                      Remove from cart
                    </Button>
                  </Tooltip>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex-1 px-3 md:px-5">
        <h1 className="py-5 font-bold">Price Details</h1>
        <ul>
          <li className="flex justify-between">
            Price({items.length})<span>₹{totalPrice}</span>
          </li>
          <li className="flex justify-between ">
            Discount<span className="text-green-600">₹{0}</span>
          </li>
          <li className="flex justify-between border-b border-dashed pb-2">
            Delivery<span className="text-green-600">FREE Delivery</span>
          </li>
          <li className="flex justify-between pt-5 font-bold">
            Total Amount<span>₹{totalPrice}</span>
          </li>
          <li className="text-green-600 py-5">
            You will save ₹{} on this order
          </li>
        </ul>
        <div className=" bg-white flex border-y border-x-0 py-5 border-gray-300 mb-20">
          <div className="flex-1  flex flex-col justify-center gap-2">
            <p className="font-semibold tracking-wide">₹{totalPrice}</p>
            <a href="" className="text-xs text-blue-700">
              View Price detail
            </a>
          </div>
          <div className="flex-1  flex flex-col justify-center items-end">
            <button className="bg-amber-400 w-max p-2 px-2 rounded-sm text-sm">
              CONTACT NOW
            </button>
          </div>
        </div>
        {existingAddresses.length > 0 ? ( // Check if there are existing addresses
        address && items.length > 0 ? (
          <PayButton items={items} address={address} />
        ) : (
          <>
            {!address && (
              <span className="text-red-600 font-medium tracking-wide text-sm">
                Please fill out the address
              </span>
            )}
            {address && items.length === 0 && (
              <span className="text-red-600 font-medium tracking-wide text-sm">
                Please add items to your cart.
              </span>
            )}
          </>
        )
      ) : (
        <span className="text-red-600 font-medium tracking-wide text-sm">
          Please add an address.
        </span>
      )}
      </div>
    </div>
  );
};

export default Checkout;
