// Function to retrieve movie rank from URL parameter
function getMovieRankFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('rank');
}

// Function to fetch movie details from the API
async function fetchMovieDetails(movieRank) {
    const url = `https://imdb-top-100-movies.p.rapidapi.com/top${movieRank}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '0c46aa05e2msh59a0dd8267cefb9p15f0eajsn7cc40b93a747',
            'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        if (response.ok) {
            return await response.json();
        } else {
            console.error('Failed to fetch movie details:', response.statusText);
            return null;
        }
    } catch (error) {
        console.error('Error fetching movie details:', error);
        return null;
    }
}

// Function to display movie details on the movie details page
function displayMovieDetails(movie) {

    const movieDetailsContainer = document.getElementById('movie-details');

    const movieDirectors = movie.director;
    const movieGenres = movie.genre;
    const movieWriters = movie.writers;
    const trailerEmbedLink = `https://www.youtube.com/embed/${movie.trailer_youtube_id}`;
    const imdbLink = `https://www.imdb.com/title/${movie.imdbid}`;

    movieDetailsContainer.innerHTML = `
        <h2 class="movie-title">${movie.title}</h2>
        <img src="${movie.big_image}" alt="${movie.title}" class="big-img">
        <p class="release-year">Release year: ${movie.year}</p>
        <p>IMDb rating: <span class="movie-rating">${movie.rating}</span></p>

        <p class="movie-description">${movie.description}</p>

        <p class="movie-directors">Directed by: ${movieDirectors.join(', ')}</p>
        <p class="movie-writers">Written by: ${movieWriters.join(', ')}</p>
        <p class="movie-genres">Genres: ${movieGenres.join(', ')}</p>

        <a class="imdb-link" href="${imdbLink}">See IMDb rating</a>
        <iframe width="560" height="315" src="${trailerEmbedLink}" frameborder="0" allowfullscreen></iframe>`;
}

// Main function to initialize movie details page
async function initMovieDetailsPage() {
    const movieRank = getMovieRankFromUrl();
    
    const movieDetails = await fetchMovieDetails(movieRank);
    displayMovieDetails(movieDetails);
    
}

// Call the initialization function when the page loads
window.addEventListener('DOMContentLoaded', initMovieDetailsPage);