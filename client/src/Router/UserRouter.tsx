import { Route, Routes } from "react-router-dom";
import Loginpage from "../Pages/authentication/Loginpage";
import SignupPage from "../Pages/authentication/SignupPage";
import Homepage from "../Pages/User/Homepage";
import Cart from "../Pages/User/Cart/Cart";
import Checkout from "../Pages/Checkout/Checkout";

const UserRouter = () => {
    
  
  return (
    <Routes>
      <Route path="/login" element={<Loginpage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/" element={<Homepage/>} />
      <Route path="/cart" element={<Cart/>} />
      <Route path="/checkout" element={<Checkout/>} />
    </Routes>
  );
};

export default UserRouter;
