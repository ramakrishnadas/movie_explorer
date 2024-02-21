// Define a class called MovieList
class MovieList {
  // Constructor function to initialize MovieList objects
  constructor(dataSource, listElement, searchBy = null) {
      // Initialize properties of MovieList objects
      this.searchBy = searchBy; // Search criteria
      this.dataSource = dataSource; // Data source for movie list
      this.listElement = listElement; // DOM element to display movie list
  }

  // Method to initialize the movie list
  async init() {
      try {
          // Fetch movie data from the data source
          const movies = await this.dataSource.getData();
          // Render the movie list on the webpage
          this.renderList(movies);
      } catch (error) {
          // Log any errors that occur during initialization
          console.error(error);
      }
  }

  // Method to render the movie list on the webpage
  renderList(movies) {
      // Generate HTML for each movie card and join them into a single string
      const movieListHTML = movies.map(movieCardTemplate).join('\n');
      // Set the inner HTML of the list element to display the movie list
      this.listElement.innerHTML = movieListHTML;
  }

  // Method to filter the movie list based on a search query
  async filterList(query) {
      // Clear the current movie list
      this.listElement.innerHTML = '';

      // Fetch the full list of movies from the data source based on the search criteria
      const list = await this.dataSource.getData(this.searchBy);

      // Filter the list of movies based on the search query
      const searchList = list.filter((element) => {
          if (this.searchBy == 'title') {
              // Filter by movie title
              return element.title.includes(query);
          } else if (this.searchBy == 'genre') {
              // Filter by movie genre
              return element.genre.includes(query);
          } else {
              // Filter by movie year
              return element.year.toString().includes(query);
          }
      });

      // Check if any movies match the search criteria
      if (searchList == '') {
          // Display an alert if no results are found
          alert('No results found.');
      } else {
          // Render the filtered movie list on the webpage
          this.renderList(searchList);
      }
  }

  // Method to filter and display bookmarked movies
  async filterBookmarkedMovies() {
      // Clear the current movie list
      this.listElement.innerHTML = '';

      // Retrieve bookmarked movie titles from local storage or an empty array
      const bookmarkedTitles = JSON.parse(localStorage.getItem('bookmarks')) || [];

      // Fetch the full list of movies from the data source
      const list = await this.dataSource.getData();

      // Filter the full movie list to include only bookmarked movies
      const bookmarkedMovies = list.filter(movie => bookmarkedTitles.includes(movie.title));

      // Check if any bookmarked movies are found
      if (bookmarkedMovies.length === 0) {
          // Display an alert if no bookmarked movies are found
          alert('No bookmarked movies found.');
      } else {
          // Render the list of bookmarked movies on the webpage
          this.renderList(bookmarkedMovies);
      }
  }
}

// Function to generate HTML for a movie card
function movieCardTemplate(movie) {
  return `
      <div class="movie-card">
          <a href="./movie-details.html?rank=${movie.rank}">
              <img src="${movie.image}" alt="${movie.title}" class="movie-img">
              <h3 class="movie-title">${movie.title}</h3>
              <p class="movie-description">${movie.description}</p>
              <p>IMDb rating: <span class="movie-rating">${movie.rating}</span></p>
          </a>
      </div>`;
}

// Export the MovieList class as a module
export default MovieList;