import {
  countTime,
  fetchCategoryJoke,
  addToStorage,
  deleteFomStorage,
  checkStorage,
} from './model.js';

const createLikeButton = (data) => {
  const icon = document.createElement('img');
  const button = document.createElement('button');

  icon.classList.add('likeIcon');
  icon.id = data.id;
  icon.value = JSON.stringify(data);
  icon.src =
    checkStorage(data.id) === true
      ? '../public/images/filledheartIcon.svg'
      : '../public/images/heartIcon.svg';

  button.classList.add('likeButton');
  button.onclick =
    checkStorage(data.id) === true ? deleteFomStorage : addToStorage;

  button.appendChild(icon);
  return button;
};

export const renderCard = (data) => {
  const messageIcon = document.createElement('img');
  const id = document.createElement('p');
  const joke = document.createElement('p');
  const date = document.createElement('p');
  const category = document.createElement('p');
  const jokeData = document.createElement('div');
  const textBlock = document.createElement('div');
  const jokeBody = document.createElement('div');
  const jokeCard = document.createElement('div');
  const cardPlace = document.querySelector(
    checkStorage(data.id) === true ? '.favouriteJokes' : '.jokes'
  );

  const hours = countTime(data.updated_at);
  const likeButton = createLikeButton(data);

  messageIcon.classList.add('messageIcon');
  messageIcon.src =
    checkStorage(data.id) === true
      ? '../public/images/darkMessageIcon.svg'
      : '../public/images/messageIcon.svg';

  id.classList.add('grey');
  id.innerHTML = `ID: <a href=${data.url} target='_blank'><span class='blue'>${data.id}<span></a><img class='linkIcon' src='../public/images/linkIcon.svg'/>`;

  joke.classList.add('joke');
  joke.innerHTML = data.value;

  date.classList.add('grey');
  date.innerHTML = `<span class='thin'>Last update:</span> ${hours} hours ago`;

  category.innerHTML =
    data.categories?.length > 0
      ? `<p class='jokeCategory'>${data.categories}</p>`
      : `<p display:none></p>`;

  jokeData.classList.add('jokeData');
  textBlock.classList.add('textBlock');
  jokeBody.classList.add('jokeBody');
  jokeCard.classList.add('card');
  if (checkStorage(data.id) === true) {
    jokeCard.classList.add('favJoke');
  }

  jokeData.appendChild(date);
  jokeData.appendChild(category);
  jokeBody.appendChild(id);
  jokeBody.appendChild(joke);
  jokeBody.appendChild(jokeData);
  textBlock.appendChild(messageIcon);
  textBlock.appendChild(jokeBody);
  jokeCard.appendChild(likeButton);
  jokeCard.appendChild(textBlock);
  cardPlace.appendChild(jokeCard);
};

export const renderCategory = (data) => {
  const categoryPlace = document.querySelector('.categorySelector');
  const category = document.createElement('button');

  category.innerHTML = data;
  category.type = 'button';
  category.classList.add('categoryButton');
  category.value = data;
  category.onclick = fetchCategoryJoke;

  categoryPlace.appendChild(category);
};
