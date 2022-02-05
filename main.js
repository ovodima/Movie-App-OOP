class Movies {
  constructor() {
    this.imgPath = "https://image.tmdb.org/t/p/w1280"
    this.popularMovies = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=060f347dcc7582a34aa7ccbecd45da16&page=1"
    this.search = "https://api.themoviedb.org/3/search/movie?api_key=060f347dcc7582a34aa7ccbecd45da16&query='"

}

  async getMovies() {
    try {
      let request = await fetch(this.popularMovies);

      if (request.ok) {
        return await request.json();
      } else {
        console.error(request.error);
      }
    } catch (error) {
      console.error(error);
    }
  }
 
 async getData() {
     let data = await this.getMovies()
     console.log(data)
     
 }
  render() {
   let list =  this.getData()
    for(let key in list) {
        console.log(`key = ${key} property = ${list[key]}`)
    }
  }
}

const newMovies = new Movies();
newMovies.render();
