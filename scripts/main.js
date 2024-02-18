import { getDataAndRender } from './movieList.mjs';

getDataAndRender();

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
