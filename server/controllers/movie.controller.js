import { fetchFromTMDB } from "../services/tmdb.services.js";

export async function getTrendingMovie(req, res) {
  try {
    const data = await fetchFromTMDB(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US"
    );

    const randomMovie =
      data.results[Math.floor(Math.random() * data.results?.length)];

    res.status(200).json({
      success: true,
      content: randomMovie,
    });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ message: "Internal Server Error in Get Trend Movie" });
  }
}

export async function getMovieVideos(req, res) {
  const { id } = req.params;

  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`
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

export async function getMovieDetails(req, res) {
  const { id } = req.params;

  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`
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

export async function getSimilarMovies(req, res) {
  const { id } = req.params;

  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`
    );

    res.status(200).json({
      success: true,
      content: data.results,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error in Details" });
  }
}

export async function getMoviesByCategory(req, res) {
  const { category } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`
    );

    res.status(200).json({
      success: true,
      content: data.results,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error in Category" });
  }
}
