import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="flex justify-between items-center py-6 px-10 bg-blue-800">
      <div>
        <Link className="active:scale-95" to="/">
          <h2 className="font-medium text-2xl">Media Send</h2>
        </Link>
      </div>

      <div className="flex gap-5 items-center">
        <Link
          className="text-base font-medium active:scale-95 bg-white text-black rounded px-4 py-2"
          to="/"
        >
          Search
        </Link>
        <Link
          className="text-base font-medium active:scale-95 bg-white text-black rounded px-4 py-2"
          to="/collection"
        >
          Collection
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
