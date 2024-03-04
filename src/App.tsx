import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import EpisodeDetails from "./pages/EpisodeDetails/EpisodeDetails";
import Home from "./pages/Home/Home";
import Favorites from "./pages/Favorites/Favorites";
import NotFound from "./pages/NotFound/NotFound";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/episodes/:id',
        element: <EpisodeDetails />
      },
      {
        path: '/favorites',
        element: <Favorites />
      },
      {
        path: '*',
        element: <NotFound />
      },
    ]
  }
])

export { router };