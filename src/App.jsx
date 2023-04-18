import { useState } from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Error } from "./routes/Error";
import Gallery from "./routes/Gallery";
import GalleryItem from "./routes/GalleryItem";
import Generator from "./routes/Generator";
import GeneratorFlower from "./routes/GeneratorFlower";
import Home from "./routes/Home";
import Landing from "./routes/Landing";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
    children: [
      {
        path: "landing",
        element: <Landing />,
      },
      {
        path: "generator",
        element: <Generator />,
      },
      {
        path: "generator-flower",
        element: <GeneratorFlower />,
      },
      {
        path: "gallery",
        element: <Gallery />,
      },
      {
        path: "gallery/:artworkId",
        element: <GalleryItem />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="App" style={{ height: "100vh" }}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
