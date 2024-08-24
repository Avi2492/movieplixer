import React from "react";
import { RiArrowLeftLine } from "@remixicon/react";
import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

const ErrorPage = () => {
  return (
    <>
      <div className="bg-black mx-auto w-full max-w-7xl px-2 md:px-4 h-screen text-white">
        <Navbar />
        <div className="my-12 flex items-center justify-center px-2 md:my-24 md:px-0">
          <div className="lg:flex lg:items-center lg:space-x-10">
            <img
              src="/error/errorbg.png"
              alt="question-mark"
              className="h-[300px] w-auto"
            />
            <div>
              <p className="mt-6 text-sm font-semibold text-orange-600">
                404 error
              </p>
              <h1 className="mt-3 text-2xl font-semibold text-orange-500 md:text-3xl">
                We can&apos;t find that page
              </h1>
              <p className="mt-4 text-orange-500">
                Sorry, the page you are looking for doesn&apos;t exist or has
                been moved.
              </p>
              <div className="mt-6 flex items-center space-x-3">
                <button
                  type="button"
                  className="inline-flex items-center rounded-md border border-orange-500 px-3 py-2 text-sm font-semibold text-orange-500 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
                >
                  <RiArrowLeftLine size={16} className="mr-2" />
                  Go back
                </button>
                <button
                  type="button"
                  className="rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500bg-orange-500"
                >
                  Contact us
                </button>
              </div>
            </div>
          </div>
        </div>
        <hr />
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default ErrorPage;
