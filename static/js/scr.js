const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNWMyODE5MTJlMDUxNjI1MzhjZjU4ZDE0ZmIyN2YwNSIsInN1YiI6IjY0NzE5NmZmZGQ3MzFiMDBkZGYwM2NmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LDAWT-o6qsyDDiM5x-Ek5-7ivl5Yje1cfIIVgdK6y2A",
  },
};

const movieUrl =
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";

const fetchMovie = fetch(movieUrl, options)
  .then((response) => response.json())
  .catch((err) => console.error("에러 =>", err));
// .then((response) => console.log("리스폰 =>", response.results));

// 4) 영화 검색 UI 구현 input 창에 입력한 문자값이 포함되는 영화들만 화면에 보이도록 입력 후 검색버튼 클릭 시 실행되도록

// 7) 선택요구 사항
// CSS) flex 사용하기, grid 사용하기
// 대소문자 관계없이 검색 가능하게 하기
// 키보드 enter키를 입력해도 검색버튼 클릭한 것과 동일하게 검색 실행시키기
// 원하는 추가기능 무엇이라도 okay but 필수요구사항 먼저!

// 6) 아래 기재된 Javascript 문법 요소 이용하기
// 변순 선언은 let 과 const 만 쓸 것!
// 화살표 함수 1개 이상 사용
// 배열 메소드
// forEach
// map
// filter
// reduce
// find 중 2개 이상 사용

// DOM 제어하기 아래 API 목록 중 2개 이상 사용하기
// 문서 객체 생성과 선택
// document.createElement(tagName)                새로운 HTML 요소를 생성합니다.
// document.getElementById(id)                    id 속성을 기준으로 요소를 선택합니다.
// document.getElementsByTagName(name)            태그 이름을 기준으로 요소를 선택합니다.
// document.getElementsByClassName(name)          클래스 이름을 기준으로 요소를 선택합니다.
// document.querySelector(selector)               CSS 선택자를 이용하여 요소를 선택합니다.
// document.querySelectorAll(selector)            CSS 선택자를 이용하여 모든 요소를 선택합니다.
// 문서 객체 조작
// element.innerHTML                              해당 요소 내부의 HTML 코드를 변경합니다.
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

function alertId(event) {
  let trackingId = event.currentTarget.id;
  alert(`영화 ID : ${trackingId}`);
}
// function alertId(event) {
//   let trackingId = event.target.id;
//   alert(`영화 ID : ${trackingId}`);
// }
//이벤트 버블링

function getMovie() {
  fetch(movieUrl, options)
    .then((response) => response.json())
    .then((response) => {
      let rows = response.results;
      rows.forEach((a) => {
        let title = a["title"];
        let overview = a["overview"];
        let poster_path = a["poster_path"];
        let vote_average = a["vote_average"];
        let id = a["id"];

        // <div class="movie-card" id="${id}" onclick="alert('영화ID : ${id}')">
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
    })
    .catch((err) => console.error("에러 =>", err));
}

let a = document.querySelector("#searchBtn");
console.log(a);

function searchMovie() {
  fetch(movieUrl, options)
    .then((response) => response.json())
    .then((response) => {
      let rows = response.results;
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
    })
    .catch((err) => console.error("에러 =>", err));
}

// function inputFocus() {
//   let focus = document.getElementById("focus");
//   focus.focus();
// }
// inputFocus();

// function goInfinite() {
//   setInterval(function () {
//     inputFocus();
//   }, 3000);
// }
// goInfinite(); // 3초 마다 inputFocus() 함수 반복

getMovie();

// commit 쓸 변경사항
// fetch get 받은 데이터로 바닐라 자바스크립트를 이용하여 HTML 반영하기
// add function inputFocus() || input 태그 autofocus 사용 = 새로 고침 했을 때 input 태그에 커서 자동 위치
// alert ID 구성
