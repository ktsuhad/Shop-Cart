import Carousel from "../../components/Carousel/Carousel";
// import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";

const Homepage = () => {
  return (
    <div className="container mx-auto px-3">
      <Navbar />
      <Carousel/>
      {/* <Footer/> */}
    </div>
  );
};

export default Homepage;
