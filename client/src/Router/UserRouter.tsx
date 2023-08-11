import { Route, Routes } from "react-router-dom";
import Loginpage from "../Pages/authentication/Loginpage";
import SignupPage from "../Pages/authentication/SignupPage";
import Homepage from "../Pages/User/Homepage";
import Cart from "../Pages/User/Cart/Cart";
import Checkout from "../Pages/User/Checkout/Checkout";
import AdminHomePage from "../Pages/Admin/AdminHomePage";

const UserRouter = () => {
    
  
  return (
    <Routes>
      <Route path="/login" element={<Loginpage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/" element={<Homepage/>} />
      <Route path="/cart" element={<Cart/>} />
      <Route path="/checkout" element={<Checkout/>} />
      <Route path="/adminHomepage" element={<AdminHomePage/>} />

    </Routes>
  );
};

export default UserRouter;
