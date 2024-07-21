import { fetchFromTMDB } from "../services/tmdb.services.js";

export async function getTrendingTvShow(req, res) {
  try {
    const data = await fetchFromTMDB(
      "https://api.themoviedb.org/3/trending/tv/day?language=en-US"
    );

    const randomShow =
      data.results[Math.floor(Math.random() * data.results?.length)];

    res.status(200).json({
      success: true,
      content: randomShow,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error in Get Trend Show" });
  }
}

export async function getTvVideos(req, res) {
  const { id } = req.params;

  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`
    );

    res.status(200).json({
      success: true,
      videos: data.results,
    });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }
    res.status(500).json({ message: "Internal Server Error in Get Video" });
  }
}

export async function getTvShowDetails(req, res) {
  const { id } = req.params;

  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}?language=en-US`
    );

    res.status(200).json({
      success: true,
      content: data,
    });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }
    res.status(500).json({ message: "Internal Server Error in Details" });
  }
}

export async function getSimilarTvShows(req, res) {
  const { id } = req.params;

  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`
    );

    res.status(200).json({
      success: true,
      content: data.results,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error in Details" });
  }
}

export async function getTvShowsByCategory(req, res) {
  const { category } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`
    );

    res.status(200).json({
      success: true,
      content: data.results,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error in Category" });
  }
}
