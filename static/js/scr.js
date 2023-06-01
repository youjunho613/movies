const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNWMyODE5MTJlMDUxNjI1MzhjZjU4ZDE0ZmIyN2YwNSIsInN1YiI6IjY0NzE5NmZmZGQ3MzFiMDBkZGYwM2NmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LDAWT-o6qsyDDiM5x-Ek5-7ivl5Yje1cfIIVgdK6y2A",
  },
};

let movieUrl =
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";

// fetch 값 Promise 에 저장
let fetchMovies = async () => {
  const response = await fetch(movieUrl, options);
  const jsonData = await response.json();
  return jsonData.results;
};

// 영화 fetch [GET] => innerHTML에 붙여주기
// (화살표 함수, 비구조화 할당)
// forEach, getElementById, innerHTML
let getMovies = async () => {
  let movies = await fetchMovies();

  movies.forEach(({ title, overview, poster_path, vote_average, id }) => {
    let movieCard = `<div class="movie-card" id="${id}" onclick="alertId(event)">
        <img src="https://image.tmdb.org/t/p/w500/${poster_path}" alt="${title}"/>
        <h5 class="movie-title">${title}</h5>
        <p class="movie-overview">${overview}</p>
        <p class="movie-vote">Rating: ${vote_average}</p></div>`;
    document.getElementById("movieContainer").innerHTML += movieCard;
  });
};
getMovies();

// 검색 함수
let searchFunc = (event) => {
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
function alertId(event) {
  // let trackingId = event.target.id; // 문제!
  let trackingId = event.currentTarget.id; // 해결!
  alert(`영화 ID : ${trackingId}`);
}

// try.2 [실패] HTML<onclick> 삭제 후 .addEventListener 로 동작시키기
// let alert = async () => {
//   await getMovies();
//   let a = document.querySelectorAll(".movie-card");
//   console.log(a);
//   a.addEventListener("click", () => alert);
// };
// let a = document.querySelectorAll(".movie-card");
// a.addEventListener("click", () => alert);

// input 창 자동 커서
function inputFocus() {
  document.getElementById("searchInput").focus();
}
onload = inputFocus();

// inputFocus() 함수를 3초마다 반복
// function goInfinite() {
//   setInterval(function () {
//     inputFocus();
//   }, 3000);
// }
// goInfinite(); // 3초 마다 inputFocus() 함수 반복

// commit 쓸 변경사항
// button 태그 onclick 검색 기능을 바닐라 자바스크립트 addEventListener로 구현
// input 태그 onkeypress 엔터키 검색 기능을 바닐라 자바스크립트 addEventListener로 구현
// input 태그 autofocus 기능을 자바스크립트 메서드로 구현
