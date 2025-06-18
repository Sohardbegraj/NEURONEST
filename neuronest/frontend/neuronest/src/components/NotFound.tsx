import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 text-white px-6">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold tracking-widest animate-pulse text-red-400">
          404
        </h1>
        <h2 className="text-3xl mt-4 font-semibold ">Page Not Found</h2> 
        <p className="mt-2 text-gray-300 text-lg">
          Oops! The page you're looking for doesn't exist.
        </p>

        <button
          onClick={() => navigate("/")}
          className="mt-6 px-6 py-3 bg-white text-gray-900 font-semibold rounded-xl shadow-lg hover:bg-gray-100 transition duration-300"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
