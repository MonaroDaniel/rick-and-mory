import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import EpisodeDetails from "./pages/EpisodeDetails/EpisodeDetails";
import Home from "./pages/Home/Home";

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
    ]
  }
])

export { router };