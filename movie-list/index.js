const BASE_URL = 'https://webdev.alphacamp.io/'
const INDEX_URL = BASE_URL + 'api/movies/'
const POSTER_URL = BASE_URL + 'posters/'

const movies = []

const dataPanel = document.querySelector('#data-panel')
const searchForm = document.querySelector('#search-form')
const searchInput = document.querySelector('#search-input')

function renderMovieList(data) {
  let rawHTML = ''

  data.forEach((item) => {
    //title img
    // console.log(item)
    rawHTML += `<div class="col-sm-3">
                <div class="mb-2">
                    <div class="card">
                        <img src="${POSTER_URL + item.image}" class="card-img-top" alt="movie poster">
                        <div class="card-body">
                            <h5 class="card-title">${item.title}</h5>
                        </div>
                        <div class="card-footer">
                            <button class="btn btn-primary btn-show-movie" data-bs-toggle="modal" data-id=${item.id}
                                data-bs-target="#movie-modal"> More </button>
                            <button class="btn btn-info btn-add-favorite" data-id=${item.id}>
                            +
                            </button>
                        </div>
                    </div>
                </div>
            </div>`
  });

  dataPanel.innerHTML = rawHTML
}

function showMovieModal(id) {
  const modalTitle = document.querySelector('#movie-modal-title')
  const modalImage = document.querySelector('#movie-modal-image')
  const modalDate = document.querySelector('#movie-modal-date')
  const modalDescription = document.querySelector('#movie-modal-description')
  axios.get(INDEX_URL + id).then((response) => {
    const data = response.data.results
    modalTitle.innerText = data.title
    modalDate.innerText = 'Release date: ' + data.release_date
    modalDescription.innerText = data.description
    modalImage.innerHTML = `<img src="${POSTER_URL + data.image
      }" alt="movie-poster" class="img-fluid">`
  })
}

dataPanel.addEventListener('click', function onPanelClicked(event) {
  if (event.target.matches('.btn-show-movie')) {
    console.log(event.target.dataset.id)
    showMovieModal(Number(event.target.dataset.id))
  } else if (event.target.matches('.btn-add-favorite')) {
    addToFavorite(Number(event.target.dataset.id))
  }
})

searchForm.addEventListener('submit', function onSearchFormSubmited(event) {
  event.preventDefault();
  const keyword = searchInput.value.trim().toLowerCase()
  filteredMovies = []
  console.log(keyword)

  if (!keyword.length) {
    return alert('Please enter valid string')
  }

  filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(keyword))

  if (filteredMovies.length === 0) {
    return alert('Cannot find mvie with keyword' + keyword)
  }


  // for (const movie of movies) {
  //   if (movie.title.toLowerCase().includes(keyword)) {
  //     filterMovies.push(movie)
  //   }
  // }

  renderMovieList(filteredMovies)
})


axios.get(INDEX_URL).then((response) => {
  //array(80)
  // for (const movie of response.data.results) {
  //   movies.push(movie)
  // }
  // console.log(response.data.results)
  movies.push(...response.data.results)
  // console.log(movies)
  renderMovieList(movies)
})