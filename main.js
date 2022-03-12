const form = document.getElementById("form");
const main = document.querySelector(".main");
const searchReq = document.getElementById("search");
class Movies {
  constructor() {
    this.imgPath = "https://image.tmdb.org/t/p/w1280";
    this.popularMovies =
      "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=060f347dcc7582a34aa7ccbecd45da16&page=1";
    this.search =
      "https://api.themoviedb.org/3/search/movie?api_key=060f347dcc7582a34aa7ccbecd45da16&query=";
  }

  async getMovies(url) {
    let result 
    try {
      result = await fetch(url);

      if (result.ok) {
        return result.json();
      }
    } catch (error) {
      console.error(error);
    }

    return result
  }

  voteRate(vote) {
    if (vote >= 8) {
      return "green";
    } else if (vote >= 5) {
      return "orange";
    } else {
      return "red";
    }
  }

  showMovieInPage(movie) {
    main.innerHTML = ''

    if (!movie) {
      main.innerHTML = '<p class="error"> Wait Data...</p>';
    } else {
      movie.forEach((item) => {
        const {
          poster_path,
          original_title,
          vote_average,
          overview,
          id,
          title,
        } = item;

        const movieEl = document.createElement("div");
        movieEl.setAttribute("data-id", `${id}`);

        movieEl.classList.toggle("movie");

        movieEl.innerHTML = `
              
                  <img src="${this.imgPath + poster_path}" alt="photo">
                  
                  <div class="movie-info">
                      <h3>${original_title}</h3>
                      <span class="${this.voteRate(
                        vote_average
                      )}"> ${vote_average} </span>
                  </div>
                  <div class="overview">
                      <h3>${title}</h3>
                      ${overview}
                  </div>
              
            `;
        main.appendChild(movieEl);
      });
    }
  }

  render() {

    if(searchReq && searchReq.value !== '') {
      this.getMovies(this.search + searchReq.value)
      .then(data => data.results)
        .then(resSearch => this.showMovieInPage(resSearch))
    } else {
      this.getMovies(this.popularMovies)
      .then(data => data.results)
        .then(popular => this.showMovieInPage(popular))
    }

  }
}

const moviePage = new Movies();
moviePage.render();

form.addEventListener("submit", (e) => {
  e.preventDefault();

  moviePage.render();
});
