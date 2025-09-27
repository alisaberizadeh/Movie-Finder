"use client"
import { FavoritesContext } from '@/context/FavoritesContext'
import { IMoveis, IMovie } from '@/lib/types'
import axios from 'axios'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { CiCircleRemove, CiLink, CiTrash } from 'react-icons/ci'
import { FaHeart } from 'react-icons/fa'

function page() {
    const { favorites, handleFavorites } = useContext(FavoritesContext)
    const [movies, setMovies] = useState<IMovie[]>([]);
    const API_KEY = "50091bfc";

    useEffect(() => {
        const fetchFavorites = async () => {
            if (!favorites) return;

            try {
                const responses = await Promise.all(
                    favorites.map(id => axios.get(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`))
                );
                const productsData = responses.map(res => res.data);
                setMovies(productsData);
            } catch (error) {
                console.error("Error fetching favorites:", error);
            }
        };

        fetchFavorites();
    }, [favorites]);
    console.log(movies);

    return (
        <div className="w-full  mt-48 text-center min-h-screen flex justify-around">
            <div className="w-2/4">
                <p className="text-6xl font-extrabold mb-12 text-yellow-300 flex items-center justify-center "><FaHeart className='mr-3' /> My Favorites</p>

                {movies?.length > 0 && (
                    <div className="overflow-x-auto my-10">
                        <table className="min-w-full border border-neutral-800 rounded-lg shadow">
                            <thead className="bg-black rounded-lg">
                                <tr className="rounded-lg">
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">#</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">Poster</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">Title</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">Year</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">Type</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">Remove</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-800">
                                {movies.map((item, index) => (
                                    <tr key={item.imdbID}>
                                        <td className="px-6 py-4 text-left text-sm text-gray-500">{index + 1}</td>
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
                                        <td onClick={()=>handleFavorites(item.imdbID)} className="px-6 py-4 text-left text-sm text-gray-500"><button className=' border border-red-600 text-red-600 rounded-md p-2 cursor-pointer'><CiTrash /></button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}

export default page