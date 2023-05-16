// Variables

let Apikey = "33eb1223772f45fe8b667a54a173a623";
let searchInput = document.getElementById("searchInput");
let currentQuery = "indian";
let currentPage = 1;
let prev = document.getElementById("prev");
let next = document.getElementById("next");
const generalEl = document.getElementById("general");
const sportsEl = document.getElementById("sport");
const technologyEl = document.getElementById("technology");
const entertainmentEl = document.getElementById("entertainment");
const businessEl = document.getElementById("business");
const newsType = document.getElementById("newsType");
const containerEl = document.getElementById("container");
let headlines = document.getElementById("headlines");

// Fetching News

const fetchNews = async (page, q) => {
  let fetchingApi = await fetch(
    `https://newsapi.org/v2/everything?q=${q}&pageSize=16&page=${page}&apiKey=${Apikey}`
  );
  let Apijson = await fetchingApi.json();
  let articles = Apijson.articles;
  let newsHtml = "";
  console.log(articles);

  articles.forEach((element) => {
    let imageUrl = element.urlToImage;

    if (imageUrl == null) {
      imageUrl = "images/breakingnews.jpg";
    } else {
      // same as url to image
    }

    let news = `<div class="card" id="newstype">
        <img id = "imgEl" src=${imageUrl} alt="loading...">
        <h2 class="news-title"> ${element.title.slice(0, 40)} </h2>
        <p class="news-para" id="newsdetails">
        ${element.description.slice(0, 70)}
        </p> 
        <a href=${
          element.url
        } target="_blank"><button class="btn">Read more</button></a>
      </div>`;
    newsHtml += news;
  });

  containerEl.innerHTML = newsHtml;
};

fetchNews(currentPage, currentQuery);

// Search Input

searchInput.addEventListener("keypress", (e) => {
  if (e.target.value && e.key === "Enter") {
    e.preventDefault;
    headlines.innerHTML = searchInput.value.toUpperCase();
    fetchNews(currentPage, searchInput.value);
  }
});

// Preview and Next Button

prev.addEventListener("click", (e) => {
  e.preventDefault;
  if (currentPage > 1) {
    currentPage = currentPage - 1;
    fetchNews(currentPage, currentQuery);
  }
});

next.addEventListener("click", (e) => {
  e.preventDefault;
  currentPage = currentPage + 1;
  fetchNews(currentPage, currentQuery);
});

// Navbar

generalEl.addEventListener("click", () => {
  headlines.innerText = " GENERAL ";
  fetchNews(currentPage, "general");
});

sportsEl.addEventListener("click", () => {
  headlines.innerText = " SPORTS ";
  fetchNews(currentPage, "sports");
});

technologyEl.addEventListener("click", () => {
  headlines.innerText = " TECHNOLOGY ";
  fetchNews(currentPage, "technology");
});

entertainmentEl.addEventListener("click", () => {
  headlines.innerText = " ENTERTAINMENT ";
  fetchNews(currentPage, "entertainment");
});

businessEl.addEventListener("click", () => {
  headlines.innerText = " BUSINESS ";
  fetchNews(currentPage, "business");
});

// Navbar End
