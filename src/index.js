import { fetchCountries } from './fetchCountries';
import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(readInput, DEBOUNCE_DELAY));

function readInput(event) {
  if (refs.input.value === '') {
    return;
  }
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';

  console.log(refs.input.value);
  const inputText = refs.input.value.trim();
  fetchCountries(inputText).then(renderCountryList).catch(onFetchError);
}

function renderCountryList(country) {
  const listMarkup = createCountryList(country);
  const infoMarkup = createCountryInfo(country);
  if (country.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.',
      {
        timeout: 2000,
        fontSize: '16px',
        width: '320px',
      }
    );
  } else if (country.length > 1 && country.length <= 10) {
    refs.countryList.insertAdjacentHTML('beforeend', listMarkup);
  } else {
    refs.countryList.insertAdjacentHTML('beforeend', listMarkup);
    refs.countryInfo.insertAdjacentHTML('beforeend', infoMarkup);
  }
}

function createCountryList(country) {
  return country
    .map(({ name, flags }) => {
      return `<li class="country-item"><img  class = "image-flag" src="${flags.svg}" alt="" width="50" height="30">${name.official}</li>`;
    })
    .join('');
}

function createCountryInfo(country) {
  return country
    .map(({ capital, population, languages }) => {
      const listLanguages = createListLanguages(languages);
      return `<p class = "text-info"><span class="header-info">Capital:</span> ${capital}</p><p class = "text-info"><span class="header-info">Population:</span> ${population}</p><p class = "text-info"> <span class="header-info">Languages:</span> ${listLanguages}</p>`;
    })
    .join();
}

function createListLanguages(languages) {
  return Object.values(languages).join(', ');
}

function onFetchError(error) {
  Notiflix.Notify.failure('Oops, there is no country with that name', {
    timeout: 2000,
    fontSize: '16px',
    width: '320px',
  });
}
