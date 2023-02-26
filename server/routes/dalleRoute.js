import express from "express";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

router.route("/").get(async (req, res) => {
  res.send("DALL-E API running hello");
});

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;
    const aiResponse = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });

    const photo = aiResponse.data.data[0].b64_json;

    res.status(200).json({ image: photo });
  } catch (error) {
    console.log(error);
    res.status(500).send(error?.aiResponse?.data?.error?.message);
  }
});

export default router;
