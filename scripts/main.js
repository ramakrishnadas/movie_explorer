
async function getData() {
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
        const result = await response.json();
        // console.log(result);
        return result;
    } catch (error) {
        console.error(error);
    }


}

function renderDataList(movies) {
    const movieContainer = document.getElementById('movie-container');

    const movieList = [];
    movies.forEach( (movie) => {

        const movieData = `<div class="movie-card">
        <img src="${movie.image}" alt="${movie.title}" class="movie-img">
        <h3 class="movie-title">${movie.title}</h3>
        <p class="movie-description">${movie.description}</p>
        <p>IMDb rating: <span class="movie-rating">${movie.rating}</span></p>
        </div>`;

        movieList.push(movieData);
    });

    const movieListHTML = movieList.join('\n');
    movieContainer.innerHTML = movieListHTML;
}


async function renderData() {
    const myMovieData = await getData();
    renderDataList(myMovieData);
}

renderData();


document.addEventListener('DOMContentLoaded', () => {
    const mapContainer = document.getElementById('map');
    const error = document.getElementById('error');

    function getLocation() {
        try {
            navigator.geolocation.getCurrentPosition(insertMap);
        } catch(err) {
            error.innerHTML = err;
        }
    }

    function insertMap(position) {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;

        const mapHTML = `<iframe width="600" height="450" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://www.openstreetmap.org/export/embed.html?bbox=${longitude - 0.01},${latitude - 0.01},${longitude + 0.01},${latitude + 0.01}&amp;layer=mapnik&amp;marker=${latitude},${longitude}" style="border: 1px solid black"></iframe>`;

        mapContainer.innerHTML += mapHTML;
    }

    getLocation();
})
