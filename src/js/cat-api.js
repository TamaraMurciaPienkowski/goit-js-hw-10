// const KEY =
//   'live_idIZYnecHH32vszveU4i2ziq4wdKrE7fa9zUSVuW6nPGuGlzHOwUNGhn4t1Su8ey';
const catBreeds =
  'https://api.thecatapi.com/v1/breeds?api_key=live_idIZYnecHH32vszveU4i2ziq4wdKrE7fa9zUSVuW6nPGuGlzHOwUNGhn4t1Su8ey';
catFilter = document.querySelector('.breed-select');
const chosenCatInfo = 'https://api.thecatapi.com/v1/images/search';
let loading;
let errorInfo;
loading = document.querySelector('.loader');
errorInfo = document.querySelector('.error');
function hideAlert(zmienna) {
  zmienna.classList.add('hidden');
}
hideAlert(loading);
hideAlert(errorInfo);
function showAlert() {
  loading.classList.remove('hidden');
}
function pingUrl(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          reject(errorInfo);
        } else {
          return response.json();
        }
      })
      .then(data => {
        resolve(data);
      })
      .catch(err => reject(err));
  });
}
pingUrl(catBreeds).then(data => {
  console.log(data);
});
function fetchBreeds() {
  pingUrl(catBreeds).then(data => {
    const catChoices = data
      .map(dataOne => `<option value='${dataOne.id}'>${dataOne.name}</option>`)
      .join('');
    catFilter.insertAdjacentHTML('afterbegin', catChoices);
  });
}
fetchBreeds();

function fetchCatByBreed(breedId) {
  const catUrl = `${chosenCatInfo}?breed_ids=${breedId}`;
  console.log(catUrl);
}

function handleFilterForm(e) {
  e.preventDefault();
  showAlert();
}

window.addEventListener('load', function () {
  catFilter.addEventListener('select', handleFilterForm);
});
