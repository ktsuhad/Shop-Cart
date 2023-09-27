import { Route, Routes } from "react-router-dom";
import Loginpage from "../Pages/authentication/Loginpage";
import SignupPage from "../Pages/authentication/SignupPage";
import Homepage from "../Pages/User/Homepage";
import Checkout from "../Pages/User/Checkout/Checkout";
import AdminHomePage from "../Pages/Admin/AdminHomePage";
import ProductDetails from "../Pages/User/ProductDetails/ProductDetails";
import PrivateAdminRoute from "./ProtectedRouteHOC";
import Profile from "../Pages/User/Profile/Profile";
import Cart from "../Pages/User/Cart/Cart";
import Success from "../Pages/User/Payments/Success";
import Cancel from "../Pages/User/Payments/Cancel";
import NotFound from "../Pages/Notfound/NotFound";

const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<Loginpage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/" element={<Homepage />} />
      <Route path="/product-details/:productId" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart/>} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/success" element={<Success />} />
      <Route path="/cancel" element={<Cancel />} />
      <Route path="*" element={<NotFound/>} />


      <Route path="/profile" element={<Profile/>}/>

      <Route path="admin" element={<PrivateAdminRoute/>}>
        <Route path="adminHomepage" element={<AdminHomePage/>}/>
      </Route>
    </Routes>
  );
};

export default Router;
