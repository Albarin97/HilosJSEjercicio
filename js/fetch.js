
const BASE_URL = 'https://pokeapi.co/api/v2/';

fetch(BASE_URL + 'pokemon/ditto')
    .then((res) => res.json())
    .then(data => console.log(data));

// fetch async

const fetchPokemon = async (pokemon) => {
    try{
        //const response = await fetch(BASE_URL + 'pokemon/ditto');
        const response = await fetch(`${BASE_URL}pokemon/${pokemon}`);
        const parsedResponse = await response.json();
        return parsedResponse;
    }catch (err) {
        console.error(err);
    }
}

document.getElementById('get-btn')
.addEventListener('click', async () => {
    const pokemon = await fetchPokemon(document.getElementById('poke-name').value.toLowerCase());

    localStorage.setItem('currentPokemonID', pokemon.id);
    console.log(pokemon.id);
});

document.addEventListener('DOMContentLoaded', async () => {
    const storedId = localStorage.getItem('currentPokemonID');
    const initialId = storedId ? parseInt(storedId) : 1;
    const pokemon = await fetchPokemon(initialId);
    
    console.log(pokemon.name);
})

document.getElementById('previous-btn').addEventListener('click', async () => {
    const currentPokemonID = parseInt(localStorage.getItem('currentPokemonID'));
    const newId = Math.max(1, currentPokemonID -1);
    const pokemon = await fetchPokemon(newId);
    localStorage.setItem('currentPokemonID', newId);
    console.log(pokemon);
})

document.getElementById('next-btn').addEventListener('click', async () => {
    const currentPokemonID = parseInt(localStorage.getItem('currentPokemonID'));
    const newId = Math.max(1, currentPokemonID +1);
    const pokemon = await fetchPokemon(newId);
    localStorage.setItem('currentPokemonID', newId);
    console.log(pokemon);
})

//////POST
fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
        title: 'title',
        body: 'Lorem ipsum dolor sit amet',
        userId: 1,
    }),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    }
}).then(res => res.JSON()).then(json => console.log(json));

//////////////////////// EJERCICIOS

const CARD_SECTION = document.getElementById('card-pkm');

const createCard = () => {
    const card = document.createElement('div');
    card.classList.add('tarjeta-pkm', 'container');
    return card; 
}

const createDescription = () => {
    const pkmElements = {
        pkmName:document.createElement('h2'),
        num:document.createElement('h3'),
        img:document.createElement('img'),
    }
    return pkmElements;
}

const populateElements = (pokemon, pkmElements) => {
    pkmElements.pkmName.textContent = pokemon.name;
    pkmElements.num.textContent = pokemon.id;
    pkmElements.img.src = pokemon.sprites.front_default;

    return pkmElements;
}

const renderElements = (card, elemements) => {
    card.append(elemements.pkmName, elemements.num, elemements.img);
}


document.getElementById('btn-agregar')
.addEventListener('click', async () => {
    const card = createCard();
    const pkmElements = createDescription();

    
    const pokemon = await fetchPokemon(localStorage.getItem('currentPokemonID'));

    const elemementWithData = populateElements(pokemon, pkmElements);
    renderElements(card, elemementWithData);
    CARD_SECTION.append(card);
});
