const time = document.getElementById("time");
const greeting = document.getElementById("greeting");
const name = document.getElementById("name");
const idea = document.getElementById("idea");
const date = document.getElementById("date");
const weatherIcon = document.querySelector(".weather-icon");
const feelLike = document.querySelector(".feel");
const humidity = document.querySelector(".humidity");
const speedWind = document.querySelector(".speed-wind");
const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather-description");
let city = document.querySelector(".city");
const quoteContent = document.querySelector(".quote-inner__content");
const quoteAuthor = document.querySelector(".quote-inner__author");
const quoteBtn = document.querySelector(".quote-btn");
const btn = document.querySelector(".btn");
let count = 1;

const monthName = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const week = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function showTime() {
  let today = new Date();
  let month = today.getMonth();
  let numberDate = today.getDate();
  let day = today.getDay();
  let hour = today.getHours();
  let min = today.getMinutes();
  let sec = today.getSeconds();

  date.innerHTML = `${week[day]}, ${numberDate} ${monthName[month]}`;
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(
    sec
  )}`;

  setTimeout(showTime, 1000);
}

function addZero(num) {
  return (parseInt(num, 10) < 10 ? "0" : "") + num;
}

function setBgGreet() {
  let time;
  let text;
  let today = new Date();
  let hour = today.getHours();

  if (hour < 6) {
    time = "night";
    text = "Good Night";
  } else if (hour < 12) {
    time = "morning";
    text = "Good Morning";
  } else if (hour < 18) {
    time = "day";
    text = "Good Afternoon";
  } else if (hour < 24) {
    time = "evening";
    text = "Good Evening";
  }
  document.body.style.backgroundImage = `linear-gradient(to top, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("./images/${time}/0${count}.jpg")`;
  greeting.textContent = text;
}

function resetBg() {
  if (count >= 6) {
    count = 1;
  } else {
    count++;
  }

  setBgGreet();
}

btn.addEventListener("click", resetBg);

function getName() {
  if (localStorage.getItem("name") === null) {
    name.textContent = "[Enter Name]";
  } else {
    name.textContent = localStorage.getItem("name");
  }
}

function setName(e) {
  if (e && e.type === "keypress") {
    console.log("1");
    if (e.which == 13 || e.keyCode == 13) {
      if (e.target.innerText !== "") {
        localStorage.setItem("name", e.target.innerText);
      } else if (
        e.target.innerText === "" &&
        localStorage.getItem("name") === null
      ) {
        localStorage.setItem("name", "[Enter Name]");
      }
      getName();
      name.blur();
    }
  } else {
    console.log("2");
    if (e.target.innerText !== "") {
      localStorage.setItem("name", e.target.innerText);
    } else if (
      e.target.innerText === "" &&
      localStorage.getItem("name") === null
    ) {
      localStorage.setItem("name", "[Enter Name]");
    }
    getName();
  }
}

function getIdea() {
  if (localStorage.getItem("idea") === null) {
    idea.textContent = "[Enter Idea]";
  } else {
    idea.textContent = localStorage.getItem("idea");
  }
}

function setIdea(e) {
  if (e && e.type == "keypress") {
    if (e.which == 13 || e.keyCode == 13) {
      if (e.target.innerText !== "") {
        localStorage.setItem("idea", e.target.innerText);
      } else if (
        e.target.innerText === "" &&
        localStorage.getItem("idea") === null
      ) {
        localStorage.setItem("idea", "[Enter Idea]");
      }
      getIdea();
      idea.blur();
    }
  } else {
    if (e.target.innerText !== "") {
      localStorage.setItem("idea", e.target.innerText);
    } else if (
      e.target.innerText === "" &&
      localStorage.getItem("idea") === null
    ) {
      localStorage.setItem("idea", "[Enter Idea]");
    }
    getIdea();
  }
}

function setCity(e) {
  if (e && e.type === "keypress") {
    if (e.which == 13 || e.keyCode == 13) {
      if (e.target.innerText !== "") {
        localStorage.setItem("city", e.target.innerText);
      } else if (
        e.target.innerText === "" &&
        localStorage.getItem("city") === null
      ) {
        localStorage.setItem("city", "Minsk");
      }
      getWeather();
      city.blur();
    }
  } else {
    if (e.target.innerText !== "") {
      localStorage.setItem("city", e.target.innerText);
    } else if (
      e.target.innerText === "" &&
      localStorage.getItem("city") === null
    ) {
      localStorage.setItem("city", "Minsk");
    }
    getWeather();
  }
}

name.addEventListener("click", () => (name.textContent = ""));
name.addEventListener("keypress", setName);
name.addEventListener("blur", setName);
idea.addEventListener("click", () => (idea.textContent = ""));
idea.addEventListener("keypress", setIdea);
idea.addEventListener("blur", setIdea);
city.addEventListener("click", () => (city.textContent = ""));
city.addEventListener("keypress", setCity);
city.addEventListener("blur", setCity);

async function getWeather() {
  if (localStorage.getItem("city") === null) {
    city.textContent = "Minsk";
  } else {
    city.textContent = localStorage.getItem("city");
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&appid=ddf1200d9c844c50d47328232e657abf&units=metric`;
  const res = await fetch(url);
  const data = await res.json();

  weatherIcon.innerHTML = `<img src='./images/weather-icon/${data.weather[0].icon}.png' alt='img'/>`;
  temperature.textContent = `${data.main.temp.toFixed()}°`;
  feelLike.textContent = `FEELS LIKE: ${data.main.feels_like.toFixed()}°`;
  humidity.textContent = `HUMIDITY: ${data.main.humidity}%`;
  speedWind.textContent = `WIND: ${data.wind.speed.toFixed(1)} M/S`;
  weatherDescription.textContent = data.weather[0].description;
}

async function getQuote() {
  const url = `https://type.fit/api/quotes`;
  const res = await fetch(url);
  const data = await res.json();
  const randomQuotes = Math.floor(Math.random(data) * 100);
  quoteContent.textContent = `${data[randomQuotes].text}`;
  quoteAuthor.textContent = `${data[randomQuotes].author}`;
}

document.addEventListener("DOMContentLoaded", getQuote);
quoteBtn.addEventListener("click", getQuote);

getWeather();
showTime();
setBgGreet();
getName();
getIdea();
