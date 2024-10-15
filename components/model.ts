import { renderCard, renderCategory, dataInterface } from './view';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

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

    categories.forEach((category: string) => {
      renderCategory(category);
      categoriesArray.push(category);
    });
  } catch (error) {
    console.error('Error fetching catogories:', error);
  }
}

export async function fetchCategoryJoke(e: Event) {
  const category = (e.target as HTMLInputElement).value;

  try {
    const response = await fetch(`${API}random?category=${category}`);
    const catJokeData = await response.json();

    renderCard(catJokeData);
  } catch (error) {
    console.error(`Error fetching ${category} joke:`, error);
  }
}

export async function fetchJokeBySearch(searchText: string) {
  try {
    const response = await fetch(`${API}search?query=${searchText}`);
    const searchJokeData = await response.json();

    searchJokeData.result.forEach((joke: dataInterface) => renderCard(joke));
  } catch (error) {
    console.error(`Error fetching jokes about ${searchText}:`, error);
  }
}

export const addToStorage = (e: Event) => {
  const joke = (e.target as HTMLInputElement).value;
  const id = (e.target as HTMLInputElement).id;

  localStorage.setItem(id, joke);
};

export const deleteFromStorage = (e: Event) => {
  const id = (e.target as HTMLInputElement).id;

  localStorage.removeItem(id);
};

export const checkStorage = (id: string) => {
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

export const countTime = (lastUpdateDate: string) => {
  dayjs.extend(relativeTime);

  const now = dayjs();
  const lastUpdate = dayjs(lastUpdateDate).from(now);

  return lastUpdate;
};

renderFavourites();
