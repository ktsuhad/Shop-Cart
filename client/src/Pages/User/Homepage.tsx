import Carousel from "../../components/Carousel/Carousel";
import Navbar from "../../components/Navbar/Navbar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductsList from "../../components/products/ProductListing";

const Homepage = () => {
  const navigate = useNavigate()  //navigate
  const token =localStorage.getItem("accessToken");


  useEffect(()=>{
    if(!token){
      navigate("/login")
    }
  },[token])

  return (
    <>
      {token && (
        <div className="container mx-auto px-3">
          <Navbar />
          <Carousel />
          <ProductsList/>
        </div>
      )}
    </>
  );
};

export default Homepage;
