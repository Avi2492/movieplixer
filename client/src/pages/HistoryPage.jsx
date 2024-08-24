/* eslint-disable no-unreachable */
import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { SMALL_IMG_BASE_URL } from "../utils/constants";
import { formatDate } from "../utils/formatDate";
import toast from "react-hot-toast";
import { RiDeleteBinLine } from "@remixicon/react";

const HistoryPage = () => {
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    const getSearchHistory = async () => {
      try {
        const res = await axios.get("/api/v1/search/history");
        console.log(res);

        setSearchHistory(res.data.content);
      } catch (error) {
        setSearchHistory([]);
        throw new Error(error.message);
      }
    };

    getSearchHistory();
  }, []);

  const handleDelete = async (entry) => {
    try {
      await axios.delete(`/api/v1/search/history/${entry.id}`);
      setSearchHistory(searchHistory.filter((item) => item.id !== entry.id));

      toast.success("History Deleted!");
    } catch (error) {
      toast.error("Failed to delete search item");
    }
  };

  if (searchHistory?.length === 0) {
    return (
      <div className="bg-black min-h-screen text-white">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Search History</h1>
          <div className="flex justify-center items-center h-96">
            <p className="text-xl">No search history found</p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Search History</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {searchHistory?.map((entry) => (
            <div
              key={entry.id}
              className="bg-gray-800 p-4 rounded flex items-start"
            >
              <img
                src={SMALL_IMG_BASE_URL + entry.image}
                alt="history-img"
                className="size-16 rounded-full object-cover mr-4"
              />
              <div className="flex flex-col">
                <span className="text-white text-lg">{entry.title}</span>
                <span className="text-orange-500 text-sm">
                  {formatDate(entry.createdAt)}
                </span>
              </div>
              <span
                className={`py-1 px-3 min-w-20 text-center rounded-full text-sm  ml-auto ${
                  entry.searchType === "movie"
                    ? "bg-orange-500"
                    : entry.searchType === "tv"
                    ? "bg-blue-500"
                    : "bg-green-500"
                }`}
              >
                {entry.searchType[0].toUpperCase() + entry.searchType.slice(1)}
              </span>
              <RiDeleteBinLine
                className="ml-6 cursor-pointer hover:fill-orange-500 hover:text-orange-500"
                onClick={() => handleDelete(entry)}
                size={24}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
