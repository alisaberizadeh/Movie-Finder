import BtnFavorite from "@/components/btnFavorite/BtnFavorite";
import { IMovie } from "@/lib/types";
import { CiHeart } from "react-icons/ci";
import { FaStar } from "react-icons/fa";

interface Props {
  params: {
    id: string;
  };
}

export default async function Page({ params }: Props) {
  const id = params.id;
  let movie: IMovie | null = null;

  try {
    const res = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=50091bfc`);
    movie = await res.json();
    console.log(movie);
  } catch (error) {
    console.error("Error in request to API:", error);
  }

  if (!movie || movie.Response === "False") {
    return <p className="text-center my-10" >Unfortunately, no movies were found !!!</p>;
  }

  return (
    <div className="w-2/4 my-10 mx-auto">
      <img src={movie.Poster} alt={movie.Title} className="rounded w-1/2" />
      <h1 className="text-2xl font-bold my-5">{movie.Title}
        <span className={`inline-flex items-center rounded-md text-xs px-2 py-1 font-medium  ${Number(movie.imdbRating) < 7 ? "bg-yellow-400 text-black" : "bg-green-400  text-green-950"} inset-ring inset-ring-gray-400/20 ml-2`}><FaStar className="mr-1" />{movie.imdbRating}</span>
      </h1><hr className="text-neutral-800" />
      <p className="my-5">{movie.Plot}</p>

      <p className="my-3">
        <span className="font-bold">Actors : </span>
        <span className="inline-flex flex-wrap gap-2">
          {movie.Actors.split(",").map((actor) => (
            <span
              key={actor}
              className="inline-block rounded-md bg-yellow-400/10 px-2 py-1 text-xs font-medium text-yellow-400 inset-ring inset-ring-gray-400/20"
            >
              {actor.trim()}
            </span>
          ))}
        </span>
      </p>


      <p className="my-3">
        <span className="font-bold">Genre : </span>
        <span className="inline-flex flex-wrap gap-2">
          {movie.Genre.split(",").map((genre) => (
            <span
              key={genre}
              className="inline-block rounded-md bg-blue-400/10 px-2 py-1 text-xs font-medium text-blue-400 inset-ring inset-ring-gray-400/20"
            >
              {genre.trim()}
            </span>
          ))}
        </span>
      </p>


      <p className="my-3"><span className="font-bold">Year : </span>
        <span className="inline-flex items-center rounded-md bg-purple-400/10 px-2 py-1 text-xs font-medium text-purple-400 inset-ring inset-ring-gray-400/20">{movie.Year}</span>
      </p>


      <p className="my-3"><span className="font-bold">Runtime : </span>
        <span className="inline-flex items-center rounded-md bg-gray-400/10 px-2 py-1 text-xs font-medium text-gray-400 inset-ring inset-ring-gray-400/20">{movie.Runtime}</span>
      </p>

      <p className="my-3"><span className="font-bold">Director : </span>
        <span className="inline-flex items-center rounded-md bg-gray-400/10 px-2 py-1 text-xs font-medium text-gray-400 inset-ring inset-ring-gray-400/20">{movie.Director}</span>
      </p>


      <p className="my-3"><span className="font-bold">Language : </span>
        <span className="inline-flex items-center rounded-md bg-gray-400/10 px-2 py-1 text-xs font-medium text-gray-400 inset-ring inset-ring-gray-400/20">{movie.Language}</span>
      </p>


      <p className="my-3"><span className="font-bold">Country : </span>
        <span className="inline-flex items-center rounded-md bg-gray-400/10 px-2 py-1 text-xs font-medium text-gray-400 inset-ring inset-ring-gray-400/20">{movie.Country}</span>
      </p>


      <p className="my-3"><span className="font-bold">Type : </span>
        <span className="inline-flex items-center rounded-md bg-gray-400/10 px-2 py-1 text-xs font-medium text-gray-400 inset-ring inset-ring-gray-400/20">{movie.Type}</span>
      </p>

      {movie.Type == "series" && (
        <p className="my-3"><span className="font-bold">totalSeasons : </span>
          <span className="inline-flex items-center rounded-md bg-gray-400/10 px-2 py-1 text-xs font-medium text-gray-400 inset-ring inset-ring-gray-400/20">{movie.totalSeasons}</span>
        </p>
      )}


      <BtnFavorite id={movie.imdbID} />

    </div>
  );
}
