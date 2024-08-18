import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useContentStore } from "../store/content";
import axios from "axios";
import Navbar from "../components/Navbar";
import { RiArrowLeftLine, RiArrowRightLine } from "@remixicon/react";
import ReactPlayer from "react-player";
import { formatReleaseDate } from "../utils/dateFunction";
import { SMALL_IMG_BASE_URL } from "../utils/constants";
import WatchPageSkeleton from "../components/skeltons/WatchPageSkeleton";

const WatchPage = () => {
  const { id } = useParams();

  const [trailers, setTrailers] = useState([]);
  const [currentTrailerIdx, setCurrentTrailerIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState({});
  const [similarContent, setSimilarContent] = useState([]);
  const { contentType } = useContentStore();

  const sliderRef = useRef(null);

  useEffect(() => {
    const getTrailers = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/videos`);

        setTrailers(res.data.videos);
      } catch (error) {
        if (error.message.includes("404")) {
          setTrailers([]);
        }
      }
    };
    getTrailers();
  }, [contentType, id]);

  useEffect(() => {
    const getSimilarContent = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/similar`);

        setSimilarContent(res.data.content);
      } catch (error) {
        // console.log(error.message);

        if (error.message.includes("404")) {
          setSimilarContent([]);
        }
      }
    };
    getSimilarContent();
  }, [contentType, id]);

  useEffect(() => {
    const getContentDetails = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/details`);

        setContent(res.data.content);
      } catch (error) {
        if (error.message.includes("404")) {
          setContent(null);
        }
      } finally {
        setLoading(false);
      }
    };
    getContentDetails();
  }, [contentType, id]);

  // console.log("Trailers: ", trailers);
  // console.log("Similar Content: ", similarContent);
  // console.log("Content: ", content);

  const handleNext = () => {
    if (currentTrailerIdx < trailers.length - 1)
      setCurrentTrailerIdx(currentTrailerIdx + 1);
  };

  const handlePrev = () => {
    if (currentTrailerIdx > 0) setCurrentTrailerIdx(currentTrailerIdx - 1);
  };

  const scrollLeft = () => {
    if (sliderRef.current)
      sliderRef.current.scrollBy({
        left: -sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
  };
  const scrollRight = () => {
    if (sliderRef.current)
      sliderRef.current.scrollBy({
        left: sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black p-10">
        <WatchPageSkeleton />
      </div>
    );
  }

  if (!content) {
    return (
      <div className="bg-black text-white h-screen">
        <div className="max-w-6xl mx-auto">
          <Navbar />
          <div className="text-center mx-auto px-4 py-8 h-full mt-40">
            <h2 className="text-2xl sm:text-5xl font-bold text-balance">
              Content not found 😥
            </h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-orange-500 min-h-screen">
      <div className="mx-auto container px-4 h-full py-4">
        <Navbar />

        {trailers?.length > 0 && (
          <div className="flex justify-between items-center mb-4">
            <button
              className={`bg-orange-200 hover:bg-orange-300 text-orange-600 py-2 px-4 rounded ${
                currentTrailerIdx === 0 ? "cursor-not-allowed opacity-50" : ""
              }`}
              disabled={currentTrailerIdx === 0}
              onClick={handlePrev}
            >
              <RiArrowLeftLine size={24} />
            </button>
            <button
              className={`bg-orange-200 hover:bg-orange-300 text-orange-600 py-2 px-4 rounded ${
                currentTrailerIdx === trailers?.length - 1
                  ? "cursor-not-allowed opacity-50"
                  : ""
              }`}
              disabled={currentTrailerIdx === trailers?.length - 1}
              onClick={handleNext}
            >
              <RiArrowRightLine size={24} />
            </button>
          </div>
        )}
        <div className="aspect-video mb-8 p-2 sm:px10 md:px-32">
          {trailers.length > 0 && (
            <ReactPlayer
              controls={true}
              width={"100%"}
              height={"70vh"}
              className="mx-auto overflow-hidden rounded-lg"
              url={`https://www.youtube.com/watch?v=${trailers[currentTrailerIdx].key}`}
            />
          )}

          {trailers.length === 0 && (
            <h2 className="text-xl text-center mt-5">
              No trailers available for{" "}
              <span className="font-bold text-orange-600">
                {content?.title || content?.name}
              </span>{" "}
              😥
            </h2>
          )}
          <div className="flex flex-col md:flow-row items-center justify-between gap-20 max-w-4xl mx-auto mt-10">
            <div className="mb-8 md:mb-0">
              <h2 className="text-5xl font-bold text-balance">
                {content?.title || content?.name}
              </h2>
              <p className="mt-2 text-lg">
                {formatReleaseDate(
                  content?.release_date || content?.first_air_date
                )}{" "}
                |{" "}
                {content?.adult ? (
                  <span className="text-orange-600">18+</span>
                ) : (
                  <span className="text-green-600">PG-13</span>
                )}{" "}
              </p>
              <p className="mt-4 text-lg text-white">{content?.overview}</p>
            </div>
            {/* <img
              src={ORIGINAL_IMG_BASE_URL + content.poster_path}
              alt="Poster image"
              className="max-h-[200px]"
            /> */}
          </div>
        </div>
        {similarContent.length > 0 && (
          <div className="mt-12 max-w-5xl mx-auto relative">
            <h3 className="font-bold mb-4 text-3xl">Similar Movies/Tv Shows</h3>
            <div
              className="flex overflow-x-scroll scrollbar-hide gap-4 pb-4 group"
              ref={sliderRef}
            >
              {similarContent.map((item) => (
                <Link
                  to={`/watch/${item.id}`}
                  key={item.id}
                  className="w-52 flex-none"
                >
                  <img
                    src={SMALL_IMG_BASE_URL + item.poster_path}
                    alt="similar-img"
                    className="w-full h-full rounded-md"
                  />
                  {/* <h4 className="mt-2 text-lg font-semibold">
                    {content.title || content.name}
                  </h4> */}
                </Link>
              ))}

              <RiArrowRightLine
                className="absolute top-1/2 -translate-y-1/2 right-2 w-8 h-8
										opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer
										 bg-orange-600 text-white rounded-full"
                onClick={scrollRight}
              />
              <RiArrowLeftLine
                className="absolute top-1/2 -translate-y-1/2 left-2 w-8 h-8 opacity-0 
								group-hover:opacity-100 transition-all duration-300 cursor-pointer bg-orange-600 
								text-white rounded-full"
                onClick={scrollLeft}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchPage;
