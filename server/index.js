import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import dalleRoute from "./routes/dalleRoute.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(
  express.json({
    limit: "50mb",
  })
);

const PORT = process.env.PORT || 8080;

app.get("/", async (req, res) => {
  res.send("DALL-E API running");
});

app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dalle", dalleRoute);

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
