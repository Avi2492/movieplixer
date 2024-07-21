import express from "express";
import {
  getSimilarTvShows,
  getTrendingTvShow,
  getTvShowDetails,
  getTvShowsByCategory,
  getTvVideos,
} from "../controllers/tv.controller.js";

const router = express.Router();

router.get("/trending", getTrendingTvShow);
router.get("/:id/videos", getTvVideos);
router.get("/:id/details", getTvShowDetails);
router.get("/:id/similar", getSimilarTvShows);
router.get("/:category", getTvShowsByCategory);

export default router;
