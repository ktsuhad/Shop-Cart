import { Link } from "react-router-dom";
// import StarRating from "../../../components/Rating/Rating";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { FavoriteBorderOutlined } from "@mui/icons-material";
import { fetchProducts } from "../../Features/productSlice";
import { AppDispatch, RootState } from "../../app/Store/store";
import { Button } from "@mui/material";
import { addToCart } from "../../Features/CartSlice";

const ProductCard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // handleSubmit
  const handleAddToCart = (product: any) => {
    dispatch(addToCart(product));
    console.log("Item added to cart:", product);
  };
  

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm: justify-items-center md:justify-items-start">
      {products?.map((product) => (
        <div key={product._id} className="w-64">
          <div className="w-64">
            <Link
              to={`/product-details/${product._id}`}
              className="bg-slate-100 w-full flex items-center justify-center rounded-md relative overflow-hidden"
            >
              <img src={product.image} alt="" className="w-full " />
              <span className="material-symbols-outlined text-sm absolute top-2 right-2 bg-white rounded-full hover:bg-teal-500 hover:text-white flex px-2 py-1.5">
                <FavoriteBorderOutlined />
              </span>
            </Link>
            <div className="flex flex-col gap-3">
              <div className="flex  justify-between">
                <h1 className="font-bold">{product.title}</h1>
                <span className="font-bold">
                  <span className="">$ </span>
                  {product.price}
                </span>
              </div>
              <p className="text-ellipsis whitespace-nowrap overflow-hidden text-sm text-gray-500">
                {product.description}
              </p>
              {/* <StarRating /> */}
              <div className="flex justify-center">
                <Button
                  variant="contained"
                  fullWidth
                  size="small"
                  style={{ backgroundColor: "green", marginTop: "5px" }}
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCard;
