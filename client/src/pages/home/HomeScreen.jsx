import React from "react";

import Navbar from "../../components/Navbar.jsx";
import { Link } from "react-router-dom";
import { RiInformationLine, RiPlayLine } from "@remixicon/react";
import useGetTrendingContent from "../../hooks/useGetTrendingContent.jsx";

const HomeScreen = () => {
  const { trendingContent } = useGetTrendingContent();
  return (
    <>
      <div className="h-screen relative text-white">
        <Navbar />

        <img
          src="/assets/extraction.jpg"
          alt="hero-img"
          className="absolute top-0 left-0 w-full h-full object-cover -z-50"
        />
        <div
          className="absolute top-0 left-0 w-full h-full bg-black/50 -z-50"
          aria-hidden="true"
        />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8 md:px-16 lg:px-32">
          <div className="bg-gradient-to-b from-black via-transparent to-transparent absolute w-full h-full top-0 left-0 -z-10" />

          <div className="max-w-2xl">
            <h1 className="mt-4 text-6xl font-extrabold text-balance">
              Extraction
            </h1>

            <p className="mt-2 text-lg">2014 | 18+</p>

            <p className="mt-4 text-lg">
              A former DEA agent moves his family to a quiet town, where he soon
            </p>
          </div>

          <div className="flex mt-8">
            <Link
              to={"/watch/123"}
              className="bg-white hover:bg-white/80 font-bold py-2 px-4 rounded mr-4 flex items-center text-black"
            >
              <RiPlayLine size={20} className="mr-2 text-black" /> Play
            </Link>
            <Link
              to={"/watch/123"}
              className="bg-orange-500 hover:bg-orange-600 font-bold py-2 px-4 rounded mr-4 flex items-center text-white"
            >
              <RiInformationLine size={20} className="mr-2" /> Info
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeScreen;
