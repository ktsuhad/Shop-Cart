import { BrowserRouter, Route, Routes } from "react-router-dom"
import Loginpage from "./Pages/Loginpage"
import SignupPage from "./Pages/SignupPage"

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Loginpage/>}/>
        <Route path="/signup" element={<SignupPage/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
