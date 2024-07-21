import cookieParser from "cookie-parser";
import express from "express";
import authRoutes from "./routes/auth.routes.js";
import movieRoutes from "./routes/movie.routes.js";
import tvRoutes from "./routes/tv.routes.js";
import searchRoutes from "./routes/search.routes.js";
// import wishlistRoutes from "./routes/wishlist.routes.js";

import { protectRoute } from "./middlewares/protectRoute.js";
import { ENV_VARS } from "./config/envVars.js";
import { connectToDb } from "./db/connectToDb.js";

const app = express();
const PORT = ENV_VARS.PORT;

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", protectRoute, movieRoutes);
app.use("/api/v1/tv", protectRoute, tvRoutes);
app.use("/api/v1/search", protectRoute, searchRoutes);
// app.use("/api/v1/wishlist", protectRoute, wishlistRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Movieplix API is Running" });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/`);
  connectToDb();
});
