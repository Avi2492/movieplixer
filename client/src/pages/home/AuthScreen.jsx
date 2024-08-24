/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../components/Logo";
import { RiArrowRightLine } from "@remixicon/react";
import Footer from "../../components/Footer.jsx";

const AuthScreen = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/signup?email=" + email);
  };
  return (
    <>
      <div className="hero-bg h-screen relative">
        <div className="px-4 py-4">
          <header className="max-w-6xl mx-auto flex items-center justify-between">
            <Link to={"/"}>
              <Logo />
            </Link>
            <Link
              to={"/login"}
              className="text-white bg-orange-500 py-1 px-2 rounded text-lg"
            >
              Sign In
            </Link>
          </header>
        </div>

        <div className="flex flex-col items-center justify-center text-center py-20 text-white max-w-6xl mx-auto">
          <p className="text-4xl md:text-6xl font-bold mb-4">
            Unlimited movies, TV shows, and more
          </p>
          <p className="text-lg mb-4">Watch anywhere. Cancel anytime.</p>
          <p className="mb-4">
            Ready to watch? Enter your email to create or restart your journey.
          </p>

          <form
            className="flex flex-col md:flex-row gap-4 w-1/2"
            onSubmit={handleSubmit}
          >
            <input
              type="email"
              className="p-2 rounded flex-1 bg-black/80 border border-gray-700"
              placeholder="Enter your email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="bg-orange-500 hover:bg-orange-600 text-lg lg:text-xl px-2 lg:px-6 py-1 md:py-2 rounded flex justify-center items-center gap-2">
              Get Started
              <RiArrowRightLine size={20} />
            </button>
          </form>
        </div>

        <div className="h-2 w-full bg-[#232323]" aria-hidden="true" />

        <div className="py-10 bg-black text-white">
          <div className="flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col px-4 md:px-2">
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
                Enjoy on your tv
              </h2>
              <p className="text-lg md:text-xl">
                Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV,
                Blu-ray players, and more.
              </p>
            </div>
            <div className="flex-1 relative">
              <img
                src="/assets/tv.png"
                className="mt-4 z-20 relative"
                alt="tv-img"
              />
              <video
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1/2 z-10"
                playsInline
                autoPlay={true}
                muted
                loop
              >
                <source src="/assets/hero-vid.m4v" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>

        <div className="h-2 w-full bg-[#232323]" aria-hidden="true" />

        <div className="py-10 bg-black text-white">
          <div className="flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col-reverse px-4 md:px-2">
            <div className="flex-1 relative">
              <div className="relative">
                <img
                  src="/assets/stranger-things-lg.png"
                  alt="Stranger Things img"
                  className="mt-4"
                />

                <div
                  className="flex items-center gap-2 absolute bottom-5 left-1/2 -translate-x-1/2 bg-black
              w-3/4 lg:w-1/2 h-24 border border-slate-500 rounded-md px-2
              "
                >
                  <img
                    src="/assets/stranger-things-sm.png"
                    alt="image"
                    className="h-full"
                  />
                  <div className=" flex justify-between items-center w-full">
                    <div className="flex flex-col gap-0">
                      <span className="text-md lg:text-lg font-bold">
                        Stranger Things
                      </span>
                      <span className="text-sm text-blue-500">
                        Downloading...
                      </span>
                    </div>

                    <img
                      src="/assets/download-icon.gif"
                      alt=""
                      className="h-12"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 md:text-left text-center">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-balance">
                Download your shows to watch offline
              </h2>
              <p className="text-lg md:text-xl">
                Save your favorites easily and always have something to watch.
              </p>
            </div>
          </div>
        </div>

        <div className="h-2 w-full bg-[#232323]" aria-hidden="true" />

        <div className="py-10 bg-black text-white">
          <div className="flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col px-4 md:px-2">
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
                Watch everywhere
              </h2>
              <p className="text-lg md:text-xl">
                Stream unlimited movies and TV shows on your phone, tablet,
                laptop, and TV.
              </p>
            </div>

            <div className="flex-1 relative overflow-hidden">
              <img
                src="/assets/device-pile.png"
                alt="Device image"
                className="mt-4 z-20 relative"
              />
              <video
                className="absolute top-2 left-1/2 -translate-x-1/2  h-4/6 z-10
               max-w-[63%] 
              "
                playsInline
                autoPlay={true}
                muted
                loop
              >
                <source src="/assets/video-devices.m4v" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>

        <div className="h-2 w-full bg-[#232323]" aria-hidden="true" />

        <div className="py-10 bg-black text-white">
          <div
            className="flex max-w-6xl mx-auto items-center justify-center flex-col-reverse md:flex-row
           px-4 md:px-2
        "
          >
            <div className="flex-1 relative">
              <img
                src="/assets/kids.png"
                alt="Enjoy on your TV"
                className="mt-4"
              />
            </div>

            <div className="flex-1 text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
                Create profiles for kids
              </h2>
              <p className="text-lg md:text-xl">
                Send kids on adventures with their favorite characters in a
                space made just for them—free with your membership.
              </p>
            </div>
          </div>
        </div>

        <div className="h-2 w-full bg-[#232323]" aria-hidden="true" />
        <Footer />
      </div>
    </>
  );
};

export default AuthScreen;
