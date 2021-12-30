import Cors from "cors";
import { NextApiRequest, NextApiResponse } from "next";

import Genius from "genius-lyrics";
const Client = new Genius.Client(process.env.NEXT_PUBLIC_GENIUS_KEY);

// Initializing the cors middleware
const cors = Cors({
  methods: ["GET", "HEAD"],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Run the middleware
  await runMiddleware(req, res, cors);

  const searches = await Client.songs.search(req.query.song as string);

  const song = searches[0];
  const lyrics = await song.lyrics();

  res.json({ lyrics });
}

export default handler;
