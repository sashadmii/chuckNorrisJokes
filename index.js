import {
  fetchRandomJoke,
  fetchCategories,
  fetchJokeBySearch,
} from './components/model.js';

const getJoke = (e) => {
  const checkedCategory = document.querySelector(
    'input[name=jokeType]:checked'
  );
  const categoryValue = checkedCategory.value;

  if (categoryValue === 'random') {
    fetchRandomJoke();
  }

  if (categoryValue === 'categories') {
    document.querySelector('.categorySelector').style.display = 'block';
    fetchCategories();
  } else {
    document.querySelector('.categorySelector').style.display = 'none';
  }

  if (categoryValue === 'search') {
    document.querySelector('.searchInput').style.display = 'block';
    const searchText = document.querySelector('.searchInput').value;
    if (searchText.length > 0) {
      fetchJokeBySearch(searchText);
      document.querySelector('.searchInput').value = '';
    }
  } else {
    document.querySelector('.searchInput').style.display = 'none';
  }
};

const button = document.querySelector('.getJokeButton');
button.addEventListener('click', getJoke);

const openFavourites = () => {
  document.querySelector('.right').style.right = '0rem';
  document.querySelector('.topFav').style.display = 'none';
  document.querySelector('.left').style.background = 'rgba(0,0,0,0.5)';
  document.querySelector('.left').style.opacity = '50%';
};

const openFavButton = document.querySelector('.openFav');
openFavButton.addEventListener('click', openFavourites);

const closeFavourites = () => {
  document.querySelector('.right').style.right = '-30rem';
  document.querySelector('.topFav').style.display = 'flex';
  document.querySelector('.left').style.background = 'none';
  document.querySelector('.left').style.opacity = '100%';
};

const closeFavButton = document.querySelector('.closeFav');
closeFavButton.addEventListener('click', closeFavourites);
