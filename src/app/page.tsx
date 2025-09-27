"use client";

import { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { CiSearch, CiLink } from "react-icons/ci";
import axios from "axios";
import { IMoveis } from "@/lib/types";
import { FaHeart } from "react-icons/fa";
import { FavoritesContext } from "@/context/FavoritesContext";
import { FaLeftLong, FaRightLong } from "react-icons/fa6";

interface FormData {
  value: string;
}

export default function Home() {
  const API_KEY = "50091bfc";
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<IMoveis[]>([]);

  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const { favorites } = useContext(FavoritesContext);
  const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm<FormData>();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const queryParam = searchParams.get("query");
    const pageParam = Number(searchParams.get("page") || 1);

    if (queryParam) {
      setValue("value", queryParam);
      find({ value: queryParam }, pageParam);
    }
  }, [searchParams]);

  const find = async (data: FormData, pageNumber:number) => {
    const value = data.value.trim();
    if (!value) return;
    setLoading(true);

    try {
      const response = await axios.get(`https://www.omdbapi.com/?s=${value}&apikey=${API_KEY}&page=${pageNumber}`);
      setMovies(response.data.Search || []);
      setTotalResults(Number(response.data.totalResults) || 0);
      setPage(pageNumber);
      router.push(`/?query=${encodeURIComponent(value)}&page=${pageNumber}`);
    } catch (error) {
      console.error("Error in request to api:", error);
      setMovies([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(totalResults / 10);

  return (
    <div className="w-full mt-48 text-center min-h-screen flex justify-around">
      <div className="w-2/4">
        <p className="text-6xl font-extrabold mb-12 text-yellow-300">Movie Finder</p>

        <form
          onSubmit={handleSubmit((data) => find(data, 1))}
          className={`w-full flex items-center sticky top-3 z-50 border-2 ${errors.value ? "border-red-800" : "border-neutral-900"} bg-neutral-900 rounded-4xl`}
        >
          <input
            {...register("value", { required: "Movie name is required" })}
            type="text"
            className="bg-black w-4/6 h-14 outline-none px-5 rounded-bl-4xl rounded-tl-4xl"
            placeholder="Enter the movie name..."
          />
          <button
            type="submit"
            className="w-1/6 h-14 cursor-pointer bg-black flex justify-center items-center rounded-br-4xl text-yellow-300 rounded-tr-4xl"
          >
            <CiSearch className="text-center text-xl" />
          </button>
          
          <Link href="/favorites"
            className="w-1/6 h-14 cursor-pointer flex justify-center items-center text-yellow-300 rounded-tr-4l"
          >
             <FaHeart className="text-center text-xl mr-2" /> {favorites.length}
          </Link>
        </form>

        {loading && (
          <div className="flex justify-center mt-8">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-300"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        )}

        {movies?.length > 0 && (
          <>
            <div className="overflow-x-auto my-10">
              <table className="min-w-full border border-neutral-800 rounded-lg shadow">
                <thead className="bg-black rounded-lg">
                  <tr className="rounded-lg">
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">#</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">Poster</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">Title</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">Year</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">Type</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800">
                  {movies.map((item, index) => (
                    <tr key={`${item.imdbID}-${index}`}>
                      <td className="px-6 py-4 text-left text-sm text-gray-500">{index + 1 + (page-1)*10}</td>
                      <td className="px-6 py-4">
                        <Link href={`/movie/${item.imdbID}`}>
                          <img src={item.Poster} width="40" alt="Poster" className="rounded-md shadow" />
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-left text-sm text-blue-200">
                        <Link href={`/movie/${item.imdbID}`} className="flex items-center underline">
                          <CiLink className="text-lg mr-1" /> {item.Title}
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-left text-sm text-gray-500">{item.Year}</td>
                      <td className="px-6 py-4 text-left text-sm text-gray-500">{item.Type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
               {totalResults > 10 && (
              <div className="flex justify-center gap-4 mt-6">
                <button
                  disabled={page === 1}
                  onClick={() => find({ value: getValues("value") }, page - 1)}
                  className="px-4 py-2 bg-yellow-500 text-black rounded disabled:opacity-50 cursor-pointer"
                >
                  <FaLeftLong />
                </button>
                <span className="text-yellow-500 flex items-center">
                  {page} / {totalPages}
                </span>
                <button
                  disabled={page === totalPages}
                  onClick={() => find({ value: getValues("value") }, page + 1)}
                  className="px-4 py-2 bg-yellow-500 text-black rounded disabled:opacity-50 cursor-pointer"
                >
                  <FaRightLong />
                </button>
              </div>
            )}
            </div>

            
          </>
        )}
      </div>
    </div>
  );
}
