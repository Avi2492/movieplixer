import React from "react";
import { Link } from "react-router-dom";
import {
  RiHeartFill,
  // RiLinkedinLine,
  // RiMailLine,
  // RiYoutubeLine,
} from "@remixicon/react";
import Logo from "./Logo";

const Footer = () => {
  return (
    <>
      <section className="relative overflow-hidden bg-black text-white py-4">
        <div className="container relative z-10 mx-auto px-4">
          <div className="-m-8 flex flex-wrap items-center justify-between">
            <div className="w-auto p-8">
              <Link to={"/"}>
                <div className="inline-flex items-center">
                  <Logo />
                </div>
              </Link>
            </div>
            <div className="w-auto p-8">
              <ul className="-m-5 flex flex-wrap items-center">
                <li className="p-5 flex items-center gap-1">
                  Made with <RiHeartFill color="red" size={20} />{" "}
                  {new Date().getFullYear()} by{" "}
                  <span className="text-xl font-bold">
                    spheri<span className="text-orange-600">soft</span>
                  </span>
                </li>
              </ul>
            </div>
            {/* <div className="w-auto p-8">
              <div className="-m-1.5 flex flex-wrap">
                <div className="w-auto p-1.5">
                  <Link to={"/"}>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 hover:border-gray-400">
                      <RiYoutubeLine size={20} />
                    </div>
                  </Link>
                </div>
                <div className="w-auto p-1.5">
                  <Link to={"/"}>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 hover:border-gray-400">
                      <RiLinkedinLine size={20} />
                    </div>
                  </Link>
                </div>
                <div className="w-auto p-1.5">
                  <Link to={"/"}>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 hover:border-gray-400">
                      <RiMailLine size={20} />
                    </div>
                  </Link>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Footer;
