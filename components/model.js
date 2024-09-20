import { renderCard, renderCategory } from './view.js';

const API = 'https://api.chucknorris.io/jokes/';

export function fetchRandomJoke() {
  fetch(`${API}random`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((data) => {
      renderCard(data);
    });
}

export const countTime = (lastUpdateDate) => {
  const date = new Date(lastUpdateDate);
  const convertToMilli = date.getTime();
  const difference = Date.now() - convertToMilli;
  const hours = Math.floor(difference / 1000 / 60 / 60);
  return hours;
};

const array = [];

export function fetchCategories() {
  if (array.length > 0) {
    return;
  }
  fetch(`${API}categories`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((categories) =>
      categories.forEach((category) => {
        renderCategory(category);
        array.push(category);
      })
    );
}

export const fetchCategoryJoke = (e) => {
  const category = e.target.value;

  fetch(`${API}random?category=${category}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((data) => renderCard(data));
};

export const fetchJokeBySearch = (searchText) => {
  fetch(`${API}search?query=${searchText}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((data) => data.result.forEach((joke) => renderCard(joke)));
};

export const addToStorage = (e) => {
  const joke = e.target.value;
  const id = e.target.id;
  localStorage.setItem(id, joke);
};

export const deleteFomStorage = (e) => {
  const id = e.target.id;
  localStorage.removeItem(id);
};

export const checkStorage = (id) => {
  return localStorage.getItem(id) ? true : false;
};

export const renderFavourites = () => {
  for (let i = 0; i < localStorage.length; i++) {
    const value = localStorage.getItem(localStorage.key(i));
    if (value) {
      const data = JSON.parse(value);
      renderCard(data);
    }
  }
};

renderFavourites();
