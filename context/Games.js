import axios from "axios";
import React, { createContext, useContext, useReducer } from "react";
import { AlertContext } from "../context/Alert";
import { reducer } from "./GamesReducer";

const initialState = {
  games: null,
};

export const GamesContext = createContext(initialState);

export const GamesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { createAlertWithMessage } = useContext(AlertContext);

  const addGame = async (gameToAdd) => {
    try {
      const response = await axios.post("/api/games", gameToAdd);
      createAlertWithMessage(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };
  const getAllGames = async () => {
    try {
      const response = await axios.get("/api/games");
      if (response.data.success) {
        dispatch({
          type: "GET_GAMES_LIST_SUCCESSFUL_WITH_GAMES",
          games: response.data.games,
        });
      } else {
        createAlertWithMessage(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  GamesContext.displayName = "Games";

  return (
    <GamesContext.Provider
      value={{
        games: state.games,
        addGame,
        getAllGames,
      }}
    >
      {children}
    </GamesContext.Provider>
  );
};
