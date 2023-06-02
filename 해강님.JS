let all_movie_list = [];

const draw_movie_list = (movie_list) => {
  const movie_list_element = document.getElementsByClassName("movie-list")[0];

  movie_list_element.innerHTML = movie_list.reduce(
    (_movie_list, movie_item) => {
      const { id, poster_path, title, overview, vote_average } = movie_item;

      return (_movie_list += `
              <li class="movie-item" onclick="alert('movie_id : ${id}')">
                  <img class="movie-poster" src="https://image.tmdb.org/t/p/w500/${poster_path}" alt="${title} 포스터" />
                  <h2 class="movie-title">${title}</h2>
                  <p class="movie-desc">${overview}</p>
                  <p class="movie-rating">Rating : ${vote_average}</p>
              </li>
            `);
    },
    ""
  );
};

const fetch_movie = async (rest_url) => {
  const { results } = await fetch(`https://api.themoviedb.org/3/${rest_url}`, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwODZhZjcxNzY0MTVhYjk3MWU5YjRjZWFhOTA0NTY4YiIsInN1YiI6IjY0NzBhMDI4YzVhZGE1MDBhODJkZmMwNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MW5UL8xFifiCQX7ozBfj0REWT4TL4S75oHk9Zki44-0",
    },
  }).then((response) => response.json());

  return results;
};

const load_movie = async () => {
  all_movie_list = await fetch_movie("movie/popular");

  draw_movie_list(all_movie_list);
};

const search_movie = async (event) => {
  event.preventDefault();

  const search_box = document.getElementsByClassName("search-box")[0];
  const search_keyword = search_box.value.toUpperCase();

  const search_movie_list = all_movie_list.filter(({ title }) =>
    title.toUpperCase().includes(search_keyword)
  );

  search_movie_list.length > 0
    ? draw_movie_list(search_movie_list)
    : alert("검색 결과가 없습니다.");
};

load_movie();
