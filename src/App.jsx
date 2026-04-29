import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';
import Home from './pages/home';
import Movies from './pages/Movies';
import MovieDetails from './pages/MovieDetails';
import MainLayout from './layouts/MainLayout';
import SearchResults from './pages/SearchResaults';
import UserWatchlist from './pages/UserWatchList';

import Register from './pages/Register';
import Login from './pages/LoginState';




const routes = createBrowserRouter([
 {
   path:"/",
   element: <MainLayout/>,
    children:[  
       {index: true, element: <Home />},        //"/"=>Home sayfası
       {path: "movies", element: <Movies />},//"/movies"=>Movies sayfası
       {path: "movies/:id", element: <MovieDetails />}, //"/movies/1"=>MovieDetails sayfası]
       {path:"search", element: <SearchResults />}, //search?q=aramak istediğimiz 
       {path: "watchlist", element: <UserWatchlist />}, //watchlist sayfası
       {path: "login", element: <Login />},
       {path: "register", element: <Register />},
    ]
 } 
]);



function App() {
  return <RouterProvider router={routes} />  ;
 
}

export default App;

  // {path: "/", element: <Home />},        //"/"=>Home sayfası
  // {path: "/movies", element: <Movies />},//"/movies"=>Movies sayfası
  // {path: "/movies/1", element: <MovieDetails />}, //"/movies/1"=>MovieDetails sayfası