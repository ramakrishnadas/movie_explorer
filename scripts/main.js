// Import the searchMovies function from the search.mjs file
import { searchMovies } from './search.mjs';
// Import the MovieList class from the movieList.mjs file
import MovieList from "./movieList.mjs";

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
// Initialize the movie list
movieList.init();

// Wait for the DOMContentLoaded event before executing the code
document.addEventListener('DOMContentLoaded', () => {
    // Get the map container element
    const mapContainer = document.getElementById('map');
    // Get the error element
    const error = document.getElementById('error');

    // Function to get the current geolocation and insert a map
    function getLocation() {
        try {
            // Get the current position using geolocation
            navigator.geolocation.getCurrentPosition(insertMap);
        } catch(err) {
            // Display any errors in the error element
            error.innerHTML = err;
        }
    }

    // Function to insert a map based on the given position
    function insertMap(position) {
        // Extract latitude and longitude from the position object
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;

        // Create the map HTML using latitude and longitude
        const mapHTML = `<iframe width="600" height="450" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://www.openstreetmap.org/export/embed.html?bbox=${longitude - 0.01},${latitude - 0.01},${longitude + 0.01},${latitude + 0.01}&amp;layer=mapnik&amp;marker=${latitude},${longitude}" style="border: 1px solid black"></iframe>`;

        // Append the map HTML to the map container
        mapContainer.innerHTML += mapHTML;
    }

    // Add a local map based on the current geolocation
    getLocation();

    // Enable search bar functionality
    searchMovies();
})
