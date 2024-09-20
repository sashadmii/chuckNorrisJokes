import {
  countTime,
  fetchCategoryJoke,
  addToStorage,
  deleteFomStorage,
  checkStorage,
} from './model.js';

export const renderCard = (data) => {
  const messageIcon = document.createElement('img');
  messageIcon.classList.add('messageIcon');
  messageIcon.src =
    checkStorage(data.id) === true
      ? '../images/darkMessageIcon.svg'
      : '../images/messageIcon.svg';

  const id = document.createElement('p');
  id.classList.add('grey');
  id.innerHTML = `ID: <a href=${data.url} target='_blank'><span class='blue'>${data.id}<span></a><img class='linkIcon' src='../images/linkIcon.svg'/>`;

  const joke = document.createElement('p');
  joke.classList.add('joke');
  joke.innerHTML = data.value;

  const date = document.createElement('p');
  date.classList.add('grey');
  const hours = countTime(data.updated_at);

  date.innerHTML = `<span class='thin'>Last update:</span> ${hours} hours ago`;

  const category = document.createElement('p');
  category.innerHTML =
    data.categories.length > 0
      ? `<p class='jokeCategory'>${data.categories}</p>`
      : `<p display:none></p>`;

  const likeIcon = document.createElement('img');
  likeIcon.classList.add('likeIcon');
  likeIcon.id = data.id;
  likeIcon.value = JSON.stringify(data);
  likeIcon.src =
    checkStorage(data.id) === true
      ? '../images/filledheartIcon.svg'
      : '../images/heartIcon.svg';

  const likeButton = document.createElement('button');
  likeButton.classList.add('likeButton');
  likeButton.onclick =
    checkStorage(data.id) === true ? deleteFomStorage : addToStorage;
  likeButton.appendChild(likeIcon);

  const jokeData = document.createElement('div');
  jokeData.classList.add('jokeData');
  jokeData.appendChild(date);
  jokeData.appendChild(category);

  const textBlock = document.createElement('div');
  textBlock.classList.add('textBlock');
  const jokeBody = document.createElement('div');
  jokeBody.classList.add('jokeBody');
  jokeBody.appendChild(id);
  jokeBody.appendChild(joke);
  jokeBody.appendChild(jokeData);

  textBlock.appendChild(messageIcon);
  textBlock.appendChild(jokeBody);

  const jokeCard = document.createElement('div');
  jokeCard.classList.add('card');
  if (checkStorage(data.id) === true) {
    jokeCard.classList.add('favJoke');
  }
  jokeCard.appendChild(likeButton);
  jokeCard.appendChild(textBlock);

  const cardPlace = document.querySelector(
    checkStorage(data.id) === true ? '.favouriteJokes' : '.jokes'
  );
  cardPlace.appendChild(jokeCard);
};

export const renderCategory = (data) => {
  const category = document.createElement('button');
  category.innerHTML = data;
  category.type = 'button';
  category.classList.add('categoryButton');
  category.value = data;
  category.onclick = fetchCategoryJoke;
  const categoryPlace = document.querySelector('.categorySelector');
  categoryPlace.appendChild(category);
};
