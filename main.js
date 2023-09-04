const listaPokemon = document.querySelector("#listaPokemon");
const botonesTipos = document.querySelectorAll(".btn-header");

let URL = "https://pokeapi.co/api/v2/pokemon/";

for (let i = 1; i <= 151; i++) {
    fetch(URL + i)
        .then(res => res.json())
        .then(data => mostarPokemon(data))
}

function mostarPokemon(poke) {

    let pokeID = poke.id.toString();

    if (pokeID.length === 1) {
        pokeID = "00" + pokeID
    } else if (pokeID.length === 2) {
        pokeID = "0" + pokeID
    }

    let tipos = poke.types.map(type => 
       ` <p class="${type.type.name} tipo">${type.type.name}</p> `);
       tipos = tipos.join("")

    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
        <p class="pokemon-id-fondo">#${pokeID}</p>
        <div class="pokemon-imagen">
            <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
        </div>
        <div class="pokemon-info">
            <div class="nombre-contenedor">
                <p class="pokemon-id">#${pokeID}</p>
                <h2 class="pokemon-nombre">${poke.name}</h2>
            </div>
            <div class="pokemon-tipos">
            ${tipos}
            </div>
            <div class="pokemon-stats">
                <p class="stat">${poke.height}</p>
                <p class="stat">${poke.weight}</p>
            </div>
        </div>
    `;
    listaPokemon.append(div)
}

botonesTipos.forEach( boton => boton.addEventListener("click", (evento) => {
    const botonTipo = evento.currentTarget.id;

    listaPokemon.innerHTML = "";

    for (let i = 1; i <= 151; i++) {
        fetch(URL + i)
            .then(res => res.json())
            .then(data => {

                if (botonTipo === "ver-todos") {
                    mostarPokemon(data)
                } else {
                    const tipos = data.types.map(type => type.type.name);
                    if (tipos.some(tipo => tipo.includes(botonTipo))) {
                        mostarPokemon(data)
                    }
                }
            }) 
    }
}))