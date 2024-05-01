import React from "react";

const NotFound: React.FC = () => {
  return (
    <div
      className="flex items-center justify-center h-screen"
      style={{
        background: `linear-gradient(
                     180deg,
                     rgba(0, 41, 76, 0.75),
                     rgba(0, 41, 76, 0.75)
                 ), url('../../../assets/bwh-exterior-default.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="text-center p-10">
        <h1 className="text-8xl font-extrabold text-white mb-4">404</h1>
        <p className="text-2xl font-semibold text-white mb-8">Page Not Found</p>
        <p className="text-lg text-white mb-10">
          The page you are looking for does not exist. It might have been moved
          or deleted.
        </p>
        <a
          href="/"
          className="text-xl font-semibold text-white bg-blue-600 px-6 py-3 rounded shadow hover:bg-blue-700 transition duration-200"
        >
          Go Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
