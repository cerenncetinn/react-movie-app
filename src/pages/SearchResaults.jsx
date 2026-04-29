import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import MovieList from "../components/MovieList";
import { useSearchParams } from "react-router-dom";
import Pagination from "../components/Pagination";

const apiUrl = "https://api.themoviedb.org/3";
const api_key = "735dcfc6a94c64d7f6af071d2f0daa49";
const language = "tr-TR";

const SearchResults = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [seachParams, setSearchParams] = useSearchParams();
  const [totalPages, setTotalPages] = useState(0);

  const query = seachParams.get("q");
  const page = seachParams.get("page") || 1; //sayfalama için page parametresini alıyoruz, eğer yoksa varsayılan olarak 1 kullanıyoruz

  useEffect(() => {
    async function getmovies() {
      setLoading(true);
      try {
        const response = await fetch(
          `${apiUrl}/search/movie?api_key=${api_key}&query=${query}&page=${page}&language=${language}`,
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
          setTotalPages(data.total_pages); //toplam sayfa sayısını state'e kaydediyoruz
        }
        setError("");
      } catch (error) {
        setError(error.message);
      }

      setLoading(false);
    }

    getmovies();
  }, [seachParams]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <>
      <MovieList movies={movies} title={`Arama Sonuçları : ${query}`} />
     <Pagination page={page} setSearchParams={setSearchParams} query={query} totalPages={totalPages}/>
    </>
  );
};

export default SearchResults;
