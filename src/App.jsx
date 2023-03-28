import { useState } from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Error } from "./routes/Error";
import Gallery from "./routes/Gallery";
import GalleryItem from "./routes/GalleryItem";
import Generator from "./routes/Generator";
import GeneratorFlower from "./routes/GeneratorFlower";
import Home from "./routes/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
    children: [
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
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
