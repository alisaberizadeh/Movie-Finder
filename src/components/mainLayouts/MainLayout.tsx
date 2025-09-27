"use client"
import { FavoritesProvider } from '@/context/FavoritesContext'
import React, { ReactNode } from 'react'
import { ToastContainer } from 'react-toastify'

function MainLayout(props:{children:ReactNode}) {
  return (
    
        <FavoritesProvider>
            <ToastContainer position="bottom-left" autoClose={2000} />

          {props.children}
        </FavoritesProvider>
    
  )
}

export default MainLayout