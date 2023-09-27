import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div className="text-center mt-5">
      <h1 className="text-green-600 text-2xl font-bold mb-3">Payment Successful!</h1>
      <p className="text-gray-600 mb-5">Thank you for your order.</p>
      <Link to="/" className="text-blue-600 hover:underline">
        Go back to Home
      </Link>
    </div>
  );
};

export default Success;
