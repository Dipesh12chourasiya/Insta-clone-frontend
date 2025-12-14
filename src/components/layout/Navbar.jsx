import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { removeToken, getUser } from "../../utils/token";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const user = getUser();

  const handleLogout = () => {
    removeToken();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md px-4 py-3 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-purple-600">
          Instagram
        </Link>

        {/* Desktop wale Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-gray-700 hover:text-purple-600">
            Home
          </Link>

          <Link to="/create-post" className="text-gray-700 hover:text-purple-600">
            Create
          </Link>

          <Link to="/search" className="text-gray-700 hover:text-purple-600">
            Search
          </Link>

          {user ? (
            <>
              <Link
                to={`/profile/${user._id}`}
                className="text-gray-700 hover:text-purple-600"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="text-red-500 hover:text-red-600 font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="text-purple-600 hover:text-purple-600">
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu wale Button */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden mt-4 space-y-2">
          <Link to="/" onClick={() => setOpen(false)} className="block px-2 py-1">
            Home
          </Link>

          <Link to="/create-post" onClick={() => setOpen(false)} className="block px-2 py-1">
            Create
          </Link>

          <Link to="/search" onClick={() => setOpen(false)} className="block px-2 py-1">
            Search
          </Link>

          {user ? (
            <>
              <Link
                to={`/profile/${user._id}`}
                onClick={() => setOpen(false)}
                className="block px-2 py-1"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block px-2 py-1 text-red-500"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="block px-2 py-1 text-purple-600"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
