import { useState } from "react";
import { Grommet } from "grommet";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Error } from "./routes/Error";
import Gallery from "./routes/Gallery";
import GalleryItem from "./routes/GalleryItem";
import Generator from "./routes/Generator";
import GeneratorFlower from "./routes/GeneratorFlower";
import Home from "./routes/Home";
import Landing from "./routes/Landing";
import Theme from "./components/Theme";

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
        path: "generator/:monumentName",
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
      <Grommet full theme={Theme}>
        <RouterProvider router={router} />
      </Grommet>
    </div>
  );
}

export default App;
