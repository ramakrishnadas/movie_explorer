// Import the MovieList class from the movieList.mjs file
import MovieList from "./movieList.mjs";

// Wait for the DOMContentLoaded event before executing the code
document.addEventListener('DOMContentLoaded', () => {
    // Define the data source object to fetch movie data from the API
    let dataSource = {
        async getData() {
            // Define the URL and options for the fetch request
            const url = 'https://imdb-top-100-movies.p.rapidapi.com/';
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '0c46aa05e2msh59a0dd8267cefb9p15f0eajsn7cc40b93a747',
                    'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
                }
            };

            // Fetch movie data from the API
            const response = await fetch(url, options);
            // Parse the JSON response
            const movies = await response.json();
            // Return the movie data
            return movies;
        }
    };

    // Get the list element where movies will be displayed
    let listElement = document.getElementById('movie-container');
    // Create an instance of the MovieList class with the data source and list element
    const movieList = new MovieList(dataSource, listElement);
    // Filter and display bookmarked movies
    movieList.filterBookmarkedMovies();
})
