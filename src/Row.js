import React, { useState, useEffect,isLargeRow } from "react";
import "./Row.css";
import axios from "./axios";
import movieTrailer from "movie-trailer";
import YouTube from "react-youtube";
const base_url = "https://image.tmdb.org/t/p/original";
 

const Row = ({ title, fetchUrl,isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl,setTrailerUrl]=useState("")
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);

      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);
  const opts={
    height:"390",
    width:"100%",
    playerVar:{
      autoplayer:1,
    }
  }
const handleClick=(movie)=>{
   if(trailerUrl){
     setTrailerUrl("")
   }else{
     {/*this is get from youtube trailer */}
     movieTrailer(movie?.name|| "")
     .then(url=>{
       const urlParams= new URLSearchParams(new URL(url).search)
       setTrailerUrl(urlParams.get('v'))
     }).catch(error=>{
       console.log(error)
     })
   }
}


  return (
    <div className="row">
      {/*title*/}
      <h2>{title}</h2>
      <div className="row__posters">
        {/*posters*/}
        {movies.map((movie) => (
            
          <img
            key={movie.id}
            src={`${base_url}${isLargeRow?movie.poster_path:movie.backdrop_path}`}
            alt={movie.name}
            onClick={()=>{
              handleClick(movie)
            }}
            className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
          ></img>
          
        ))}
      </div>



      {/*container  -> posters */}
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}
    </div>
  );
};

export default Row;
