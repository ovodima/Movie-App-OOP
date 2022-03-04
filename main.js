const form = document.getElementById('form');
const main = document.querySelector('.main')
class Movies {
  constructor() {
    this.imgPath = "https://image.tmdb.org/t/p/w1280";
    this.popularMovies =
      "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=060f347dcc7582a34aa7ccbecd45da16&page=1";
    this.search =
      "https://api.themoviedb.org/3/search/movie?api_key=060f347dcc7582a34aa7ccbecd45da16&query=";
    this.data = [];
    this.searchReq = document.querySelector(".search");
  }

  async getMovies(url) {
    try {
      let request = await fetch(url);

      if (request.ok) {
        return await request.json();
      } else {
        console.error(request.error);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async getPopular() {
    let data = await this.getMovies(this.popularMovies);
    for (const item of data.results) {
      this.data.push(item);
    }
   
    console.log(this.data)
  }
 

  async searchMovie() {
    if (this.searchReq && this.searchReq.value !== "") {
      let res = await this.getMovies(`${this.search + this.searchReq.value}`);
      console.log("res", res);
    } else {
      window.location.reload();
    }
  }
  render() {
    this.getPopular();

    if(!this.data) {
      main.innerHTML = '<p> Wait Data...</p>'
    } else {
     setTimeout(() => {


      this.data.forEach(item => {
        const {poster_path, original_title, vote_average, overview, id, title} = item

        const movieEl = document.createElement('div')

        movieEl.classList.toggle('movie')

       movieEl.innerHTML = 
        `
          <div class="movie" data-id = "${id}">
              <img src="${this.imgPath + poster_path}" alt="photo">
              
              <div class="movie-info">
                  <h3>${original_title}</h3>
                  <span class="${voteRate(vote_average)}"> ${vote_average} </span>
              </div>
              <div class="overview">
                  <h3>${title}</h3>
                  ${overview}
              </div>
          </div>
        `

     main.appendChild(movieEl)
      })
 

     }, 1000) 
    }

  }
}

function voteRate (vote) {
  if(vote >= 8) {
    return 'green'
  } else if( vote >= 5) {
    return 'orange'
  } else {
    return 'red'
  }
}

const mov = new Movies();
mov.render()


form.addEventListener("submit", (e) => {
  e.preventDefault();

  mov.searchMovie();
});
