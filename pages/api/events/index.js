import { Restaurant } from "@material-ui/icons";
import nextConnect from "next-connect";
import middleware from "../../../middleware";
import Event from "../../../models/Event";

const handler = nextConnect();

handler.use(middleware);

handler
  // GET api/events
  // Returns all events
  .get(async (_, res) => {
    const events = await Event.find({})
      .populate("game host guests")
      .sort({ eventDateTime: "asc" });
    if (events) {
      res.status(200).json(events);
    } else {
      res.status(400).json({ message: "Events not found" });
    }
  })
  // POST api/events
  // Adds a new event and returns the event
  .post(async (req, res) => {
    if (req.user) {
      const event = new Event({
        host: req.user,
        eventDateTime: req.body.eventDateTime,
        game: req.body.gameId,
      });
      event.save((error, savedEvent) => {
        if (error)
          return res
            .status(400)
            .json(error.message || { message: "Unable to add event" });
        res.status(201).json(savedEvent);
      });
    } else {
      res.status(400).json({ message: "Unauthorized user" });
    }
  });

export default handler;
