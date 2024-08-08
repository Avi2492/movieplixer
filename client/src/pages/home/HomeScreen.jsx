/* eslint-disable no-unused-vars */
import React, { useState } from "react";

import Navbar from "../../components/Navbar.jsx";
import { Link } from "react-router-dom";
import { RiInformationLine, RiLoader2Line, RiPlayLine } from "@remixicon/react";
import useGetTrendingContent from "../../hooks/useGetTrendingContent.jsx";
import {
  MOVIE_CATEGORIES,
  ORIGINAL_IMG_BASE_URL,
  TV_CATEGORIES,
} from "../../utils/constants.js";
import { useContentStore } from "../../store/content.js";
import MovieSlider from "../../components/MovieSlider.jsx";
import Footer from "../../components/Footer.jsx";

const HomeScreen = () => {
  const { trendingContent } = useGetTrendingContent();

  const { contentType } = useContentStore();

  const [imageLoading, setImageLoading] = useState(true);

  if (!trendingContent) {
    return (
      <div className="h-screen text-white relative ">
        <Navbar />
        <div className="absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center -z-10 shimmer" />
      </div>
    );
  }
  return (
    <>
      <div className="h-screen relative text-white">
        <Navbar />

        {imageLoading && (
          <div className="absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center -z-10 shimmer" />
        )}

        <img
          src={ORIGINAL_IMG_BASE_URL + trendingContent?.backdrop_path}
          alt="hero-img"
          className="absolute top-0 left-0 w-full h-full object-cover -z-50"
          onLoad={() => {
            setImageLoading(false);
          }}
        />
        <div
          className="absolute top-0 left-0 w-full h-full bg-black/50 -z-50"
          aria-hidden="true"
        />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8 md:px-16 lg:px-32">
          <div className="bg-gradient-to-b from-black via-transparent to-transparent absolute w-full h-full top-0 left-0 -z-10" />

          <div className="max-w-2xl">
            <h1 className="text-6xl mt-36 font-extrabold text-balance">
              {trendingContent?.title || trendingContent?.name}
            </h1>

            <p className="mt-2 text-lg">
              {trendingContent?.release_date?.split("-")[0] ||
                trendingContent?.first_air_date?.split("-")[0]}{" "}
              | {trendingContent?.adult ? "18+" : "PG-13"}
            </p>

            <p className="mt-4 text-lg">
              {trendingContent?.overview.length > 200
                ? trendingContent?.overview.slice(0, 150) + "..."
                : trendingContent?.overview}
            </p>
          </div>

          <div className="flex mt-4">
            <Link
              to={`/watch/${trendingContent?.id}`}
              className="bg-white hover:bg-white/80 font-bold py-2 px-4 rounded mr-4 flex items-center text-black"
            >
              <RiPlayLine size={20} className="mr-2 text-black" /> Play
            </Link>
            <Link
              to={`/detail/${trendingContent?.id}`}
              className="bg-orange-500 hover:bg-orange-600 font-bold py-2 px-4 rounded mr-4 flex items-center text-white"
            >
              <RiInformationLine size={20} className="mr-2" /> Info
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-10 bg-black py-10">
        {contentType === "movie"
          ? MOVIE_CATEGORIES.map((category) => (
              <MovieSlider key={category} category={category} />
            ))
          : TV_CATEGORIES.map((category) => (
              <MovieSlider key={category} category={category} />
            ))}
      </div>
      <hr className="text-gray-700" />
      <Footer />
    </>
  );
};

export default HomeScreen;
