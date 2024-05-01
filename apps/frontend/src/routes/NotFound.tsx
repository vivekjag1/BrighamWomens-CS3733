import React from "react";

const NotFound: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <p className="text-2xl font-semibold text-gray-800 mt-2">
          Page Not Found
        </p>
        <p className="mt-4 text-gray-600">
          The page you are looking for does not exist. It might have been moved
          or deleted.
        </p>
        <a
          href="/"
          className="mt-6 inline-block text-white bg-blue-500 px-6 py-2 rounded shadow hover:bg-blue-600 transition duration-200"
        >
          Go Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
