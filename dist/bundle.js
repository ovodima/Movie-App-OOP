(()=>{"use strict";document.getElementById("form");const e=document.querySelector(".main"),t=document.getElementById("search"),i=new class{constructor(){this.imgPath="https://image.tmdb.org/t/p/w1280",this.popularMovies="https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=060f347dcc7582a34aa7ccbecd45da16&page=1",this.search="https://api.themoviedb.org/3/search/movie?api_key=060f347dcc7582a34aa7ccbecd45da16&query="}async getMovies(e){let t;try{if(t=await fetch(e),t.ok)return t.json()}catch(e){console.error(e)}return t}voteRate(e){return e>=8?"green":e>=5?"orange":"red"}showMovieInPage(t){e.innerHTML="",t?t.forEach((t=>{const{poster_path:i,original_title:s,vote_average:a,overview:r,id:n,title:o}=t,c=document.createElement("div");c.setAttribute("data-id",`${n}`),c.classList.toggle("movie"),c.innerHTML=`\n              \n                  <img src="${this.imgPath+i}" alt="photo">\n                  \n                  <div class="movie-info">\n                      <h3>${s}</h3>\n                      <span class="${this.voteRate(a)}"> ${a} </span>\n                  </div>\n                  <div class="overview">\n                      <h3>${o}</h3>\n                      ${r}\n                  </div>\n              \n            `,e.appendChild(c)})):e.innerHTML='<p class="error"> Wait Data...</p>'}render(){t&&""!==t.value?this.getMovies(this.search+t.value).then((e=>e.results)).then((e=>this.showMovieInPage(e))):this.getMovies(this.popularMovies).then((e=>e.results)).then((e=>this.showMovieInPage(e)))}};i.render(),form.addEventListener("submit",(e=>{e.preventDefault(),i.render()}))})();