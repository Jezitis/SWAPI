const API = 'https://swapi.dev/api/';
const SEARCH_INPUT = document.querySelector('.person_search');
const SEARCH_RESULT = document.querySelector('.search_result');
const SEARCH_BUTTON = document.getElementById('search_request_btn');
const NAME = document.getElementById('name');
const HEIGHT = document.getElementById('height');
const MASS = document.getElementById('mass');
const BIRTH_YEAR = document.getElementById('birth_year');
const FILMS_COUNT = document.getElementById('films_count');

let data = []; //empty array for saving data from searching request


SEARCH_BUTTON.addEventListener('click', async function(){
    let searchValue = SEARCH_INPUT.value;
    let searchSelect = document.querySelector('.search-select').value;
    let searchCategory = `${searchSelect}/?search=`;
    let url = `${API}${searchCategory}${searchValue}`;
    let request = await fetch(url);

    if (request.ok) {
        let response = await request.json();
        let result = await response.results;
        if (result.length > 0) {
            data = result;
            SEARCH_RESULT.innerHTML = '';
            result.forEach(key => {
                SEARCH_RESULT.insertAdjacentHTML('beforeend', `<li class="search_result__item">${key.name}</li>`);
            });

        }
        else {
            SEARCH_RESULT.textContent = 'Ничего не найдено, попробуйте еще раз!';
        }
    } 
    else {
        SEARCH_RESULT.textContent = `К сожалению произошла ошибка ${request.status}, попробуйте повторить запрос позднее`;
    }
});

SEARCH_RESULT.addEventListener('click', function(e){
    e.preventDefault();
    let target = e.target;
    let chosenItem = data.find(item => item.name == target.textContent);
    
    NAME.textContent = chosenItem.name;
    HEIGHT.textContent = chosenItem.height;
    MASS.textContent = chosenItem.mass;
    BIRTH_YEAR.textContent = chosenItem.birth_year;
    FILMS_COUNT.textContent = chosenItem.films.length;
});
