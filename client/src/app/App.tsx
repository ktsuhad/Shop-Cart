import { BrowserRouter } from "react-router-dom";

import UserRouter from "../Router/UserRouter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <UserRouter />
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
