import React from "react";

const SimpleLayout = ({ children }) => {
  return (
    <div className="2xl:max-w-475 h-screen flex flex-col mx-auto relative bg-blue-50">
      <main className="py-10 px-4 w-full flex items-center justify-center md:flex-5 xl:flex-4">{children}</main> 
    </div>
  );
};

export default SimpleLayout;
