import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-16 h-16 mx-auto text-green-500"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
          <path
            className="text-green-500"
            fill="currentColor"
            d="M8 14.75l1.768 1.768L16.232 10"
          />
        </svg>
        <h1 className="text-3xl font-semibold text-gray-800 my-4">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-6">Thank you for your order.</p>
        <Link
          to="/"
          className="text-blue-600 hover:underline font-semibold text-lg"
        >
          Go back to Home
        </Link>
      </div>
    </div>
  );
};

export default Success;
