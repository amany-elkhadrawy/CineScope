const WATCHLIST_KEY = "cinescope_watchlist";

export function getWatchlist() {
  const savedMovies = localStorage.getItem(WATCHLIST_KEY);

  return savedMovies ? JSON.parse(savedMovies) : [];
}



export function saveWatchlist(movies) {
  localStorage.setItem(WATCHLIST_KEY, JSON.stringify(movies));
}




export function addToWatchlist(movie) {
  const movies = getWatchlist();
  const alreadySaved = movies.some(
    (savedMovie) => savedMovie.id === movie.id
  );

  if (alreadySaved) return movies;

  const updatedMovies = [...movies, movie];

  saveWatchlist(updatedMovies);

  return updatedMovies;
}


export function removeFromWatchlist(movieId) {
  const movies = getWatchlist();

  const updatedMovies = movies.filter(
    (movie) => movie.id !== movieId
  );

  saveWatchlist(updatedMovies);

  return updatedMovies;
}