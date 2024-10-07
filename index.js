import {
  fetchRandomJoke,
  fetchCategories,
  fetchJokeBySearch,
} from './components/model.js';

let categoryValue;

const getJokeType = (e) => {
  categoryValue = e.target.value;

  if (categoryValue === 'categories') {
    document.querySelector('.categorySelector').style.display = 'block';
    fetchCategories();
  } else {
    document.querySelector('.categorySelector').style.display = 'none';
  }

  if (categoryValue === 'search') {
    document.querySelector('.searchInput').style.display = 'block';
  } else {
    document.querySelector('.searchInput').style.display = 'none';
  }
};

const getJoke = (e) => {
  if (categoryValue === 'random') {
    fetchRandomJoke();
  }

  if (categoryValue === 'search') {
    const searchText = document.querySelector('.searchInput').value;
    if (searchText.length > 0) {
      fetchJokeBySearch(searchText);
      document.querySelector('.searchInput').value = '';
    }
  }
};

const openFavourites = () => {
  document.querySelector('.right').style.right = '0rem';
  document.querySelector('.topFav').style.display = 'none';
  document.querySelector('.cover-block').style.display = 'block';
};

const closeFavourites = () => {
  document.querySelector('.right').style.right = '-50rem';
  document.querySelector('.topFav').style.display = 'flex';
  document.querySelector('.cover-block').style.display = 'none';
};

document.querySelectorAll('input[name=jokeType]').forEach((element) => {
  element.addEventListener('click', getJokeType);
});

const button = document.querySelector('.getJokeButton');
button.addEventListener('click', getJoke);

const openFavButton = document.querySelector('.openFav');
openFavButton.addEventListener('click', openFavourites);

const closeFavButton = document.querySelector('.closeFav');
closeFavButton.addEventListener('click', closeFavourites);
