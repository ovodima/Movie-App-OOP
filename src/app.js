import Movies from './scripts/index'

const moviePage = new Movies();
moviePage.render();

form.addEventListener("submit", (e) => {
  e.preventDefault();

  moviePage.render();
});