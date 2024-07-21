import express from "express";
import authRoutes from "./routes/auth.route.js";
import movieRoutes from "./routes/movie.routes.js";
import tvRoutes from "./routes/tv.routes.js";
import { ENV_VARS } from "./config/envVars.js";
import { connectToDb } from "./db/connectToDb.js";

const app = express();
const PORT = ENV_VARS.PORT;

app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", movieRoutes);
app.use("/api/v1/tv", tvRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Movieplix API is Running" });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/`);
  connectToDb();
});
