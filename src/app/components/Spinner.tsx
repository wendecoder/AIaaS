import React from "react";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-24 w-24 border-t-8 border-black-500"></div>
    </div>
  );
};

export default Spinner;