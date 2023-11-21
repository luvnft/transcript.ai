import express from "express"; 
import dotenv from "dotenv";
import cors from "cors"
import { transcribe } from "./transcribe";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.send("Transcription.ai Express Server Running!")
});

app.post("/submit", handleSubmit);

app.listen(PORT, () => {
  console.log(`[server]: Server is running on ${PORT}`);
});

async function handleSubmit(req: any, res: any): Promise<void> {
  const { link } = req.body;
  try {
    const { text, summary, title, tags, chapters }= await transcribe(link); 
    res.send({ text, summary, title, tags, chapters });
  } catch (error) {
    console.error('Error in processing the request:', error);
    res.status(500).send({ error: 'An error occurred while processing your request. Please try again later.' });
  }
}