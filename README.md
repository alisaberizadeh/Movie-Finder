# 🎬 Movie Finder

![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge)
![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-EC5990?style=for-the-badge)
![React Toastify](https://img.shields.io/badge/React%20Toastify-FF3C00?style=for-the-badge)
![SweetAlert2](https://img.shields.io/badge/SweetAlert2-FF6F61?style=for-the-badge)

---

## 🌐 Live Demo
[Movie Finder Demo](https://your-demo-link.com)  <!-- Replace with your demo link -->

---

## 🎥 Project Overview
**Movie Finder** is a web application built with **Next.js** that allows users to search for movies and TV shows, view detailed information, and manage their favorite movies.

### ✨ Features
- Search for **movies and TV shows** using the OMDB API  
- Display movie details including:
  - Plot  
  - Rating  
  - Actors  
  - Genre  
  - Year  
- **Pagination** for search results  
- **Favorites management** using **React Context + LocalStorage**  
  - Add and remove movies from favorites  
  - **Persist favorite movies after page reload**  
- **Notifications and alerts**:
  - **Toast** messages for quick feedback  
  - **SweetAlert2** for interactive alerts  

---

## 🛠 Technologies
- **Next.js (App Router)**  
- **React Context + LocalStorage** for favorite movies  
- **React Hook Form**  
- **Axios**  
- **Tailwind CSS**  
- **React Icons**  
- **React Toastify**  
- **SweetAlert2**  

---

## 💻 Installation and Running
# Clone the repository
git clone https://github.com/your-username/movie-finder.git
cd movie-finder

# Install dependencies
npm install
# or
yarn

# Create .env.local file with your OMDB API key
echo "NEXT_PUBLIC_OMDB_API_KEY=your_api_key_here" > .env.local

# Run the development server
npm run dev
# or
yarn dev

# Open the app in your browser:
# http://localhost:3000

# Build for production
npm ru
