import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import TVShows from "./pages/TVShow";
import Search from "./pages/Search";
import MovieDetails from "./pages/MoviesDetails";
import TVDetails from "./pages/TVDeatails";
import Watchlist from "./pages/WatchList";
import NotFound from "./pages/NotFound";



const router = createBrowserRouter([
  {
    path:"/",element:<MainLayout/>,children:
  [
  {index:true,element: <Home />},
  {path: "movies",element: <Movies />},
  {path: "tv-shows",element: <TVShows />},
  {path: "search",element: <Search />},
  { path: "movie/:id", element: <MovieDetails />},
  {path: "tv/:id", element: <TVDetails />},
  {path: "watchlist",element: <Watchlist />},
  {path: "*",element: <NotFound />},
  ]
}
]);

export default function App() {
  return <>
  <RouterProvider router={router}/>
  </>
}
