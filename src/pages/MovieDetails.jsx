import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import SimilarMovies from "./SimilarMovies";
import Actors from "../components/Actors";
import { UserContext } from "../contexts/UserContext";

const apiUrl = "https://api.themoviedb.org/3";
const api_key = import.meta.env.VITE_TMDB_API_KEY;
const language = "tr-TR";

const MovieDetails = () => {
  const { id } = useParams(); //url'deki id'yi alır

  const [movie, setMovie] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { addToWatchList, watchList, removeFromWatchList } =
    useContext(UserContext);

  const isAdded = watchList?.find((i) => i.id == movie?.id); //

  useEffect(() => {
    async function getmovie() {
      setLoading(true);

      try {
        const response = await fetch(
          `${apiUrl}/movie/${id}?api_key=${api_key}&language=${language}&append_to_response=credits`,
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

        setMovie(data);
        setError("");
      } catch (error) {
        setError(error.message);
      }

      setLoading(false);
      window.scrollTo(0, 0); // sayfa yüklendiğinde sayfanın en üstüne gitmek için scrollTo kullanıyoruz. 0,0 koordinatları sayfanın en üstünü temsil eder.
    }

    getmovie();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <>
      <div
        className="text-white position-relative"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
        }}
      >
        <div className="img-overlay">
          <div className="container">
            <div className="row d-flex align-items-center justify-content-center min-vh-100">
              <div className="col-md-3 d-none d-lg-block">
                <img
                  src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  alt={movie.title}
                  className="img-fluid rounded shadow img-thumbnail"
                />
              </div>

              <div className="col-md-9">
                <h1 className="display-4">{movie.title}</h1>
                <p>
                  {movie.release_date} <i className="bi bi-dot text-white"></i>
                  <span className="text-white">
                    {movie.genres.map((genre) => genre.name).join(", ")}
                  </span>
                  <i className="bi bi-dot text-white"></i>
                  {movie.runtime} dk
                </p>
                <p>
                  <span className="badge bg-warning fs-6">
                    {Math.round(movie.vote_average * 10)} %
                  </span>

                  <span className="badge bg-danger fs-6 ms-2 pointer">
                    {isAdded ? (
                      <i
                        className="bi bi-heart-fill"
                        onClick={() => removeFromWatchList(movie)}
                      ></i>
                    ) : (
                      <i
                        className="bi bi-heart"
                        onClick={() => addToWatchList(movie)}
                      ></i>
                    )}
                  </span>
                </p>
                {movie.overview && (
                  <p className="lead">
                    <strong>Özet:</strong> {movie.overview}
                  </p>
                )}
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-start">
                  <p className="d-flex flex-column text-center">
                    <span>Yapımcı:</span>
                    <span>{movie.production_companies[0].name}</span>
                  </p>

                  <p className="d-flex flex-column text-center">
                    <span>Yönetmen:</span>
                    <span>{movie.credits.crew[0]?.name}</span>
                    {/*?.name yazmamızın sebebi bazı filmlerde yönetmen bilgisi olmayabiliyor ve bu durumda hata almamak için böyle yazıyoruz */}
                  </p>

                  <p className="d-flex flex-column text-center">
                    <span>Senarist:</span>
                    <span>{movie.credits.crew[1]?.name}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="container my-3
      ">
        <div className="card">
            <div className="card-header">
              <h3 className="card-title">Kadro</h3>
            </div>
            <div className="card-body">
          <div className="row">
            {movie.credits.cast.slice(0, 10).map((actor) => (
              <div className="col-3 text-center mb-2" key={actor.id}>
                <img
                  src={
                    actor.profile_path
                      ? "https://image.tmdb.org/t/p/w185/" + actor.profile_path
                      : ""
                  }
                  alt={actor.name}
                  className="img-fluid"
                />
                <p>{actor.name}</p>
              </div>
            ))}
            </div>
         
          </div>
        </div>
      </div> */}

      <Actors actors={movie.credits.cast} />

      <SimilarMovies movieId={id} />
    </>
  );
};
export default MovieDetails;
