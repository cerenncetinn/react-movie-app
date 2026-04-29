import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import MovieList from "../components/MovieList";

const apiUrl = "https://api.themoviedb.org/3";
const api_key = "735dcfc6a94c64d7f6af071d2f0daa49";
const page = 1;
const language = "tr-TR";

const SimilarMovies = ({ movieId }) => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getmovies() {
      try {
        const response = await fetch(
          `${apiUrl}/movie/${movieId}/similar?api_key=${api_key}&page=${page}&language=${language}`,
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

    getmovies();
  }, [movieId]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return <MovieList movies={movies} title="Benzer Filmler" />;
};

export default SimilarMovies;
