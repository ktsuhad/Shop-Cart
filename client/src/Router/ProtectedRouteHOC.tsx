import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Axiosinstance from "../Services/axiosInstance";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

const PrivateAdminRoute = () => {
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const authCheck = async () => {
      try {
        setLoading(true);
        const { data } = await Axiosinstance.get(`/admin-auth`);
        if (data && data.isAdmin) {
          setOk(true);
          setLoading(false);
        } else {
          setLoading(false);
          setOk(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    if (token) {
      authCheck();
    } else {
      setLoading(false);
      navigate("/login");
    }
  }, [token, navigate]);

  if (loading) {
    return <LoadingSpinner />; // Use <LoadingSpinner /> to render the component
  }

  if (!ok) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-500 text-white p-4 rounded-lg shadow-lg">
          Access Denied! You do not have permission to access this section.
        </div>
      </div>
    );
  }

  return <Outlet />;
};

export default PrivateAdminRoute;
