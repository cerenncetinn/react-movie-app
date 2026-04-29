import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";
import { movie_list } from "./data";
import { useState } from "react";
import Logo from "./components/Logo";
import Loading from "./components/Loading";
import ErrorMessage from "./components/ErrorMessage";
import SearchForm from "./components/SearchForm";
import WatchListButton from "./components/WatchListButton";
import MovieList from "./components/MovieList";
import WatchList from "./components/WatchList";
import { useEffect } from "react";
import MovieDetails from "./components/MovieDetails";

const api_key = import.meta.env.VITE_TMDB_API_KEY;
const page = 1;
const query = "batman";
const language = "tr-TR";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watchListMovies, setWatchListMovies] = useState([]);
  const [isWatchListOpen, setIsWatchListOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState(query);
  const [selectedMovie, setSelectedMovie] = useState(null);

  //mounting => ilk render edilme anı
  //re-render=>state değiştiğinde yeniden render edilme anı
  //unmount=>componentin DOM'dan kaldırılması

  useEffect(() => {
    async function getmovies() {
      setLoading(true);

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${searchQuery}&page=${page}&language=${language}`,
        );

        /*
  if(response.status ===404){
    throw new Error("Film bulunamadı");
  }
  else if (response.status ===401){
    throw new Error("API anahtarı hatalı veya geçersiz");
  }  
   else if (response.status ===500){
    throw new Error("Sunucu hatası,lütfen daha sonra tekrar deneyin");
  }  
  else if (response.status ===503){
    throw new Error("Servis geçici olarak kullanılamıyor, lütfen daha sonra tekrar deneyin");
  }  
    */
        if (!response.ok) {
          throw new Error("Hata oluştu");
        }

        const data = await response.json(); //responsedan gelen cevabı jsona çevirerek data içerisine alıyoruz

        if (data.results) {
          setMovies(data.results);
        }
        setError("");
      } catch (error) {
        setError(error.message);
      }

      setLoading(false);
    }

    if (searchQuery.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    getmovies();
  }, [searchQuery]);

  function handleAddToWatchList(movie) {
    const isAddedToList = watchListMovies.map((i) => i.id).includes(movie.id);

    if (!isAddedToList) {
      setWatchListMovies((movies) => [...movies, movie]);
    }
  }

  function handleRemoveWatchList(movie) {
    setWatchListMovies((movies) => movies.filter((i) => i.id !== movie.id));
  }

  function handleSelectedMovie(movie) {
    setSelectedMovie(movie);
    window.scrollTo(0, 0);
  }

  return (
    <>
      <Header>
        <Logo />
        <SearchForm searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <WatchListButton
          movies={watchListMovies}
          onSetIsWatchListOpen={setIsWatchListOpen}
        />
      </Header>

      <Main>
        {selectedMovie && (
          <MovieDetails
            movieObj={selectedMovie}
            onClose={() => setSelectedMovie(null)}
          />
        )}
        <WatchList
          movies={watchListMovies}
          isWatchListOpen={isWatchListOpen}
          onRemoveWatchList={handleRemoveWatchList}
        />

        {loading && <Loading />}
        {!loading && !error && (
          <MovieList
            movies={movies}
            onAddToList={handleAddToWatchList}
            onSelectedMovie={handleSelectedMovie}
          />
        )}
        {error && <ErrorMessage message={error} />}
      </Main>

      <Footer />
    </>
  );
}
