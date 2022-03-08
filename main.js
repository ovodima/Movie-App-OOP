const form = document.getElementById("form");
const main = document.querySelector(".main");
class Movies {
  constructor() {
    this.imgPath = "https://image.tmdb.org/t/p/w1280";
    this.popularMovies =
      "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=060f347dcc7582a34aa7ccbecd45da16&page=1";
    this.search =
      "https://api.themoviedb.org/3/search/movie?api_key=060f347dcc7582a34aa7ccbecd45da16&query=";
    this.searchReq = document.querySelector(".search");
  }

   async getMovies(url) {
    try {
      let request = await fetch(url);

      if (request.ok) {
        return request.json();
      } else {
        console.error(request.error);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async getPopular() {
    let result;
    try {
      result = await this.getMovies(this.popularMovies);
    } catch (error) {
      console.log(new Error(error));
    }

    return result;
  }

  async searchMovie() {
    let result;
    try {
      if (this.searchReq && this.searchReq.value !== "") {
        result = await this.getMovies(`${this.search + this.searchReq.value}`);
      } else {
        return
      }
    } catch (error) {
      console.log(new Error(error));
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
            movieEl.setAttribute('data-id', `${id}`)

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

  renderSearch() {
        this.searchMovie()
          .then(data => data.results)
            .then(result => this.showMovieInPage(result))
  }

  render() {
    


    this.getPopular()
      .then(data => data.results)
        .then(movies => this.showMovieInPage(movies))
  }
}



const moviePage = new Movies();
moviePage.render()

form.addEventListener("submit", (e) => {
  e.preventDefault()
  moviePage.renderSearch()
});
