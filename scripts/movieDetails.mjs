// Import the Bookmark class from the bookmark.mjs file
import Bookmark from "./bookmark.mjs";

// Function to retrieve the movie rank from the URL parameter
function getMovieRankFromUrl() {
    // Get the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    // Return the value of the 'rank' parameter
    return urlParams.get('rank');
}

// Function to fetch movie details from the API
async function fetchMovieDetails(movieRank) {
    // Construct the URL for fetching movie details based on the movie rank
    const url = `https://imdb-top-100-movies.p.rapidapi.com/top${movieRank}`;
    // Define the options for the fetch request
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '0c46aa05e2msh59a0dd8267cefb9p15f0eajsn7cc40b93a747',
            'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
        }
    };

    try {
        // Fetch movie details from the API
        const response = await fetch(url, options);
        // Check if the response is successful
        if (response.ok) {
            // Parse the JSON response
            return await response.json();
        } else {
            // Log an error message if fetching movie details fails
            console.error('Failed to fetch movie details:', response.statusText);
            return null;
        }
    } catch (error) {
        // Log an error message if an error occurs during the fetch request
        console.error('Error fetching movie details:', error);
        return null;
    }
}

// Function to display movie details on the movie details page
function displayMovieDetails(movie) {
    // Get the movie details container element
    const movieDetailsContainer = document.getElementById('movie-details');

    // Extract relevant movie details
    const movieDirectors = movie.director;
    const movieGenres = movie.genre;
    const movieWriters = movie.writers;
    const trailerEmbedLink = `https://www.youtube.com/embed/${movie.trailer_youtube_id}`;
    const imdbLink = `https://www.imdb.com/title/${movie.imdbid}`;

    // Append movie details to the movie details container
    movieDetailsContainer.innerHTML += `
        <div id="grid-item1">
            <h2 class="movie-title" id="title">${movie.title}</h2>
            <img src="${movie.big_image}" alt="${movie.title}" class="big-img">
            <p class="release-year">Release year: ${movie.year}</p>
            <p>IMDb rating: <span class="movie-rating">${movie.rating}</span></p>
        </div>
        <div id="grid-item2">
            <p class="movie-description">${movie.description}</p>
            <p class="movie-directors">Directed by: ${movieDirectors.join(', ')}</p>
            <p class="movie-writers">Written by: ${movieWriters.join(', ')}</p>
            <p class="movie-genres">Genres: ${movieGenres.join(', ')}</p>
            <a class="imdb-link" href="${imdbLink}">See IMDb rating</a>
        </div>
        <iframe width="1120" height="630" src="${trailerEmbedLink}" frameborder="0" allowfullscreen></iframe>`;

    // Update the page title with the movie title
    document.title += ` | ${movie.title}`
}

// Main function to initialize the movie details page
async function initMovieDetailsPage() {
    // Get the movie rank from the URL parameter
    const movieRank = getMovieRankFromUrl();
    
    // Fetch movie details based on the movie rank
    const movieDetails = await fetchMovieDetails(movieRank);
    // Display movie details on the page
    displayMovieDetails(movieDetails);
    
    // Get the bookmark button element
    const bookmarkButton = document.getElementById('bookmarkButton');

    // Create a new instance of the Bookmark class
    const bookmark = new Bookmark();
    // Get all bookmarked movies from local storage
    const favMovies = bookmark.getAllBookmarks();
    // Get the movie title element
    let movie = document.getElementById('title');

    // Check if the current movie is bookmarked and update the button accordingly
    if (favMovies.includes(movie.textContent)) {
        bookmarkButton.classList.toggle('bookmarked');
    }

    // Function to toggle bookmarked state
    function toggleBookmark() {
        // Toggle the 'bookmarked' class on the bookmark button
        bookmarkButton.classList.toggle('bookmarked');
    }

    // Add event listener to the bookmark button to toggle bookmarked state
    bookmarkButton.addEventListener('click', () => {
        toggleBookmark();
        
        // Get the movie title
        const movieTitle = movie.textContent;

        // Add or remove the movie from bookmarks based on the button state
        if (bookmarkButton.classList.contains('bookmarked')) {
            bookmark.addMovie(movieTitle);
        } else {
            bookmark.removeMovie(movieTitle);
        }
    });
}

// Call the initialization function when the page loads
window.addEventListener('DOMContentLoaded', initMovieDetailsPage);
