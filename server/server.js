import express from "express";
import authRoutes from "./routes/auth.route.js";
import movieRoutes from "./routes/movie.routes.js";

import { protectRoute } from "./middlewares/protectRoute.js";
import tvRoutes from "./routes/tv.routes.js";
import { ENV_VARS } from "./config/envVars.js";
import { connectToDb } from "./db/connectToDb.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = ENV_VARS.PORT;

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", protectRoute, movieRoutes);
app.use("/api/v1/tv", protectRoute, tvRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Movieplix API is Running" });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/`);
  connectToDb();
});
