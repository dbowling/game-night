import middleware from "middleware";
import { GameModel } from "models";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import nextConnect from "next-connect";

const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.use(middleware);

// GET api/games
// Returns all games
handler.get(async (_, res) => {
  try {
    const games = await GameModel.find().sort({ numOfRatings: "desc" }).lean();
    res.json({
      success: true,
      message: "Successfully fetched all games",
      games,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Games not found",
    });
  }
});

// POST api/games
// Adds game and returns the game
handler.post(async (req, res) => {
  const session = await getSession({ req });

  if (session) {
    try {
      const game = new GameModel({
        name: req.body.name,
        imageSrc: req.body.imageSrc,
        thumbnailSrc: req.body.thumbnailSrc,
        description: req.body.description,
        authors: req.body.authors,
        categories: req.body.categories,
        gameMechanics: req.body.gameMechanics,
        bggId: req.body.bggId,
        yearPublished: req.body.yearPublished,
        minPlayers: req.body.minPlayers,
        maxPlayers: req.body.maxPlayers,
        playingTime: req.body.playingTime,
        minAge: req.body.minAge,
        rating: req.body.rating,
        numOfRatings: req.body.numOfRatings,
      });
      const savedGame = await game.save();
      res.status(201).json({
        success: true,
        message: "Successfully added game",
        game: savedGame,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || "Unable to add game",
      });
    }
  } else {
    res.status(401).json({ success: false, message: "Unauthorized user" });
  }
});

export default handler;
