const controller = {
    popupOpen: false,
    popupModal: document.getElementById('category-popup')
};

const closePopup = () => {
    controller.popupModal.classList.add('hide');
    controller.popupopen = false;
}

window.addEventListener('click', (e) => {
	if (e.target === controller.popupModal) {
		controller.popupModal.classList.add('hide');
	}
});

const handleOnBox = (box, searchFn) => box.addEventListener('click', (e) => {
    document.getElementById('category-list-music').innerHTML = '';
    document.getElementById('category-list-movies').innerHTML = '';
    controller.popupModal.classList.remove('hide');
    controller.popupOpen = true;
    genreId = e.target.innerText.toLowerCase();
    searchFn(genreId);
});

//============== SPOTIFY API ==============

(function () {
    const musicBoxes = document.querySelectorAll('.music');
    const clientId = '139751bc115f43329c1ed10b37f49eef';
    const clientSecret = '3a241c55178d456ca803c1b8a8ae11d6';
    
    let token;
    let genreId;
    let tracksEndPoint;
    let spotifyListTitle;

    //Holds all the spotify fetch logic
    const spotifySearch = async (genreId) => {
        //get token neede to access Spotify api endpoints
        const params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
            },
            body: 'grant_type=client_credentials'
        };

        const result = await fetch('https://accounts.spotify.com/api/token', params);

        const data = await result.json();

        token = data.access_token;

        //get first playlist based on what category has been picked
        const getPlaylistByGenre = async (token, genreId) => {

            // choose from limit nr of playlists of a genre
            const limit = 8;

            const result = await fetch(`https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=${limit}`, {
                method: 'GET',
                headers: { 'Authorization': 'Bearer ' + token }
            });

            const data = await result.json();
            const randomNumber = Math.floor(Math.random()*limit);

            spotifyListTitle = data.playlists.items[randomNumber].description ? data.playlists.items[randomNumber].description : '';
            
            tracksEndPoint = data.playlists.items[randomNumber].tracks.href;

            const getTracks = async (token, tracksEndPoint) => {
                const limit = 30;
                const result = await fetch(`${tracksEndPoint}?limit=${limit}`, {
                    method: 'GET',
                    headers: { 'Authorization': 'Bearer ' + token }
                });

                const data = await result.json()

                //store the spotify links needed to be able to link to the songs to spotify
                const spotifyURIs = [];
                data.items.forEach(track => {
                    if (!track.track) return;
                    
                    if(!track.track.uri){
                        spotifyURIs.push('');
                    } else {
                        spotifyURIs.push(track.track.uri);
                    }
                });

                //map over the tracks and return them as html
                let counter = -1; //needed to keep track of the arrays of spotify URIs stored in the spotifyURI array

                const getPopUp = spotifyListTitle => `<h2>${spotifyListTitle}<button onClick="closePopup()" class="upper-close-btn">Close</button></h2><div class="music-content">`
                
                const getMusicCard = id => `<li>
                    <div class="music-card">
                        <iframe src="https://open.spotify.com/embed/track/${id}" width="300" height="100" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                    </div>
                </li>`

                const getModalFooter = () => `</div>
                    <div class="modal-footer">
                    <input onclick="closePopup()" type="button" class="close-btn" value="Close">
                </div>`;

                let html = getPopUp(spotifyListTitle)
                    + data.items.map(item => {
                        counter++;
                        return getMusicCard(item.track.id)
                    }).join('')
                    + getModalFooter();

                document.getElementById('category-list-music').innerHTML = html;
            }
            getTracks(token, tracksEndPoint);
        }
        //get the tracks from the playlist gotten from getplaylistByGenre
        getPlaylistByGenre(token, genreId)
    }

    //add eventlisteners to all music category boxes
    musicBoxes.forEach(box => handleOnBox(box, spotifySearch));
})();

// =========== TMDB API ==============

(function () {
    //get all movie boxes
    const movieBoxes = document.querySelectorAll('.movies');

    //genre id in TMDB api
    const movieGenres = {
        drama: 18,
        action: 28,
        adventure: 12,
        comedy: 35,
        fantasy: 14,
        horror: 27
    }

    const movieSearch = (genreId) => {
        const randomNumber = Math.floor(Math.random()*50 + 1); //randomize which page (1-50) will ba shown results from
        //fetch movies from a specified genre based on the movie revenue
        const API_KEY= '0a77033036d0112b03d5fb8d85f886b1'
        const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${movieGenres[genreId]}&sort_by=revenue.desc&page=${randomNumber}&api_key=${API_KEY}`;

        const getRecommendation = genreId => `<h2>Recommended ${genreId} movies<button onClick="closePopup()" class="upper-close-btn">Close</button></h2><div class="movies-content">`
        
        const getMovieCard = ({ poster_path, backdrop_path, title, overview, vote_average }) => {
            return (poster_path || backdrop_path) ? 
            `<li>
                <div class="movie-card">
                <a target=”_blank” href="https://www.amazon.com/s?k=${title}&i=shop-instant-video&ref=nb_sb_noss_2"><h4 class="movie-title">${title}<span class="movie-score"> ${vote_average}</span></h4></a>
                    <a target=”_blank” href="https://www.amazon.com/s?k=${title}&i=shop-instant-video&ref=nb_sb_noss_2"> <img src="https://image.tmdb.org/t/p/w500/${poster_path || backdrop_path}" alt="picture of ${title}" /></a>
                    <p class="movie-overview">${overview}</p>
                <div>
            </li>
            `:
            `<li>
                <div class="movie-card">
                    <h4 class="movie-title">${title} <span class="movie-score"> ${vote_average}</span></h4>
                    <span><i class="far fa-eye-slash"></i></span>
                </div>
            </li>`
        };

        const getFooter = () => `</div>
                <div class="modal-footer">
                <input onclick="closePopup()" type="button" class="close-btn" value="Close">
            </div>`;

        fetch(url)
            .then(res => res.json())
            .then(movies => {
                //only map over the first 10 movies in the array
                let limit = 20;

                //create html string to be injected
                let html = getRecommendation(genreId)
                    + movies.results.slice(0, limit).map(movie => getMovieCard(movie)).join(''); //join() to get rid of , (comma) in html
                    + getFooter()

                document.getElementById('category-list-movies').innerHTML = html;
            })
            .catch(err => console.log(err));
    }


    movieBoxes.forEach(box => handleOnBox(box, movieSearch));
})();

