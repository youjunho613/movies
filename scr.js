const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNWMyODE5MTJlMDUxNjI1MzhjZjU4ZDE0ZmIyN2YwNSIsInN1YiI6IjY0NzE5NmZmZGQ3MzFiMDBkZGYwM2NmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LDAWT-o6qsyDDiM5x-Ek5-7ivl5Yje1cfIIVgdK6y2A",
  },
};

let language = "ko";
let page = 1;

// let movieUrl =
//   "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";

const changeKo = () => {
  language = "ko";
  getMovies();
  // return (movieUrl = movieUrl.replace("en", "ko")), getMovies();
};

const changeEn = () => {
  language = "en";
  getMovies();
  // return (movieUrl = movieUrl.replace("ko", "en")), getMovies();
};

// const snycInputValue = (value) => {
//   document.getElementById("inputPage").value = value;
// };

const pageUp = () => {
  if (page < 500) page += 1;
  getMovies();
  // snycInputValue(page);
};
const pageDown = () => {
  if (page > 0) page -= 1;
  getMovies();
  // snycInputValue(page);
};
// if (inputPage < 500) {
//   inputPage++;
//   movieUrl = movieUrl.substring(0, 65) + inputPage;
//   return (
//     getMovies(), (document.getElementById("inputPage").value = inputPage)
//   );
// }

const searchPage = () => {
  // let inputPage = Number(document.getElementById("inputPage").value);
  let customPage = document.getElementById("inputPage").value;

  page = customPage;
  getMovies();

  // movieUrl =
  //   movieUrl.substring(0, 65) + document.getElementById("inputPage").value;
  // if (1 <= document.getElementById("inputPage").value <= 500) {
  // return setTimeout(function () {
  //   getMovies(), (inputPage = document.getElementById("inputPage").value);
  // }, 1000);
  // }
  // Debounce & Throttle
};

// if (inputPage > 1) {
//   inputPage--;
//   movieUrl = movieUrl.substring(0, 65) + inputPage;
//   return (
//     getMovies(), (document.getElementById("inputPage").value = inputPage)
//   );
// }

// fetch 값 Promise 에 저장
const fetchMovies = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?language=${language}-US&page=${page}`,
    options
  );
  const jsonData = await response.json();
  return jsonData.results;
};

// 영화 fetch [GET] => innerHTML에 붙여주기
const getMovies = async () => {
  let movies = await fetchMovies();
  let movieContainer = document.getElementById("movieContainer");
  movieContainer.innerHTML = "";
  movies.forEach(({ title, overview, poster_path, vote_average, id }) => {
    let movieCard = `<div class="movie-card" id="${id}" onclick="alertId(event)">
        <img src="https://image.tmdb.org/t/p/w500/${poster_path}" alt="${title}"/>
        <h5 class="movie-title">${title}</h5>
        <p class="movie-overview">${overview}</p>
        <p class="movie-vote">Rating: ${vote_average}</p></div>`;
    movieContainer.innerHTML += movieCard;
  });
  document.getElementById("inputPage").value = page;
};
getMovies();

// else if (
//   document.getElementById("inputPage").value < 1 &&
//   document.getElementById("inputPage").value > 500
// ) {
//   return setTimeout(function () {
//     document.getElementById("inputPage").value = 1;
//     movieUrl =
//       movieUrl.substring(0, 65) + document.getElementById("inputPage").value;
//     getMovies();
//   }, 1000);
// }
// };

// 검색 함수
const searchFunc = (event) => {
  event.preventDefault();
  let write = document.getElementById("searchInput").value.toUpperCase();
  let item = document.getElementsByClassName("movie-card");
  for (let i = 0; i < item.length; i++) {
    let title = item[i].getElementsByClassName("movie-title");
    if (title[0].innerHTML.toUpperCase().indexOf(write) > -1) {
      item[i].style.display = "flex";
    } else {
      item[i].style.display = "none";
    }
  }
};

// 검색 버튼 클릭시 search 함수 작동
let searchBtn = document.querySelector("fieldset button");
searchBtn.addEventListener("click", searchFunc);

// input에서 엔터로 search 함수 작동
let searchInput = document.querySelector("fieldset input");
searchInput.addEventListener("keypress", (pressKey) => {
  if (pressKey.key == "Enter") {
    searchFunc(event);
  }
});

// 영화 카드 클릭 => alert "영화 id"
// try.1 실패 이유 : 이벤트 버블링
// let trackingId = event.target.id; // 문제!
alertId = (event) => {
  let trackingId = event.currentTarget.id; // 해결!
  alert(`영화 ID : ${trackingId}`);
};

// try.2 [실패] HTML<onclick> 삭제 후 .addEventListener 로 동작시키기
// fetch >> .movie-card 선택 >> id 값 호출 >> alret(${ID})
// let alert = async () => {
//   await getMovies();
//   await fetchMovies();
//   let a = document.querySelectorAll(".movie-card");
//   let a = document.querySelector(".movie-card");
//   console.log(a);
// };
// a.addEventListener("click", async () => {
//   await getMovies();
//   alert;
// });
// a.addEventListener("click", () => alert);

// input 창 자동 커서
inputFocus = () => {
  document.getElementById("searchInput").focus();
};
onload = inputFocus();

// inputFocus() 함수를 3초마다 반복
// function goInfinite() {
//   setInterval(function () {
//     inputFocus();
//   }, 3000);
// }
// goInfinite();
