import { Add, Delete, Edit } from "@mui/icons-material";
import { Button, Tooltip } from "@mui/material";
import axios from "axios";
import axiosInstance from "../../Services/axiosInstance";
import { FormEvent, useEffect, useState } from "react";
import Dropzone from "react-dropzone"; //image uploader libery
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchProducts } from "../../Features/productSlice";
import { AppDispatch, RootState } from "../../app/Store/store";

const ProductManagementPage = () => {
  const [addToggle, setAddToggle] = useState(false);

  const dispatch: AppDispatch = useDispatch(); //dispatch
  const { products } = useSelector((state: RootState) => state.products);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [discountPercentage, setDiscountPercentage] = useState<number>(0);
  const [rating, setRating] = useState<number>(0);
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [editIndex, seteditIndex] = useState<number>(-1);

  //getting all products
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  //HandleProductSubmit
  const HandleProductSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData(); //formdata

      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", String(price));
      formData.append("discountPercentage", String(discountPercentage));
      formData.append("rating", String(rating));
      formData.append("brand", brand);
      formData.append("category", category);
      if (image) {
        formData.append("image", image);
      }

      if (editIndex === -1) {
        const { data } = await axios.post(
          `${import.meta.env.VITE_SERVER}/create-product`,
          formData
        );

        if (data.success) {
          dispatch(fetchProducts());
          toast.success(data.message);
          setAddToggle(false);
        }
      } else {
        const { data } = await axiosInstance.put(
          `/update-product/${products[editIndex]._id}`,
          formData
        );
        if (data.success) {
          dispatch(fetchProducts());
          toast.success(data.message);
          seteditIndex(-1);
        }
      }
      setAddToggle(false);
      // Reset the input fields after successful product creation
      setTitle("");
      setDescription("");
      setPrice(0);
      setDiscountPercentage(0);
      setRating(0);
      setBrand("");
      setCategory("");
      setImage(null);
    } catch (error) {
      toast.error("An error occurred while creating the product");
    }
  };

  //handleDelete
  const handleDelete = async (productId: string) => {
    try {
      const { data } = await axiosInstance.delete(
        `/delete-product/${productId}`
      );

      if (data.success) {
        dispatch(fetchProducts());
        toast.success(data.message);
      } else {
        toast.error(data.message || "Failed to delete product");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the product");
    }
  };

  //handleEdit
  const handleEdit = (index: number) => {
    seteditIndex(index);
    setAddToggle(true); // input box is visible
    const productToEdit = products[index];
    setTitle(productToEdit.title);
    setDescription(productToEdit.description);
    setPrice(productToEdit.price);
    setDiscountPercentage(productToEdit.discountPercentage);
    setRating(productToEdit.rating);
    setBrand(productToEdit.brand);
    setCategory(productToEdit.category);
    setImage(null); // Clear the image selection
  };

  return (
    <div className="relative">
      <div className="">
        <h1 className="text-2xl font-bold">Product Management</h1>
        <Tooltip title="create product">
          <Button
            variant="contained"
            style={{ marginTop: 4 }}
            onClick={() => {
              setAddToggle(!addToggle);
              seteditIndex(-1);
              setTitle(""); // Reset form fields
              setDescription("");
              setPrice(0);
              setDiscountPercentage(0);
              setRating(0);
              setBrand("");
              setCategory("");
              setImage(null);
            }}
          >
            <Add />
          </Button>
        </Tooltip>
      </div>

      {addToggle && (
        <form
          onSubmit={HandleProductSubmit}
          className={`${
            addToggle
              ? "opacity-100  right-[50%] transition-all duration-1000 "
              : "hidden  right-[-100px] transition-all duration-1000"
          } absolute z-50 top-24 border p-10 bg-white rounded-md shadow-lg`}
        >
          <h1 className="text-xl font-bold text-center pb-5">
            {editIndex !== -1 ? "Edit Product" : "Add Product"}
          </h1>
          <table className="">
            <tbody>
              <tr>
                <td>Title :</td>
                <td>
                  <input
                    type="text"
                    value={title}
                    className="bg-gray-200 rounded-sm focus:ring-2 focus:ring-blue-500 outline-none py-1 px-2"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>Description:</td>
                <td>
                  <input
                    type="text"
                    value={description}
                    className="bg-gray-200 rounded-sm focus:ring-2 focus:ring-blue-500 outline-none py-1 px-2"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>Price :</td>
                <td>
                  <input
                    type="number"
                    value={price}
                    className="bg-gray-200 rounded-sm focus:ring-2 focus:ring-blue-500 outline-none py-1 px-2"
                    onChange={(e) => setPrice(Number(e.target.value))}
                  />
                </td>
              </tr>
              <tr>
                <td>DiscountPercentage :</td>
                <td>
                  <input
                    type="number"
                    value={discountPercentage}
                    className="bg-gray-200 rounded-sm focus:ring-2 focus:ring-blue-500 outline-none py-1 px-2"
                    onChange={(e) =>
                      setDiscountPercentage(Number(e.target.value))
                    }
                  />
                </td>
              </tr>
              <tr>
                <td>Rating :</td>
                <td>
                  <input
                    type="number"
                    value={rating}
                    className="bg-gray-200 rounded-sm focus:ring-2 focus:ring-blue-500 outline-none py-1 px-2"
                    onChange={(e) => setRating(Number(e.target.value))}
                  />
                </td>
              </tr>
              <tr>
                <td>Brand :</td>
                <td>
                  <input
                    type="text"
                    value={brand}
                    className="bg-gray-200 rounded-sm focus:ring-2 focus:ring-blue-500 outline-none py-1 px-2"
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>category :</td>
                <td>
                  <input
                    type="text"
                    value={category}
                    className="bg-gray-200 rounded-sm focus:ring-2 focus:ring-blue-500 outline-none py-1 px-2"
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>Image :</td>
                <td>
                  <Dropzone
                    onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
                  >
                    {({ getRootProps, getInputProps, isDragActive }) => (
                      <div
                        className={`dropzone ${isDragActive ? "active" : ""}`}
                        {...getRootProps()}
                      >
                        <input {...getInputProps()} />
                        {image ? (
                          <p>image selected: {image.name}</p>
                        ) : (
                          <p>
                            {isDragActive
                              ? "Drop the files here"
                              : "Drag 'n' drop an image here, or click to select a file"}
                          </p>
                        )}
                      </div>
                    )}
                  </Dropzone>{" "}
                </td>
              </tr>
            </tbody>
          </table>
          <div className=" w-full flex justify-center mt-6">
            {editIndex !== -1 ? (
              <Button variant="contained" color="primary" type="submit">
                Save
              </Button>
            ) : (
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
            )}
          </div>
        </form>
      )}
      <div>
        {products?.map((product: any, index: number) => (
          <div
            key={product._id}
            className="border-b py-4 flex items-center justify-between mt-4 rounded-md"
          >
            <img src={product.image} alt="" className="w-20 h-20" />
            <span className="">
              <h1>{product.title}</h1>
              <p>{product.description}</p>
            </span>
            <span>
              <h3>{product.brand}</h3>
              <p>{product.rating}</p>
            </span>
            <span className="flex flex-col items-">
              <span>{product.price}</span>
              <span>{product.discountPercentage}</span>
            </span>
            <span className="flex gap-2 px-2">
              <Tooltip title="edit">
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handleEdit(index)}
                >
                  <Edit />
                </Button>
              </Tooltip>
              <Tooltip title="delete">
                <Button
                  variant="contained"
                  size="small"
                  color="error"
                  onClick={() => handleDelete(product._id)}
                >
                  <Delete />
                </Button>
              </Tooltip>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductManagementPage;
