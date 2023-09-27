import { useForm } from "react-hook-form";
import { Address } from "../../interfaces/AddressIntrface";
import { DevTool } from "@hookform/devtools";
import React from "react";
 
interface AddressInputProps {
  onSaveAddress: (formData: Address) => void;
}

const AddressInput: React.FC<AddressInputProps> = ({ onSaveAddress }) => {
  const { register, handleSubmit, control, formState } = useForm<Address>();
  const { errors } = formState;

  const onSubmit = (data: Address) => {
    onSaveAddress(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="flex flex-wrap gap-5 py-5">
          <div className="flex-1">
            <label htmlFor="firstName" className="block">
              First name
            </label>
            <input
              type="text"
              id="firstName"
              {...register("firstName", { required: " firstName is required" })}
              className="border border-gray-400 rounded-md px-2 py-1 focus:ring-2 focus:outline-none"
            />
            <p className="text-red-600">{errors.firstName?.message}</p>
          </div>
          <div className="flex-1">
            <label htmlFor="lastName" className="block">
              Last name
            </label>
            <input
              type="text"
              id="lastName"
              {...register("lastName", { required: " lastName is required" })}
              className="border border-gray-400 rounded-md px-2 py-1 focus:ring-2 focus:outline-none"
            />
            <p className="text-red-600">{errors.lastName?.message}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-5 py-5">
          <div className="flex-1">
            <label htmlFor="email" className="block">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: " email is required",
                pattern: {
                  value:
                    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
                  message: "Invalid email format",
                },
              })}
              className="border border-gray-400 rounded-md px-2 py-1 focus:ring-2 focus:outline-none w-full md:w-1/2"
            />
            <p className="text-red-600">{errors.email?.message}</p>
          </div>
          <div className="flex-1">
            <label htmlFor="country" className="block mt-5">
              Country
            </label>
            <input
              type="text"
              id="country"
              {...register("country", { required: " country is required" })}
              className="border border-gray-400 rounded-md px-2 py-1 focus:ring-2 focus:outline-none"
            />
            <p className="text-red-600">{errors.country?.message}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-5 mt-5">
          <div className="flex-1">
            <label htmlFor="street" className="block">
              Street address
            </label>
            <textarea
              id="street"
              {...register("street", { required: " street is required" })}
              className="w-full border border-gray-400 rounded-md px-2 py-1 focus:ring-2 focus:outline-none"
            ></textarea>
            <p className="text-red-600">{errors.street?.message}</p>
          </div>
          <div className="flex-1">
            <label htmlFor="city" className="block">
              City
            </label>
            <input
              type="text"
              id="city"
              {...register("city", { required: " city is required" })}
              className="border border-gray-400 rounded-md px-2 py-1 focus:ring-2 focus:outline-none"
            />
            <p className="text-red-600">{errors.city?.message}</p>
          </div>
          <div className="flex-1">
            <label htmlFor="state" className="block">
              State / Province
            </label>
            <input
              type="text"
              id="state"
              {...register("state", { required: " state is required" })}
              className="border border-gray-400 rounded-md px-2 py-1 focus:ring-2 focus:outline-none"
            />
            <p className="text-red-600">{errors.state?.message}</p>
          </div>
          <div className="flex-1">
            <label htmlFor="postalCode" className="block">
              ZIP / Postal code
            </label>
            <input
              type="number"
              id="postalCode"
              {...register("postalCode", {
                required: " postalCode is required",
              })}
              className="border border-gray-400 rounded-md px-2 py-1 focus:ring-2 focus:outline-none"
            />
            <p className="text-red-600">{errors.postalCode?.message}</p>
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
        >
          Save Address
        </button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default AddressInput;
