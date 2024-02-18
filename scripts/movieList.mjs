// Function to fetch movie data from the API
export async function getDataAndRender() {
    const url = 'https://imdb-top-100-movies.p.rapidapi.com/';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '0c46aa05e2msh59a0dd8267cefb9p15f0eajsn7cc40b93a747',
            'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const movies = await response.json();
        console.log(movies);
        renderMovieList(movies); // Render the data immediately after fetching
    } catch (error) {
        console.error(error);
    }
}

// Function to render the movie list on the webpage
export function renderMovieList(movies) {
    const movieContainer = document.getElementById('movie-container');

    const movieList = [];
    movies.forEach( (movie) => {

        const movieData = `
        <div class="movie-card">
            <a href="./movie-details.html?rank=${movie.rank}">
                <img src="${movie.image}" alt="${movie.title}" class="movie-img">
                <h3 class="movie-title">${movie.title}</h3>
                <p class="movie-description">${movie.description}</p>
                <p>IMDb rating: <span class="movie-rating">${movie.rating}</span></p>
            </a>
        </div>`;

        movieList.push(movieData);
    });

    const movieListHTML = movieList.join('\n');
    movieContainer.innerHTML = movieListHTML;
}