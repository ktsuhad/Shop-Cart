import { Link } from "react-router-dom";

const Cancel = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-400 to-indigo-600">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">
          Cancellation Successful
        </h1>
        <p className="text-gray-600 mb-4">
          Your order has been successfully canceled. We're sorry to see you go.
        </p>
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

export default Cancel;
