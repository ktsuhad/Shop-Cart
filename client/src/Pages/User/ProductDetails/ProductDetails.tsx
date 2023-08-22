import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { Button } from "@mui/material";
import { product } from "../../../interfaces/productinterface";
import { AppDispatch } from "../../../app/Store/store";
import { useDispatch } from "react-redux";
import { addTocart } from "../../../Features/CartSlice";

const ProductDetails = () => {
  const [product, setproduct] = useState<product>();
  const [selectedColor, setSelectedColor] = useState("gray");
  const { productId } = useParams(); //access params

const dispatch:AppDispatch = useDispatch()
  useEffect(() => {
    const fetchSingleproduct = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_SERVER}/product/${productId}`
        );
        setproduct(data.product);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleproduct();
  }, [productId]);

  const handleColorButtonClick = (color: string) => {
    setSelectedColor(color);
  };

  return (
    <div className="container mx-auto min-h-screen flex flex-col md:flex-row justify-center gap-5 md:py-12">
      <div className="flex-1">
        <Zoom>
          <div
            style={{ backgroundColor: selectedColor }}
            className="p-1 flex items-center justify-center rounded-md w-full h-[500px]"
          >
            {product && (
              <img
                src={product.image}
                alt="Product"
                className="w-[200px] h-[200px] object-cover"
              />
            )}
          </div>
        </Zoom>
      </div>

      {/* Detail area */}
      <div className="flex-1 px-5">
        <h1 className="font-bold text-lg">{product?.title}</h1>
        <div className="flex items-center gap-4 text-sm">
          <span>In stock</span>
        </div>
        <p className="text-sm">{product?.description}</p>
        <div className="flex justify-between items-center mt-4">
          <div className="space-y-2 text-sm">
            <h2>${product?.price}</h2>
            <span>{Math.round(Number(product?.discountPercentage))}%</span>
          </div>
        </div>
        <Button
          variant="contained"
          sx={{ mt: 4 }}
          color="info"
          fullWidth
          onClick={() => dispatch(addTocart(product as any))}
        >
          Add to cart
        </Button>
        <div>
          <h1 className="mt-4 font-bold">Product Details</h1>
          <div className="flex justify-between py-2 mt-2 text-sm font-normal border-b">
            <span>Size</span>
            <span>Small, Medium, Large</span>
          </div>
          <div className="flex justify-between py-2 mt-2 text-sm font-normal border-b">
            <span>Color</span>
            <span>White, Black, Gray</span>
          </div>
          <div className="flex justify-between py-2 mt-2 text-sm font-normal">
            <span>Brand</span>
            <span>{product?.brand}</span>
          </div>
        </div>
        <h1 className="font-bold mt-5">Select Color</h1>
        <div className="py-3 flex gap-2">
          <Button
            variant="contained"
            style={{ backgroundColor: "gray", width: "70px", height: "35px" }}
            onClick={() => handleColorButtonClick("gray")}
          ></Button>
          <Button
            variant="contained"
            style={{ backgroundColor: "red", width: "70px", height: "35px" }}
            onClick={() => handleColorButtonClick("red")}
          ></Button>
          <Button
            variant="contained"
            style={{ backgroundColor: "blue", width: "70px", height: "35px" }}
            onClick={() => handleColorButtonClick("blue")}
          ></Button>
          <Button
            variant="contained"
            style={{ backgroundColor: "pink", width: "70px", height: "35px" }}
            onClick={() => handleColorButtonClick("pink")}
          ></Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
