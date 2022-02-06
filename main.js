const form = document.getElementById("form");
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
    console.log("this.data", this.data);
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
  }
}
const mov = new Movies();

form.addEventListener("submit", (e) => {
  e.preventDefault();

  mov.searchMovie();
});
