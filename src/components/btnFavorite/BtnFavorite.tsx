"use client"
import { FavoritesContext } from '@/context/FavoritesContext'
import React, { useContext } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'

function BtnFavorite(props:{id:string}) {
    const {handleFavorites , favorites} = useContext(FavoritesContext)
    const isFavorite = favorites.includes(props.id);

  return (
    <button onClick={()=>handleFavorites(props.id)} className="py-3 px-7 mt-5 bg-yellow-300 hover:bg-yellow-400 transition-all text-black rounded-lg cursor-pointer flex items-center">
      {isFavorite ? (
      <><FaHeart className="mr-1  " />  Added !</>
        
      ) : (
      <><FaRegHeart className="mr-1 " /> Add to Favorite</>

      )}
    </button>
  )
}

export default BtnFavorite