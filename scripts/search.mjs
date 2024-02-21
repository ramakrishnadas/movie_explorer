// Import the MovieList class from the movieList module
import MovieList from "./movieList.mjs";

// Function to get the value of the search filter
export function getSearchBy() {
    // Get all elements with the name 'searchby'
    const searchBy = document.getElementsByName('searchby');

    // Loop through the searchBy elements
    for (var i = 0; i < searchBy.length; i++) {
        // Check if the current element is checked
        if (searchBy[i].checked) {
            // Return the value of the checked element
            return searchBy[i].value;
        }
    }
}

// Function to handle movie search functionality
export function searchMovies() {
    // Define the data source for fetching movie data
    let dataSource = {
        async getData() {
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
          // Return the fetched movie data
          return movies;
        }
      };
      
    // Get the list element where movie cards will be displayed
    let listElement = document.getElementById('movie-container');

    // Get the search form and search input elements
    const searchForm = document.getElementById('search-bar');
    const searchInput = document.getElementById('query');
    
    // Add event listener for form submission
    searchForm.addEventListener('submit', function(event) {
        // Prevent the default form submission behavior
        event.preventDefault();

        // Get the search filter and query from the input fields
        const search = getSearchBy();
        const query = searchInput.value.trim();

        // Create a new MovieList instance with the data source, list element, and search filter
        const movieList = new MovieList(dataSource, listElement, search);
        // Filter the movie list based on the search query
        movieList.filterList(query);
    })
}
