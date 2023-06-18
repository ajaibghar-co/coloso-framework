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
import Onboarding from "./routes/Onboarding";
import About from "./routes/About";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
    errorElement: <Error />,
  },
  {
    path: "/onboarding",
    element: <Onboarding />,
    errorElement: <Error />,
  },
  {
    path: "/factory/",
    element: <Generator />,
  },
  {
    path: "/factory/:monumentName",
    element: <Generator />,
  },
  {
    path: "/warehouse/",
    element: <GalleryItem />,
  },
  {
    path: "/warehouse/:artworkId",
    element: <GalleryItem />,
  },
  {
    path: "/about",
    element: <About />,
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
