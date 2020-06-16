// Interfaces with the BoardGameGeek API2 and returns a list of games from a query
// by calling the bggFetchGameById function for each result
import { bggFetchGameById } from "./bggFetchGameById";
const axios = require("axios").default;
const parser = require("fast-xml-parser");

export const bggFetchGamesByQuery = async (query) => {
  const { data } = await axios.get(
    // https://boardgamegeek.com/wiki/page/BGG_XML_API2
    `https://api.geekdo.com/xmlapi2/search?query=${query}&type=boardgame`
  );

  // https://github.com/NaturalIntelligence/fast-xml-parser
  // Make sure we have parseable data
  if (parser.validate(data) === true) {
    const {
      items: { item: games },
    } = parser.parse(data, {
      attributeNamePrefix: "",
      ignoreAttributes: false,
      parseAttributeValue: true,
    });

    return games.map(async (game) => await bggFetchGameById(game.id));
  } else {
    // Return an array of one item with bggId of 0, so the front end doesn't get angry
    return [
      {
        bggId: 0,
      },
    ];
  }
};
