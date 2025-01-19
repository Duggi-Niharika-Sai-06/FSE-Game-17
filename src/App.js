import React from "react";
import "./App.css";
import GameMenuController from "./Components/GameMenuController";
import { Typography } from "@mui/material";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Error from "./Components/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="mt-5">
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          style={{
            color: "#fff",
            textShadow: "2px 2px 4px rgba(255, 255, 255, 0.7)", // Add text shadow for a shiny effect
            fontFamily: "cursive", // Use a cursive font for a fancy look
            fontSize: "2.5rem", // Increase font size
            letterSpacing: "2px", // Add letter spacing for a fancy touch
          }}
          className="w-full"
        >
          Emojination: Memory Adventures
        </Typography>
        <GameMenuController />
      </div>
    ),
    errorElement: <Error />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
