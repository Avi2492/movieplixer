import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContentStore } from "../store/content.js";
import axios from "axios";
import Navbar from "../components/Navbar.jsx";
import { RiArrowLeftLine, RiArrowRightLine } from "@remixicon/react";

const WatchPage = () => {
  const { id } = useParams();

  const [trailers, setTrailers] = useState([]);
  const [currentTrailerIdx, setCurrentTrailerIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState({});
  const [similarContent, setSimilarContent] = useState([]);
  const { contentType } = useContentStore();

  useEffect(() => {
    const getTrailers = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/videos`);

        setTrailers(res.data.trailers);
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

        setSimilarContent(res.data.similar);
      } catch (error) {
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

  return (
    <div className="bg-black text-orange-500 min-h-screen">
      <div className="mx-auto container px-4 h-full">
        <Navbar />

        {trailers?.length > 0 && (
          <div className="flex justify-between items-center mb-4">
            <button
              className={`bg-orange-200 hover:bg-orange-300 text-orange-600 py-2 px-4 rounded ${
                currentTrailerIdx === 0 ? "cursor-not-allowed opacity-50" : ""
              }`}
              disabled={currentTrailerIdx === 0}
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
            >
              <RiArrowRightLine size={24} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchPage;
