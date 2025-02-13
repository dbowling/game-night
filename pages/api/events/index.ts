import middleware from "middleware";
import { EventModel, UserModel } from "models";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import nextConnect from "next-connect";

const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.use(middleware);

// GET api/events
// Returns all events
handler.get(async (_, res) => {
  try {
    const events = await EventModel.find()
      .populate("eventHost", "name image")
      .populate("eventGuests", "name image")
      .populate("eventGame")
      .lean();
    res.json({
      success: true,
      message: "Successfully fetched all events",
      events,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Error fetching all events",
    });
  }
});

// POST api/events
// Adds a new event and returns the event
handler.post(async (req, res) => {
  const session = await getSession({ req });

  if (session) {
    try {
      const user = await UserModel.findById(session.user.id);
      const event = new EventModel({
        eventHost: {
          _id: session.user.id,
          name: user.name,
          image: user.image,
        },
        eventDateTime: req.body.eventDateTime,
        eventGame: req.body.gameId,
      });
      await event.save();
      res.status(201).json({
        success: true,
        message: "Successfully added event",
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || "Unable to add event",
      });
    }
  } else {
    res.status(401).json({ success: false, message: "Unauthorized user" });
  }
});

export default handler;
