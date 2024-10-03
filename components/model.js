import { renderCard, renderCategory } from './view.js';

const API = 'https://api.chucknorris.io/jokes/';
const categoriesArray = [];

export async function fetchRandomJoke() {
  try {
    const response = await fetch(`${API}random`);
    const jokeData = await response.json();

    renderCard(jokeData);
  } catch (error) {
    console.error('Error fetching random joke:', error);
  }
}

export async function fetchCategories() {
  if (categoriesArray.length > 0) {
    return;
  }

  try {
    const response = await fetch(`${API}categories`);
    const categories = await response.json();

    categories.forEach((category) => {
      renderCategory(category);
      categoriesArray.push(category);
    });
  } catch (error) {
    console.error('Error fetching catogories:', error);
  }
}

export async function fetchCategoryJoke(e) {
  const category = e.target.value;

  try {
    const response = await fetch(`${API}random?category=${category}`);
    const catJokeData = await response.json();

    renderCard(catJokeData);
  } catch (error) {
    console.error(`Error fetching ${category} joke:`, error);
  }
}

export async function fetchJokeBySearch(searchText) {
  try {
    const response = await fetch(`${API}search?query=${searchText}`);
    const searchJokeData = await response.json();

    searchJokeData.result.forEach((joke) => renderCard(joke));
  } catch (error) {
    console.error(`Error fetching jokes about ${searchText}:`, error);
  }
}

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

export const countTime = (lastUpdateDate) => {
  const date = new Date(lastUpdateDate);

  const dateToMs = date.getTime();
  const difference = Date.now() - dateToMs;

  const hours = Math.floor(difference / 1000 / 60 / 60);
  return hours;
};

renderFavourites();
