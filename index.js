function toonLijstPokemons(e) {
    pokemonsarr.forEach(element => {
        let regel = document.createElement('li');
        regel.innerHTML = element.name;
        lijst.appendChild(regel);
    })
}


async function fetchPokemons() {
    let text = await fetch("https://pokeapi.co/api/v2/pokemon");
    //let text = await fetch("https://pokeapi.co/api/v2/pokemon/1/");
    let text2 = await text.json();
    let arr = text2.results;
    return arr;
}

async function toonPokemon(url, pokemonName) {
    console.log(url);
    text = await fetch(url);
    //let text = await fetch("https://pokeapi.co/api/v2/pokemon/1/");
    text2 = await text.json();
    console.log(text2.sprites.back_shiny);

    toonResultaat.innerHTML = "";
    let plaatje = document.createElement('img');
    plaatje.setAttribute("src", text2.sprites.back_shiny);
    plaatje.setAttribute("width", "100%");
    plaatje.setAttribute("alt", pokemonName)
    toonResultaat.appendChild(plaatje);
}


async function maakLijstPokemons(result) {
    let pokemonsKeuzeKnoppen = "";
    lijst.innerHTML = "";
    await result.forEach(element => {
        let regel = document.createElement('li');
        let buttonPokemonKeuze = document.createElement('button');
        buttonPokemonKeuze.innerHTML = "Toon " + element.name;
        buttonPokemonKeuze.classList.add("gekozenPokemon");
        regel.appendChild(buttonPokemonKeuze);
        lijst.appendChild(regel);
    })
    pokemonsKeuzeKnoppen = document.getElementsByClassName("gekozenPokemon");
    pokemonsKeuzeKnoppenArr = Array.from(pokemonsKeuzeKnoppen);
    console.log("aantal keuzeknoppen :", pokemonsKeuzeKnoppen.length);
    pokemonsKeuzeKnoppenArr.forEach((element, index) => element.addEventListener("click", function(e) { toonPokemon(result[index].url) }));
}

let buttonPokemons = "";
let lijst = document.getElementById("lijst");
let toonResultaat = document.getElementById("toonResultaat");
let pokemonsarr = fetchPokemons().then(result => {
    buttonPokemons = document.getElementsByClassName("pokemons")[0];
    buttonPokemons.addEventListener("click", function(e) { maakLijstPokemons(result) });
})