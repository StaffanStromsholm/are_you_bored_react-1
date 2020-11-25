// import React, { Component } from 'react'
// import { MOVIE_GENRES, TMDB_API_KEY } from '../../constants'

// export default class Movie extends Component {
//     constructor(props) {
//         super(props)

//         this.state = {
//             movies: null
//         }

//         this.handleEvent = this.handleEvent.bind(this)
//     }

//     componentDidMount = () => {
//         const randomNumber = Math.floor(Math.random()*50 + 1); //randomize which page (1-50) will ba shown results from
//         //fetch movies from a specified genre based on the movie revenue
//         const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${MOVIE_GENRES[genreId]}&sort_by=revenue.desc&page=${randomNumber}&api_key=${TMDB_API_KEY}`;
//         fetch(url)
//             .then(res => res.json())
//             .then(movies => this.setState({ movies }));
//     }

//     getMovieCard = ({ poster_path, backdrop_path, title, overview, vote_average }) => {
//         return (poster_path || backdrop_path) ? 
//         <li>
//             <div class="movie-card">
//             <a target=”_blank” href="https://www.amazon.com/s?k=${title}&i=shop-instant-video&ref=nb_sb_noss_2"><h4 class="movie-title">${title}<span class="movie-score"> ${vote_average}</span></h4></a>
//                 <a target=”_blank” href="https://www.amazon.com/s?k=${title}&i=shop-instant-video&ref=nb_sb_noss_2"> <img src="https://image.tmdb.org/t/p/w500/${poster_path || backdrop_path}" alt="picture of ${title}" /></a>
//                 <p class="movie-overview">${overview}</p>
//             <div>
//         </li>
//         :
//         <li>
//             <div class="movie-card">
//                 <h4 class="movie-title">${title} <span class="movie-score"> ${vote_average}</span></h4>
//                 <span><i class="far fa-eye-slash"></i></span>
//             </div>
//         </li>
//     }

//     getFooter = () => </div>
//         <div class="modal-footer">
//         <input onclick="closePopup()" type="button" class="close-btn" value="Close">
//     </div>;

//     handleClick = (e) => {
//         document.getElementById('category-list-music').innerHTML = '';
//         document.getElementById('category-list-movies').innerHTML = '';
//         controller.popupModal.classList.remove('hide');
//         controller.popupOpen = true;
//         genreId = e.target.innerText.toLowerCase();
//         searchFn(genreId);
//     }

//     render() {
//         return (
//             <>
//                 <h2>Movie</h2>
//                 <div class="yes_grid">
//                     <div class="box movies" onClick={this.handleClick}>
//                         <img class="im" src="https://source.unsplash.com/1600x900/?drama">
//                         <p class='par'>Drama</p>
//                     </div>
//                     <div class="box movies" onClick={this.handleClick}>
//                         <img class="im" src="https://source.unsplash.com/1600x900/?fantasy">
//                         <p class='par'>Fantasy</p>
//                     </div>
//                     <div class="box movies" onClick={this.handleClick}>
//                         <img class="im" src="https://source.unsplash.com/1600x900/?comedy">
//                         <p class='par'>Comedy</p>
//                     </div>
//                     <div class="box movies" onClick={this.handleClick}>
//                         <img class="im" src="https://source.unsplash.com/1600x900/?horror">
//                         <p class='par'>Horror</p>
//                     </div>
//                 </div>
//                 <ul id="category-list-movies" class="category-list">
//                     {
//                         this.state.movies ? 
//                         <li>
//                             <h2>Recommended {genreId} movies<button onClick="closePopup()" class="upper-close-btn">Close</button></h2>
//                             <div class="movies-content"></div>
//                         <li/>
//                         {this.state.movies.results.slice(0, limit).map(movie => this.getMovieCard(movie))}
//                         {this.getFooter()}
//                         :
//                         ''
//                     }

//                 </ul>
//             </>
//         )
//     }
// }
