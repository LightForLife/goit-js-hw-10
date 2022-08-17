import './css/styles.css';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(readInput, DEBOUNCE_DELAY));

function readInput(event) {
  const inputText = refs.input.value;
  console.log(inputText);
  fetchCountries(inputText).then(renderCountryList).catch(onFetchError);
}

function fetchCountries(name) {
  return fetch(`https://restcountries.com/v3.1/name/${name}`).then(response => {
    return response.json();
  });
}

function renderCountryList(country) {
  const listMarkup = createCountryList(country);
  refs.countryList.insertAdjacentHTML('beforeend', listMarkup);

  const infoMarkup = createCountryInfo(country);
  refs.countryInfo.insertAdjacentHTML('beforeend', infoMarkup);
}

function createCountryList(country) {
  return country
    .map(({ name, flags }) => {
      return `<li class="country-item"><img src="${flags.svg}" alt="" width="50" height="30">${name.official}</li>`;
    })
    .join();
}

// refs.countryList.insertAdjacentHTML('beforeend');
// const infoMarkup = createCountryInfo();
function createCountryInfo(country) {
  return country
    .map(({ name, flags }) => {
      return `<p>Capital${name}</p><p>Population</p><p>Languages</p>`;
    })
    .join();
}

function onFetchError(error) {
  console.log(error);
}
