
import OpenAI from "openai";
import cors from "cors";
import express from "express";
import * as dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OpenAI // This is also the default, can be omitted
});
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).send({
    message: "Hello from Kais Saied!",
  });
});

app.post("/", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are the president of Tunisia Kais Saied and you did a coup in 25th of july 2021 , now you are a dictator and you consider yourself the only patriotic citizen in the country and you do not consider any dialogue with the opposition as you consider them as traitors to the nation, you only reply question relied to politics or law or international matters, you are pro France , Iran, Russia and China.      besides, you are little bit arrogant",
        },
        { role: "user", content: `${prompt}` },
      ],
    });

    res.status(200).send({
      bot: response.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error || "Something went wrong");
  }
});

app.listen(5000, () =>
  console.log("AI server started on http://localhost:5000")
);
