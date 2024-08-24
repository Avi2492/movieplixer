import { useState } from "react";
import { Link } from "react-router-dom";
import { RiLogoutBoxRLine, RiMenuLine, RiSearchLine } from "@remixicon/react";
import { useAuthStore } from "../store/authUser.js";
import Logo from "./Logo";
import { useContentStore } from "../store/content.js";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { user, logout } = useAuthStore();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const { setContentType } = useContentStore();

  return (
    <>
      <header className="max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20">
        <div className="flex items-center gap-10 z-50">
          <Link to={"/"}>
            <Logo />
          </Link>
          <div className="hidden sm:flex gap-2 items-center">
            <Link
              to={"/"}
              className="hover:underline"
              onClick={() => setContentType("movie")}
            >
              Movies
            </Link>
            <Link
              to={"/"}
              className="hover:underline"
              onClick={() => setContentType("tv")}
            >
              Tv Shows
            </Link>
            <Link to={"/history"} className="hover:underline">
              Search History
            </Link>
            <Link to={"/likes"} className="hover:underline">
              Watch List
            </Link>
            <Link to={"/subscription"} className="block p-2 hover:underline">
              Subscription
            </Link>
          </div>
        </div>

        <div className="flex gap-2 items-center z-50">
          <Link to={"/search"} className="hover:underline">
            <RiSearchLine size={20} className="cursor-pointer" />
          </Link>
          <Link to={"/profile"}>
            <img
              src={user?.image}
              alt="avatar"
              className="h-8 rounded cursor-pointer"
            />
          </Link>
          <RiLogoutBoxRLine
            size={20}
            onClick={logout}
            className="cursor-pointer"
          />

          <div className="sm:hidden">
            <RiMenuLine
              size={20}
              onClick={toggleMenu}
              className="cursor-pointer"
            />
          </div>
        </div>

        {isOpen && (
          <div className="w-full sm:hidden mt-4 z-50 bg-black border rounded border-gray-800">
            <Link to={"/"} className="block p-2 hover:underline">
              Movies
            </Link>
            <Link to={"/"} className="block p-2 hover:underline">
              Tv Shows
            </Link>
            <Link to={"/history"} className="block p-2 hover:underline">
              Search History
            </Link>
            <Link to={"/likes"} className="block p-2 hover:underline">
              Watch List
            </Link>
            <Link to={"/subscription"} className="block p-2 hover:underline">
              Subscription
            </Link>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;

// testing account -> foromo9066@fuzitea.com 1234567890
