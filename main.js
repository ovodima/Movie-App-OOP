const popularMovies = "https://api.themoviedb.org/3/discover/movie";

class Movies {
  constructor() {
    this.allMovies =
      "https://api.themoviedb.org/3/movie/550?api_key=060f347dcc7582a34aa7ccbecd45da16";
  }

  async getMovies() {
    try {
      let request = await fetch(this.allMovies);

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

   
  }
}

const newMovies = new Movies();
newMovies.render();
