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
fetch(movieUrl, options)
  .then((response) => response.json())
  .then((response) => {
    let fetchMovie = response.results;
    getMovie(fetchMovie);
  })
  .catch((err) => console.error("에러 =>", err));

// 원하는 추가기능 무엇이라도 okay but 필수요구사항 먼저!

// 6) 아래 기재된 Javascript 문법 요소 이용하기
// 화살표 함수 1개 이상 사용
// 배열 메소드
// forEach !!!!!!!!!!!!!!
// map
// filter
// reduce
// find
// 중 2개 이상 사용

// DOM 제어하기 아래 API 목록 중 2개 이상 사용하기
// 문서 객체 생성과 선택
// document.createElement(tagName)                새로운 HTML 요소를 생성합니다.
// document.getElementById(id)                    id 속성을 기준으로 요소를 선택합니다.
// document.getElementsByTagName(name)            태그 이름을 기준으로 요소를 선택합니다.
// document.getElementsByClassName(name)          클래스 이름을 기준으로 요소를 선택합니다.
// document.querySelector(selector)               CSS 선택자를 이용하여 요소를 선택합니다. !!!!!!!!!!!!!!
// document.querySelectorAll(selector)            CSS 선택자를 이용하여 모든 요소를 선택합니다.
// 문서 객체 조작
// element.innerHTML                              해당 요소 내부의 HTML 코드를 변경합니다. !!!!!!!!!!!!!!
// element.textContent                            해당 요소 내부의 텍스트를 변경합니다.
// element.setAttribute(attr, value)              해당 요소의 속성 값을 변경합니다.
// element.getAttribute(attr)                     해당 요소의 속성 값을 가져옵니다.
// element.style.property                         해당 요소의 스타일 값을 변경합니다.
// element.appendChild(child)                     해당 요소의 하위 요소로 child를 추가합니다.
// element.removeChild(child)                     해당 요소의 하위 요소 중 child를 삭제합니다.
// element.classList.add(class)                   해당 요소의 클래스에 새로운 클래스를 추가합니다.
// element.classList.remove(class)                해당 요소의 클래스 중에서 특정 클래스를 제거합니다.
// element.classList.toggle(class)                해당 요소의 클래스 중에서 특정 클래스를 추가 또는 제거합니다.
// 이벤트 처리
// element.addEventListener(type, listener)       해당 요소에서 이벤트가 발생했을 때 호출할 함수를 등록합니다.
// element.removeEventListener(type, listener)    해당 요소에서 등록된 함수를 제거합니다.
// event.preventDefault()                         이벤트가 발생했을 때 기본 동작을 취소합니다.
// event.stopPropagation()                        이벤트의 버블링을 방지하기 위해 이벤트 전파를 중지합니다.
// 기타
// window.location.href                           현재 페이지의 URL을 가져옵니다.
// window.alert(message)                          경고 메시지를 출력합니다.
// window.confirm(message)                        확인 메시지를 출력하고 사용자의 답변에 따라 Boolean 값을 반환합니다.

// 영화 카드 클릭 => alert "영화 id"
function alertId(event) {
  let trackingId = event.currentTarget.id;
  alert(`영화 ID : ${trackingId}`);
}
// try.1 실패 이유 : 이벤트 버블링
// function alertId(event) {
//   let trackingId = event.target.id;
//   alert(`영화 ID : ${trackingId}`);
// }

// 영화 API get => HTML에 붙여주기
function getMovie(fetchMovie) {
  let rows = fetchMovie;
  rows.forEach((a) => {
    let title = a["title"];
    let overview = a["overview"];
    let poster_path = a["poster_path"];
    let vote_average = a["vote_average"];
    let id = a["id"];

    let movieCard = `
                        <div class="movie-card" id="${id}" onclick="alertId(event)">
                          <img
                            src="https://image.tmdb.org/t/p/w500/${poster_path}"
                            alt="${title}"
                          />
                          <h5 class="movie-title">${title}</h5>
                          <p class="movie-overview">
                            ${overview}
                          </p>
                          <p class="movie-vote">Rating: ${vote_average}</p>
                        </div>`;
    movieContainer.innerHTML += movieCard;
  });
}

function filter(event) {
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
}
// try.1 filter 정상작동
// let abc = ["a", "b", "c", "d", "e", "abc"];
// let result = abc.filter((item) => item.length > 2);
// console.log(result);

// try.2 input 태그 값과 일치하는지 확인
// const searchFunc = (objId) => {
//   searchId = searhInput.value;
//   return objId.indexOf(searchId) !== -1;
// };

// try.3
// function searchMovie() {
//   let write = document.getElementById("searchBtn").value;
//   let movies = document.getElementsByClassName("movie-card");
//   return movies[0].indexOf(write) !== -1;
// let result = movies.filter((movie) => movie == write);
// console.log(movies[0]);
// const search = document.getElementsByClassName("movie-title");
// console.log(search);
// const write = document.getElementById("searchBtn");
// }

// input 창 커서
// function inputFocus() {
//   document.getElementById("searchInput").focus();
// }
// inputFocus();

// inputFocus()를 3초마다 반복
// function goInfinite() {
//   setInterval(function () {
//     inputFocus();
//   }, 3000);
// }
// goInfinite(); // 3초 마다 inputFocus() 함수 반복

// commit 쓸 변경사항
// 검색 기능 구현
// 검색 할 때 엔터키로 동작하기
// html input 커서 자동 위치하기 구현
