import express from "express";
import {
  getMovieDetails,
  getMoviesByCategory,
  getMovieVideos,
  getSimilarMovies,
  getTrendingMovie,
} from "../controllers/movie.controller.js";

const router = express.Router();

router.get("/trending", getTrendingMovie);
router.get("/:id/videos", getMovieVideos);
router.get("/:id/details", getMovieDetails);
router.get("/:id/similar", getSimilarMovies);
router.get("/:category", getMoviesByCategory);

export default router;
