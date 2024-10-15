import {
  fetchRandomJoke,
  fetchCategories,
  fetchJokeBySearch,
} from './components/model'

let categoryValue: string;

const getJokeType = (e: MouseEvent) => {
  categoryValue = (e.target as HTMLInputElement).value;

  if (categoryValue === 'categories') {
    document.querySelector<HTMLElement>('.categorySelector').style.display = 'block';
    fetchCategories();
  } else {
    document.querySelector<HTMLElement>('.categorySelector').style.display = 'none';
  }

  if (categoryValue === 'search') {
    document.querySelector<HTMLElement>('.searchInput').style.display = 'block';
  } else {
    document.querySelector<HTMLElement>('.searchInput').style.display = 'none';
  }
};

const getJoke = (e: Event) => {
  if (categoryValue === 'random') {
    fetchRandomJoke();
  }

  if (categoryValue === 'search') {
    const searchText = document.querySelector<HTMLInputElement>('.searchInput').value;
    if (searchText.length > 0) {
      fetchJokeBySearch(searchText);
      document.querySelector<HTMLInputElement>('.searchInput').value = '';
    }
  }
};

const openFavourites = () => {
  document.querySelector<HTMLElement>('.right').style.right = '0rem';
  document.querySelector<HTMLElement>('.topFav').style.display = 'none';
  document.querySelector<HTMLElement>('.cover-block').style.display = 'block';
};

const closeFavourites = () => {
  document.querySelector<HTMLElement>('.right').style.right = '-50rem';
  document.querySelector<HTMLElement>('.topFav').style.display = 'flex';
  document.querySelector<HTMLElement>('.cover-block').style.display = 'none';
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
